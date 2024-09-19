const { updateEnv, readEnv } = require('../lib/database');
const EnvVar = require('../lib/mongodbenv');
const { cmd } = require('../command');
const sensitiveData = require('../dila_md_licence/a/b/c/d/dddamsbs');

async function handleUpdate(reply, key, newValue, validation, errorMsg) {
    if (validation && !validation(newValue)) {
        return reply(errorMsg);
    }
    try {
        await updateEnv(key, newValue);
        reply(`*Réussi comme par magie...✨*\n${newValue}`);
    } catch (err) {
        console.error(`Erreur lors de la mise à jour de ${key}: ` + err.message);
        reply(`🙇‍♂️ *Échec de la mise à jour de ${key}. Réessayons avec plus de magie...*`);
    }
}

cmd({
    pattern: "settings",
    alias: ["setting"],
    react: "🗝️",
    desc: "Vérifiez si le bot est en ligne ou pas.",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        return await conn.sendMessage(from, {
            image: { url: 'https://i.imgur.com/x0SIThm.jpeg' },
            caption: `*𝗘𝗦𝗧𝗘𝗦-𝗩𝗢𝗨𝗦 𝗟𝗔𝗪𝗢𝗥𝗗 ?*\n\n*𝗠𝗢𝗜𝗡𝗘𝗨𝗥 𝗡𝗢𝗠:* ${sender.pushname}\n*𝗠𝗢𝗜𝗡𝗘𝗨𝗥 𝗡𝗨𝗠𝗘𝗥𝗢:* ${sender.number}\n*𝗠𝗢𝗜𝗡𝗘𝗨𝗥 𝗙𝗥𝗢𝗠:* ${sender.from}\n*𝗠𝗢𝗜𝗡𝗘𝗨𝗥 𝗔𝗚𝗘:* ${sender.age}\n*𝗠𝗢𝗜𝗡𝗘𝗨𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗:* ${command}\n*𝗜𝗠𝗔𝗚𝗘 𝗩𝗜𝗩𝗔𝗡𝗧𝗘:* ${sender.aliveimg}\n*𝗠𝗘𝗦𝗦𝗔𝗚𝗘 𝗩𝗜𝗩𝗔𝗡𝗧:* ${sender.alivemsg}\n*𝗣𝗥𝗘𝗳𝗜𝗫𝗘:* ${sender.prefix}\n\n*𝗠𝗔𝗜𝗦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗘𝗭* avec `.settings *&%$#` pour tout modifier... ou pas... 😅`,
            quoted: mek
        });
    } catch (err) {
        console.error(`Erreur lors de l'envoi du message des paramètres: ` + err.message);
        reply(`😢 *Erreur lors de la récupération des paramètres... Essayez encore une fois...*`);
    }
});

cmd({
    pattern: "owner",
    desc: "Définissez le nom du propriétaire du bot.",
    usage: ".owner <nom>",
    react: "👑",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    const newValue = q;
    if (!newValue) {
        return reply("Veuillez fournir le nom du propriétaire du bot.\n\nExemple : `.owner Jean-Claude`");
    }
    const key = 'OWNERNAME';
    handleUpdate(reply, key, newValue, null, "Le nom du propriétaire doit être valide.");
});

cmd({
    pattern: "ownernumber",
    desc: "Définissez le numéro de téléphone du propriétaire du bot.",
    usage: ".ownernumber <numéro>",
    react: "📞",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    const newValue = q;
    if (!newValue) {
        return reply("Veuillez fournir le numéro de téléphone du propriétaire du bot.\n\nExemple : `.ownernumber 5093146xxxxxx`");
    }
    const key = 'OWNERNUMBER';
    handleUpdate(reply, key, newValue, null, "Le numéro de téléphone du propriétaire doit être valide.");
});

cmd({
    pattern: "ownerfrom",
    desc: "Définissez la localisation du propriétaire du bot.",
    usage: ".ownerfrom <localisation>",
    react: "🌆",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    const newValue = q;
    if (!newValue) {
        return reply("Veuillez fournir la localisation du propriétaire du bot.\n\nExemple : `.ownerfrom Matara`");
    }
    const key = 'OWNERFROM';
    handleUpdate(reply, key, newValue, null, "La localisation du propriétaire doit être valide.");
});

cmd({
    pattern: "ownerage",
    desc: "Définissez l'âge du propriétaire du bot.",
    usage: ".ownerage <âge>",
    react: "🎂",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    const newValue = q;
    if (!newValue) {
        return reply("Veuillez fournir l'âge du propriétaire du bot.\n\nExemple : `.ownerage 20`");
    }
    const key = 'OWNERAGE';
    handleUpdate(reply, key, newValue, (value) => !isNaN(value), "L'âge du propriétaire doit être un nombre valide.");
});

cmd({
    pattern: "ownercommand",
    desc: "Définissez le nom de la commande pour le propriétaire du bot.",
    usage: ".ownercommand <commande>",
    react: "🔧",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    const newValue = q;
    if (!newValue) {
        return reply("Veuillez fournir le nom de la commande du propriétaire du bot.\n\nExemple : `.ownercommand Dilo`");
    }
    const key = 'OWNERCOMMAND';
    handleUpdate(reply, key, newValue, null, "La commande du propriétaire doit être valide.");
});

cmd({
    pattern: "aliveimg",
    desc: "Définissez l'image vivante du bot.",
    usage: ".aliveimg <url>",
    react: "🌄",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    const newValue = q;
    if (!newValue) {
        return reply("Veuillez fournir l'URL de l'image vivante du bot.\n\nExemple : `.aliveimg https://example.com/image.jpg`");
    }
    const key = 'ALIVEIMG';
    handleUpdate(reply, key, newValue, (value) => value.startsWith('http'), "L'URL de l'image vivante doit être valide.");
});

cmd({
    pattern: "alivemsg",
    desc: "Définissez le message vivant du bot.",
    usage: ".alivemsg <message>",
    react: "💬",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    const newValue = q;
    if (!newValue) {
        return reply("Veuillez fournir le message vivant du bot.\n\nExemple : `.alivemsg Votre message vivant ici`");
    }
    const key = 'ALIVEMSG';
    handleUpdate(reply, key, newValue, null, "Le message vivant du bot doit être valide.");
});

cmd({
    pattern: "prefix",
    desc: "Définissez le préfixe du bot.",
    usage: ".prefix <préfixe>",
    react: "🔑",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    const newValue = q;
    if (!newValue) {
        return reply("Veuillez définir votre préfixe au format correct :\n\nExemple : `.prefix *&%$#`");
    }
    const key = 'PREFIX';
    handleUpdate(reply, key, newValue, null, null);
});
