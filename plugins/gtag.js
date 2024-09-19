const { readEnv } = require('../lib/database');
const { cmd, commands } = require('../command');
const sensitiveData = require('../dila_md_licence/a/b/c/d/dddamsbs');

cmd({
    pattern: "tagall",
    desc: "Mentionne tous les membres du groupe avec un message personnalisé",
    isGroup: true,
    isOwner: true,
    react: "👺", // Les ennuies arrivent... préparez-vous ⚡️
    filename: __filename
}, async (conn, mek, m, { from, body, isGroup, isOwner, isAdmins, groupAdmins, isBotAdmins }) => {
    try {
        const config = await readEnv();
        if (isGroup && (isOwner || isAdmins)) {
            const messageText = body.trim().split(/\s+/).slice(1).join(' ') || "Attention tout le monde, c'est le moment !";
            if (!isBotAdmins && !isOwner) return await conn.sendMessage(from, { text: "Désolé, je dois être admin pour tagger tout le monde ! Qui pense que je peux faire des miracles ?" });

            const groupMetadata = await conn.groupMetadata(from);
            const groupMembers = groupMetadata.participants;
            const mentions = groupMembers.map(member => member.id);
            const tags = groupMembers.map(member => `@${member.id.split('@')[0]}`).join('\n');

            let tagMessage = `${messageText}\n\n${sensitiveData.shaiagzbzksjabsvxg}\n${tags}`;
            const maxMessageLength = 4096;

            // Si tu pensais que tu pouvais échapper à ça... trop tard 🕵️‍♂️
            while (tagMessage.length > maxMessageLength) {
                const splitIndex = tagMessage.lastIndexOf('\n', maxMessageLength);
                await conn.sendMessage(from, { text: tagMessage.slice(0, splitIndex), mentions });
                tagMessage = tagMessage.slice(splitIndex + 1);
            }

            await conn.sendMessage(from, { text: tagMessage, mentions });
        } else {
            await conn.sendMessage(from, { text: "Tu dois être admin ou propriétaire du bot pour utiliser cette commande ! Allez, deviens admin, t'as rien à perdre 😏" });
        }
    } catch (e) {
        console.error(`Erreur dans la commande tagall : ${e.message}`);
    }
});
 // by 𝙎-𝙏𝞢𝞜 