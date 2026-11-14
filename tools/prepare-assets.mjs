// Ejecutar desde esta carpeta dentro del monorepo para renovar capturas de referencia.
import { readdir, mkdir, copyFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const pnpm = path.join(root, 'node_modules/.pnpm');
const sharpPackage = (await readdir(pnpm)).find(name => name.startsWith('sharp@'));
const sharp = createRequire(import.meta.url)(path.join(pnpm, sharpPackage, 'node_modules/sharp'));
const assets = path.resolve(here, '../site/assets');
const videoAssets = path.resolve(here, '../video/assets');
await mkdir(assets, { recursive: true });
await mkdir(path.join(videoAssets, 'fonts'), { recursive: true });
await mkdir(path.join(assets, 'fonts'), { recursive: true });
const shots = [
  ['hoy.webp', '.verification/scientific-global/hoy-1440.png', { left: 258, top: 133, width: 1132, height: 708 }],
  ['inicio.webp', '.verification/scientific-global/nivelacion-390.png', { left: 20, top: 117, width: 350, height: 620 }],
  ['ejercicio.webp', '.verification/response/question.png', { left: 648, top: 218, width: 535, height: 630 }],
  ['practica.webp', '.verification/scientific-global/practica-1440.png', { left: 312, top: 87, width: 1024, height: 575 }],
  ['mapa.webp', '.verification/scientific-global/mapa-1440.png', null],
  ['insolitus.webp', '.verification/scientific-global/insolitus-coleccion-1440.png', null],
];
for (const [name, source, crop] of shots) {
  let image = sharp(path.join(root, source));
  const metadata = await image.metadata();
  if (crop) image = image.extract(crop);
  await image.webp({ quality: 88 }).toFile(path.join(videoAssets, name));
  if (name === 'hoy.webp') await copyFile(path.join(videoAssets, name), path.join(assets, name));
  console.log(name, metadata.width, metadata.height);
}
await copyFile(path.join(root, 'apps/student-web/public/marca/nexora-isotipo.svg'), path.join(assets, 'nexora.svg'));
await copyFile(path.join(assets, 'nexora.svg'), path.join(videoAssets, 'nexora.svg'));
await copyFile(path.join(root, 'apps/student-web/.next/static/media/c6a5c2fdc12da45c-s.p.17-aodiw50953.woff2'), path.join(assets, 'fonts/archivo-latin.woff2'));
await copyFile(path.join(assets, 'fonts/archivo-latin.woff2'), path.join(videoAssets, 'fonts/archivo-latin.woff2'));
for (const [source, name] of [['01_el-vinculo.webp', 'carta-vinculo.webp'], ['11_el-prisma.webp', 'carta-prisma.webp']]) {
  await copyFile(path.join(root, 'apps/student-web/public/insolitus/provisional', source), path.join(assets, name));
}
console.log('Si cambian las fuentes o los encuadres, actualizar ASSETS.md y los sidecars de procedencia.');
