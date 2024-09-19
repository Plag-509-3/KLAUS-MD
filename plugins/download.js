const { fetchJson } = require('../lib/functions');
const config = require('../config');
const { cmd } = require('../command');
const sensitiveData = require('../dila_md_licence/a/b/c/d/dddamsbs');

let baseUrl;

// Fonction auto-exécutante pour récupérer l'URL de base
(async () => {
  try {
    let baseUrlGet = await fetchJson(sensitiveData.baseUrlPath);
    baseUrl = baseUrlGet.api;
  } catch (error) {
    console.error('Échec de la récupération de l\'URL de base :', error);
  }
})();

const yourName = sensitiveData.nameSignature;

// Commande pour télécharger des vidéos Facebook
cmd({ pattern: "fb", alias: ["facebook"], desc: "Télécharger des vidéos FB", category: "download", filename: __filename }, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) return reply(sensitiveData.linkRequestMessage);

    let data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`);
    reply("*Téléchargement en cours... 📥*");

    if (data.data.hd) {
      await conn.sendMessage(from, {
        video: { url: data.data.hd },
        mimetype: "video/mp4",
        caption: `📺 VIDÉO FB HD 🚀✨🎥\n\n ${yourName}`
      }, { quoted: mek });
    }

    if (data.data.sd) {
      await conn.sendMessage(from, {
        video: { url: data.data.sd },
        mimetype: "video/mp4",
        caption: `📱 VIDÉO FB SD 🎬⚡📥\n\n ${yourName}`
      }, { quoted: mek });
    }
  } catch (e) {
    console.error(e);
    reply(`Erreur : ${e.message}`);
  }
});

// Commande pour télécharger des vidéos TikTok
cmd({ pattern: "tiktok", alias: ["tt"], desc: "Télécharger des vidéos TikTok", category: "download", filename: __filename }, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) return reply(sensitiveData.linkRequestMessage);

    let data = await fetchJson(`${baseUrl}/api/tiktokdl?url=${q}`);
    reply("*Téléchargement en cours... 📥*");

    if (data.data.no_wm) {
      await conn.sendMessage(from, {
        video: { url: data.data.no_wm },
        mimetype: "video/mp4",
        caption: `🚀 TIKTOK SANS FILIGRANE 𝙎-𝙏𝞢𝞜 🎵✨📥\n\n ${yourName}`
      }, { quoted: mek });
    }

    if (data.data.wm) {
      await conn.sendMessage(from, {
        video: { url: data.data.wm },
        mimetype: "video/mp4",
        caption: `${sensitiveData.watermarkMessage}\n\n ${yourName}`
      }, { quoted: mek });
    }

    if (data.data.audio) {
      await conn.sendMessage(from, {
        audio: { url: data.data.audio },
        mimetype: "audio/mpeg"
      }, { quoted: mek });
    }
  } catch (e) {
    console.error(e);
    reply(`Erreur : ${e.message}`);
  }
});
