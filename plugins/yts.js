const { cmd } = require('../command');
const yts = require('yt-search');
const { fetchJson } = require('../lib/functions');
const sensitiveData = require('../dila_md_licence/a/b/c/d/dddamsbs');

const formatViews = views => 
  views >= 1_000_000_000 ? `${(views / 1_000_000_000).toFixed(1)}B` : 
  views >= 1_000_000 ? `${(views / 1_000_000).toFixed(1)}M` : 
  views >= 1_000 ? `${(views / 1_000).toFixed(1)}K` : 
  views.toString();

const thumbnailUrl = 'https://i.imgur.com/ERGVvpZ.png';

cmd({
  pattern: "yts",
  alias: ["yta", "ytv", "yt"],
  desc: "Cherche et affiche jusqu'à 100 détails de vidéos YouTube",
  category: "recherche",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("Veuillez entrer un nom ou une URL... 🤖");

    const search = await yts(q);
    const videos = search.videos.slice(0, 100);

    if (videos.length === 0) return reply("Aucune vidéo trouvée pour votre requête.");

    let message = `*${sensitiveData.ffffffssa} 𝗬𝗼𝘂𝘁𝘂𝗯𝗲 𝗦𝗲𝗮𝗿𝗰𝗵 𝗥𝗲𝘀𝘂𝗹𝘁 🎥*\n\n`;

    videos.forEach((data, index) => {
      message += `*N° ${index + 1} ⤵*\n`;
      message += `🎶 *𝗧𝗶𝘁𝗹𝗲*: _${data.title}_\n`;
      message += `👤 *𝗖𝗵𝗮𝗻𝗻𝗲𝗹*: _${data.author.name}_\n`;
      message += `📝 *𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻*: _${data.description}_\n`;
      message += `⏳ *𝗧𝗶𝗺𝗲*: _${data.timestamp}_\n`;
      message += `⏱️ *𝗔𝗴𝗼*: _${data.ago}_\n`;
      message += `👁️‍🗨️ *𝗩𝗶𝗲𝘄𝘀*: _${formatViews(data.views)}_\n`;
      message += `🔗 *𝗟𝗶𝗻𝗸*: ${data.url}\n\n`;
    });

    message += `*𝗖𝗼𝗺𝗺𝗲𝗻𝘁 𝗳𝗮𝗶𝗿𝗲 𝗹𝗲 𝗱𝗲𝘁𝗼𝘂𝗿 𝗱'𝘂𝗻𝗲 𝗩𝗜𝗗𝗘𝗢 𝗢𝗨 𝗔𝗨𝗗𝗜𝗢 ✅*\n\n`;
    message += `Exemple - .video (entrez le titre de la vidéo)\n`;
    message += `Exemple - .song (entrez le titre de la chanson)\n\n`;
    message += `${sensitiveData.jfdjnda}`;

    await conn.sendMessage(from, { image: { url: thumbnailUrl }, caption: message }, { quoted: mek });
    await conn.sendPresenceUpdate('recording', from);
    await conn.sendMessage(from, {
      audio: { url: 'https://github.com/themiyadilann/DilaMD-Media/raw/main/voice/song.mp3' },
      mimetype: 'audio/mpeg',
      ptt: true
    }, { quoted: mek });
    await conn.sendMessage(from, {
      audio: { url: 'https://github.com/themiyadilann/DilaMD-Media/raw/main/voice/video.mp3' },
      mimetype: 'audio/mpeg',
      ptt: true
    }, { quoted: mek });
  } catch (e) {
    console.log(e);
    reply(`Erreur : ${e.message}`);
  }
});
