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
const readline = require('readline');
const { stdout, stdin } = require('process');
const { smsg } = require("./lib/helper")

function question(query) {
    const rl = readline.createInterface({
        input: stdin,
        output: stdout
    })
    return new Promise((resolve) => {
        rl.question(query, resolve)
    })
}

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session')
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: "silent" }),
        markOnlineOnConnection: true,
        generateHighQualityLinkPreview: true
    })

    if (!sock.authState.creds.registered) {
        const num = await question(chalk.green(`Masukan Nomor Anda\n> `))
        const code = await sock.requestPairingCode(num, "ARCVYNXX")
        console.log(chalk.red(`Your Code Is: ${code}`))
    }

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update
        if (connection === "close") {
            if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
                startBot()
            }
        } else if (connection === "open") {
            sock.newsletterFollow("120363410944362020@newsletter")
        }
    })

    sock.public = true

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("messages.upsert", async (chatUpdate) => {
        try {
            const mek = chatUpdate.messages[0];
            if (!mek.message) return;
            if (!sock.public && !mek.key.fromMe && chatUpdate.type === 'notify') return;
            const m = smsg(sock, mek);
            require("./arc.js")(sock, m, chatUpdate);
        } catch (err) {
            console.log(err);
        }
    });

    sock.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };

    return sock;
}

startBot()