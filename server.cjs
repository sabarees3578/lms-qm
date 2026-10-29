const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'dist');
const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const port = Number(portIndex >= 0 ? args[portIndex + 1] : process.env.PORT || 8080);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('Choose a port between 1 and 65535.');
  process.exit(1);
}
if (!fs.existsSync(path.join(root, 'index.html'))) {
  console.error('Production files are missing. Run "npm run build" before starting the server.');
  process.exit(1);
}
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};
const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end();
    return;
  }

  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); res.end('Invalid URL'); return; }
  const isAppRoute = pathname === '/' || path.extname(pathname) === '';
  const file = path.resolve(root, isAppRoute ? 'index.html' : `.${pathname}`);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(err.code === 'ENOENT' || err.code === 'EISDIR' ? 404 : 500);
      res.end('File unavailable');
      return;
    }
    res.writeHead(200, {
      'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
});
server.on('error', err => {
  if (err.code === 'EADDRINUSE') console.error(`Port ${port} is busy. Try: npm run dev -- --port ${port + 1}`);
  else if (err.code === 'EPERM' || err.code === 'EACCES') console.error('This environment blocks opening a local server. Run npm run dev in your computer’s terminal outside the restricted agent environment.');
  else console.error(err.message);
  process.exitCode = 1;
});
server.listen(port, '0.0.0.0', () => console.log(`Kanagam Tech Academy is listening on port ${port}`));
