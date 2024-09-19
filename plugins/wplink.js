const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
  pattern: "ST",
  alias: ["owner", "developer", "bot"],
  desc: "Vérifie si le bot est en ligne.",
  category: "principal",
  filename: __filename
}, async (conn, mek, m, {
  from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    const status = `*Nom*: 𝙎-𝙏𝞢𝞜\ n*De*: Matara\n*Numéro*: 50931461936\n*Web*: https://whatsapp.com/channel/0029Vakp0UnICVfe3I2Fe72w`;
    const imageUrl = 'https://i.imgur.com/qlF3Uh6.jpeg';
    const audioUrl = 'https://drive.google.com/uc?export=download&id=1YYPnkKWdrxFe8C2kWdwf8qkeE0PO5RjW';
    const quotedMessage = mek ? mek : null;
    
    await conn.sendMessage(from, {
      image: { url: imageUrl },
      caption: status
    }, { quoted: quotedMessage });
    
    await conn.sendPresenceUpdate('recording', from);
    
    await conn.sendMessage(from, {
      audio: { url: audioUrl },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: quotedMessage });
    
  } catch (e) {
    console.error('Erreur lors de l\'envoi du message:', e);
    reply(`Une erreur est survenue : ${e.message}`);
  }
});
