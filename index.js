import fs from 'fs';
import { createServer } from 'http';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { format } from 'util';
import { tmpdir } from 'os';
import { spawn } from 'child_process';
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync } from 'fs';
import yargs from 'yargs';
import puppeteer from 'puppeteer-core';
import qrcode from 'qrcode-terminal';
import { toBuffer } from 'qrcode';
import fetch from 'node-fetch';
import { useMultiFileAuthState } from '@whiskeysockets/baileys';

import './config.js';
import { createRequire } from 'module';
import { makeWASocket } from './lib/simple.js';
import './src/connect.js';
import './handler.js';  // Importar después de las configuraciones y la inicialización de WhatsApp

const SESIONES_FOLDER = './sesiones';
const SESSION_FILE_PATH = './sesiones/session.json';

if (!fs.existsSync(SESIONES_FOLDER)) {
  fs.mkdirSync(SESIONES_FOLDER);
}

let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

const puppeteerConfig = {
  executablePath: 'chromium',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
};

const client = new Client({
  session: sessionData,
  puppeteer: puppeteerConfig,
});

client.on('ready', () => {
  console.log('Cliente de WhatsApp listo!');
});

client.on('message', (message) => {
  console.log(`Mensaje recibido: ${message.body}`);
  message.reply('Hola! Soy un bot de WhatsApp');
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', (session) => {
  fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(session));
  console.log('Sesión guardada');
});

client.initialize();

client.on('auth_failure', (error) => {
  console.error('Error al autenticar:', error);
});

// Resto del código...
