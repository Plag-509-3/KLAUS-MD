const fs = require('fs');
const path = require('path');
const { readEnv } = require('../lib/database');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({ on: "sticker" }, async (conn, mek, m, { from, isGroup, isOwner, isAdmins, groupAdmins, isBotAdmins, sender }) => {
    try {
        const config = await readEnv();
        const botOwner = config.OWNER_NUMBER;
        
        if (config.ANTI_STICKER === 'true') {
            if (isGroup) {
                if (isBotAdmins) {
                    const senderIsAdmin = groupAdmins.includes(sender);
                    if (!senderIsAdmin && !isOwner) {
                        const key = { remoteJid: from, fromMe: false, id: mek.key.id, participant: sender };
                        await conn.sendMessage(from, { delete: key });
                        
                        const warningMessage = `🖼️ ~*@${sender.split('@')[0]}*~\n*⚠️ STICKER SUPPRIMÉ: ‼️*`;
                        await conn.sendMessage(from, { text: warningMessage, mentions: [sender] });
                        
                        const ownerMessage = `🚨 Anti-sticker déclenché dans *${groupName}*.\nExpéditeur: @${sender.split('@')[0]}\nLe sticker a été supprimé.`;
                        await conn.sendMessage(botOwner, { text: ownerMessage, mentions: [sender] });
                    }
                } else {
                    const adminsMention = groupAdmins.map(admin => `@${admin.split('@')[0]}`).join(' ');
                    const botNotAdminMessage = `⚠️ 𝙎-𝙏𝞢𝞜 bot n'est pas admin, mais un sticker suspect a été détecté. Allez, admins:\n${adminsMention}`;
                    await conn.sendMessage(from, { text: botNotAdminMessage, mentions: groupAdmins });
                }
            }
        }
    } catch (e) {
        console.error(`Erreur dans la fonctionnalité de suppression automatique des stickers: ${e.message}`);
        const botOwner = config.OWNER_NUMBER;
        await conn.sendMessage(botOwner, { text: `⚠️ Erreur dans la suppression auto des stickers: ${e.message}` });
    }
});

// Ajout d'un peu de trolling ici 😜
cmd({ on: "audio" }, async (conn, mek, m, { from, isGroup, isOwner, isAdmins, groupAdmins, isBotAdmins, sender }) => {
    try {
        const config = await readEnv();
        const botOwner = config.OWNER_NUMBER;
        
        if (config.ANTI_VOICE === 'true') {
            if (isGroup) {
                if (isBotAdmins) {
                    const senderIsAdmin = groupAdmins.includes(sender);
                    if (!senderIsAdmin && !isOwner) {
                        const key = { remoteJid: from, fromMe: false, id: mek.key.id, participant: sender };
                        await conn.sendMessage(from, { delete: key });
                        
                        const warningMessage = `🎙️ ~*@${sender.split('@')[0]}*~\n*⚠️ MESSAGE AUDIO SUPPRIMÉ: ‼️* (Eh oui, trop facile 😏)`;
                        await conn.sendMessage(from, { text: warningMessage, mentions: [sender] });
                        
                        const ownerMessage = `🚨 Anti-audio déclenché dans *${groupName}*.\nExpéditeur: @${sender.split('@')[0]}\nLe message audio a été supprimé.`;
                        await conn.sendMessage(botOwner, { text: ownerMessage, mentions: [sender] });
                    }
                } else {
                    const adminsMention = groupAdmins.map(admin => `@${admin.split('@')[0]}`).join(' ');
                    const botNotAdminMessage = `⚠️ 𝙎-𝙏𝞢𝞜 bot ne peut pas agir, mais un message audio suspect a été trouvé. Admins, c'est votre tour:\n${adminsMention}`;
                    await conn.sendMessage(from, { text: botNotAdminMessage, mentions: groupAdmins });
                }
            }
        }
    } catch (e) {
        console.error(`Erreur dans la fonctionnalité de suppression automatique des audios: ${e.message}`);
        const botOwner = config.OWNER_NUMBER;
        await conn.sendMessage(botOwner, { text: `⚠️ Erreur dans la suppression auto des audios: ${e.message}` });
    }
});

//BY 𝙎-𝙏𝞢𝞜 