//#

















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        const { cmd } = require('../command');
const yts = require('yt-search');
const { fetchJson } = require('../lib/functions');
const sensitiveData = require('../dila_md_licence/a/b/c/d/dddamsbs');
const formatViews = views => views >= 1_000_000_000 ? `${(views / 1_000_000_000).toFixed(1)}B` : views >= 1_000_000 ? `${(views / 1_000_000).toFixed(1)}M` : views >= 1_000 ? `${(views / 1_000).toFixed(1)}K` : views.toString();
const thumbnailUrl = 'https://i.imgur.com/x0SIThm.jpeg';

cmd({
  pattern: "yts",
  alias: ["yta", "ytv", "yt"],
  desc: "Rechercher et afficher jusqu'à 100 détails de vidéos YouTube",
  category: "recherche",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("Veuillez taper un nom ou une URL... 🤖");
    
    const search = await yts(q);
    const videos = search.videos.slice(0, 100);

    if (videos.length === 0) return reply("Aucune vidéo trouvée pour votre requête.");

    let message = `*𝙎-𝙏𝞢𝞜 ❝𝐊𝐋𝐀𝐔𝐒-𝐌𝐃❞ 𝗜𝗡𝗙𝗢𝗦* 🎥\n\n`;
    
    videos.forEach((data, index) => {
      message += `*No - ${index + 1} ⤵*\n`;
      message += `🎶 *𝗧𝗶𝘁𝗹𝗲*: _${data.title}_\n`;
      message += `👤 *𝗖𝗵𝗮𝗻𝗻𝗲𝗹*: _${data.author.name}_\n`;
      message += `📝 *𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻*: _${data.description}_\n`;
      message += `⏳ *𝗧𝗶𝗺𝗲*: _${data.timestamp}_\n`;
      message += `⏱️ *𝗔𝗴𝗼*: _${data.ago}_\n`;
      message += `👁️‍🗨️ *𝗩𝗶𝗲𝘄𝘀*: _${formatViews(data.views)}_\n`;
      message += `🔗 *𝗟𝗶𝗻𝗸*: ${data.url}\n\n`;
    });

    message += `*𝗛𝗼𝘄 𝗧𝗼 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗩𝗶𝗱𝗲𝗼 𝗢𝗿 𝗔𝘂𝗱𝗶𝗼 ✅*\n\n`;
    message += `Exemple -  .video (entrez le titre de la vidéo)\n`;
    message += `Exemple - .song (entrez le titre de la chanson)\n\n`;
    message += `${sensitiveData.jfdjnda}`;

    await conn.sendMessage(from, { image: { url: thumbnailUrl }, caption: message }, { quoted: mek });

    await conn.sendPresenceUpdate('recording', from);
    await conn.sendMessage(from, { audio: { url: 'https://github.com/themiyadilann/DilaMD-Media/raw/main/voice/song.mp3' }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });
    await conn.sendMessage(from, { audio: { url: 'https://github.com/themiyadilann/DilaMD-Media/raw/main/voice/video.mp3' }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });

  } catch (e) {
    console.log(e);
    reply(`Erreur: ${e.message}`);
  }
});

module.exports = {
  aiChatHeader: " 𝙎-𝙏𝞢𝞜 𝗔𝗜 𝗖𝗵𝗮𝘁 🧠",
  footerText: "𝐃𝐑𝐊_𝐒𝐓_𝐓𝐞𝐜𝐡",
  siteUrl: "https://drk-tech-1.onrender.com/",
  imageUrl: "https://i.imgur.com/EFDwdHt.jpeg",
  apiUrl: query => `https://chatgptforprabath-md.vercel.app/api/gptv1?q=${encodeURIComponent(query)}`,
  baseUrlPath: 'https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json',
  nameSignature: "dilalk.vercel.app\n by ❝𝐊𝐋𝐀𝐔𝐒-𝐌𝐃❞",
  watermarkMessage: "🚀 With-WATERMARK  𝙎-𝙏𝞢𝞜 TIKTOK DOWNLOADER 🎵✨",
  linkRequestMessage: "Veuillez me donner votre lien 🚫*\nExemple: .gdrive (lien gdrive)",
  signature: "ᴍᴀᴅᴇ ʙʏ ᴍʳ  𝙎-𝙏𝞢𝞜",
  shaiagzbzksjabsvxg: "❝𝐊𝐋𝐀𝐔𝐒-𝐌𝐃❞ 𝗨𝗦𝗘𝗥 𝗕𝗢𝗧",
  apimenibah: "**✸ 𝙎-𝙏𝞢𝞜 ✸*
*𝚃𝚛𝚝𝚑𝚒𝚜 ⤵*

🔮 *Support Us ⤵*
- *YOUTUBE* 🥹https://www.youtube.com/@DRK-TECH

👤 *Owner:*  𝙎-𝙏𝞢𝞜

---

🔧 *OWNER MENU ⤵*
- `.getsession` 📜
- `.deletesession` ❌
- `.join` ➕
- `.shutdown` ⏻
- `.restart` 🔄
- `.autoreadmsg` 📥
- `.autoreadcmd` 📜
- `.autotyping` ⌨️
- `.autorecording` 🎙️
- `.autobio` 📝
- `.autostatusview` 👀
- `.autostatussave` 💾
- `.mode` ⚙️
- `.block` 🚫
- `.unblock` ✅
- `.ban` 🚷
- `.unban` 🔓
- `.backup` 🔄
- `.addowner` ➕
- `.delowner` ➖
- `.ping` 📶
- `.system` 💾

---

👥 *GROUP MENU ⤵*
- `.closetime` 🕒
- `.opentime` 🕒
- `.kick` 🚪
- `.add` ➕
- `.promote` ⬆️
- `.demote` ⬇️
- `.setdesc` 📝
- `.setppgc` 📸
- `.tagall` 🔖
- `.hidetag` 👻
- `.totag` 🔖
- `.admintag` 🛠️
- `.group` 🧑‍🤝‍🧑
- `.grouplink` 🔗
- `.antilink` 🚫🔗
- `.antibot` 🤖🚫
- `.antiword` 🚫📝
- `.antispam` 🚫📩
- `.antidelete` 🔒🗑️
- `.antiviewone` 👁️🚫

---

📞 *CONTACT MENU ⤵*
- `.stickers` 🖼️
- `.smeme` 😂
- `.take` 📸
- `.toimage` 🖼️
- `.tovideo` 🎥
- `.toaudio` 🎵
- `.tomp3` 🎶
- `.imgtolink` 🔗🖼️

---

📥 *DOWNLOAD MENU ⤵*
- `.play` ▶️
- `.song` 🎵
- `.video` 🎬
- `.fb` 📱
- `.tiktok` 🎵
- `.insta` 📸
- `.modeapk` 📦
- `.googledrive` ☁️

---

🧠 *AI MENU ⤵*
- `.ai` 🤖
- `.gemini` ♊
- `.gpt3` 🧠

---
𝐌𝐚𝐝𝐞 𝐛𝐲 𝙎-𝙏𝞢𝞜🌈™
  audiomp: query => "https://i.imgur.com/eo1P0gN.mp4"
};
