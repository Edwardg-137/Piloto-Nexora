// Música original: sintetizador determinista de teclas, bajo y percusión suave.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const rate = 44100, duration = 48, beat = .6;
const left = new Float32Array(rate * duration), right = new Float32Array(left.length);
let seed = 137;
const noise = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 2147483648 - 1; };
function sound(start, length, voice, gain, pan = 0) {
  const offset = Math.round(start * rate);
  for (let i = 0; i < Math.ceil(length * rate) && offset + i < left.length; i++) {
    const t = i / rate;
    const value = voice(t, i) * gain * Math.min(1, t / .008) * Math.min(1, (length - t) / .04);
    left[offset + i] += value * (1 - pan * .35);
    right[offset + i] += value * (1 + pan * .35);
  }
}
const frequency = midi => 440 * 2 ** ((midi - 69) / 12);
const key = midi => t => (Math.sin(2 * Math.PI * frequency(midi) * t) + .2 * Math.sin(4 * Math.PI * frequency(midi) * t)) * Math.exp(-t * 3.2);
const chords = [[60, 64, 67, 71], [57, 60, 64, 67], [53, 57, 60, 64], [55, 59, 62, 64]];
for (let bar = 0; bar < 20; bar++) {
  const chord = chords[bar % chords.length];
  const start = bar * beat * 4;
  chord.forEach((note, i) => sound(start + i * .035, 2.35, key(note), .10, (i - 1.5) / 2));
  for (let step = 0; step < 8; step++) {
    sound(start + step * beat / 2, .55, key(chord[[0, 2, 1, 3, 2, 1, 3, 2][step]] + 12), .035, step % 2 ? .6 : -.6);
    if (bar > 1) sound(start + step * beat / 2, .06, t => noise() * Math.exp(-t * 80), .018, .5);
  }
  for (let pulse = 0; pulse < 4; pulse++) {
    const when = start + pulse * beat;
    if (pulse % 2 === 0) {
      sound(when, .32, t => Math.sin(2 * Math.PI * (48 * t + 1.6 * (1 - Math.exp(-t * 32)))) * Math.exp(-t * 14), .18);
      sound(when, .52, t => Math.sin(2 * Math.PI * frequency(chord[0] - 24) * t) * Math.exp(-t * 5), .12);
    } else if (bar > 1) sound(when, .12, t => noise() * Math.exp(-t * 36), .038, -.2);
  }
}
for (const when of [5, 11, 17, 25, 31, 36, 42]) sound(when, .12, t => Math.sin(2 * Math.PI * 1350 * t) * Math.exp(-t * 65), .045);
let peak = 0, energy = 0;
for (let i = 0; i < left.length; i++) {
  const fade = Math.min(1, i / rate / .4, (duration - i / rate) / 1.5);
  left[i] *= fade; right[i] *= fade;
  peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i])); energy += left[i] ** 2;
}
assert(peak > .05 && Number.isFinite(peak));
assert(energy / left.length > .0001, 'La música debe tener señal audible');
const gain = .5 / peak;
const pcm = Buffer.alloc(44 + left.length * 4);
pcm.write('RIFF', 0); pcm.writeUInt32LE(pcm.length - 8, 4); pcm.write('WAVEfmt ', 8);
pcm.writeUInt32LE(16, 16); pcm.writeUInt16LE(1, 20); pcm.writeUInt16LE(2, 22);
pcm.writeUInt32LE(rate, 24); pcm.writeUInt32LE(rate * 4, 28); pcm.writeUInt16LE(4, 32); pcm.writeUInt16LE(16, 34);
pcm.write('data', 36); pcm.writeUInt32LE(left.length * 4, 40);
for (let i = 0; i < left.length; i++) { pcm.writeInt16LE(Math.round(left[i] * gain * 32767), 44 + i * 4); pcm.writeInt16LE(Math.round(right[i] * gain * 32767), 46 + i * 4); }
const folder = new URL('../video/renders/', import.meta.url);
await mkdir(folder, { recursive: true });
await writeFile(new URL('music.wav', folder), pcm);
console.log(`Música original: ${duration} s, estéreo, 100 BPM, pico normalizado -6 dBFS. ${fileURLToPath(folder)}`);
