import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const project = path.resolve(root, '../..');
const pages = new Set(['index.html', 'trade.html', 'motion.html', 'materials.html', 'styles.css', 'preview.js']);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const fonts = { '/fonts/cyrillic.woff2': 'd3fe2f289711ac3f-s.p.1l2zhvq5eocqf.woff2', '/fonts/latin.woff2': 'a343f882a40d2cc9-s.p.1sj6eobyi31rd.woff2' };

http.createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
    const url = new URL(req.url, 'http://127.0.0.1:3002');
    const name = decodeURIComponent(url.pathname);
    let target;
    if (name === '/') target = path.join(root, 'index.html');
    else if (pages.has(name.slice(1))) target = path.join(root, name.slice(1));
    else if (fonts[name]) target = path.join(project, '.next/static/media', fonts[name]);
    else if (/^\/assets\/(photo|icon)\/[a-zA-Z0-9_-]+\.(jpg|png|webp)$/.test(name) || /^\/logo(-white)?\.png$/.test(name)) target = path.join(project, 'public', name);
    else { res.writeHead(404); res.end('Not found'); return; }
    const info = await stat(target);
    if (!info.isFile()) throw new Error('Not a file');
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : await readFile(target));
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(3002, '127.0.0.1', () => console.log('Stage 1 design preview: http://127.0.0.1:3002 — production unchanged'));
