import express from 'express';
import { createServer } from 'http';
import { toBuffer } from 'qrcode';
import fetch from 'node-fetch';
import { useMultiFileAuthState } from '@whiskeysockets/baileys';

async function connect(conn, PORT) {
    try {
        let qrCodeData = 'invalid';
        const app = express();
        const server = createServer(app);

        const { state } = await useMultiFileAuthState(global.authFolder);

        conn.ev.on('connection.update', ({ qr }) => {
            if (qr) qrCodeData = qr;
        });

        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET');
            next();
        });

        app.use(async (req, res) => {
            res.setHeader('content-type', 'image/png');
            res.end(await toBuffer(qrCodeData));
        });

        server.listen(PORT, () => {
            console.log('Servidor iniciado en el puerto', PORT);
            if (global.opts['keepalive']) startKeepAlive();
        });

        server.on('error', (err) => {
            console.error('Server error:', err.message);
        });
    } catch (error) {
        console.error('Error en la función connect:', error);
    }
}

function startKeepAlive() {
    const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;

    if (/(\/\/|\.)undefined\./.test(url)) return;

    setInterval(() => {
        fetch(url).catch(console.error);
    }, 5 * 1000 * 60);
}

export default connect;
