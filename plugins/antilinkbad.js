const fs = require('fs');
const path = require('path');
const { readEnv } = require('../lib/database');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
let avertissementsUtilisateurs = {};

cmd({ on: "body" }, async (conn, mek, m, { from, body, isCmd, isGroup, isOwner, isAdmins, groupAdmins, isBotAdmins, sender, pushname, groupName, quoted }) => {
  try {
    const config = await readEnv();
    const proprioBot = config.OWNER_NUMBER; // Le patron du bot
    const maxAvertissements = config.WARN_COUNT || 10; // Si c'est pas défini, on met à 10 pour rigoler
    if (!avertissementsUtilisateurs[sender]) {
      avertissementsUtilisateurs[sender] = 0; // Nouveau dans la classe? On t'observe déjà.
    }

    const envoyerAlerteAuProprio = async (typeDeclencheur, nomDuGroupe, sender, message, action) => {
      const messageAlerte = `🚨 ${typeDeclencheur} déclenché dans ${nomDuGroupe}\nEnvoyeur: @${sender.split('@')[0]}\nMessage: ${message}\nAction: ${action}`;
      await conn.sendMessage(proprioBot, { text: messageAlerte, mentions: [sender] });
    };

    const gererAvertissements = async (type, maxAvertissements) => {
      avertissementsUtilisateurs[sender] += 1;
      let action = 'avertir'; // C'est un avertissement, mais qui va mal finir.
      if (avertissementsUtilisateurs[sender] >= maxAvertissements) {
        await conn.sendMessage(from, { text: `𝗕𝗬𝗘 ~*@${sender.split('@')[0]}*~`, mentions: [sender] });
        await conn.groupParticipantsUpdate(from, [sender], 'remove'); // Adieu l'ami, tu as abusé.
        action = 'expulser';
        avertissementsUtilisateurs[sender] = 0;
        const messageExpulsion = `𝗛𝗲𝘆 @${sender.split('@')[0]},\n𝗧𝘂 𝗲𝘀 𝗘𝗫𝗣𝗨𝗟𝗦𝗘 du groupe *${groupName}*.\n𝗥𝗮𝗶𝘀𝗼𝗻: ${body}`;
        await conn.sendMessage(sender, { text: messageExpulsion, mentions: [sender] });
      } else {
        const avertissementsRestants = maxAvertissements - avertissementsUtilisateurs[sender];
        const messageAvertissement = `👺 ~*@${sender.split('@')[0]}*~\n*⚠️ ${type.toUpperCase()} SUPPRIMÉ : ‼️*\n🚫 *𝗖𝗢𝗠𝗣𝗧𝗘 𝗗'𝗔𝗩𝗘𝗥𝗧𝗜𝗦𝗦𝗘𝗠𝗘𝗡𝗧𝗦 : ${avertissementsRestants}/${maxAvertissements}*`;
        await conn.sendMessage(from, { text: messageAvertissement, mentions: [sender] });
      }
      await envoyerAlerteAuProprio(type.toUpperCase(), groupName, sender, body, action);
    };

    // Gérer les gros mots comme un prof sévère
    if (config.ANTI_BAD === 'delete' || config.ANTI_BAD === 'warn' || config.ANTI_BAD === 'kick') {
      const listeMotsInterdits = ["fuc", "huk", "ponn", "pinn", "paca", "gyet", "kk", "foutre", "puk", "merd", "mrd", "පොන්න"];
      const contientMotInterdit = listeMotsInterdits.some(mot => body.toLowerCase().includes(mot));
      if (contientMotInterdit) {
        if (isGroup) {
          if (isBotAdmins) {
            const senderEstAdmin = groupAdmins.includes(sender);
            if (!senderEstAdmin && !isOwner) {
              const key = { remoteJid: from, fromMe: false, id: mek.key.id, participant: sender };
              await conn.sendMessage(from, { delete: key });
              if (config.ANTI_BAD === 'warn') {
                await gererAvertissements("GROS MOT", maxAvertissements);
              } else if (config.ANTI_BAD === 'kick') {
                await conn.groupParticipantsUpdate(from, [sender], 'remove');
                await envoyerAlerteAuProprio("Gros mot", groupName, sender, body, "expulser");
              }
            }
          }
        }
      }
    }

    // Gérer les liens comme si c'était un crime
    if (config.ANTI_LINK === 'delete' || config.ANTI_LINK === 'warn' || config.ANTI_LINK === 'kick') {
      const listeLiensInterdits = ["wa.me", "chat.whatsapp.com", "whatsapp.com", "youtube.com/@", "www.tiktok.com"];
      const contientLienInterdit = listeLiensInterdits.some(mot => body.toLowerCase().includes(mot));
      if (contientLienInterdit) {
        if (isGroup) {
          if (isBotAdmins) {
            const senderEstAdmin = groupAdmins.includes(sender);
            if (!senderEstAdmin && !isOwner) {
              const key = { remoteJid: from, fromMe: false, id: mek.key.id, participant: sender };
              await conn.sendMessage(from, { delete: key });
              if (config.ANTI_LINK === 'warn') {
                await gererAvertissements("LIEN", maxAvertissements);
              } else if (config.ANTI_LINK === 'kick') {
                await conn.groupParticipantsUpdate(from, [sender], 'remove');
                await envoyerAlerteAuProprio("Lien", groupName, sender, body, "expulser");
              }
            }
          }
        }
      }
    }

  } catch (e) {
    console.error(`Erreur dans la fonctionnalité de suppression automatique: ${e.message}`);
    const proprioBot = config.OWNER_NUMBER;
    await conn.sendMessage(proprioBot, { text: `⚠️ Une erreur est survenue dans la fonctionnalité de suppression automatique: ${e.message}` });
  }
});
