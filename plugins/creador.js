import './config.js';
import './handler.js';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
import yargs from 'yargs';
import { spawn } from 'child_process';
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync } from 'fs';
import { tmpdir } from 'os';
import { format } from 'util';
import { makeWASocket } from './lib/simple.js';


import './src/connect.js';

async function handleCommand(message) {
    try {
        const commandRegex = /^[^\w]*\.owner[^\w]*$|^[^\w]*\.creador[^\w]*$/i;
        if (commandRegex.test(message.body))  
        
            const ownerInfo = global.owner[0];

            const contact = await client.getContactById(ownerInfo[0]);

            await message.chat.sendContact(contact);

            await message.chat.sendMessage(`Mi Creador: ${ownerInfo[1]}`);
        }
    } catch (error) {
        console.error('Error al manejar el comando:', error);
    }
}


client.on('message', async (message) => {

    await handleCommand(message);
});
