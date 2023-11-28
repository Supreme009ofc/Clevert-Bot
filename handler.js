import { smsg } from './lib/simple.js';
import { unwatchFile, watchFile } from 'fs';
import chalk from 'chalk';

export async function handler(chatUpdate) {

  try {
    m = smsg(this, m) || m;
    if (!m) return;
    m.exp = 0;
    m.coin = 0;
    m.diamond = false;

    let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender];

    const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
    const isOwner = isROwner || m.fromMe;
    const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
    const isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || _user.prem == true;


  } catch (e) {
    console.error(chalk.red('Error en el manejador:'), e);
  } finally {
  

  }
}

export async function participantsUpdate({ id, participants, action }) {

}

export async function groupsUpdate(groupsUpdate) {

}


let file = global.__filename(import.meta.url, true);
watchFile(file, async () => {
  unwatchFile(file);
  console.log(chalk.magenta("✅ Se actualizó 'handler.js'"));
  if (global.reloadHandler) console.log(await global.reloadHandler());
});