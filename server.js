import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { toBuffer } from 'qrcode';
import fetch from 'node-fetch';
import { useMultiFileAuthState } from '@whiskeysockets/baileys';

async function connect(conn, PORT) {
  let _qr = 'invalid';
  const app = express();
  const server = createServer(app);

  const { state } = await useMultiFileAuthState(global.authFolder);

  conn.ev.on('connection.update', function appQR({ qr }) {
    if (qr) _qr = qr;
  });

  // Manejo de CORS
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
  });

  app.use(async (req, res) => {
    res.setHeader('content-type', 'image/png');
    res.end(await toBuffer(_qr));
  });

  server.listen(PORT, () => {
    console.log('App listened on port', PORT);
    if (global.opts['keepalive']) keepAlive();
  });

  // Manejo de errores
  server.on('error', (err) => {
    console.error('Server error:', err.message);
  });
}

function keepAlive() {
  const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
  if (/(\/\/|\.)undefined\./.test(url)) return;
  setInterval(() => {
    fetch(url).catch(console.error);
  }, 5 * 1000 * 60);
}

export default connect;