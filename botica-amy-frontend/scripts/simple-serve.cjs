const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.argv[2] ? Number(process.argv[2]) : 5173;
const host = process.argv[3] || '127.0.0.1';
const dist = path.resolve(__dirname, '..', 'dist');

function sendFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Internal Server Error');
    }
    const ext = path.extname(filePath).toLowerCase();
    const types = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.woff2': 'font/woff2',
    };
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(dist, reqPath);
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      return sendFile(filePath, res);
    }
    // fallback to index.html for SPA routes
    const index = path.join(dist, 'index.html');
    fs.readFile(index, (ierr, data) => {
      if (ierr) {
        res.writeHead(500);
        return res.end('Index not found');
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  });
});

server.listen(port, host, () => {
  console.log(`Simple static server serving ${dist}`);
  console.log(`Local: http://${host}:${port}/`);
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
