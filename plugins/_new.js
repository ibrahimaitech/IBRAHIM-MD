let {
   runtime,
   formatp,
   prefix,
   smd,
   smdBuffer,
 } = require("../lib");
 const axios = require("axios");
 const fetch = require("node-fetch");
 const os = require("os");
 const speed = require("performance-now");
 const Config = require("../config");
 const cheerio = require("cheerio");
 smd(
  {
    pattern: "channel",
    desc: "To check ping",
    react: "🗨️",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    const channelMessage = `𝑩𝑳𝑨𝑪𝑲 𝑷𝑨𝑵𝑻𝑯𝑬𝑹 𝑾𝑨𝑪𝑯𝑨𝑵𝑵𝑬𝑳\n\n _𝙹𝙾𝙸𝙽 𝙰𝙽𝙳 𝙵𝙾𝙻𝙻𝙾𝚆 𝚃𝙷𝙴 𝙲𝙷𝙰𝙽𝙽𝙴𝙻 𝚃𝙾 𝙱𝙴 𝙶𝙴𝚃𝚃𝙸𝙽𝙶 𝙻𝙰𝚃𝙴𝚂𝚃 𝚄𝙿𝙳𝙰𝚃𝙴𝚂_\n *ʟɪɴᴋ:* https://whatsapp.com/channel/0029VaZuGSxEawdxZK9CzM0Y\n\n ${Config.botname} *WORKS*`;

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
    };

    await message.send(channelMessage, { contextInfo });
  }
);
smd(
  {
    pattern: "support",
    desc: "To check ping",
    react: "🗨️",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    const SupportMsg = `𝑩𝑳𝑨𝑪𝑲 𝑷𝑨𝑵𝑻𝑯𝑬𝑹 𝑾𝑨𝑮𝑹𝑶𝑼𝑷\n\n *ʟɪɴᴋ:* https://chat.whatsapp.com/Cq94ibBs0KQ0R1m9cVWNeN\n\n ${Config.botname} *WORKS*`;

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
    };

    await message.send(SupportMsg, { contextInfo });
  }
);
 smd({
   cmdname: "listmessage",
   alias: ["countmessage", "msgcount"],
   desc: "Check how many users continuesly active in chat!",
   category: "misc",
   filename: __filename
 }, async (_0x1cec94, _0x2535b1, {
   store: _0x264360
 }) => {
   try {
     let _0x5af784 = {};
     _0x264360.messages[_0x1cec94.jid].array.forEach(_0x2ec32f => {
       const _0xd05e4b = _0x2ec32f.pushName || (_0x1cec94.isGroup ? _0x2ec32f.key.participant : _0x2ec32f.key.remoteJid || "unknown").split("@")[0];
       _0x5af784[_0xd05e4b] = (_0x5af784[_0xd05e4b] || 0) + 1;
     });
     let _0x599777 = Object.entries(_0x5af784);
     if (!_0x599777 || !_0x599777[0]) {
       return await _0x1cec94.reply("_No messages found!_");
     }
     const _0x338160 = Object.entries(_0x5af784).map(([_0x4630e3, _0x3a7f93]) => "\t*" + (_0x4630e3?.split("\n").join(" ") || "unknown") + "*  ➪  _" + _0x3a7f93 + "_").join("\n");
     var _0x370694 = ("*LIST OF ACTIVE USERS IN CURRENT CHAT*\n_Note: Sometimes Data will be reset when bot restart!_\n\n*Total Users: _" + _0x599777.length + "_*\n\n*USERNAME ➪ MESSAGE COUNT(s)*\n" + _0x338160 + "\n\n" + Config.caption).trim();
     await _0x1cec94.send(_0x370694, {
       contextInfo: {
         ...(await _0x1cec94.bot.contextInfo("ACTIVE USERS", _0x1cec94.senderName))
       }
     }, "asta", _0x1cec94);
   } catch (_0x225db9) {
     console.log({
       e: _0x225db9
     });
   }
 });
 let commandHistory = [];
 smd({
   on: "main"
 }, async (_0x297aaa, _0x35b575, {
   icmd: _0x5e5446
 }) => {
   try {
     if (_0x5e5446 && _0x297aaa.cmd) {
       commandHistory.push({
         user: _0x297aaa.sender,
         command: _0x297aaa.cmd,
         timestamp: new Date()
       });
     }
   } catch (_0x4bf40a) {
     await _0x297aaa.error(_0x4bf40a + "\n\ncommand : listmessage", _0x4bf40a, "*ERROR!*");
   }
 });
 smd({
   cmdname: "usage",
   desc: "Counts the commands used by users after starting bot?",
   category: "misc",
   filename: __filename
 }, async _0x297641 => {
   try {
     let _0x38bc51 = [];
     const _0x2dd06e = {};
     commandHistory.forEach(({
       user: _0x530cb4,
       command: _0x1c35dd
     }) => {
       if (!_0x2dd06e[_0x530cb4]) {
         _0x2dd06e[_0x530cb4] = {
           commands: {},
           count: 0
         };
         _0x38bc51.push(_0x530cb4);
       }
       if (!_0x2dd06e[_0x530cb4].commands[_0x1c35dd]) {
         _0x2dd06e[_0x530cb4].commands[_0x1c35dd] = 1;
       } else {
         _0x2dd06e[_0x530cb4].commands[_0x1c35dd]++;
       }
       _0x2dd06e[_0x530cb4].count++;
     });
     const _0x5513e2 = _0x38bc51.map((_0x4cd261, _0xf43b6c) => {
       const _0x24712d = _0x2dd06e[_0x4cd261].commands;
       const _0x48255c = Object.entries(_0x24712d).map(([_0x4d2ffd, _0x534145]) => _0x4d2ffd + " " + (_0x534145 <= 1 ? "" : "(" + _0x534145 + ")")).join(", ");
       return "*" + (_0xf43b6c + 1) + " -- @" + _0x4cd261.split("@")[0] + "'s ➪ " + _0x2dd06e[_0x4cd261].count + "*  \n *LIST ➪*  _" + _0x48255c.trim() + "_";
     }).join("\n\n");
     var _0x17ca33 = ("*LIST OF COMMANDS USED TODAY!*\n_Note: Data will be reset when bot restart!_\n\n*Total Users: _" + _0x38bc51.length + "_*\n*Total Command Used: _" + commandHistory.length + "_*\n\n" + _0x5513e2 + "\n\n" + Config.caption).trim();
     await _0x297641.send(_0x17ca33, {
       contextInfo: {
         ...(await _0x297641.bot.contextInfo("HISTORY"))
       },
       mentions: [..._0x38bc51]
     }, "asta", _0x297641);
   } catch (_0x48863b) {
     await _0x297641.error(_0x48863b + "\n\ncommand : cmdused", _0x48863b, "*ERROR!*");
   }
 });
 smd({
   cmdname: "test",
   alias: ["check", "checkbot"],
   desc: "Check bot is active?",
   category: "misc",
   filename: __filename
 }, async _0x17bb63 => {
   try {
     let _0x12a593 = "*BOT CURRENTLY ACTIVE!*";
     await _0x17bb63.reply(_0x12a593, {
       contextInfo: {
         externalAdReply: {
           title: "ACTIVE",
           sourceUrl: gurl,
           showAdAttribution: true,
           thumbnail: await smdBuffer(await _0x17bb63.getpp())
         }
       }
     }, "asta");
   } catch (_0x2ace2e) {}
 });
 smd({
   cmdname: "caption",
   desc: "set caption for Replied Message",
   category: "misc",
   filename: __filename
 }, async (_0xcc3d0b, _0x718ae9) => {
   try {
     if (!_0xcc3d0b.reply_message || !_0x718ae9) {
       return await _0xcc3d0b.reply(!_0xcc3d0b.reply_message ? "*_Please reply to message with caption | filname_*" : "*Please provide text to set caption!*");
     }
     if (_0xcc3d0b.reply_message.image || _0xcc3d0b.reply_message.video || _0xcc3d0b.reply_message.mtype.includes("document")) {
       let _0x4e09a5 = "" + _0x718ae9.split("|")[1]?.trim() || "null";
       let _0x14b6a8 = _0xcc3d0b.reply_message.mtype.includes("document") ? _0x718ae9.split("|")[0].trim() : _0x718ae9;
       _0xcc3d0b.reply_message.message[_0xcc3d0b.reply_message.mtype].caption = _0x14b6a8;
       _0xcc3d0b.reply_message.message[_0xcc3d0b.reply_message.mtype].fileName = _0x4e09a5;
       await _0xcc3d0b.bot.copyNForward(_0xcc3d0b.chat, _0xcc3d0b.reply_message);
     } else {
       return await _0xcc3d0b.reply("please reply to an Audio/Video/document message");
     }
   } catch (_0x5ab188) {
     await _0xcc3d0b.error(_0x5ab188 + "\n\ncommand : caption", _0x5ab188, false);
   }
 });
 smd({
   cmdname: "todoc",
   desc: "send document for Replied image/video Message",
   category: "misc",
   filename: __filename
 }, async (_0x7587f6, _0x11eeb1) => {
   try {
     let _0x49db20 = _0x7587f6.image || _0x7587f6.video ? _0x7587f6 : _0x7587f6.reply_message && (_0x7587f6.reply_message.image || _0x7587f6.reply_message.video) ? _0x7587f6.reply_message : false;
     if (!_0x49db20) {
       return await _0x7587f6.reply("_Reply to an image/video message!_");
     }
     if (!_0x11eeb1) {
       return await _0x7587f6.reply("_Need fileName, Example: document asta | caption_");
     }
     let _0x1bfcf5 = await _0x7587f6.bot.downloadAndSaveMediaMessage(_0x49db20);
     let _0x3f6d77 = _0x11eeb1.includes(":") ? ":" : _0x11eeb1.includes(";") ? ";" : "|";
     let _0x3c4532 = _0x11eeb1.split(_0x3f6d77)[0].trim() + "." + (_0x49db20.image ? "jpg" : "mp4");
     let _0x3367ca = _0x11eeb1.split(_0x3f6d77)[1]?.trim() || "";
     _0x3367ca = ["copy", "default", "old", "reply"].includes(_0x3367ca) ? _0x49db20.text : _0x3367ca;
     if (_0x1bfcf5) {
       _0x7587f6.bot.sendMessage(_0x7587f6.chat, {
         document: {
           url: _0x1bfcf5
         },
         mimetype: _0x49db20.mimetype,
         fileName: _0x3c4532,
         caption: _0x3367ca
       });
     } else {
       _0x7587f6.reply("*Request Denied!*");
     }
   } catch (_0x408490) {
     await _0x7587f6.error(_0x408490 + "\n\ncommand : document", _0x408490, false);
   }
 });
 smd({
   cmdname: "tovv",
   desc: "send viewonce for Replied image/video Message",
   category: "misc",
   filename: __filename
 }, async (_0x241c6f, _0x5ce27a) => {
   try {
     let _0x1d26ad = _0x241c6f.image || _0x241c6f.video ? _0x241c6f : _0x241c6f.reply_message && (_0x241c6f.reply_message.image || _0x241c6f.reply_message.video) ? _0x241c6f.reply_message : false;
     if (!_0x1d26ad) {
       return await _0x241c6f.reply("_Reply to image/video with caption!_");
     }
     let _0x60cca4 = await _0x241c6f.bot.downloadAndSaveMediaMessage(_0x1d26ad);
     let _0x8cde12 = _0x1d26ad.image ? "image" : "video";
     if (_0x60cca4) {
       _0x241c6f.bot.sendMessage(_0x241c6f.chat, {
         [_0x8cde12]: {
           url: _0x60cca4
         },
         caption: _0x5ce27a,
         mimetype: _0x1d26ad.mimetype,
         fileLength: "99999999",
         viewOnce: true
       }, {
         quoted: _0x1d26ad
       });
     } else {
       _0x241c6f.reply("*Request Denied!*");
     }
   } catch (_0x2422e7) {
     await _0x241c6f.error(_0x2422e7 + "\n\ncommand : tovv", _0x2422e7, false);
   }
 });
 smd({
   cmdname: "features",
   category: "misc",
   filename: __filename,
   info: "get counting for total features!"
 }, async _0x4e7c63 => {
   try {
     const _0x4de967 = require("../lib/plugins");
     let _0x4cf8ed = Object.values(_0x4de967.commands).length;
     try {
       let {
         key: _0x2d7cf6
       } = await _0x4e7c63.send("Counting... 0", {}, "asta", _0x4e7c63);
       for (let _0x16a10f = 0; _0x16a10f <= _0x4cf8ed; _0x16a10f++) {
         if (_0x16a10f % 15 === 0) {
           await _0x4e7c63.send("Counting... " + _0x16a10f, {
             edit: _0x2d7cf6
           }, "asta", _0x4e7c63);
         } else if (_0x4cf8ed - _0x16a10f < 10) {
           await _0x4e7c63.send("Counting... " + _0x16a10f, {
             edit: _0x2d7cf6
           }, "asta", _0x4e7c63);
         }
       }
       await _0x4e7c63.send("*Feature Counting Done!*", {
         edit: _0x2d7cf6
       }, "asta", _0x4e7c63);
     } catch (_0x28ce7e) {}
     let _0x50f17a = " *𝑩𝑳𝑨𝑪𝑲 𝑷𝑨𝑵𝑻𝑯𝑬𝑹 𝑴𝑫 𝑨𝑳𝑳 𝑪𝑴𝑫*\n\n\n  ◦ _Total Features ➪ " + _0x4cf8ed + "_\n  \n*◦ LIST DOWN THE FEATURES*\n\n      _Commands ➪ " + Object.values(_0x4de967.commands).filter(_0x54d4bf => _0x54d4bf.pattern).length + "_\n      _Msg Listener ➪ " + Object.values(_0x4de967.commands).filter(_0x2376a3 => _0x2376a3.on).length + "_\n      _Call Listener ➪ " + Object.values(_0x4de967.commands).filter(_0x54a19b => _0x54a19b.call).length + "_\n      _Group Listener ➪ " + Object.values(_0x4de967.commands).filter(_0x35381c => _0x35381c.group).length + "_\n  \n\n" + Config.caption;
     await _0x4e7c63.bot.relayMessage(_0x4e7c63.chat, {
       requestPaymentMessage: {
         currencyCodeIso4217: "NG",
         amount1000: _0x4cf8ed * 5000,
         requestFrom: "0@s.whatsapp.net",
         noteMessage: {
           extendedTextMessage: {
             text: _0x50f17a,
             contextInfo: {
               mentionedJid: [_0x4e7c63.sender],
               externalAdReply: {
                 showAdAttribution: true
               }
             }
           }
         }
       }
     }, {});
   } catch (_0x979e23) {
     await _0x4e7c63.error(_0x979e23 + "\n\ncommand : feature", _0x979e23, false);
   }
 });
 smd({
   cmdname: "character",
   category: "fun",
   use: "[@user]",
   filename: __filename,
   info: "Check character of replied USER!"
 }, async _0x2a677e => {
   const _0x32c078 = _0x2a677e.reply_message ? _0x2a677e.reply_message.sender : _0x2a677e.mentionedJid && _0x2a677e.mentionedJid[0] ? _0x2a677e.mentionedJid[0] : "";
   if (!_0x32c078 || !_0x32c078.includes("@")) {
     return await _0x2a677e.reply("*Mention/reply user to check its character!*");
   }
   const _0x5845d4 = ["Sigma", "Generous", "Grumpy", "Overconfident", "Obedient", "Good", "Simple", "Kind", "Patient", "Pervert", "Cool", "Helpful", "Brilliant", "Sexy", "Hot", "Gorgeous", "Cute", "Fabolous", "Funny"];
   const _0x2f5d93 = _0x5845d4[Math.floor(Math.random() * _0x5845d4.length)];
   let _0x3b31ed = "Character of @" + _0x32c078.split("@")[0] + "  is *" + _0x2f5d93 + "* 🔥⚡";
   _0x2a677e.send(_0x3b31ed, {
     mentions: [_0x32c078]
   }, "asta", _0x2a677e);
 });
 smd({
   cmdname: "poetry",
   type: "fun",
   info: "get randome poetry lines"
 }, async _0x4d032f => {
   try {
     let _0x45fa91 = await fetch("https://shizoapi.onrender.com/api/texts/shayari?apikey=shizo");
     let {
       result: _0x1aa994
     } = await _0x45fa91.json();
     _0x4d032f.reply(_0x45fa91 && _0x1aa994 ? _0x1aa994 : "_Request Denied from Server!_");
   } catch (_0x303ba6) {
     await _0x4d032f.error(_0x303ba6 + "\n\ncommand : poetry", _0x303ba6, false);
   }
 });
 smd({
   cmdname: "alexa",
   category: "ai",
   use: "[text]",
   filename: __filename,
   info: "chat with simsimi alexa ai!"
 }, async (_0xe6d6e, _0x23f786) => {
   try {
     if (!_0x23f786) {
       return await _0xe6d6e.reply("Hi *" + _0xe6d6e.senderName + "*, do you want to talk?");
     }
     const _0x55bb61 = {
       method: "POST",
       headers: {
         "Content-Type": "application/x-www-form-urlencoded"
       },
       body: "text=" + encodeURIComponent(_0x23f786) + "&lc=en&key="
     };
     const _0x5099c8 = await fetch("https://api.simsimi.vn/v2/simtalk", _0x55bb61);
     const _0x2c3e12 = await _0x5099c8.json();
     if (_0x2c3e12.status === "200" && _0x2c3e12.message) {
       _0xe6d6e.reply(_0x2c3e12.message);
     } else {
       _0xe6d6e.reply("*No Responce!*");
     }
   } catch (_0xfee6e3) {
     await _0xe6d6e.error(_0xfee6e3 + "\n\ncommand : poetry", _0xfee6e3, false);
   }
 });
 smd({
   cmdname: "ping2",
   alias: ["botstatus", "statusbot", "p2"],
   type: "misc",
   info: "get randome poetry lines"
 }, async _0xdfc3ca => {
   try {
     const _0x37ca41 = process.memoryUsage();
     const _0x4a72de = os.cpus().map(_0x39cb6a => {
       _0x39cb6a.total = Object.keys(_0x39cb6a.times).reduce((_0x432663, _0x5a155c) => _0x432663 + _0x39cb6a.times[_0x5a155c], 0);
       return _0x39cb6a;
     });
     const _0x410388 = _0x4a72de.reduce((_0x8a6a46, _0x3dde47, _0x4edc26, {
       length: _0x378aa4
     }) => {
       _0x8a6a46.total += _0x3dde47.total;
       _0x8a6a46.speed += _0x3dde47.speed / _0x378aa4;
       _0x8a6a46.times.user += _0x3dde47.times.user;
       _0x8a6a46.times.nice += _0x3dde47.times.nice;
       _0x8a6a46.times.sys += _0x3dde47.times.sys;
       _0x8a6a46.times.idle += _0x3dde47.times.idle;
       _0x8a6a46.times.irq += _0x3dde47.times.irq;
       return _0x8a6a46;
     }, {
       speed: 0,
       total: 0,
       times: {
         user: 0,
         nice: 0,
         sys: 0,
         idle: 0,
         irq: 0
       }
     });
     let _0xce26d = speed();
     let _0x3db049 = speed() - _0xce26d;
     neww = performance.now();
     oldd = performance.now();
     respon = ("\nResponse Speed " + _0x3db049.toFixed(4) + " _Second_ \n " + (oldd - neww) + " _miliseconds_\n\nRuntime : " + runtime(process.uptime()) + "\n\n💻 Info Server\nRAM: " + formatp(os.totalmem() - os.freemem()) + " / " + formatp(os.totalmem()) + "\n\n_NodeJS Memory Usaage_\n" + Object.keys(_0x37ca41).map((_0x19d575, _0x3942d9, _0x3fa08c) => _0x19d575.padEnd(Math.max(..._0x3fa08c.map(_0x6548cb => _0x6548cb.length)), " ") + ": " + formatp(_0x37ca41[_0x19d575])).join("\n") + "\n\n" + (_0x4a72de[0] ? "_Total CPU Usage_\n" + _0x4a72de[0].model.trim() + " (" + _0x410388.speed + " MHZ)\n" + Object.keys(_0x410388.times).map(_0xffc60c => "- *" + (_0xffc60c + "*").padEnd(6) + ": " + (_0x410388.times[_0xffc60c] * 100 / _0x410388.total).toFixed(2) + "%").join("\n") + " " : "") + "\n\n ").trim();
     _0xdfc3ca.reply(respon);
   } catch (_0x13d03e) {
     await _0xdfc3ca.error(_0x13d03e + "\n\ncommand : ping2", _0x13d03e, false);
   }
 });
 smd({
   cmdname: "myip",
   alias: ["ip"],
   type: "misc",
   info: "get randome poetry lines"
 }, async _0x446c27 => {
   try {
     let {
       data: _0x58d504
     } = await axios.get("https://api.ipify.org/");
     _0x446c27.send(_0x58d504 ? "*Bot's IP address is : _" + _0x58d504 + "_*" : "_No responce from server!_");
   } catch (_0x2976b7) {
     await _0x446c27.error(_0x2976b7 + "\n\ncommand : myip", _0x2976b7, false);
   }
 });
 let ssweb = (_0x55d18b, _0x2b24ca = "desktop") => {
   return new Promise((_0x3e38ef, _0x5b6da8) => {
     const _0x3eb2a3 = "https://www.screenshotmachine.com";
     const _0x3bbdf7 = {
       url: _0x55d18b,
       device: _0x2b24ca,
       cacheLimit: 0
     };
     axios({
       url: _0x3eb2a3 + "/capture.php",
       method: "POST",
       data: new URLSearchParams(Object.entries(_0x3bbdf7)),
       headers: {
         "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
       }
     }).then(_0xc3c6b3 => {
       const _0x5ba45c = _0xc3c6b3.headers["set-cookie"];
       if (_0xc3c6b3.data.status == "success") {
         axios.get(_0x3eb2a3 + "/" + _0xc3c6b3.data.link, {
           headers: {
             cookie: _0x5ba45c.join("")
           },
           responseType: "arraybuffer"
         }).then(({
           data: _0x257890
         }) => {
           result = {
             status: 200,
             result: _0x257890
           };
           _0x3e38ef(result);
         });
       } else {
         _0x5b6da8({
           status: 404,
           statuses: "Link Error",
           message: _0xc3c6b3.data
         });
       }
     }).catch(_0x5b6da8);
   });
 };
 smd({
   cmdname: "ss",
   type: "misc",
   info: "get randome poetry lines"
 }, async (_0x4cdec8, _0x41dfb5) => {
   try {
     let _0x587b99 = _0x41dfb5.split(" ")[0].trim();
     if (!_0x587b99) {
       return await _0x4cdec8.reply("*Need URL! Use " + prefix + "ss https://github.com/Astropeda/Asta-Md*");
     }
     let _0x358290 = await ssweb(_0x587b99);
     if (_0x358290 && _0x358290.status == "200") {
       return await _0x4cdec8.send(_0x358290.result, {
         caption: Config.caption
       }, "amdimg", _0x4cdec8);
     } else {
       _0x4cdec8.send("_No responce from server!_");
     }
   } catch (_0x126b07) {
     await _0x4cdec8.error(_0x126b07 + "\n\ncommand : myip", _0x126b07, "*Request Denied!*");
   }
 });
 let tmpUrl = "https://telegra.ph/file/b8e96b599e0fa54d25940.jpg";
 const secmailData = {};
 smd({
   pattern: "tempmail",
   alias: ["tmpmail", "newmail", "tempemail"],
   info: "Create tempory email address, and use it according your need!",
   type: "misc"
 }, async _0x10eae6 => {
   try {
     if (!secmailData[_0x10eae6.sender]) {
       const _0x5b6408 = await tempmail.create();
       if (!_0x5b6408 || !_0x5b6408[0]) {
         return await _0x10eae6.reply("*Request Denied!*");
       }
       const _0x17929d = _0x5b6408[0].split("@");
       secmailData[_0x10eae6.sender] = {
         email: _0x5b6408[0],
         login: _0x17929d[0],
         domain: _0x17929d[1]
       };
     }
     var _0x54710d = false;
     try {
       _0x54710d = await smdBuffer(tmpUrl);
     } catch (_0x40985f) {}
     await _0x10eae6.reply(("*YOUR TEMPMAIL INFO*\n      \n      \n  *EMAIL:* ➪ " + secmailData[_0x10eae6.sender].email + "\n  *Login:* ➪ " + secmailData[_0x10eae6.sender].login + "\n  *Domain:* ➪ " + secmailData[_0x10eae6.sender].domain + "\n  \n  \n  *USE _" + prefix + "checkmail_ to get latest emails!*\n  *USE _" + prefix + "delmail_ to delete current email!*\n  \n  " + Config.caption + "\n  ").trim(), {
       contextInfo: {
         ...(await _0x10eae6.bot.contextInfo("TEMPMAIL", _0x10eae6.senderName, _0x54710d))
       }
     }, "smd", _0x10eae6);
   } catch (_0x2c8958) {
     console.log(_0x2c8958);
     await _0x10eae6.reply("*Request Denied!*");
   }
 });
 smd({
   pattern: "checkmail",
   alias: ["readmail", "reademail"],
   type: "misc",
   info: "check mails in your temporary email address!"
 }, async _0x39080b => {
   try {
     const _0x13bdf9 = _0x39080b.sender;
     const _0x1ca6eb = secmailData[_0x13bdf9];
     if (!_0x1ca6eb || !_0x1ca6eb.email) {
       return await _0x39080b.reply("*You haven't created a temporary email.*\n  *Use _" + prefix + "tempmail_ to create email first!*");
     }
     const _0xb59e7d = await tempmail.mails(_0x1ca6eb.login, _0x1ca6eb.domain);
     if (!_0xb59e7d || !_0xb59e7d[0] || _0xb59e7d.length === 0) {
       return await _0x39080b.reply("*EMPTY  ➪ No mails received yet!* \n*Use _" + prefix + "delmail_ to delete mail!*");
     }
     var _0x392c45 = false;
     try {
       _0x392c45 = await smdBuffer(tmpUrl);
     } catch (_0x27f4a4) {}
     for (const _0x2b6dd0 of _0xb59e7d) {
       const _0x587f7f = await tempmail.emailContent(_0x1ca6eb.login, _0x1ca6eb.domain, _0x2b6dd0.id);
       console.log({
         emailContent: _0x587f7f
       });
       if (_0x587f7f) {
         const _0xa4d211 = "\n  *From* ➪ " + _0x2b6dd0.from + "\n  *Date* ➪  " + _0x2b6dd0.date + "\n  *EMAIL ID* ➪  [" + _0x2b6dd0.id + "]\n  *Subject* ➪  " + _0x2b6dd0.subject + "\n  *Content* ➪  " + _0x587f7f;
         await _0x39080b.reply(_0xa4d211, {
           contextInfo: {
             ...(await _0x39080b.bot.contextInfo("*EMAIL ➪ " + _0x2b6dd0.id + "*", _0x39080b.senderName, _0x392c45))
           }
         }, "smd", _0x39080b);
         ;
       }
     }
   } catch (_0x4473c8) {
     console.log(_0x4473c8);
     await _0x39080b.reply("*Request Denied!*");
   }
 });
 smd({
   pattern: "delmail",
   alias: ["deletemail", "deltemp", "deltmp"],
   type: "misc",
   info: "Delete tempory email address!"
 }, async _0x536927 => {
   try {
     const _0x35c5db = _0x536927.sender;
     if (secmailData[_0x35c5db]) {
       delete secmailData[_0x35c5db];
       await _0x536927.reply("*Successfully deleted the email address.*");
     } else {
       await _0x536927.reply("*No email address to delete.*");
     }
   } catch (_0x527b01) {
     console.log(_0x527b01);
     await _0x536927.reply("*Request Denied!*");
   }
 });
 const tempmail = {};
 tempmail.create = async () => {
   const _0x4b8b0a = "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1";
   try {
     let _0x64d3a = await fetch(_0x4b8b0a);
     if (!_0x64d3a.ok) {
       throw new Error("HTTP error! status: " + _0x64d3a.status);
     }
     let _0x3d6ee6 = await _0x64d3a.json();
     return _0x3d6ee6;
   } catch (_0x5fcd34) {
     console.log(_0x5fcd34);
     return null;
   }
 };
 tempmail.mails = async (_0xf78957, _0x22b96c) => {
   const _0x52bcfa = "https://www.1secmail.com/api/v1/?action=getMessages&login=" + _0xf78957 + "&domain=" + _0x22b96c;
   try {
     let _0x334113 = await fetch(_0x52bcfa);
     if (!_0x334113.ok) {
       throw new Error("HTTP error! status: " + _0x334113.status);
     }
     let _0x21e568 = await _0x334113.json();
     return _0x21e568;
   } catch (_0x470fd0) {
     console.log(_0x470fd0);
     return null;
   }
 };
 tempmail.emailContent = async (_0x2bb874, _0x365dd7, _0x53af41) => {
   const _0x525052 = "https://www.1secmail.com/api/v1/?action=readMessage&login=" + _0x2bb874 + "&domain=" + _0x365dd7 + "&id=" + _0x53af41;
   try {
     let _0x5287ec = await fetch(_0x525052);
     if (!_0x5287ec.ok) {
       throw new Error("HTTP error! status: " + _0x5287ec.status);
     }
     let _0x321f50 = await _0x5287ec.json();
     const _0x2d0a5f = _0x321f50.htmlBody;
     console.log({
       htmlContent: _0x2d0a5f
     });
     const _0x59fd31 = cheerio.load(_0x2d0a5f);
     const _0x492dcb = _0x59fd31.text();
     return _0x492dcb;
   } catch (_0x47924e) {
     console.log(_0x47924e);
     return null;
   }
 };
