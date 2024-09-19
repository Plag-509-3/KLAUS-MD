const config = require('../config');
const { cmd, commands } = require('../command');
const wiki = require('wikipedia');
const sensitiveData = require('../dila_md_licence/a/b/c/d/dddamsbs');

cmd({
  pattern: "wiki",
  desc: "Cherche des informations sur Wikipedia",
  category: "principal",
  filename: __filename
}, async (conn, mek, m, {
  from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    if (!q) {
      return reply('Merci de fournir une requête de recherche.');
    }
    
    const summary = await wiki.summary(q);
    
    let replyText = `*📚 Résumé Wikipedia 📚*\n\n🔍 *Requête*: _${q}_\n\n💬 *Titre*: _${summary.title}_\n\n📝 *Résumé*: _${summary.extract}_\n\n🔗 *URL*: ${summary.content_urls.desktop.page}\n\n${sensitiveData.siteUrl}\n${sensitiveData.footerText}`;
    
    await conn.sendMessage(from, {
      image: { url: summary.originalimage.source },
      caption: replyText
    }, { quoted: mek });
    
  } catch (e) {
    console.log(e);
    reply(`Erreur: ${e.message}`);
  }
});
