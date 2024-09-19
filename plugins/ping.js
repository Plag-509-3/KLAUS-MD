const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const speedTest = require('speedtest-net');
const { runtime } = require('../lib/functions');

function convertToReadableSize(speed) {
    return speed > 1024 ? (speed / 1024).toFixed(2) + ' GBs' : speed + ' MBs';
}

cmd({
    pattern: "ping",
    desc: "Vérifie le temps de réponse du bot et la vitesse du réseau.",
    category: "main",
    react: "🚀", // On améliore le style avec un emoji avion rapide
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now();
        
        // Le bot réagit avec style 😎
        await conn.sendMessage(from, { text: '*❝𝐊𝐋𝐀𝐔𝐒-𝐌𝐃❞... 📶 Vérification du réseau en cours... Patiente un peu !*' });

        const endTime = Date.now();
        const ping = endTime - startTime;

        // Lancement du test de vitesse réseau 🚀
        const speed = await speedTest({ acceptLicense: true });
        let downloadSpeed = (speed.download.bandwidth / 125000).toFixed(2);
        let uploadSpeed = (speed.upload.bandwidth / 125000).toFixed(2);

        downloadSpeed = convertToReadableSize(downloadSpeed);
        uploadSpeed = convertToReadableSize(uploadSpeed);

        // Affichage du ping avec un style ✈️
        await conn.sendMessage(from, { text: `*Ping:* _${ping}ms_ 🚀` });

        // Envoi progressif des informations de vitesse, pour un effet cool 🕶️
        setTimeout(async () => {
            await conn.sendMessage(from, { text: `*Vitesse de téléchargement 📥:* _${downloadSpeed}_` });
        }, 700);

        setTimeout(async () => {
            await conn.sendMessage(from, { text: `*Vitesse de téléversement 📤:* _${uploadSpeed}_` });
        }, 1400);

    } catch (e) {
        console.log(e);
        // En cas d'erreur, le bot répond de manière humoristique 😂
        await reply(`Erreur lors de la vérification de la vitesse réseau : ${e.message} 🤯. C'est peut-être ta connexion qui a crashé !`);
    }
});
