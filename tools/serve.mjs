import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../site/', import.meta.url));
function resolveFile(url) {
  const pathname = decodeURIComponent(new URL(url, 'http://localhost').pathname);
  const file = path.resolve(root, '.' + pathname, pathname.endsWith('/') ? 'index.html' : '');
  if (!file.startsWith(root)) throw new Error('Ruta fuera del sitio');
  return file;
}
assert.equal(resolveFile('/'), path.join(root, 'index.html'));
assert.throws(() => resolveFile('/..%2f..%2fsecret'));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.vtt': 'text/vtt; charset=utf-8', '.txt': 'text/plain' };
const server = createServer(async (req, res) => {
  try {
    const file = resolveFile(req.url);
    const info = await stat(file);
    if (!info.isFile()) throw new Error('No es un archivo');
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Accept-Ranges', 'bytes');
    if (info.size === 0) { res.setHeader('Content-Length', 0); res.end(); return; }
    const range = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range || '');
    const start = range ? Number(range[1]) : 0;
    const end = range && range[2] ? Math.min(Number(range[2]), info.size - 1) : info.size - 1;
    if (start > end || start >= info.size) { res.writeHead(416, { 'Content-Range': `bytes */${info.size}` }).end(); return; }
    if (range) res.writeHead(206, { 'Content-Range': `bytes ${start}-${end}/${info.size}`, 'Content-Length': end - start + 1 });
    else res.setHeader('Content-Length', info.size);
    if (req.method === 'HEAD') { res.end(); return; }
    const stream = createReadStream(file, { start, end });
    stream.on('error', () => res.destroy());
    stream.pipe(res);
  } catch { res.writeHead(404).end('Archivo no encontrado'); }
});
server.listen(4173, '127.0.0.1', () => console.log('Nexora: http://127.0.0.1:4173'));
