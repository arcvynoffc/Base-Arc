const { 
default: makeWASocket, 
useMultiFileAuthState, 
DisconnectReason, 
makeInMemoryStore, 
makeCacheableSignalKeyStore,
jidDecode, 
jidEncode,
jidNormalizedUser,
getContentType, 
proto, 
fetchLatestBaileysVersion, 
downloadContentFromMessage, 
generateForwardMessageContent, 
generateWAMessageFromContent, 
generateWAMessage, 
generateMessageID, 
prepareWAMessageMedia, 
areJidsSameUser, 
delay,
extractMessageContent,
Browsers,
isJidGroup,
isJidBroadcast,
isJidStatusBroadcast,
isJidNewsletter,
getAggregateVotesInPollMessage,
getDevice,
WAVersion
} = require('@whiskeysockets/baileys');

const pino = require('pino');
const chalk = require('chalk');
const fs = require('fs');
const os = require('os');
const path = require('path');
const util = require('util');
require("./Arc/settings");

module.exports = async (sock, m, chatUpdate) => {
try {
const { type, quotedMsg, mentioned, now, fromMe } = m;
const body = m.message?.conversation || m.message?.extendedTextMessage?.text || m.message?.imageMessage?.caption || m.message?.videoMessage?.caption || m.message?.documentMessage?.caption || m.message?.buttonsResponseMessage?.selectedButtonId || m.message?.listResponseMessage?.singleSelectReply?.selectedRowId || m.message?.templateButtonReplyMessage?.selectedId || (m.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : '') || m.message?.buttonsMessage?.contentText || m.message?.listMessage?.description || m.message?.listMessage?.title || m.message?.viewOnceMessage?.message?.conversation || m.message?.viewOnceMessage?.message?.extendedTextMessage?.text || m.message?.viewOnceMessage?.message?.imageMessage?.caption || m.message?.viewOnceMessage?.message?.videoMessage?.caption || m.message?.viewOnceMessageV2?.message?.conversation || m.message?.viewOnceMessageV2?.message?.extendedTextMessage?.text || m.message?.viewOnceMessageV2?.message?.imageMessage?.caption || m.message?.viewOnceMessageV2?.message?.videoMessage?.caption || m.message?.viewOnceMessageV2Extension?.message?.conversation || m.message?.viewOnceMessageV2Extension?.message?.extendedTextMessage?.text || m.message?.viewOnceMessageV2Extension?.message?.imageMessage?.caption || m.message?.viewOnceMessageV2Extension?.message?.videoMessage?.caption || m.message?.editedMessage?.message?.conversation || m.message?.editedMessage?.message?.extendedTextMessage?.text || m.message?.editedMessage?.message?.imageMessage?.caption || m.message?.editedMessage?.message?.videoMessage?.caption || '';  
const prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : '';
const isCmd = body.startsWith(prefix);
const command = isCmd ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : '';
const args = body.trim().split(/ +/).slice(1);
const text = args.join(" ");
const q = text;
const pushname = m.pushName || "No Name";
const chat = m.chat || m.key.remoteJid;
const sender = sock.decodeJid ? sock.decodeJid(m.sender || m.key.participant || chat) : (m.sender || m.key.participant || chat);
const senderNum = sender ? sender.replace(/[^0-9]/g, '') : '';
const BotNum = sock.decodeJid ? sock.decodeJid(sock.user.id) : sock.user.id;
const isGroup = chat.endsWith('@g.us');
const groupMetadata = isGroup ? await sock.groupMetadata(chat).catch(() => ({})) : {};
const groupName = groupMetadata.subject || "-";
const Owner = global.owner || [];
const Premium = fs.existsSync('./database/premium.json') ? JSON.parse(fs.readFileSync('./database/premium.json')) : [];
const isOwner = Owner.includes(senderNum) || Owner.some(v => sender.includes(v)) || sender === BotNum || m.key.fromMe;
const isPrem = Premium.includes(senderNum) || isOwner;

async function ArcReply(textMsg) {
    const targetChat = m?.chat || m?.key?.remoteJid || chat;
    if (!targetChat) return;

    const quotedMessage = {
        key: {
            remoteJid: 'status@broadcast',
            fromMe: false,
            id: global.botName,
            participant: '13135550002@s.whatsapp.net'
        },
        message: {
            locationMessage: {
                degreesLatitude: -6.200000,
                degreesLongitude: 106.816666,
                name: global.botName,
                address: global.botName,
                jpegThumbnail: null
            }
        }
    };

    const msg = await generateWAMessage(
        targetChat,
        { text: textMsg },
        {
            userJid: sock.user.id,
            quoted: quotedMessage
        }
    );

    return sock.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    });
}

const czx = {
    key: {
        remoteJid: 'status@broadcast',
        fromMe: false,
        id: global.botName,
        participant: '13135550002@s.whatsapp.net'
    },
    message: {
        locationMessage: {
            degreesLatitude: -6.200000,
            degreesLongitude: 106.816666,
            name: global.botName,
            address: global.botName,
            jpegThumbnail: null
        }
    }
}

function runtime(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / 86400);
    const h = Math.floor(seconds % 86400 / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);

    const time = [];

    if (d) time.push(`${d} Hari`);
    if (h) time.push(`${h} Jam`);
    if (m) time.push(`${m} Menit`);
    if (s || !time.length) time.push(`${s} Detik`);

    return time.join(", ");
} 

if (m.message) {
console.log(chalk.hex("#FF0000").bold(`cr : ⏤ 𝖠𝗋𝖼𝗏𝗒𝗇`));
console.log(chalk.hex("#FFD700").bold(`🎭 SUCCESSFULLY CONNECTED 🎭`));
console.log(chalk.hex("#1E90FF").bold("┌───────────────────────────────┐"));
console.log(chalk.hex("#1E90FF").bold("│      NEW MESSAGE LOG          │"));
console.log(chalk.hex("#1E90FF").bold("├───────────────────────────────┤"));
console.log(chalk.hex("#FF8C00")(`│ 📅 ${chalk.hex("#FFFFFF")("Date       :")} ${chalk.hex("#DA00FF")(new Date().toLocaleString())}`));
console.log(chalk.hex("#00CED1")(`│ 💭 ${chalk.hex("#FFFFFF")("Type       :")} ${chalk.hex("#DA00FF")(isGroup ? "GROUP" : "PRIVATE")}`));
console.log(chalk.hex("#7CFC00")(`│ 👤 ${chalk.hex("#FFFFFF")("Sender     :")} ${chalk.hex("#DA00FF")(pushname || "Unknown")}`));
console.log(chalk.hex("#00FA9A")(`│ 🆔 ${chalk.hex("#FFFFFF")("JID        :")} ${chalk.hex("#DA00FF")(sender)}`));
console.log(chalk.hex("#FF69B4")(`│ 💬 ${chalk.hex("#FFFFFF")("Chat       :")} ${chalk.hex("#DA00FF")(chat)}`));
console.log(chalk.hex("#FFA500")(`│ 📝 ${chalk.hex("#FFFFFF")("Command    :")} ${chalk.hex("#DA00FF")(isCmd ? command : "-")}`));
console.log(chalk.hex("#20B2AA")(`│ 📨 ${chalk.hex("#FFFFFF")("Message    :")} ${chalk.hex("#DA00FF")((body || "[ Media ]").slice(0, 60))}`));
if (isGroup) {
console.log(chalk.hex("#9370DB")(`│ 👥 ${chalk.hex("#FFFFFF")("Group      :")} ${chalk.hex("#DA00FF")(groupName)}`));
}
console.log(chalk.hex("#1E90FF").bold("└───────────────────────────────┘"));
}

function font(text = "") {
    const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const fancy = [..."𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫"];

    return String(text).replace(/[A-Za-z0-9]/g, char => fancy[normal.indexOf(char)]);
}

if (!sock.public && !isOwner) {
return;
}
switch (command) {
//
case "menu": {
    await sock.sendMessage(m.chat, {
        buttonsMessage: {
            locationMessage: {
                degreesLatitude: 0,
                degreesLongitude: 0,
                name: global.botName,
                address: global.ownName,
                jpegThumbnail: "./lib/menu.jpg"
            },
            contentText: font(`こんにちは、 *${pushname}*  さん！
私は ${global.ownName} が開発したボット、${global.botName} です。

╭╮ ➟ Bot Information
││ *Bot Name:* ${global.botName}
││ *Owner Name:* ${global.ownName}
││ *Bot Mode:* ${sock.public ? 'public' : 'self'}
││ *Type:* CJS - Case
││ *Runtime:* ${runtime(process.uptime())}
╰╯`),
            footerText: global.botName,
            buttons: [
                {
                    buttonId: ".owner",
                    buttonText: {
                        displayText: font("cr: - Arcvyn")
                    },
                    type: 1
                }
            ],
            headerType: 6
        }
    }, { quoted: m })
}
break

//
case 'addpremium':
case 'addprem': {
if (!isOwner) return ArcReply('Owner Only')
if (!q) return ArcReply(`Example: ${prefix + command} 628xx`)
let nomor = q.replace(/[^0-9]/g, '')
let cek = await sock.onWhatsApp(nomor + '@s.whatsapp.net')
if (!cek.length) return ArcReply('Number Invalid!')
if (Premium.includes(nomor)) return ArcReply('Number already premium')
Premium.push(nomor)
fs.writeFileSync('./database/premium.json', JSON.stringify(Premium))
ArcReply(`Success add ${nomor} to premium`)
}
break
case 'delpremium':
case 'delprem': {
if (!isOwner) return ArcReply('Owner Only')
if (!q) return ArcReply(`Example: ${prefix + command} 628xx`)
let nomor = q.replace(/[^0-9]/g, '')
if (!Premium.includes(nomor)) return ArcReply('Number not found')
Premium.splice(Premium.indexOf(nomor), 1)
fs.writeFileSync('./database/premium.json', JSON.stringify(Premium))
ArcReply(`Success delete ${nomor} from premium`)

}
break

//
case "public": {
if(!isOwner) return ArcReply(global.msg.owner)
sock.public = true
ArcReply("Berhasil Diubah Ke Public")
}
break

case "self": {
if(!isOwner) return ArcReply(global.msg.owner)
sock.public = false
ArcReply("Berhasil Diubah Ke Self")
}
break

//
case "owner":
case "listowner": {
    let contacts = global.owner.map(v => ({
        displayName: `Owner ${global.botName}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Owner ${global.botName}\nTEL;type=CELL;type=VOICE;waid=${v}:+${v}\nEND:VCARD`
    }));
    await sock.sendMessage(chat, { contacts: { displayName: `${global.botName} Owner`, contacts } }, { quoted: m });
}
break

default:
if (body.startsWith('>')) {
if (!isOwner) return;
try {
let evaled = await eval(body.slice(1).trim());
if (typeof evaled !== 'string') evaled = util.inspect(evaled);
await ArcReply(evaled);
} catch (err) {
await ArcReply(String(err));
}
}

if (body.startsWith('$')) {
if (!isOwner) return;
require("child_process").exec(body.slice(1).trim(), async (err, stdout) => {
if (err) return await ArcReply(String(err));
if (stdout) return await ArcReply(stdout);
});
}
break;
}

} catch (err) {
console.error(chalk.red("Terjadi Kesalahan di arc.js: "), err);
}
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log(chalk.redBright(`Update ${__filename}`));
delete require.cache[file];
require(file);
});