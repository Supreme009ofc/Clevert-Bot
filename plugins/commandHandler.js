import { smsg } from './lib/simple.js';

export async function handleCommand(message) {
    const { body, chat } = message;

    const commandRegex = /^[^\w]*\.(owner|creador|desc|info|ayuda)[^\w]*$/i;

    if (commandRegex.test(body)) {
        const command = body.match(commandRegex)[1];

        switch (command.toLowerCase()) {
            case 'owner':
                const ownerInfo = global.owner[0];
                const contact = await client.getContactById(ownerInfo[0]);
                await chat.sendContact(contact);
                await chat.sendMessage(`Aquí está el creador: ${ownerInfo[1]}`);
                break;

            case 'creador':

                break;

            case 'desc':
            
                break;

            case 'info':

                break;

            case 'ayuda':

                break;

            default:
                await chat.sendMessage(`Comando no reconocido: ${body}`);
                break;
        }
    }
}