const fs = require('fs');
const path = require('path');
const { readEnv } = require('../lib/database');
const { cmd, commands } = require('../command');

async function sendReplies(conn, from, replies, pushname) {
    for (const [index, reply] of replies.entries()) {
        setTimeout(async () => {
            await conn.sendMessage(from, { text: reply.replace('${pushname}', pushname) }, { quoted: null });
        }, index * 700);
    }
}

cmd({ on: "body" }, async (conn, mek, m, { from, body, isOwner, pushname }) => {
    const sequenceTrigger = "sten";
    
    if (body.toLowerCase() === sequenceTrigger.toLowerCase()) {
        const replies = [
            `*Salut* ${pushname}`,
            '*Je suis 𝙎-𝙏𝞢𝞜 👤*',
            '*De - Matara 📍*',
            '*Âge - 17 🎂*',
            '*Sauve-moi 📩*',
            '*Et toi........?*'
        ];
        await sendReplies(conn, from, replies, pushname);
    }
    
    if (body.toLowerCase().startsWith('name')) {
        const nameReply = `*Ton prénom est* ${pushname}`;
        await conn.sendMessage(from, { text: nameReply }, { quoted: null });
    }
});
