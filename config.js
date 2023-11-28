import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

global.owner = [
    ['5493772455367', '—͟͞͞★ Šᶶₚ𝓻ε𝗺ε₀₀❾ ★', true],
    ['529987390199']
]; // Números de owner

global.mods = ['5493772455367', '529987390199'];
global.prems = ['5493772455367', '529987390199'];
global.APIs = {
    nrtm: 'https://fg-nrtm.ddns.net',
    fgmods: 'https://api.fgmods.xyz'
};
global.APIKeys = {
    'https://api.fgmods.xyz': 'DRLg5kY7' //--- 100 de límite diario --- Regístrese en https://api.fgmods.xyz/
};

global.packname = 'Clevert-Bot09';
global.author = 'Supreme009';

global.botInfo = {
    name: 'Clevert-Bot09',
    instagram: 'https://instagram.com/@iam.lukas009',
    github: 'https://github.com/Supreme009ofc',
    youtube: 'https://youtube.com',
    logo: 'https://i.ibb.co/1zdz2j3/logo.jpgs'
};

global.groupLinks = {
    channel: 'https://whatsapp.com/channel',
    bgp: 'https://chat.whatsapp.com/JTgd9vw9aXw1s1zup8RdtS',
    bgp2: 'https://chat.whatsapp.com/JTgd9vw9aXw1s1zup8RdtS',
    bgp3: 'https://chat.whatsapp.com/JTgd9vw9aXw1s1zup8RdtS' //--GP NSFW
};

global.messages = {
    wait: '⌛ _Cargando..._\n*▬▬▬▭*',
    rwait: '⌛',
    dmoji: '🤭',
    done: '✅',
    error: '❌',
    xmoji: '🔥'
};

global.multiplier = 69;
global.maxWarn = '2'; // Máxima advertencias

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
    unwatchFile(file);
    console.log(chalk.redBright("Update 'config.js'"));
    import(`${file}?update=${Date.now()}`);
});