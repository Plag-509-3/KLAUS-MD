const fs = require('fs');
const path = require('path');
const { readEnv } = require('../lib/database');
const { cmd } = require('../command');

// Commande pour répondre automatiquement avec des fichiers audio
cmd({ on: "body" }, async (conn, mek, m, { from, body, isOwner }) => {
  const filePath = path.join(__dirname, '../media/autovoice.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const texte in data) {
    if (body.toLowerCase() === texte.toLowerCase()) {
      const config = await readEnv();
      if (config.AUTO_VOICE === 'true') {
        if (isOwner) return; // Pas de réponse automatique pour le propriétaire
        await conn.sendPresenceUpdate('recording', from);
        await conn.sendMessage(from, { audio: { url: data[texte] }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });
      }
    }
  }
});

// Commande pour répondre automatiquement avec des images
cmd({ on: "body" }, async (conn, mek, m, { from, body, isOwner }) => {
  const filePath = path.join(__dirname, '../media/autoimage.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const texte in data) {
    if (body.toLowerCase() === texte.toLowerCase()) {
      const config = await readEnv();
      if (config.AUTO_IMAGE === 'true') {
        if (isOwner) return; // Pas de réponse automatique pour le propriétaire
        await conn.sendMessage(from, { image: { url: data[texte] }, mimetype: 'image/jpeg' }, { quoted: mek });
      }
    }
  }
});

// Commande pour répondre automatiquement avec des vidéos
cmd({ on: "body" }, async (conn, mek, m, { from, body, isOwner }) => {
  const filePath = path.join(__dirname, '../media/autovideo.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const texte in data) {
    if (body.toLowerCase() === texte.toLowerCase()) {
      const config = await readEnv();
      if (config.AUTO_VIDEO === 'true') {
        if (isOwner) return; // Pas de réponse automatique pour le propriétaire
        await conn.sendMessage(from, { video: { url: data[texte] }, mimetype: 'video/mp4' }, { quoted: mek });
      }
    }
  }
});

// Commande pour répondre automatiquement avec des stickers
cmd({ on: "body" }, async (conn, mek, m, { from, body, isOwner }) => {
  const filePath = path.join(__dirname, '../media/autosticker.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const texte in data) {
    if (body.toLowerCase() === texte.toLowerCase()) {
      const config = await readEnv();
      if (config.AUTO_STICKER === 'true') {
        if (isOwner) return; // Pas de réponse automatique pour le propriétaire
        await conn.sendMessage(from, { sticker: { url: data[texte] }, package: 'DilaMD' }, { quoted: mek });
      }
    }
  }
});

// Commande pour répondre automatiquement avec un texte
cmd({ on: "body" }, async (conn, mek, m, { from, body, isOwner }) => {
  const filePath = path.join(__dirname, '../media/autoreply.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const texte in data) {
    if (body.toLowerCase() === texte.toLowerCase()) {
      const config = await readEnv();
      if (config.AUTO_REPLY === 'true') {
        if (isOwner) return; // Pas de réponse automatique pour le propriétaire
        await m.reply(data[texte]);
      }
    }
  }
});
