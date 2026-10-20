#!/usr/bin/env node
/**
 * Minimal static server for local development.
 * Service workers only run on https:// or http://localhost — this makes that easy.
 *
 *   node serve.js            # http://localhost:8080
 *   node serve.js --port=3000
 *   node serve.js --https    # needs cert.pem + key.pem in this folder
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const found = args.find((a) => a.startsWith(`--${name}=`));
  return found ? found.split('=')[1] : fallback;
};

const PORT = Number(getArg('port', process.env.PORT || 8080));
const HOST = getArg('host', '0.0.0.0');
const USE_HTTPS = args.includes('--https');
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Service-Worker-Allowed': '/',
    ...headers,
  });
  res.end(body);
}

const server = (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(url.pathname);

  // Resolve inside ROOT only (no directory traversal).
  const filePath = path.join(ROOT, path.normalize(pathname));
  if (!filePath.startsWith(ROOT)) return send(res, 403, 'Forbidden');

  fs.stat(filePath, (err, stat) => {
    if (err) return send(res, 404, 'Not found');

    if (stat.isDirectory()) {
      const index = path.join(filePath, 'index.html');
      if (!fs.existsSync(index)) return send(res, 404, 'Not found');
      return stream(index, res);
    }
    stream(filePath, res);
  });
};

function stream(filePath, res) {
  const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) return send(res, 500, 'Server error');
    send(res, 200, data, { 'Content-Type': type });
  });
}

let httpServer;
if (USE_HTTPS) {
  httpServer = https.createServer(
    {
      key: fs.readFileSync(path.join(ROOT, 'key.pem')),
      cert: fs.readFileSync(path.join(ROOT, 'cert.pem')),
    },
    server
  );
} else {
  httpServer = http.createServer(server);
}

httpServer.listen(PORT, HOST, () => {
  const scheme = USE_HTTPS ? 'https' : 'http';
  console.log(`\n  Servindo ${ROOT}`);
  console.log(`  ${scheme}://localhost:${PORT}\n`);
  console.log('  Ctrl+C para encerrar.\n');
});
