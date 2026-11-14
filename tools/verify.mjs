import assert from 'node:assert/strict';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
let playwright;
try { playwright = await import('playwright'); }
catch { playwright = await import('../../.verification/node_modules/playwright/index.mjs'); }
const require = createRequire(import.meta.url);
const probe = require('ffprobe-static').path;
const videoFile = fileURLToPath(new URL('../site/assets/nexora-demo.mp4', import.meta.url));
const metadata = JSON.parse(execFileSync(probe, ['-v', 'quiet', '-show_streams', '-show_format', '-of', 'json', videoFile], { encoding: 'utf8' }));
assert(Math.abs(Number(metadata.format.duration) - 48) < .1);
const videoStream = metadata.streams.find(s => s.codec_type === 'video');
const audioStream = metadata.streams.find(s => s.codec_type === 'audio');
assert.equal(videoStream.codec_name, 'h264');
assert.equal(videoStream.width, 1920); assert.equal(videoStream.height, 1080);
assert.equal(videoStream.r_frame_rate, '30/1');
assert.equal(audioStream.codec_name, 'aac'); assert.equal(audioStream.channels, 2);
assert((await stat(videoFile)).size < 95 * 1024 * 1024, 'El MP4 debe caber en un archivo normal de GitHub');
const html = await readFile(new URL('../site/index.html', import.meta.url), 'utf8');
assert(!html.includes('<script'), 'La landing no debe necesitar JavaScript');
assert(!/https?:\/\/[^"\s]+\.(?:woff2|css|js)/.test(html), 'Los recursos deben ser locales');
const ranged = await fetch('http://127.0.0.1:4173/assets/nexora-demo.mp4', { headers: { Range: 'bytes=0-63' } });
assert.equal(ranged.status, 206); assert.equal((await ranged.arrayBuffer()).byteLength, 64);
assert.equal((await fetch('http://127.0.0.1:4173/.nojekyll')).status, 200);
assert.equal((await fetch('http://127.0.0.1:4173/..%2f..%2f.env')).status, 404);
const browser = await playwright.chromium.launch({ channel: 'chrome', headless: true });
const failures = [], report = { duration: metadata.format.duration, bytes: (await stat(videoFile)).size, layouts: [] };
const out = new URL('../verification/', import.meta.url); await mkdir(out, { recursive: true });
try {
  for (const width of [360, 390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    page.on('pageerror', error => failures.push(error.message));
    page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
    await page.goto('http://127.0.0.1:4173');
    await page.evaluate(async () => { document.querySelectorAll('img').forEach(img => img.loading = 'eager'); await document.fonts.ready; await Promise.all([...document.images].map(img => img.decode())); });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Desbordamiento a ${width}`);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal((await page.locator('#play-title').innerText()).replace(/\s+/g, ' ').trim(), 'También hay cartas.');
    assert.equal(await page.locator('video[autoplay]').count(), 0);
    await page.getByRole('link', { name: /Ver cómo funciona/ }).click();
    assert.equal(new URL(page.url()).hash, '#demo');
    await page.locator('summary').click(); assert(await page.locator('details').evaluate(node => node.open));
    await page.locator('summary').click();
    const media = await page.locator('video').evaluate(async video => {
      video.muted = true; video.load();
      await video.play();
      await new Promise((resolve, reject) => { if (video.readyState >= 2) resolve(); else { video.addEventListener('loadeddata', resolve, { once: true }); video.addEventListener('error', reject, { once: true }); } });
      video.pause(); video.currentTime = 20;
      await new Promise(resolve => video.addEventListener('seeked', resolve, { once: true }));
      const result = { duration: video.duration, width: video.videoWidth, height: video.videoHeight, currentTime: video.currentTime };
      video.currentTime = 0;
      await new Promise(resolve => video.addEventListener('seeked', resolve, { once: true }));
      return result;
    });
    assert.equal(media.duration, 48); assert.equal(media.width, 1920); assert.equal(media.currentTime, 20);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: fileURLToPath(new URL(`landing-${width}.png`, out)), fullPage: true });
    await page.keyboard.press('Tab');
    assert(await page.evaluate(() => document.activeElement !== document.body));
    report.layouts.push({ width, overflow: false, playback: true });
    await page.close();
  }
  const sub = await browser.newPage();
  await sub.route('http://127.0.0.1:4173/piloto/**', async route => {
    const response = await route.fetch({ url: route.request().url().replace('/piloto/', '/') });
    await route.fulfill({ response });
  });
  await sub.goto('http://127.0.0.1:4173/piloto/');
  assert((await sub.locator('video source').getAttribute('src')).startsWith('assets/'));
  assert(await sub.locator('.hero-screen img').evaluate(img => img.complete && img.naturalWidth > 0));
  await sub.close();
  assert.deepEqual(failures, []);
  await writeFile(new URL('report.json', out), JSON.stringify({ ...report, subdirectory: true, errors: failures }, null, 2));
  console.log(JSON.stringify(report));
} finally { await browser.close(); }
