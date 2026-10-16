import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = process.env.PORT || 8080;
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxK0jZcAfczWqL_NRp7x8HSILlM_HsXUVIlZ37FRF2U0d3jklS4MgKo05BuvWUHp8Z6-A/exec';

const here = path.dirname(new URL(import.meta.url).pathname);
const indexHtml = fs.readFileSync(path.join(here, 'index.html'), 'utf8');
const adminHtml = fs.readFileSync(path.join(here, 'admin.html'), 'utf8');
const qrSvg = fs.readFileSync(path.join(here, 'public-qr.svg'), 'utf8');
const qrPng = fs.readFileSync(path.join(here, 'public-qr.png'));

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://' + req.headers.host);

  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (url.pathname === '/public-qr.svg') {
    res.writeHead(200, { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' });
    res.end(qrSvg);
    return;
  }

  if (url.pathname === '/public-qr.png') {
    res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' });
    res.end(qrPng);
    return;
  }

  if (url.pathname === '/admin') {
    res.writeHead(302, { 'Location': APPS_SCRIPT_URL + '?view=admin' });
    res.end();
    return;
  }

  if (url.pathname.startsWith('/api/') && req.method === 'POST') {
    const action = url.pathname.slice(5);
    let bodyStr = '';
    for await (const chunk of req) bodyStr += chunk;
    try {
      const payload = JSON.parse(bodyStr);
      const gasRes = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload }),
        redirect: 'follow'
      });
      const data = await gasRes.text();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(data);
    } catch (e) {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message || 'GATEWAY_ERROR' }));
    }
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600' });
  res.end(indexHtml);
});

server.listen(PORT, () => console.log('rasipurampolice.in portal running on http://127.0.0.1:' + PORT));
