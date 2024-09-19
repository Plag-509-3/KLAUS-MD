const fs = require('fs');
const path = require('path');
const { readEnv } = require('../lib/database');
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');
const sensitiveData = require('../dila_md_licence/a/b/c/d/dddamsbs');

// Commande pour afficher des informations détaillées sur le groupe
cmd({
  pattern: "group",
  desc: "Affiche des informations détaillées sur le groupe",
  isGroup: true,
  isOwner: false,
  react: "🤔",
  filename: __filename
}, async (conn, mek, m, { from, body, isGroup }) => {
  try {
    if (isGroup) {
      const args = body.trim().split(/\s+/).slice(1);
      const option = args[0] ? args[0].toLowerCase() : 'all';

      const groupMetadata = await conn.groupMetadata(from);
      const groupName = groupMetadata.subject;

      let groupDp;
      try {
        groupDp = await conn.profilePictureUrl(from, 'image');
      } catch (e) {
        console.error(`Erreur lors de la récupération de la photo de profil du groupe : ${e.message}`);
        groupDp = "https://via.placeholder.com/150";
      }

      let groupLink = "Aucun lien disponible";
      try {
        const groupInvite = await fetchJson(`https://api.example.com/get-group-link?groupId=${from}`);
        groupLink = groupInvite.link || "Aucun lien disponible";
      } catch (e) {
        console.error(`Erreur lors de la récupération du lien du groupe : ${e.message}`);
      }

      const groupId = from;
      const members = groupMetadata.participants;
      const memberCount = members.length;
      const adminCount = members.filter(member => member.isAdmin).length;
      const creator = groupMetadata.owner ? groupMetadata.owner.split('@')[0] : "Inconnu";
      const creationDate = new Date(groupMetadata.creation * 1000).toLocaleDateString();
      const creationTime = new Date(groupMetadata.creation * 1000).toLocaleTimeString();
      const groupDescription = groupMetadata.desc || "Aucune description";

      let infoMessage = "";
      switch (option) {
        case 'name':
          infoMessage = `📛 *𝗡𝗔𝗠𝗘*: ${groupName}`;
          break;
        case 'link':
          infoMessage = `🔗 *𝗟𝗜𝗡𝗞*: ${groupLink}`;
          break;
        case 'id':
          infoMessage = `🆔 *𝗜𝗗*: ${groupId}`;
          break;
        case 'members':
          infoMessage = `👥 *𝗠𝗘𝗠𝗕𝗘𝗥𝗦 𝗖𝗢𝗨𝗡𝗧*: ${memberCount}`;
          break;
        case 'admins':
          infoMessage = `🛡️ *𝗔𝗗𝗠𝗜𝗡 𝗖𝗢𝗨𝗡𝗧*: ${adminCount}`;
          break;
        case 'creator':
          infoMessage = `👑 *𝗖𝗥𝗘𝗔𝗧𝗢𝗥*: ${creator}`;
          break;
        case 'date':
          infoMessage = `📅 *𝗖𝗥𝗘𝗔𝗧𝗘𝗗 𝗗𝗔𝗧𝗘*: ${creationDate}`;
          break;
        case 'time':
          infoMessage = `⏰ *𝗖𝗥𝗘𝗔𝗧𝗘𝗗 𝗧𝗜𝗠𝗘*: ${creationTime}`;
          break;
        case 'description':
          infoMessage = `📝 *𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡*: ${groupDescription}`;
          break;
        case 'all':
        default:
          infoMessage = `📛 *𝗡𝗔𝗠𝗘*: ${groupName}\n🔗 *𝗟𝗜𝗡𝗞*: ${groupLink}\n🆔 *𝗜𝗗*: ${groupId}\n👥 *𝗠𝗘𝗠𝗕𝗘𝗥𝗦 𝗖𝗢𝗨𝗡𝗧*: ${memberCount}\n🛡️ *𝗔𝗗𝗠𝗜𝗡 𝗖𝗢𝗨𝗡𝗧*: ${adminCount}\n👑 *𝗖𝗥𝗘𝗔𝗧𝗢𝗥*: ${creator}\n📅 *𝗖𝗥𝗘𝗔𝗧𝗘𝗗 𝗗𝗔𝗧𝗘*: ${creationDate}\n⏰ *𝗖𝗥𝗘𝗔𝗧𝗘𝗗 𝗧𝗜𝗠𝗘*: ${creationTime}\n📝 *𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡*: ${groupDescription}\n\n${sensitiveData.signature}`;
      }

      await conn.sendMessage(from, {
        caption: infoMessage,
        image: { url: groupDp },
        mentions: members.map(member => member.id)
      });
    } else {
      await conn.sendMessage(from, { text: "Cette commande ne peut être utilisée que dans les groupes." });
    }
  } catch (e) {
    console.error(`Erreur dans la commande groupe : ${e.message}`);
  }
});
