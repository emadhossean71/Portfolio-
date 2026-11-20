import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('../out/', import.meta.url));
let settings;
try {
  settings = JSON.parse(await readFile(path.join(out, 'preview-config.json'), 'utf8'));
} catch {
  console.error('Run npm run build before starting the static preview.');
  process.exit(1);
}
const basePath = settings.basePath ?? '';
const portFlag = process.argv.indexOf('--port');
const port = Number(portFlag >= 0 ? process.argv[portFlag + 1] : process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid port.');
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.pdf': 'application/pdf',
};

const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return;
  }
  try {
    const url = new URL(request.url, 'http://127.0.0.1');
    let pathname = decodeURIComponent(url.pathname);
    if (basePath && pathname === '/') {
      response.writeHead(302, { Location: `${basePath}/` }); response.end(); return;
    }
    if (basePath && pathname !== basePath && !pathname.startsWith(`${basePath}/`)) {
      response.writeHead(404); response.end('Not found'); return;
    }
    pathname = pathname.slice(basePath.length);
    const file = path.resolve(out, `.${pathname || '/'}`);
    const relative = path.relative(out, file);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      response.writeHead(403); response.end(); return;
    }
    let target = file;
    try {
      if ((await stat(target)).isDirectory()) {
        if (!url.pathname.endsWith('/')) {
          response.writeHead(301, { Location: `${url.pathname}/${url.search}` }); response.end(); return;
        }
        target = path.join(target, 'index.html');
      }
      const body = await readFile(target);
      response.writeHead(200, {
        'Content-Type': types[path.extname(target)] ?? 'application/octet-stream',
        'Content-Length': body.length,
        'Cache-Control': 'no-store',
      });
      response.end(request.method === 'HEAD' ? undefined : body);
    } catch (error) {
      if (!['ENOENT', 'ENOTDIR'].includes(error.code)) throw error;
      const body = await readFile(path.join(out, '404.html'));
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(request.method === 'HEAD' ? undefined : body);
    }
  } catch {
    response.writeHead(400); response.end('Bad request');
  }
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Static preview: http://127.0.0.1:${port}${basePath}/`);
});
