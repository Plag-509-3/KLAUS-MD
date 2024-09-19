const { cmd } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');
const sensitiveData = require('../dila_md_licence/a/b/c/d/dddamsbs');

const formatViews = views => 
  views >= 1_000_000_000 ? `${(views / 1_000_000_000).toFixed(1)}B` : 
  views >= 1_000_000 ? `${(views / 1_000_000).toFixed(1)}M` : 
  views >= 1_000 ? `${(views / 1_000).toFixed(1)}K` : 
  views.toString();

cmd({
  pattern: "song",
  desc: "Télécharger des chansons",
  category: "téléchargement",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) {
      await conn.sendPresenceUpdate('recording', from);
      await conn.sendMessage(from, {
        audio: { url: 'https://i.imgur.com/eo1P0gN.mp4' },
        mimetype: 'audio/mpeg',
        ptt: true
      }, { quoted: mek });
      return;
    }
    const search = await yts(q);
    const data = search.videos[0];
    const url = data.url;
    let desc = `> ${sensitiveData.hhhhhhczss}\n\n🎶 *𝗧𝗶𝘁𝗹𝗲*: _${data.title}_\n👤 *𝗖𝗵𝗮𝗻𝗻𝗲𝗹*: _${data.author.name}_\n📝 *𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻*: _${data.description}_\n⏳ *𝗧𝗶𝗺𝗲*: _${data.timestamp}_\n⏱️ *𝗔𝗴𝗼*: _${data.ago}_\n👁️‍🗨️ *𝗩𝗶𝗲𝘄𝘀*: _${formatViews(data.views)}_\n🔗 *𝗟𝗶𝗻𝗸*: ${url}\n\n${sensitiveData.siteUrl}\n${sensitiveData.footerText}`;
    
    await conn.sendPresenceUpdate('typing', from);
    await conn.sendMessage(from, {
      image: { url: data.thumbnail },
      caption: desc
    }, { quoted: mek });

    let down = await fg.yta(url);
    let downloadUrl = down.dl_url;
    await conn.sendPresenceUpdate('recording', from);
    await conn.sendMessage(from, {
      audio: { url: downloadUrl },
      mimetype: "audio/mpeg"
    }, { quoted: mek });
    await conn.sendMessage(from, {
      document: { url: downloadUrl },
      mimetype: "audio/mpeg",
      fileName: `${data.title}.mp3`,
      caption: "💻 *ᴍᴀᴅᴇ ʙʏ 𝙎-𝙏𝞢𝞜*"
    }, { quoted: mek });
  } catch (e) {
    console.log(e);
    reply(`Erreur : ${e.message}`);
  }
});

cmd({
  pattern: "video",
  desc: "Télécharger des vidéos",
  category: "téléchargement",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) {
      await conn.sendPresenceUpdate('recording', from);
      await conn.sendMessage(from, {
        audio: { url: 'https://i.imgur.com/eo1P0gN.mp4  ' },
        mimetype: 'audio/mpeg',
        ptt: true
      }, { quoted: mek });
      return;
    }
    const search = await yts(q);
    const data = search.videos[0];
    const url = data.url;
    let desc = `${sensitiveData.ffdssajjj}\n\n🎶 *𝗧𝗶𝘁𝗹𝗲*: _${data.title}_\n👤 *𝗖𝗵𝗮𝗻𝗻𝗲𝗹*: _${data.author.name}_\n📝 *𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻*: _${data.description}_\n⏳ *𝗧𝗶𝗺𝗲*: _${data.timestamp}_\n⏱️ *𝗔𝗴𝗼*: _${data.ago}_\n👁️‍🗨️ *𝗩𝗶𝗲𝘄𝘀*: _${formatViews(data.views)}_\n🔗 *𝗟𝗶𝗻𝗸*: ${url}\n\n${sensitiveData.siteUrl}\n${sensitiveData.footerText}`;
    
    await conn.sendPresenceUpdate('typing', from);
    await conn.sendMessage(from, {
      image: { url: data.thumbnail },
      caption: desc
    }, { quoted: mek });

    let down = await fg.ytv(url);
    let downloadUrl = down.dl_url;
    await conn.sendMessage(from, {
      video: { url: downloadUrl },
      mimetype: "video/mp4"
    }, { quoted: mek });
    await conn.sendMessage(from, {
      document: { url: downloadUrl },
      mimetype: "video/mp4",
      fileName: `${data.title}.mp4`,
      caption: "💻 *ᴍᴀᴅᴇ ʙʏ  𝙎-𝙏𝞢𝞜*"
    }, { quoted: mek });
  } catch (e) {
    console.log(e);
    reply(`Erreur : ${e.message}`);
  }
});