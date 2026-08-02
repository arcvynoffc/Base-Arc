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
const jimp = require("jimp");
const { title } = require('process');
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
        remoteJid: "status@broadcast",
        fromMe: false,
        participant: "0@s.whatsapp.net"
    },
    message: {
        extendedTextMessage: {
            text: global.botName
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
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
function getParsedCases(filepath) {
    try {
        const fileContent = fs.readFileSync(filepath, 'utf8');
        const blockRegex = /((?:case\s+['"][^'"]+['"]\s*:\s*)+)/g;
        const caseRegex = /case\s+['"]([^'"]+)['"]\s*:/g;
        
        const blocks = [...fileContent.matchAll(blockRegex)];
        const groupedCases = [];

        for (const block of blocks) {
            const rawBlock = block[1];
            const casesInBlock = [...rawBlock.matchAll(caseRegex)].map(m => m[1]);
            
            if (casesInBlock.length > 0) {
                groupedCases.push(casesInBlock.join('/'));
            }
        }

        return [...new Set(groupedCases)];
    } catch (e) {
        return [];
    }
}

if (!sock.public && !isOwner) {
return;
}
switch (command) {
//
case "menu": {
    const image = await jimp.read("./lib/menu.jpg")
    image.resize(300, 300)
    const thumb = await image.getBufferAsync(jimp.MIME_JPEG)
    const allCases = getParsedCases(__filename);
    const totalFeatures = allCases.length;
    const caseList = allCases.map((c, i) => `││ *${prefix}${c}*`).join("\n");

    await sock.sendMessage(
        m.chat,
        {
            buttonLocation: {
                latitude: 0,
                longitude: 0,
                name: global.botName,
                address: global.ownName,
                jpegThumbnail: thumb,

                text: font(`こんにちは、  *${pushname}*  さん！
私は${global.ownName}によって開発された${global.botName}です。

╭╮ ➟ *Bot Information*
││ *Owner Name:* ${global.ownName}
││ *Status:* ${isOwner ? "Owner" : isPrem ? "Premium" : "User"}
││
││ *Bot Name:* ${global.botName}
││ *Bot Mode:* ${sock.public ? "Public" : "Self"}
││ *Type:* CJS - Case
││ *Total Features:* ${totalFeatures}
││ *Runtime:* ${runtime(process.uptime())}
╰╯`),

                footer: global.botName,

                listButtonText: font(`☰ ${global.botName}`),
                listSectionTitle: "",

                listMenu: [
                    {
                        id: ".allmenu",
                        title: "All Menu",
                        description: "Show All Menu"
                    },
                    {
                        id: ".owner",
                        title: "Owner",
                        description: "Kontak owner"
                    }
                ],

                extraButtons: [
                    {
                        id: ".ping",
                        displayText: "Ping"
                    }
                ]
            }
        },
        {
            quoted: czx
        }
    )
}
break

case "allmenu": {
    const image = await jimp.read("./lib/menu.jpg");
    image.resize(300, 300);
    const thumb = await image.getBufferAsync(jimp.MIME_JPEG);
    const allCases = getParsedCases(__filename);
    const totalFeatures = allCases.length;
    const caseList = allCases.map((c, i) => `││ *${prefix}${c}*`).join("\n");

    const menuText = font(`こんにちは、  *${pushname}*  さん！
私は${global.ownName}によって開発された${global.botName}です。

╭╮ ➟ *Bot Information*
││ *Owner Name:* ${global.ownName}
││ *Status:* ${isOwner ? "Owner" : isPrem ? "Premium" : "User"}
││ *Bot Name:* ${global.botName}
││ *Bot Mode:* ${sock.public ? "Public" : "Self"}
││ *Type:* CJS - Case
││ *Total Features:* ${totalFeatures}
││ *Runtime:* ${runtime(process.uptime())}
╰╯

╭╮ ➟ *Bot Information*
${caseList}
╰╯`);

    await sock.sendMessage(
        m.chat,
        {
            buttonLocation: {
                latitude: 0,
                longitude: 0,
                name: global.botName,
                address: global.ownName,
                jpegThumbnail: thumb,
                text: menuText,
                footer: global.botName,
                listButtonText: font(`☰ ${global.botName}`),
                listSectionTitle: "",
                listMenu: [
                    {
                        id: `${prefix}allmenu`,
                        title: "All Menu",
                        description: "Menampilkan semua command"
                    },
                    {
                        id: `${prefix}owner`,
                        title: "Owner",
                        description: "Kontak owner"
                    }
                ],
                extraButtons: [
                    {
                        id: `${prefix}ping`,
                        displayText: "Ping"
                    }
                ]
            }
        },
        { quoted: czx }
    );
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
case "ping":
case "speed": {
    const formatUptime = (seconds) => {
        const day = Math.floor(seconds / 86400);
        const hour = Math.floor((seconds % 86400) / 3600);
        const minute = Math.floor((seconds % 3600) / 60);
        const second = Math.floor(seconds % 60);

        return `${day} Hari ${hour} Jam ${minute} Detik ${second}`;
    };

    const toGB = bytes => (bytes / 1024 / 1024 / 1024).toFixed(2);

    const start = Date.now();

    const msg = await sock.sendMessage(m.chat, {
        text: "Tunggu sebentar..."
    }, {
        quoted: czx
    });

    await delay(1500);

    const latency = Date.now() - start;

    const cpus = os.cpus();
    const cpu = cpus[0];

    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    await sock.sendMessage(m.chat, {
        text:
`*DATA SERVER*
• Latency : ${latency} ms
• Hostname : ${os.hostname()}
• Platform : ${os.platform()} ${os.arch()}
• Uptime : ${formatUptime(os.uptime())}

*CPU*
• Model : ${cpu.model}
• Core : ${cpus.length}
• Clock : ${cpu.speed} MHz
• Load : ${os.loadavg().map(v => v.toFixed(2)).join(" | ")}

*RAM*
• Total : ${toGB(totalMem)} GB
• Digunakan : ${toGB(usedMem)} GB
• Tersisa : ${toGB(freeMem)} GB`,
        edit: msg.key
    });

}
break;

case "rvo":
case "readviewonce":
case "readvo": {
    if (!m.quoted) return ArcReply("Reply pesan ViewOnce yang ingin diambil!");

    let q = m.quoted;
    let msg = q.message || q.msg || q;

    while (msg) {
        if (msg.ephemeralMessage) msg = msg.ephemeralMessage.message;
        else if (msg.viewOnceMessage) msg = msg.viewOnceMessage.message;
        else if (msg.viewOnceMessageV2) msg = msg.viewOnceMessageV2.message;
        else if (msg.viewOnceMessageV2Extension) msg = msg.viewOnceMessageV2Extension.message;
        else if (msg.documentWithCaptionMessage) msg = msg.documentWithCaptionMessage.message;
        else break;
    }

    let type = Object.keys(msg).find(v =>
        ["imageMessage", "videoMessage", "audioMessage"].includes(v)
    );

    if (!type && q.mtype) {
        if (["imageMessage", "videoMessage", "audioMessage"].includes(q.mtype)) {
            type = q.mtype;
        }
    }

    if (!type) return ArcReply("Reply media ViewOnce yang valid!");

    const targetMsg = msg[type] || msg;
    const mediaType = type.replace("Message", "");
    const caption = targetMsg.caption || "";

    try {
        let buffer;

        try {
            buffer = await sock.downloadMediaMessage(q);
        } catch {
            const stream = await downloadContentFromMessage(targetMsg, mediaType);
            const chunks = [];

            for await (const chunk of stream) {
                chunks.push(chunk);
            }

            buffer = Buffer.concat(chunks);
        }

        if (!buffer?.length) {
            return ArcReply("Gagal mendownload media.");
        }

        switch (mediaType) {
            case "image":
                await sock.sendMessage(m.chat, {
                    image: buffer,
                    caption
                }, {
                    quoted: czx
                });
                break;

            case "video":
                await sock.sendMessage(m.chat, {
                    video: buffer,
                    caption
                }, {
                    quoted: czx
                });
                break;

            case "audio":
                await sock.sendMessage(m.chat, {
                    audio: buffer,
                    mimetype: "audio/mp4",
                    ptt: true
                }, {
                    quoted: czx
                });
                break;
        }

    } catch (e) {
        console.error(e);
        ArcReply("Terjadi kesalahan saat mengambil media ViewOnce!");
    }
}
break;

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

case "eval": {
    if (!isOwner) return ArcReply(global.msg.owner);

    try {
        let code = body.startsWith(">")
            ? body.slice(1).trim()
            : text;

        if (!code) return ArcReply("Masukkan kode yang ingin dieksekusi.");

        let result = await eval(`(async () => { ${code} })()`);

        if (typeof result !== "string") {
            result = require("util").inspect(result, {
                depth: 5,
                colors: false
            });
        }

        await ArcReply(result);
    } catch (e) {
        await ArcReply(String(e));
    }
}
break;

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
