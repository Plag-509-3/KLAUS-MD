const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const si = require('systeminformation');
const { runtime } = require('../lib/functions');
const sensitiveData = require('../dila_md_licence/a/b/c/d/dddamsbs');

cmd({
    pattern: "system",
    alias: ["status", "botinfo", "runtime", "uptime"],
    desc: "Vérifiez le temps de fonctionnement, l'utilisation de la RAM, et plus encore",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const totalRAM = Math.round(os.totalmem() / 1024 / 1024);
        const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const freeRAM = (totalRAM - parseFloat(usedRAM)).toFixed(2);
        const cpuInfo = await si.cpu();
        const now = new Date();
        const sriLankaTimeZone = 'Asia/Colombo';
        const date = now.toLocaleDateString('fr-FR', { timeZone: sriLankaTimeZone });
        const time = now.toLocaleTimeString('fr-FR', { timeZone: sriLankaTimeZone, hour12: true });
        const timezone = 'UTC+5:30';

        let status = `*🕒 Temps de fonctionnement:* ${runtime(process.uptime())}\n*📅 Date:* ${date}\n*🕰️ Heure:* ${time} (Heure du Sri Lanka)\n*💾 Utilisation de la RAM:*\n- *Utilisée*: ${usedRAM} MB\n- *Libre*: ${freeRAM} MB\n- *Totale*: ${totalRAM} MB\n*🏠 Nom de l'hôte:* Ubuntu VPS\n*💻 OS:* ${os.type()} ${os.release()}\n*🖥️ Fabricant du CPU:* ${cpuInfo.manufacturer}\n*⚙️ Marque du CPU:* ${cpuInfo.brand}\n*🚀 Vitesse du CPU:* ${cpuInfo.speed} GHz\n*🌍 Fuseau horaire du serveur:* ${timezone}\n${sensitiveData.systemosrq}`;

        const imageUrl = 'https://i.imgur.com/L8mk6Fb.jpeg';

        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: status
        }, { quoted: mek || null });
    } catch (e) {
        console.log(e);
        reply(`Erreur : ${e}`);
    }
});
