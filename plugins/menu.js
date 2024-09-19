const { readEnv } = require('../lib/database');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const sensitiveData = require('../dila_md_licence/a/b/c/d/dddamsbs');

cmd({
    pattern: "menu",
    alias: ["panel", "penal", "list", "allmenu"],
    desc: "Vérifie le menu complet",
    category: "main",
    react: "🗒️", // Nouveau style, nouveau emoji. C'est le moment de voir ce qu'il y a à faire 🧐
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const config = await readEnv();
        const totalRAM = Math.round(require('os').totalmem() / 1024 / 1024);
        const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const freeRAM = (totalRAM - parseFloat(usedRAM)).toFixed(2);

        // Petit rappel pour toi : même les bots ont besoin de RAM pour fonctionner ! 🤖🧠
        let status = `${sensitiveData.apimenibah}`;
        let sentMessage = await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: status }, { quoted: mek || null });

        // Un petit clin d'œil à ceux qui regardent. Bien joué pour avoir lancé le menu 🗒️😎
        await conn.sendMessage(from, { react: { text: "🗒️", key: sentMessage.key } });

    } catch (e) {
        console.log(e);
        reply(`Erreur : ${e.message} 😵‍💫 Oups, quelque chose n'a pas marché... essaie de me redémarrer !`);
    }
});
