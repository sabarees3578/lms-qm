const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'dist');
const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const port = Number(portIndex >= 0 ? args[portIndex + 1] : process.env.PORT || 8081);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('Choose a port between 1 and 65535. Example: npm run dev -- --port 8081');
  process.exit(1);
}
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg' };
const server = http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); res.end('Invalid URL'); return; }
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(err.code === 'ENOENT' ? 404 : 500); res.end('File unavailable'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
});
server.on('error', err => {
  if (err.code === 'EADDRINUSE') console.error(`Port ${port} is busy. Try: npm run dev -- --port ${port + 1}`);
  else if (err.code === 'EPERM' || err.code === 'EACCES') console.error('This environment blocks opening a local server. Run npm run dev in your computer’s terminal outside the restricted agent environment.');
  else console.error(err.message);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => console.log(`Kanagam Tech Academy is running at http://localhost:${port}\nKeep this terminal open. Press Ctrl+C to stop.`));
