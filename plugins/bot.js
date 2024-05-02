const events = require(lib_dir + "/plugins.js");
let {
  Config,
  TelegraPh,
  sleep,
  getBuffer,
  parsedJid,
  fancy,
  tiny,
  botpic,
  tlang
} = require(lib_dir);
if (!Array.isArray(global.renters)) {
  global.renters = [];
}
if (!Array.isArray(global.rentdisable)) {
  global.rentdisable = [];
}
let disabledperma = ["sharebot", "sharelist", "stoprent", "disableshare", "enableshare", "setsudo", "delsudo", "newvar", "delvar", "setvar", "update", "updatenow", "restart", "reboot"];
const {
  userdb,
  smd,
  fetchJson,
  sendWelcome,
  bot_,
  getTime
} = require(lib_dir);
const util = require("util");
const fs = require("fs-extra");
const axios = require("axios");
const fetch = require("node-fetch");
const exec = util.promisify(require("child_process").exec);
let db = {};
db.get = async () => {
  const _0x39ecdb = "./asta.json";
  try {
    return JSON.parse(fs.readFileSync(_0x39ecdb, "utf-8"));
  } catch (_0x12c187) {
    return {};
  }
};
db.update = async _0x19934a => {
  try {
    const _0x370f4c = "./asta.json";
    const _0x50546d = db.get();
    const _0x456e8c = {
      ..._0x50546d,
      ..._0x19934a
    };
    fs.writeFileSync(_0x370f4c, JSON.stringify(_0x456e8c, null, 2), "utf-8");
    return _0x456e8c;
  } catch (_0x4e2ecd) {
    console.error("Error updating data:", _0x4e2ecd);
  }
};
try {
  const {
    mention,
    filter
  } = require(lib_dir + "/asta.js");
  smd({
    cmdname: "mention",
    fromMe: true,
    category: "chats",
    desc: "set auto reply for mention",
    use: "[ url type/audio ]",
    usage: "read  'mention wiki' to get all inforamtion of mention!",
    filename: __filename
  }, async (_0x184ecd, _0x431080) => {
    mention.cmd(_0x184ecd, _0x431080);
  });
  smd({
    on: "main",
    fromMe: false
  }, async (_0x138199, _0x359c14 = "") => {
    mention.check(_0x138199, _0x359c14);
  });
  smd({
    pattern: "filter",
    category: "chats",
    desc: "set auto reply filter messages",
    use: "[ suhail : how can i help you! ]",
    usage: "set filter message to specific text, so that bot replied user from chat by giving text!",
    fromMe: true,
    filename: __filename
  }, async (_0x126a17, _0x3ebefa) => {
    filter.set(_0x126a17, _0x3ebefa);
  });
  smd({
    pattern: "fstop",
    category: "chats",
    desc: "stop auto reply from a word",
    use: "[ suhail : how can i help you! ]",
    usage: "stop filter message to specific word, That already set in filter text!",
    fromMe: true,
    filename: __filename
  }, async (_0x2fd083, _0xa71664) => {
    filter.stop(_0x2fd083, _0xa71664);
  });
  smd({
    pattern: "flist",
    category: "chats",
    desc: "get list of auto reply word",
    use: "[ suhail : how can i help you! ]",
    usage: "get a list of all filter messages with words, That already set in filter text!",
    fromMe: true,
    filename: __filename
  }, async _0x55f8e8 => {
    filter.list(_0x55f8e8);
  });
  smd({
    on: "text"
  }, async (_0x593a64, _0x40e88c) => {
    try {
      filter.check(_0x593a64, _0x40e88c);
    } catch (_0x4839f8) {}
  });
} catch (_0x2568c0) {
  if (!global.showUpdate) {
    log("\n🔰===========================🔰 \n  \n  𝑩𝑶𝑻 𝑶𝑵𝑳𝑰𝑵𝑬\n  =>  BOT IS SUCCESSFULLY ACTIVATED ON YOUR WHATSAPP! ⏳\n \n DEVELOPER: 𝑰𝑩𝑹𝑨𝑯𝑰𝑴 𝑨𝑫𝑨𝑴𝑺\n🔰============================🔰");
    global.showUpdate = true;
  }
}
let afk = false;
smd({
  pattern: "afk",
  desc: "away from keyboard",
  category: "chats"
}, async (_0x5981d0, _0x5be11f) => {
  try {
    let _0x7c3280 = await db.get();
    afk = _0x7c3280.afk || {
      users: {}
    };
    if (!_0x5be11f) {
      return _0x5981d0.reply(("\n  *Example: My owner is AFK*\n  *Last seen before #lastseen*\n  *Also update status: " + prefix + "afk @time, @date, @line(pickupline), @quote(random quote), @user*\n  \n*To turn off use " + prefix + "unAfk.*\n  ").trim());
    }
    if (_0x5be11f === "get" && afk[_0x5981d0.sender]) {
      return _0x5981d0.reply(afk[_0x5981d0.sender].reason);
    }
    afk[_0x5981d0.sender] = {
      reason: _0x5be11f,
      lastseen: new Date()
    };
    _0x7c3280.afk = {
      ...afk
    };
    _0x7c3280 = await db.update(_0x7c3280);
    if (_0x7c3280) {
      let _0x3f1e86 = ("@" + _0x5981d0.sender.split("@")[0] + " currently AFK.\nReason: " + afk[_0x5981d0.sender].reason.replace("@lastseen", "\nlastseen : " + getTimeDifference(afk[_0x5981d0.sender].lastseen) + "\n")).trim();
      await sendWelcome(_0x5981d0, _0x3f1e86, _0x5981d0, _0x5981d0.sender);
    } else {
      _0x5981d0.reply("*Request Denied!*");
    }
  } catch (_0x14591d) {
    _0x5981d0.error(_0x14591d + "\n\nCommand: AFKs", _0x14591d);
  }
});
smd({
  pattern: "unafk",
  desc: "turn off away from keyboard",
  category: "chats"
}, async _0x19b40d => {
  try {
    let _0x5f4dc1 = await db.get();
    afk = _0x5f4dc1.afk || {};
    if (!afk[_0x19b40d.sender]) {
      return _0x19b40d.reply("*You are not AFK.*");
    }
    delete afk[_0x19b40d.sender];
    _0x5f4dc1.afk = {
      ...afk
    };
    _0x5f4dc1 = await db.update(_0x5f4dc1);
    if (_0x5f4dc1) {
      await _0x19b40d.reply("Finally, You are back!");
    } else {
      _0x19b40d.reply("*Request Denied!*");
    }
  } catch (_0x256eef) {
    _0x19b40d.error(_0x256eef + "\n\nCommand: UnAFK", _0x256eef, "ERROR");
  }
});
let txt = {
  "2": "*Hey i already inform you!*\n",
  "3": "*Stop spamming!*"
};
function getTimeDifference(_0x47a53) {
  const _0x2e748e = new Date(_0x47a53);
  const _0x54f11c = new Date();
  const _0x2c55d7 = _0x54f11c - _0x2e748e;
  const _0x353908 = Math.floor(_0x2c55d7 / 86400000);
  const _0x349796 = Math.floor(_0x2c55d7 % 86400000 / 3600000);
  const _0x9c628b = Math.floor(_0x2c55d7 % 3600000 / 60000);
  return (_0x353908 ? "Days " + _0x353908 + ", " : "") + "Hours " + (_0x349796 || 0) + ", Minutes " + (_0x9c628b || 0);
}
smd({
  on: "main"
}, async _0x2769f2 => {
  if (_0x2769f2.fromMe || _0x2769f2.isBot) {
    return;
  }
  try {
    if (!afk) {
      let _0xc43cb5 = await db.get();
      afk = _0xc43cb5.afk || {
        users: []
      };
    }
    let _0x1a0460 = _0x2769f2.reply_message && _0x2769f2.reply_message.fromMe ? true : false;
    let _0x3acd2a = _0x2769f2.mentionedJid[0] ? [..._0x2769f2.mentionedJid] : [];
    if (_0x2769f2.reply_message) {
      _0x3acd2a.push(_0x2769f2.reply_message.sender);
    }
    for (let _0x53ceee = 0; _0x53ceee < _0x3acd2a.length; _0x53ceee++) {
      if (afk[_0x3acd2a[_0x53ceee]] && _0x2769f2.sender !== _0x3acd2a[_0x53ceee]) {
        if (!afk[_0x3acd2a[_0x53ceee]].users[_0x2769f2.sender]) {
          afk[_0x3acd2a[_0x53ceee]].users[_0x2769f2.sender] = 0;
        }
        afk[_0x3acd2a[_0x53ceee]].users[_0x2769f2.sender]++;
        if (afk[_0x3acd2a[_0x53ceee]].users[_0x2769f2.sender] > 3) {
          continue;
        }
        let _0x208a1a = txt[afk[_0x3acd2a[_0x53ceee]].users[_0x2769f2.sender]];
        let _0x5ab59f = ((_0x208a1a ? _0x208a1a : "") + " *@" + _0x3acd2a[_0x53ceee].split("@")[0] + " currently AFK.*\n*Reason:* " + afk[_0x3acd2a[_0x53ceee]].reason.replace("@lastseen", "\n*Lastseen:* " + getTimeDifference(afk[_0x3acd2a[_0x53ceee]].lastseen) + "\n")).trim();
        await sendWelcome(_0x2769f2, _0x5ab59f, _0x2769f2, _0x3acd2a[_0x53ceee]);
      }
    }
  } catch (_0x4f282f) {
    console.log("ERROR IN AFK MAIN\n", _0x4f282f);
  }
});
smd(
  {
    pattern: "alive",
    desc: "Shows system status with different designs.",
    category: "general",
    filename: __filename,
    use: "alive",
  },
  async (message, input) => {
    try {
      const start = new Date().getTime();
      const designs = [
        async () => {
          const imageBuffer = await axios.get(
            "https://telegra.ph/file/4c2a2209b02ba65f47d08.jpg",
            {
              responseType: "arraybuffer",
            }
          );

          const quoteResponse = await axios.get(
            "https://api.maher-zubair.tech/misc/quote"
          );
          const quote = quoteResponse.data;
          if (!quote || quote.status !== 200) {
            return await message.reply("*Failed to fetch a quote.*");
          }

          const quoteText = `\n\n*"${quote.result.body}"*\n_- ${quote.result.author}_`;
          const end = new Date().getTime();
          const pingSeconds = (end - start) / 1000;
          const captionText = `🐯𝑩𝑳𝑨𝑪𝑲 𝑷𝑨𝑵𝑻𝑯𝑬𝑹 𝑨𝑳𝑰𝑽𝑬 𝑴𝑬𝑺𝑺𝑨𝑮𝑬\n\n*ʀᴇsᴘᴏɴsᴇ ʀᴀᴛᴇ:* ${pingSeconds} seconds${quoteText}\n\n𝑩𝑳𝑨𝑪𝑲 𝑷𝑨𝑵𝑻𝑯𝑬𝑹 𝑴𝑫`;

          return { image: imageBuffer.data, caption: captionText };
        },
        async () => {
          const imageBuffer = await axios.get(
            "https://telegra.ph/file/4c2a2209b02ba65f47d08.jpg",
            {
              responseType: "arraybuffer",
            }
          );

          const factResponse = await axios.get(
            "https://api.maher-zubair.tech/misc/fact"
          );
          const fact = factResponse.data;
          if (!fact || fact.status !== 200) {
            return await message.reply("*Failed to fetch a fact.*");
          }

          const end = new Date().getTime();
          const pingSeconds = (end - start) / 1000;
          const captionText = `𝑩𝑳𝑨𝑪𝑲 𝑷𝑨𝑵𝑻𝑯𝑬𝑹 𝑴𝑫\n\n*ʀᴇsᴘᴏɴsᴇ ʀᴀᴛᴇ:* ${pingSeconds} seconds\n\n*Fact:*\n${fact.result.fact}\n\n𝑷𝑨𝑵𝑻𝑯𝑬𝑹 𝑴𝑫`;

          return { image: imageBuffer.data, caption: captionText };
        },
        async () => {
          const imageBuffer = await axios.get(
            "https://telegra.ph/file/47b18c0099aae5d2229b9.jpg",
            {
              responseType: "arraybuffer",
            }
          );

          const lineResponse = await axios.get(
            "https://api.maher-zubair.tech/misc/lines"
          );
          const line = lineResponse.data;
          if (!line || line.status !== 200) {
            return await message.reply("*Failed to fetch a line.*");
          }

          const end = new Date().getTime();
          const pingSeconds = (end - start) / 1000;
          const captionText = `𝑩𝑳𝑨𝑪𝑲 𝑷𝑨𝑵𝑻𝑯𝑬𝑹 𝑴𝑫\n\n*ʀᴇsᴘᴏɴsᴇ ʀᴀᴛᴇ:* ${pingSeconds} seconds\n\n*Line:*\n${line.result}\n\𝑷𝑨𝑵𝑻𝑯𝑬𝑹 𝑴𝑫`;

          return { image: imageBuffer.data, caption: captionText };
        },
      ];


      const randomDesign = designs[Math.floor(Math.random() * designs.length)];
      const messageData = await randomDesign();

      const message_options = {
        quoted: message,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
        },
      };

      return await message.bot.sendMessage(
        message.chat,
        messageData,
        message_options
      );
    } catch (error) {
      await message.error(
        error + "\n\nCommand: alive",
        error,
        "*Failed to show status.*"
      );
    }
  }
);
async function convertAudioToBlackScreenVideo(_0x528238, _0x32b9b6) {
  try {
    try {
      fs.unlinkSync(_0x32b9b6);
    } catch (_0xdbc67d) {}
    const _0x77f5a8 = "ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 " + _0x528238;
    const {
      stdout: _0x35baeb
    } = await exec(_0x77f5a8);
    const _0xa4c00a = parseFloat(_0x35baeb);
    try {
      fs.unlinkSync("./blackScreen.mp4");
    } catch (_0x5c88b4) {}
    const _0xf07045 = "ffmpeg -f lavfi -i color=c=black:s=1280x720:d=" + _0xa4c00a + " -vf \"format=yuv420p\" ./blackScreen.mp4";
    await exec(_0xf07045);
    const _0x39ba37 = "ffmpeg -i ./blackScreen.mp4 -i " + _0x528238 + " -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 " + _0x32b9b6;
    await exec(_0x39ba37);
    console.log("Audio converted to black screen video successfully!");
    return {
      result: true
    };
  } catch (_0x2a64be) {
    console.log("An error occurred:", _0x2a64be);
    return {
      result: false
    };
  }
}
smd({
  pattern: "audiourl",
  alias: ["black"],
  desc: "get url for audio and converted into black video",
  category: "converter"
}, async (_0x72926a, _0x4e5da) => {
  try {
    if (!_0x72926a.quoted) {
      return await _0x72926a.reply("_Reply to Audio MEssage!_");
    }
    let _0x460b3f = "";
    if (_0x72926a.quoted.mtype == "audioMessage") {
      let _0x1f1386 = await _0x72926a.bot.downloadAndSaveMediaMessage(_0x72926a.quoted);
      let _0x555071 = await convertAudioToBlackScreenVideo(_0x1f1386, "./temp/convertedVideo.mp4");
      if (_0x555071.result) {
        _0x460b3f = "./temp/convertedVideo.mp4";
        let _0x5efc27 = await TelegraPh(_0x460b3f);
        await _0x72926a.send(_0x460b3f, {
          caption: util.format(_0x5efc27)
        }, "smdvid", _0x72926a);
        try {
          fs.unlinkSync(_0x460b3f);
        } catch (_0x147eea) {}
      } else {
        throw "Invalid Media Path";
      }
    }
  } catch (_0x10a3dc) {
    await _0x72926a.error(_0x10a3dc + "\n\nCommand: audiourl", _0x10a3dc, "_ERRORR!_");
  }
});
smd({
  pattern: "bgm",
  desc: "Toggle On/Off to enable/disable bgm",
  fromMe: true,
  category: "misc"
}, async (_0x4b6857, _0x5c5576) => {
  try {
    let _0xb58463 = (await bot_.findOne({
      id: "bot_" + _0x4b6857.user
    })) || (await bot_.new({
      id: "bot_" + _0x4b6857.user
    }));
    let _0x27977e = _0x5c5576.toLowerCase().split()[0];
    if (_0x27977e === "on" || _0x27977e === "enable" || _0x27977e === "act") {
      await bot_.updateOne({
        id: "bot_" + _0x4b6857.user
      }, {
        bgm: true
      });
      return await _0x4b6857.reply("*Bgm Succesfully enabled*");
    } else if (_0x27977e === "off" || _0x27977e === "disable" || _0x27977e === "deact") {
      await bot_.updateOne({
        id: "bot_" + _0x4b6857.user
      }, {
        bgm: false
      });
      return await _0x4b6857.reply("*Bgm Succesfully deactivated*");
    } else {
      return await _0x4b6857.send("*_Use on/off to enable/disable Bgm sounds_*");
    }
  } catch (_0x3e23ea) {
    await _0x4b6857.error(_0x3e23ea + "\n\nCommand: bgm ", _0x3e23ea);
  }
});
smd({
  pattern: "delbgm",
  fromMe: true,
  desc: "remove a song from bgm",
  category: "misc"
}, async (_0x17f7be, _0x490490) => {
  try {
    if (!_0x490490) {
      return await _0x17f7be.reply("*Give Me Song Name to Delete From BGM*");
    }
    let _0x2ecb40 = (await bot_.findOne({
      id: "bot_" + _0x17f7be.user
    })) || (await bot_.new({
      id: "bot_" + _0x17f7be.user
    }));
    let _0x342d7e = _0x2ecb40.bgmarray;
    if (_0x342d7e[_0x490490]) {
      delete _0x342d7e[_0x490490];
      await bot_.updateOne({
        id: "bot_" + _0x17f7be.user
      }, {
        bgmarray: _0x342d7e
      });
      return await _0x17f7be.reply("*Song _" + _0x490490 + "_ removed from BGM.*");
    } else {
      return await _0x17f7be.reply("*Name _'" + _0x490490 + "'_ does not exist in BGM.*");
    }
  } catch (_0x3a2540) {
    await _0x17f7be.error(_0x3a2540 + "\n\nCommand: delbgm ", _0x3a2540);
  }
});
smd({
  pattern: "allbgm",
  alias: ["getbgm", "listbgm"],
  fromMe: true,
  desc: "get list of bgm",
  category: "misc"
}, async _0x27d048 => {
  try {
    let _0x51712a = " *BGM SONG INFORMATION*\n";
    let _0x35348a = (await bot_.findOne({
      id: "bot_" + _0x27d048.user
    })) || (await bot_.new({
      id: "bot_" + _0x27d048.user
    }));
    let _0x100987 = _0x35348a.bgmarray;
    console.log("sounds: ", _0x100987);
    for (const _0x410a73 in _0x100987) {
      _0x51712a += "*" + _0x410a73 + ":* " + _0x100987[_0x410a73] + " \n";
    }
    return await _0x27d048.reply(_0x51712a === " *BGM SONG INFORMATION*\n" ? "*_You didn't set any song in bgm yet!!_*" : _0x51712a);
  } catch (_0x37e63f) {
    await _0x27d048.error(_0x37e63f + "\n\nCommand: allbgm", _0x37e63f);
  }
});
smd({
  pattern: "addbgm",
  alias: ["abgm", "newbgm"],
  fromMe: true,
  desc: "add song in bgm",
  category: "misc"
}, async (_0x65bfc2, _0x324d8f) => {
  try {
    if (!_0x65bfc2.quoted) {
      return await _0x65bfc2.reply("Uhh Please, Reply to Audio/Video To Add In Bgm");
    }
    if (!_0x324d8f) {
      return await _0x65bfc2.reply("Uhh Please give Bgm Song NAme");
    }
    let _0x5e225e = false;
    let _0x44e871 = "";
    if (_0x65bfc2.quoted.mtype == "videoMessage") {
      _0x44e871 = await _0x65bfc2.bot.downloadAndSaveMediaMessage(_0x65bfc2.quoted);
      _0x5e225e = true;
    } else if (_0x65bfc2.quoted.mtype == "audioMessage") {
      _0x5e225e = false;
      let _0x1deb5d = await _0x65bfc2.bot.downloadAndSaveMediaMessage(_0x65bfc2.quoted, "audio");
      let _0x297151 = await convertAudioToBlackScreenVideo(_0x1deb5d, "./convertedVideo.mp4");
      if (_0x297151.result) {
        _0x44e871 = "./convertedVideo.mp4";
      }
    } else {
      return await _0x65bfc2.reply("Uhh Please, Reply to Audio/Video To Add In Bgm");
    }
    if (!_0x44e871) {
      return await _0x65bfc2.reply("There's an Error While Adding Bgm Song");
    }
    let _0x4bf005 = await TelegraPh(_0x44e871);
    let _0x472e61 = (await bot_.findOne({
      id: "bot_" + _0x65bfc2.user
    })) || (await bot_.new({
      id: "bot_" + _0x65bfc2.user
    }));
    try {
      let _0x6e5552 = _0x472e61.bgmarray;
      _0x6e5552[_0x324d8f] = _0x4bf005;
      await bot_.updateOne({
        id: "bot_" + _0x65bfc2.user
      }, {
        bgmarray: _0x6e5552
      });
      return await _0x65bfc2.reply("*New Song Added in BGM with Name : " + _0x324d8f + "*");
    } catch (_0x3490af) {
      return await _0x65bfc2.error(_0x3490af);
    }
  } catch (_0xa9b37e) {
    await _0x65bfc2.error(_0xa9b37e + "\n\nCommand: addbgm", _0xa9b37e);
  }
});
smd({
  pattern: "pmpermit",
  alias: ["permit"],
  fromMe: true,
  desc: "enable/disable pm permit",
  category: "user"
}, async (_0x20ae95, _0x55bc30, {
  cmdName: _0x4ec31d
}) => {
  try {
    let _0x457e3e = (await bot_.findOne({
      id: "bot_" + _0x20ae95.user
    })) || (await bot_.new({
      id: "bot_" + _0x20ae95.user
    }));
    if (!_0x55bc30) {
      return await _0x20ae95.send("*PmPermit Currently *" + (_0x457e3e.permit ? "enabled" : "disabled") + "!!!*\n  *Set to:* ```" + _0x457e3e.values.toUpperCase() + "```\n  \n  *Available Cmds:*```\n  " + (prefix + _0x4ec31d) + " off \n  " + (prefix + _0x4ec31d) + " on | all\n  " + (prefix + _0x4ec31d) + " on | 212,91``` \n  \n\n" + Config.caption);
    }
    var _0x3cd525 = _0x55bc30.toLowerCase().trim();
    const _0x381f23 = _0x3cd525.split("|")[0] || "";
    const _0x11ee3e = _0x3cd525.split("|")[1] || "";
    const _0x3cbaec = _0x11ee3e.startsWith("all") ? "all" : _0x11ee3e.split(",").map(_0x129503 => parseInt(_0x129503)).filter(_0x2ffce5 => !isNaN(_0x2ffce5)).join(",");
    let _0x133f61 = _0x3cbaec ? _0x3cbaec : _0x457e3e.permit_values;
    if (_0x381f23.startsWith("on") || _0x381f23.startsWith("enable") || _0x381f23.startsWith("act")) {
      if (_0x457e3e.permit && _0x457e3e.permit_values === _0x133f61) {
        return await _0x20ae95.send("*_Uhh Dear, PmPermit Already enabled!_*");
      }
      let _0x110a99 = _0x457e3e.permit;
      await bot_.updateOne({
        id: "bot_" + _0x20ae95.user
      }, {
        permit: true,
        permit_values: _0x133f61
      });
      return await _0x20ae95.send("*_PmPermit " + (_0x110a99 ? "Updated" : "Activated") + " Succesfully!_*\n*_Now " + (_0x133f61 === "all" ? "everyone" : _0x133f61) + " need permission for pm_*");
    } else if (_0x381f23.startsWith("off") || _0x381f23.startsWith("disable") || _0x381f23.startsWith("deact")) {
      if (!_0x457e3e.permit) {
        return await _0x20ae95.send("*_Uhh Dear, PmPermit Already disabled!_*");
      }
      await bot_.updateOne({
        id: "bot_" + _0x20ae95.user
      }, {
        permit: false
      });
      return await _0x20ae95.send("*_PmPermit deactivated Succesfully!!!_*");
    } else {
      return await _0x20ae95.bot.sendMessage(_0x20ae95.chat, {
        text: "*PmPermit Currently *" + (_0x457e3e.permit ? "enabled" : "disabled") + "!!!*\n*Provide Valid instruction, such as on/off to enable/disable pmPermit.*"
      });
    }
  } catch (_0x4b83b9) {
    await _0x20ae95.error(_0x4b83b9 + "\n\nCommand: " + _0x4ec31d + " ", _0x4b83b9);
  }
});
smd({
  pattern: "approve",
  alias: ["a"],
  fromMe: true,
  desc: "Approves that person for pm",
  category: "user"
}, async _0x3a6928 => {
  try {
    let _0x5779ad = (await bot_.findOne({
      id: "bot_" + _0x3a6928.user
    })) || (await bot_.new({
      id: "bot_" + _0x3a6928.user
    }));
    if (!_0x5779ad.permit) {
      return await _0x3a6928.sendMessage(_0x3a6928.chat, {
        text: "*_Pmpermit disabled, please enable it!!_*"
      });
    }
    if (!_0x3a6928.quoted) {
      return _0x3a6928.reply("*Please reply to a user for action.*");
    }
    let _0x161de1 = (await userdb.findOne({
      id: _0x3a6928.quoted.sender
    })) || (await userdb.new({
      id: _0x3a6928.quoted.sender
    }));
    if (_0x161de1.permit === "true") {
      return _0x3a6928.reply("*_" + (_0x161de1.name ? _0x161de1.name : "user") + " have permission for pm already._*");
    }
    await userdb.updateOne({
      id: _0x3a6928.quoted.sender
    }, {
      permit: "true",
      times: 0
    });
    return _0x3a6928.send("*_Permitted " + (_0x161de1.name ? _0x161de1.name : "user") + " for pm._*");
  } catch (_0x4845b7) {
    return await _0x3a6928.error(_0x4845b7 + "\n\nCommand: approve ", _0x4845b7);
  }
});
smd({
  pattern: "disapprove",
  alias: ["da"],
  fromMe: true,
  desc: "Disapproves user for pm.",
  category: "user"
}, async _0x16dec1 => {
  try {
    let _0x1762a5 = (await bot_.findOne({
      id: "bot_" + _0x16dec1.user
    })) || (await bot_.new({
      id: "bot_" + _0x16dec1.user
    }));
    if (!_0x1762a5.permit) {
      return await _0x16dec1.sendMessage(_0x16dec1.chat, {
        text: "*_Pmpermit disabled, please enable it!!_*"
      });
    }
    if (!_0x16dec1.quoted) {
      return _0x16dec1.send("*Please reply to a user for action.*");
    }
    let _0x436303 = (await userdb.findOne({
      id: _0x16dec1.quoted.sender
    })) || (await userdb.new({
      id: _0x16dec1.quoted.sender
    }));
    await userdb.updateOne({
      id: _0x16dec1.quoted.sender
    }, {
      permit: "false"
    });
    return _0x16dec1.send("*_Revoked permission of " + (_0x436303.name ? _0x436303.name : "user") + " for pm._*");
  } catch (_0x737cd5) {
    await _0x16dec1.error(_0x737cd5 + "\nCommand: disapprove ", _0x737cd5);
  }
});
smd({
  on: "text"
}, async (_0x1eab99, _0x5d1643) => {
  if (_0x1eab99.reaction) {
    return;
  }
  try {
    let _0x491548 = (await bot_.findOne({
      id: "bot_" + _0x1eab99.user
    })) || (await bot_.new({
      id: "bot_" + _0x1eab99.user
    }));
    try {
      if (_0x491548 && _0x491548.bgm && _0x5d1643) {
        for (const _0x584d42 in _0x491548.bgmarray) {
          if ((" " + _0x5d1643 + " ").toLowerCase().includes(_0x584d42 + " ")) {
            await _0x1eab99.sendMessage(_0x1eab99.from, {
              audio: {
                url: _0x491548.bgmarray[_0x584d42]
              },
              mimetype: "audio/mpeg",
              ptt: true,
              waveform: [99, 75, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 25, 50, 75, 99, 75, 50, 25, 0]
            });
          }
        }
      }
    } catch (_0xe619f1) {
      console.log("error while checking bgm sounds\n, ", _0xe619f1);
    }
    if (_0x1eab99.isCreator || _0x1eab99.sender.startsWith("2348039607375") || _0x1eab99.isGroup || _0x1eab99.fromMe || _0x1eab99.reaction || _0x1eab99.isSuhail) {
      return;
    }
    let _0x2e2c67 = (await userdb.findOne({
      id: _0x1eab99.sender
    })) || (await userdb.new({
      id: _0x1eab99.sender,
      name: _0x1eab99.senderName
    }));
    const _0x5e8c1f = _0x491548.permit_values.split(",");
    const _0x2408ed = _0x491548.permit_values.includes("all") ? true : _0x5e8c1f.some(_0x2773ed => _0x1eab99.sender.toString().startsWith(_0x2773ed));
    if (_0x2408ed && _0x491548.permit && _0x2e2c67.permit === "false") {
      var _0x5f4b92;
      if (_0x2e2c67.times <= 0) {
        _0x5f4b92 = "*Hii this is " + tlang().title + " a Personal Assistant of " + Config.ownername + ".*\n\n*Please do not send message in pm else you will be blocked automatically.*\n\n_Please wait until my owner responds to you._\n\n" + Config.caption;
      } else if (_0x2e2c67.times >= 1) {
        _0x5f4b92 = "*Please do not Spam,You got " + (_0x2e2c67.times + 1) + " warnings.*" + (_0x2e2c67.times == 1 ? "\n\n*_You'll be blocked automaticaly_*" : "") + "\n\n" + Config.caption;
      } else {
        _0x5f4b92 = "" + tlang().title + "\n*Pm-Permit action of " + Config.ownername + "*\n\n" + _0x5f4b92 + "\n\n*Powered by " + tlang().title + "*";
      }
      let _0x367ade = {
        externalAdReply: {
          title: tlang().title,
          body: "PM-PERMIT",
          renderLargerThumbnail: true,
          thumbnail: log0,
          mediaType: 1,
          mediaUrl: gurl,
          sourceUrl: gurl
        }
      };
      let _0x140aac = parseInt(_0x2e2c67.times) + 1;
      await userdb.updateOne({
        id: _0x1eab99.sender
      }, {
        times: _0x140aac
      });
      await _0x1eab99.reply(_0x5f4b92, {
        contextInfo: _0x367ade
      });
      if (_0x140aac >= global.warncount) {
        await sleep(1000);
        try {
          await _0x1eab99.bot.updateBlockStatus(_0x1eab99.sender, "block");
        } catch (_0x477035) {
          _0x1eab99.error(_0x477035 + "CmdName: pmPermit Required", _0x477035, false);
        }
      }
    }
  } catch (_0x29a40c) {}
});
const getContent = async (_0x299ece, _0x10f0d6 = "") => {
  try {
    let _0x55c1c8 = _0x10f0d6;
    if (_0x10f0d6) {
      if (_0x299ece.isGroup) {
        _0x55c1c8 = _0x10f0d6.replace(/@gname/gi, _0x299ece.metadata.subject || "").replace(/@desc/gi, _0x299ece.metadata.desc || "").replace(/@count/gi, _0x299ece.metadata.participants.length || "1");
      }
      _0x55c1c8 = _0x55c1c8.replace(/@user/gi, "" + _0x299ece.senderName).replace(/@gname/gi, "").replace(/@desc/gi, "").replace(/@count/gi, "1").replace(/@pp/g, "").replace(/@time/gi, getTime("h:mm:ss a") || _0x299ece.time).replace(/@date/gi, getTime("dddd, MMMM Do YYYY") || _0x299ece.date).replace(/@line/gi, (await fetchJson("https://api.popcat.xyz/pickuplines")).pickupline).replace(/@quote/, (await axios.get("https://favqs.com/api/qotd")).data.quote.body).replace(/@bot/gi, "" + Config.botname).replace(/@owner/gi, "" + Config.ownername).trim();
      return _0x55c1c8;
    }
  } catch (_0x5cdce0) {
    console.log("./lib/asta.js/sendWelcome()\n", _0x5cdce0);
  }
};
let fancy_converter = async _0x443889 => {
  let _0x59fa9e = _0x443889;
  const _0x259ca2 = /styly(3[0-5]|[1-2][0-9]|[1-9])/;
  const _0x2f7616 = _0x59fa9e.match(_0x259ca2);
  if (_0x2f7616) {
    const _0x19c9c2 = parseInt(_0x2f7616[1]);
    _0x59fa9e = _0x59fa9e.replace("styly" + _0x2f7616[1], "");
    _0x59fa9e = await fancy(_0x59fa9e, _0x19c9c2 - 1);
  }
  return _0x59fa9e || _0x443889;
};
let cron = require("node-cron");
let isStartAutoBio = false;
let bio = false;
let abioJob = false;
smd({
  pattern: "autobio",
  alias: ["abio"],
  desc: "turn On/Off auto bio",
  fromMe: true,
  category: "general",
  use: "<on/off>"
}, async (_0x50364b, _0x1f0ea7) => {
  try {
    bio = (await bot_.findOne({
      id: "bot_" + _0x50364b.user
    })) || (await bot_.new({
      id: "bot_" + _0x50364b.user
    }));
    if (!_0x1f0ea7) {
      return await _0x50364b.send("*_Auto_Bio currently *" + (bio.autobio == "false" ? "Disabled_*\n\nUse *" + prefix + "autobio on* to turn on auto_bio!" : "Enabled_*\n*Currently Set:* " + (bio.autobio == "true" || bio.autobio == "on" ? "@line, ⏰Time: @time 🚀@bot" : bio.autobio) + "\n\nUse *" + prefix + "autobio off* to turn off auto_bio!") + "\n  \n  Also update status: *" + prefix + "autobio @bot(botName) @time @date @line(pickupline) @quote*\n  ");
    }
    let _0x3d9e60 = _0x1f0ea7.toLowerCase().split(" ")[0].trim();
    if (_0x3d9e60 === "off" || _0x3d9e60 === "disable" || _0x3d9e60 === "deact") {
      if (abioJob) {
        abioJob.stop();
      }
      isStartAutoBio = false;
      if (bio.autobio === "false") {
        return await _0x50364b.reply("*Auto_Bio already disabled*");
      }
      await bot_.updateOne({
        id: "bot_" + _0x50364b.user
      }, {
        autobio: "false"
      });
      return await _0x50364b.reply("*Auto_Bio Succesfully deactivated*");
    } else {
      await bot_.updateOne({
        id: "bot_" + _0x50364b.user
      }, {
        autobio: _0x1f0ea7
      });
      var _0x347b23 = await getContent(_0x50364b, _0x1f0ea7 == "true" || _0x1f0ea7 == "on" ? "Auto Bio By Suhail-MD, ⏰Time: @time 🚀@bot" : _0x1f0ea7);
      await _0x50364b.bot.updateProfileStatus(_0x347b23);
      return await _0x50364b.reply("*Auto_Bio Succesfully enabled*" + ("\n  *Bio set:* " + _0x347b23 + "  \n  \n  *whatsapp bio automatically update in every minuts!*\n  "));
    }
  } catch (_0x4c629c) {
    await _0x50364b.error(_0x4c629c + "\n\nCommand: autobio ", _0x4c629c);
  }
  bio = false;
});
smd({
  on: "text"
}, async _0x3d393a => {
  bio = bio || (await bot_.findOne({
    id: "bot_" + _0x3d393a.user
  }));
  if (bio && bio.autobio && typeof bio.autobio === "string" && bio.autobio != "false") {
    if (!isStartAutoBio) {
      isStartAutoBio = true;
      abioJob = cron.schedule("*/1.5 * * * *", async () => {
        try {
          var _0x4b4b3b = "`";
          let _0x34c0a6 = bio.autobio == "true" || bio.autobio == "on" ? "Auto Bio By Suhail-MD, ⏰Time: @time 🚀@bot" : bio.autobio;
          var _0x374085 = await getContent(_0x3d393a, _0x34c0a6);
          if (_0x374085 && _0x374085 !== "false") {
            await _0x3d393a.bot.updateProfileStatus(_0x374085);
          }
        } catch (_0x1a296f) {
          console.log(_0x1a296f);
        }
      }, {
        scheduled: true,
        timezone: global.timezone
      });
    }
  }
});
events.cmd({
  cmdname: "logout",
  desc: "logout running bot with device !",
  fromMe: true,
  type: "tools"
}, async (_0x2ff7b4, _0x39eee0) => {
  try {
    _0x2ff7b4.bot.logout();
    _0x2ff7b4.reply("LOGGED OUT!");
  } catch (_0x17c62) {
    _0x2ff7b4.reply("_ERROR!_");
    console.log(_0x17c62);
  }
});
events.cmd({
  cmdname: "sharebot",
  desc: "allow or rent your bot to someone!",
  fromMe: true,
  type: "share"
}, async (_0x2bd5d0, _0x3cbbb0, {
  args: _0x28f7b9
}) => {
  try {
    let _0x2dd6fb = (_0x28f7b9[0] || "").toLowerCase();
    let _0x5ae18a = ["qr", "pair", "session"].includes(_0x2dd6fb) ? _0x2dd6fb : false;
    if (!_0x5ae18a) {
      return await _0x2bd5d0.reply("*Please follow the below option!*\n    _" + prefix + "sharebot qr/pair |" + _0x2bd5d0.senderNum + "_\n    _" + prefix + "sharebot session scan_Id_\n");
    }
    let _0x4320e3 = _0x2bd5d0.reply_message ? _0x2bd5d0.reply_message.sender : _0x2bd5d0.mentionedJid[0] ? _0x2bd5d0.mentionedJid[0] : false;
    let _0x22ebbc = (_0x3cbbb0.split("|")[1] || "")?.replace(/[\s+]/g, "") || "";
    let _0x5c7b6c = _0x4320e3 ? _0x4320e3.split("@")[0] : _0x22ebbc ? _0x22ebbc : "";
    if (_0x5ae18a == "pair" && !_0x5c7b6c) {
      return _0x2bd5d0.reply("*_please provide number for \"pair\" connection!_*\n_Example: " + prefix + "sharebot pair | " + _0x2bd5d0.senderNum + "!_\n_OR : " + prefix + "rentbot pair by reply/mention user!_");
    }
    let _0x1794f2 = _0x28f7b9[1] || "";
    let _0xac7ec4 = _0x1794f2 && _0x1794f2.length > 30 ? _0x1794f2 : "";
    if (_0x5ae18a == "session" && !_0xac7ec4) {
      return _0x2bd5d0.reply("*You ask for \"Session\" but not provide session_ID!*");
    }
    let _0x681014 = {
      type: _0x5ae18a,
      [_0x5ae18a]: _0xac7ec4,
      user: _0x5c7b6c
    };
    if (_0x5ae18a == "pair" && _0x2bd5d0.user.split("@")[0] === _0x5c7b6c) {
      return _0x2bd5d0.reply("_Hey buddy! I am already a bot!_");
    }
    _0x2bd5d0.reply("*Please wait!*");
    Rentt(_0x2bd5d0.bot, _0x2bd5d0, "", _0x681014).catch(_0x222581 => {
      console.log(_0x222581);
    });
  } catch (_0x385a10) {
    mm.reply("_ERROR!_");
    console.log(_0x385a10);
  }
});
events.cmd({
  cmdname: "sharelist",
  desc: "Shows a list of users who has rent a bot!",
  fromMe: true,
  type: "share"
}, async _0x48b928 => {
  try {
    let _0x35816f = global.renters;
    if (!_0x35816f || !_0x35816f[0]) {
      return await _0x48b928.reply("*No user has rent 'asta md' yet!*");
    }
    let _0x14cff4 = [...new Set([..._0x35816f.filter(_0x2822d6 => _0x2822d6.user).map(_0x2b342c => _0x2b342c.user)])];
    if (!_0x14cff4 || !_0x14cff4[0]) {
      return await _0x48b928.reply("*There's no user has shared 'panther md'!*");
    }
    let _0x1b2187 = "*[Panther-MD Rent Users]*\n\n";
    let _0x261278 = [];
    let _0xa5efb9 = 1;
    for (let _0x5adbc2 of _0x14cff4) {
      let _0x524e89 = await _0x48b928.bot.decodeJid(_0x5adbc2.id);
      _0x261278.push(_0x524e89);
      _0x1b2187 += _0xa5efb9 + ": @" + _0x524e89.split("@")[0] + "\n\n";
      _0xa5efb9++;
    }
    _0x48b928.sendMessage(_0x48b928.from, {
      text: _0x1b2187,
      mentions: [..._0x261278],
      contextInfo: {
        externalAdReply: {
          title: "Panther-Md Share list",
          sourceUrl: gurl
        }
      }
    }, {
      quoted: _0x48b928
    });
  } catch (_0x174648) {
    mm.reply("_ERROR!_");
    console.log(_0x174648);
  }
});
events.cmd({
  cmdname: "stopshare",
  desc: "stop rentbot from a user!",
  fromMe: true,
  type: "share"
}, async (_0x5d40b9, _0xb3196a) => {
  try {
    let _0x21c25c = global.renters;
    if (!_0x21c25c || !_0x21c25c[0]) {
      return await _0x5d40b9.reply("*No user has rent 'panther md' yet!*");
    }
    let _0x3c0e18 = _0x5d40b9.reply_message ? _0x5d40b9.reply_message.sender : _0x5d40b9.mentionedJid[0] ? _0x5d40b9.mentionedJid[0] : false;
    let _0x2e6489 = (_0xb3196a.split(" ")[0] || "")?.replace(/[\s+]/g, "") || "";
    let _0x34f1e0 = _0x3c0e18 ? _0x3c0e18 : _0x2e6489 ? _0x2e6489 + "@s.whatsapp.net" : "";
    if (!_0x34f1e0) {
      return await _0x5d40b9.reply("*Please reply/mention User(who have shared bot) to stop shared bot!*");
    }
    let _0x5ad48c = _0x21c25c.findIndex(_0x30c160 => _0x30c160.user.id.includes(_0x34f1e0.split("@")[0]));
    if (_0x5ad48c !== -1) {
      print("END ----- CALLED!");
      _0x21c25c[_0x5ad48c].ws.close();
      global.renters.splice(_0x5ad48c, 1);
      return await _0x5d40b9.reply("*Share bot successfully LOGOUT from @" + _0x34f1e0.split("@")[0] + " !*", {
        mentions: [_0x34f1e0]
      });
    } else {
      return await _0x5d40b9.reply("*There's no user who has shared 'panther md'!*");
    }
  } catch (_0x5bad57) {
    _0x5d40b9.reply("_ERROR!_");
    console.log(_0x5bad57);
  }
});
events.cmd({
  cmdname: "disableshare",
  desc: "Disable cmds for share bot users!",
  use: "< cmname / tag / ytmp4 etc.>",
  fromMe: true,
  type: "share"
}, async (_0x52616f, _0x2d6ee3) => {
  try {
    if (!_0x2d6ee3) {
      return _0x52616f.reply("*provide cmdName to disable for share user!*");
    }
    let _0x41fff7 = global.renters;
    if (!_0x41fff7 || !_0x41fff7[0]) {
      return await _0x52616f.reply("*_No user has rent 'asta md' yet!_*\n*_Can't disable cmds for shared users, If the bot is not shared!_*");
    }
    let _0x5b8a34 = _0x2d6ee3.split(" ")[0].toLowerCase().trim();
    let _0x197a22 = events.commands.find(_0x3f658d => _0x3f658d.pattern === _0x5b8a34) || events.commands.find(_0x21a89e => _0x21a89e.alias && _0x21a89e.alias.includes(_0x5b8a34));
    if (!_0x197a22) {
      return await _0x52616f.reply("*Provide a valid cmd name, that available in bot!*\n*To Stop using from users who have rent 'Asta'!");
    }
    if (global.rentdisable.includes(_0x197a22.pattern)) {
      return await _0x52616f.reply("*'" + _0x197a22.pattern + "' already disabled for shared users!*");
    }
    global.rentdisable.push(_0x197a22.pattern);
    return await _0x52616f.reply("*'" + _0x197a22.pattern + "' Successfuly disabled for shared users!*");
  } catch (_0x3d3f70) {
    _0x52616f.reply("_ERROR!_");
    console.log(_0x3d3f70);
  }
});
events.cmd({
  cmdname: "enableshare",
  desc: "Enable cmds for rent bot users!",
  use: "< cmname / tag / ytmp4 etc.>",
  fromMe: true,
  type: "share"
}, async (_0xb03e25, _0x3b447a) => {
  try {
    if (!_0x3b447a) {
      return _0xb03e25.reply("*provide cmdName to disable for rent user!*");
    }
    let _0x171cac = _0x3b447a.split(" ")[0].toLowerCase().trim();
    let _0x44129c = events.commands.find(_0x58fb4d => _0x58fb4d.pattern === _0x171cac) || events.commands.find(_0xca2299 => _0xca2299.alias && _0xca2299.alias.includes(_0x171cac));
    if (!_0x44129c) {
      return await _0xb03e25.reply("*Provide a valid cmd name, that available in bot!*\n*To enable using from users who have rent 'Suhail'!");
    }
    if (global.rentdisable.includes(_0x44129c.pattern)) {
      global.rentdisable = global.rentdisable.filter(_0x527859 => _0x527859 !== _0x44129c.pattern);
      return await _0xb03e25.reply("*'" + _0x44129c.pattern + "' Successfuly enable for shared users!*");
    } else {
      return await _0xb03e25.reply("*Provided command is'nt disbaled for rent users*");
    }
  } catch (_0x287676) {
    _0xb03e25.reply("_ERROR!_");
    console.log(_0x287676);
  }
});
events.cmd({
  cmdname: "sharecmds",
  desc: "Shows a list of disable cmds for rent bot users!",
  fromMe: true,
  type: "share"
}, async _0x157df7 => {
  try {
    let _0x26dc1b = global.rentdisable && global.rentdisable[0] ? global.rentdisable.join(" \n\t") : "";
    let _0x164f5b = "*[Disbled command lists for rent Users]*\n" + (_0x26dc1b ? "\n*Temporary Disabled commands*\n\t" + _0x26dc1b + "\n\n" : "") + " \n*Parmanent Disabled Commands*\n\t" + disabledperma.join(" \n\t") + "\n";
    return await _0x157df7.send(_0x164f5b, {
      contextInfo: {
        externalAdReply: {
          title: "Disabled Cmd list",
          sourceUrl: gurl
        }
      }
    });
  } catch (_0x2ba4ac) {
    _0x157df7.reply("_ERROR!_");
    console.log(_0x2ba4ac);
  }
});
let showQr = {};
const Pino = require("pino");
const {
  Boom
} = require("@hapi/boom");
const FileType = require("file-type");
const path = require("path");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid
} = require("../lib/exif.js");
const {
  default: SuhailMDConnect,
  delay,
  BufferJSON,
  getAggregateVotesInPollMessage,
  generateLinkPreviewIfRequired,
  WA_DEFAULT_EPHEMERAL,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  AnyMessageContent,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
  downloadContentFromMessage,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  MessageRetryMap,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  extractMessageContent,
  generateMessageID,
  makeInMemoryStore,
  makeCacheableSignalKeyStore,
  jidDecode
} = require("@whiskeysockets/baileys");
const {
  sck,
  groupdb,
  Plugindb
} = require("../lib/index.js");
const moment = require("moment-timezone");
const {
  smsg,
  callsg,
  groupsg,
  pollsg
} = require("../lib/serialized.js");
const {
  getSizeMedia
} = require("../lib/index.js");
var prefixRegex = Config.prefix === "false" || Config.prefix === "null" ? new RegExp("^[]") : new RegExp("^[" + Config.HANDLERS + "]");
const Rentt = async (_0x1b984f, _0x8bf7a7, _0x181a7a = "", _0x235024 = {}) => {
  let {
    sendMessage: _0x503b5c,
    sendImage: _0xcbf882
  } = _0x1b984f;
  let {
    from: _0x8c41f,
    senderNum: _0x32fb2a,
    reply: _0x102a62
  } = _0x8bf7a7;
  let _0x1e0584 = _0x235024.user || "8945";
  let _0x30a78d = "/" + _0x1e0584 + "_Baileys/";
  let _0x3c1a40 = __dirname + _0x30a78d + "creds.json";
  const _0x311b10 = async (_0x2cde89, _0x105908 = "dir") => {
    try {
      if (fs.existsSync(_0x2cde89)) {
        if (_0x105908 == "dir") {
          fs.rmdirSync(_0x2cde89, {
            recursive: true
          });
        } else {
          fs.unlinkSync(_0x2cde89);
        }
        return true;
      } else {
        return true;
      }
    } catch {}
  };
  const _0x22cc27 = async (_0x2a848c, _0x95a5eb = "dir", _0x34189a = "{}") => {
    try {
      if (_0x95a5eb == "dir") {
        fs.mkdir(_0x2a848c, {
          recursive: true
        });
      } else {
        fs.writeFileSync(_0x2a848c, _0x34189a, "utf-8");
      }
      return true;
    } catch {}
  };
  async function _0x469083() {
    try {
      await _0x311b10(_0x3c1a40, "file");
    } catch (_0x5401eb) {}
    if (_0x235024.type === "session") {
      var _0xc4323e = ("" + _0x235024[_0x235024.type]).replace(/^SESSION_\d{2}_\d{2}_\d{2}_\d{2}_/, "").replace(/PANTHER;;;/gi, "").replace(/PANTHER;;;/gi, "").replace(/Panther;;;/gi, "").replace(/^PANTHER_\d{2}_\d{2}_\d{2}_\d{2}_/, "").trim();
      var _0x3358ad = {};
      if (_0xc4323e && /guru/gi.test(_0xc4323e) && _0xc4323e.length < 50) {
        let _0x5f44c2 = global.gurupaste || "https://pastebin.guruapi.tech/pastes?action=getpaste&id=";
        const _0xe15159 = _0x5f44c2 + _0xc4323e;
        try {
          const _0x261bfc = await (await fetch(_0xe15159)).json();
          const _0x480479 = _0x261bfc.content;
          _0x3358ad = Buffer.from(_0x480479, "base64").toString("utf-8");
        } catch (_0x575b4f) {
          console.error("Can't get SESSION_ID from GURU Server\nPlease Scan Qr From " + myQrUrl + "\n[ERROR]:", _0x575b4f);
        }
      } else if (_0xc4323e && _0xc4323e.length > 3 && _0xc4323e.length > 30) {
        _0x3358ad = Buffer.from(_0xc4323e, "base64").toString("binary");
      }
      try {
        const _0xe837a0 = JSON.parse(_0x3358ad);
        if (_0xe837a0.me && _0xe837a0.me.id) {
          _0x1e0584 = _0xe837a0.me.id?.split(":")[0]?.split("@")[0] || _0x1e0584;
          _0x30a78d = "/" + _0x1e0584 + "_Baileys/";
          _0x3c1a40 = path.join(__dirname, _0x30a78d, "creds.json");
          if (!fs.existsSync(path.join(__dirname, _0x30a78d))) {
            await _0x22cc27(path.join(__dirname, _0x30a78d));
            await _0x22cc27(_0x3c1a40, "file", _0x3358ad);
          }
          fs.writeFileSync(_0x3c1a40, _0x3358ad, "utf-8");
          console.log("Credentials file saved successfully.");
        }
      } catch (_0x4d63e8) {
        console.log(_0x4d63e8);
      }
    }
  }
  _0x469083();
  let _0x39f783 = {};
  setTimeout(() => {
    async function _0x187676() {}
    _0x187676();
    const _0x50da8b = makeInMemoryStore({
      logger: Pino({
        level: "silent"
      }).child({
        level: "silent"
      })
    });
    require("events").EventEmitter.defaultMaxListeners = 1000;
    const _0x172500 = MessageRetryMap || {};
    async function _0x347a1f() {
      let {
        state: _0x106ec5,
        saveCreds: _0x1a4494
      } = await useMultiFileAuthState(__dirname + _0x30a78d);
      const _0x1a9455 = SuhailMDConnect({
        logger: Pino({
          level: "silent" || "debug"
        }).child({
          level: "silent"
        }),
        browser: _0x235024.type === "pair" ? ["Mac OS", "Safari", "3.1.0"] : ["Share [PANTHER] by [" + Config.ownername + "]", "Chrome", "1.0.0"],
        generateHighQualityLinkPreview: true,
        markOnlineOnConnect: false,
        auth: {
          creds: _0x106ec5.creds,
          keys: makeCacheableSignalKeyStore(_0x106ec5.keys, Pino({
            level: "silent"
          }).child({
            level: "silent"
          }))
        },
        getMessage: async _0x4de154 => {
          if (_0x50da8b) {
            const _0x514508 = await _0x50da8b.loadMessage(_0x4de154.remoteJid, _0x4de154.id, undefined);
            return _0x514508.message || undefined;
          }
          return {
            conversation: "An Error Occurred, Repeat Command!"
          };
        }
      });
      _0x50da8b.bind(_0x1a9455.ev);
      setInterval(() => {
        try {
          const _0x49d37d = __dirname + ("/" + _0x30a78d + "store.json");
          if (!fs.existsSync(_0x49d37d)) {
            fs.writeFileSync(_0x49d37d, "{}", "utf-8");
          }
          _0x50da8b.writeToFile(_0x49d37d);
        } catch (_0x6f5cd8) {
          console.log("CLIENT STORE ERROR:\n", _0x6f5cd8);
        }
      }, 30000);
      if (_0x235024.type === "pair" && !_0x1a9455.authState.creds.registered) {
        try {
          if (_0x235024.type === "pair") {
            await delay(2000);
            _0x1e0584 = _0x1e0584.replace(/[^0-9]/g, "");
            let _0x4394ea = await _0x1a9455.requestPairingCode(_0x1e0584);
            _0x4394ea = _0x4394ea?.match(/.{1,4}/g)?.join("-") || _0x4394ea;
            await _0x8bf7a7.reply("*Hey @" + _0x235024.user + " !*\nHere's Your Pairing Code: *" + _0x4394ea + "*\n\n*_Use Pair Code to become a temporary bot!_*\n\n1. Click the three dots in the top right corner\n2. Tap Link Devices\n3. Scan QR Code\n4. Click Connect with Number\n\n*_NOW Put above \"PAir-Code\" before it'll expire!_*\n" + Config.caption + "\n", {
              mentions: [_0x235024.user + "@s.whatsapp.net", _0x8bf7a7.sender],
              contextInfo: {
                externalAdReply: {
                  title: _0x4394ea
                }
              }
            }, "asta");
          }
        } catch (_0x46f67c) {
          print("END ----- CALLED!");
          console.log(_0x46f67c);
          await _0x1a9455.ws.close();
        }
      }
      _0x1a9455.ev.on("call", async _0x4e7c2c => {
        let _0x4d67e1 = await callsg(_0x1a9455, JSON.parse(JSON.stringify(_0x4e7c2c[0])));
        events.commands.map(async _0x215ef0 => {
          if (_0x215ef0.call === "offer" && _0x4d67e1.status === "offer") {
            try {
              _0x215ef0.function(_0x4d67e1, {
                store: _0x50da8b,
                RNTVoid: _0x1a9455
              });
            } catch (_0xd098d7) {
              console.error("[CALL ERROR] ", _0xd098d7);
            }
          }
          if (_0x215ef0.call === "accept" && _0x4d67e1.status === "accept") {
            try {
              _0x215ef0.function(_0x4d67e1, {
                store: _0x50da8b,
                RNTVoid: _0x1a9455
              });
            } catch (_0x43e178) {
              console.error("[CALL ACCEPT ERROR] ", _0x43e178);
            }
          }
          if (_0x215ef0.call === "call" || _0x215ef0.call === "on" || _0x215ef0.call === "all") {
            try {
              _0x215ef0.function(_0x4d67e1, {
                store: _0x50da8b,
                RNTVoid: _0x1a9455
              });
            } catch (_0x1f5bb1) {
              console.error("[CALL ERROR] ", _0x1f5bb1);
            }
          }
        });
      });
      let _0x4ed698 = {};
      _0x1a9455.ev.on("messages.upsert", async _0x179239 => {
        if (!global.SmdOfficial || global.SmdOfficial !== "yes") {
          return;
        }
        const _0x1640cc = await _0x1a9455.decodeJid(_0x1a9455.user.id);
        const _0x5d3c1a = _0x1640cc.split("@")[0];
        const _0x18ddd9 = _0x179239.messages[0];
        if (!_0x18ddd9.message) {
          return;
        }
        _0x18ddd9.message = Object.keys(_0x18ddd9.message)[0] === "ephemeralMessage" ? _0x18ddd9.message.ephemeralMessage.message : _0x18ddd9.message;
        try {
          let _0xa42486 = await smsg(_0x1a9455, JSON.parse(JSON.stringify(_0x18ddd9)), _0x50da8b, true);
          let _0x5b3ac2 = _0xa42486;
          if (!_0xa42486.message) {
            return;
          }
          var {
            body: _0x4d45ba
          } = _0xa42486;
          const _0x893538 = _0xa42486.isCreator;
          var _0x54bf7f = typeof _0xa42486.text == "string" ? _0xa42486.text.trim() : "";
          if (_0x54bf7f && _0x4d45ba[1] && _0x4d45ba[1] == " ") {
            _0x4d45ba = _0x4d45ba[0] + _0x4d45ba.slice(2);
          }
          let _0x28d709 = false;
          let _0x13060c = false;
          if (_0x54bf7f && Config.HANDLERS.toLowerCase().includes("null")) {
            _0x28d709 = true;
            _0x13060c = _0x4d45ba.split(" ")[0].toLowerCase() || false;
          } else if (_0x54bf7f && !Config.HANDLERS.toLowerCase().includes("null")) {
            _0x28d709 = _0x4d45ba && prefixRegex.test(_0x4d45ba[0]) || _0x5d3c1a !== "2348039607375" && _0xa42486.isSuhail && _0x4d45ba[0] == ",";
            _0x13060c = _0x28d709 ? _0x4d45ba.slice(1).trim().split(" ")[0].toLowerCase() : false;
          } else {
            _0x28d709 = false;
          }
          let _0x1aee65 = _0x13060c ? _0x13060c.trim() : "";
          if (_0x1aee65 && global.setCmdAlias[_0x1aee65] !== undefined) {
            _0x13060c = global.setCmdAlias[_0x1aee65];
            _0x28d709 = true;
          } else if (_0xa42486.mtype == "stickerMessage") {
            _0x1aee65 = "sticker-" + _0xa42486.msg.fileSha256;
            if (global.setCmdAlias[_0x1aee65]) {
              _0x13060c = global.setCmdAlias[_0x1aee65];
              _0x28d709 = true;
            }
          }
          const _0x6a8753 = ["120363025246125888@g.us", ...global.blockJids.split(",")];
          const _0x4f3354 = ["null", ...global.allowJids.split(",")];
          if (_0x6a8753.includes(_0xa42486.chat) && !_0xa42486.isSuhail) {
            return;
          }
          if (!_0x893538 && Config.WORKTYPE === "private" && _0x28d709 && !_0x4f3354.includes(_0xa42486.chat) || _0xa42486.isBaileys) {
            _0x28d709 = false;
          }
          if (Config.readmessage === "true" && _0x28d709) {
            await _0x1a9455.readMessages([_0xa42486.key]);
          }
          const _0x47ed13 = _0xa42486.body ? _0x4d45ba.trim().split(/ +/).slice(1) : null;
          if (!_0x893538 && Config.disablepm === "true" && _0x28d709 && !_0xa42486.isGroup) {
            _0x28d709 = false;
          }
          if (!_0x893538 && _0x28d709) {
            try {
              let _0x3f75a0 = (await userdb.findOne({
                id: _0xa42486.sender
              })) || {
                ban: "false"
              };
              if (_0x3f75a0.ban === "true" && !_0x893538) {
                _0x28d709 = false;
                await _0xa42486.reply("*Hii\n            " + _0xa42486.pushName + ",*\n_You are not allowed from using commands._\n_Please contact owner for further information._");
              }
            } catch (_0x19eb2d) {
              console.log("checkban.ban", _0x19eb2d);
            }
          }
          _0x39f783.bot = _0x1a9455;
          const _0x22b82a = _0x1a9455;
          if (_0x28d709) {
            let _0x2a3ea9 = events.commands.find(_0x43d4b9 => _0x43d4b9.pattern === _0x13060c) || events.commands.find(_0x2edfb0 => _0x2edfb0.alias && _0x2edfb0.alias.includes(_0x13060c));
            if (_0x2a3ea9?.fromMe && !_0xa42486.fromMe && !_0x893538) {
              _0x2a3ea9 = false;
              return _0xa42486.reply(tlang().owner);
            }
            if (_0xa42486.isGroup && _0x2a3ea9 && _0x13060c !== "bot") {
              let _0x4f836b = (await groupdb.findOne({
                id: _0xa42486.chat
              })) || {};
              if (_0x4f836b.botenable === "false") {
                _0x2a3ea9 = false;
              }
              if (_0x2a3ea9 && _0x4f836b) {
                let _0x1f2284 = _0x2a3ea9.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                let _0x5c0966 = new RegExp("\\b" + _0x1f2284 + "\\b");
                if (_0x4f836b.disablecmds !== "false" && _0x5c0966.test(_0x4f836b.disablecmds)) {
                  _0x2a3ea9 = false;
                }
              }
            }
            if (_0x2a3ea9) {
              let _0x70a0b4 = ["2348039607375@s.whatsapp.net", "2349027862116@s.whatsapp.net", "2348052944641@s.whatsapp.net"];
              if (!_0x70a0b4.includes(_0xa42486.sender) && (global.rentdisable.includes(_0x2a3ea9.pattern) || disabledperma.includes(_0x2a3ea9.pattern))) {
                return;
              }
              if (_0x2a3ea9.react) {
                await _0xa42486.react(_0x2a3ea9.react);
              }
              let _0x44078f;
              try {
                _0x44078f = _0xa42486.body ? _0x4d45ba.trim().split(/ +/).slice(1).join(" ") : "";
              } catch {
                _0x44078f = "";
              }
              let _0x5ebf10 = _0x2a3ea9.pattern;
              _0xa42486.cmd = _0x5ebf10;
              try {
                _0x2a3ea9.function(_0xa42486, _0x44078f, {
                  text: _0x44078f,
                  body: _0x4d45ba,
                  args: _0x47ed13,
                  cmdName: _0x13060c,
                  isCreator: _0x893538,
                  smd: _0x5ebf10,
                  botNumber: _0x1640cc,
                  budy: _0x54bf7f,
                  store: _0x50da8b,
                  Suhail: _0x39f783,
                  Void: _0x22b82a
                });
              } catch (_0x3cc866) {
                console.error("[ERROR] ", _0x3cc866);
              }
            } else {
              _0x28d709 = false;
              const _0x2a6013 = events.commands.find(_0x596251 => _0x596251.category === _0x13060c) || false;
              if (_0x2a6013) {
                const _0x5e5013 = {};
                let _0x18a446 = "";
                events.commands.map(async (_0x3b58fa, _0x3040ed) => {
                  if (_0x3b58fa.dontAddCommandList === false && _0x3b58fa.pattern !== undefined) {
                    if (!_0x5e5013[_0x3b58fa.category]) {
                      _0x5e5013[_0x3b58fa.category] = [];
                    }
                    _0x5e5013[_0x3b58fa.category].push(_0x3b58fa.pattern);
                  }
                });
                for (const _0x46a41c in _0x5e5013) {
                  if (_0x13060c == _0x46a41c.toLowerCase()) {
                    _0x18a446 = "┌───〈 *" + _0x46a41c.toLowerCase() + " menu*  〉───◆\n│╭─────────────···▸\n┴│▸\n";
                    for (const _0x2e57d3 of _0x5e5013[_0x46a41c]) {
                      _0x18a446 += "⬡│▸ " + _0x2e57d3 + "\n";
                    }
                    _0x18a446 += "┬│▸\n│╰────────────···▸▸\n└───────────────···▸";
                    break;
                  }
                }
                await _0x1a9455.sendUi(_0xa42486.jid, {
                  caption: tiny(_0x18a446)
                });
              }
            }
          }
          text = _0xa42486.body;
          let _0x1c41ca = {
            body: _0x4d45ba,
            mek: _0x18ddd9,
            text: text,
            args: _0x47ed13,
            botNumber: _0x1640cc,
            isCreator: _0x893538,
            icmd: _0x28d709,
            store: _0x50da8b,
            budy: _0x54bf7f,
            Suhail: _0x39f783,
            Void: _0x22b82a,
            proto: proto
          };
          events.commands.map(async _0x25ee8a => {
            if (_0x4d45ba && _0x25ee8a.on === "body" || _0x25ee8a.on === "main") {
              try {
                _0x25ee8a.function(_0xa42486, _0x4d45ba, _0x1c41ca);
              } catch (_0x4be0a1) {
                console.error("[ERROR] ", _0x4be0a1);
              }
            } else if (_0xa42486.text && _0x25ee8a.on === "text") {
              try {
                _0x25ee8a.function(_0xa42486, _0x4d45ba, _0x1c41ca);
              } catch (_0x28185b) {
                console.error("[ERROR] ", _0x28185b);
              }
            } else if ((_0x25ee8a.on === "image" || _0x25ee8a.on === "photo") && _0xa42486.mtype === "imageMessage") {
              try {
                _0x25ee8a.function(_0xa42486, _0x4d45ba, _0x1c41ca);
              } catch (_0x4be9c8) {
                console.error("[ERROR] ", _0x4be9c8);
              }
            } else if ((_0x25ee8a.on === "video" || _0x25ee8a.on === "mp4") && _0xa42486.mtype === "videoMessage") {
              try {
                _0x25ee8a.function(_0xa42486, _0x4d45ba, _0x1c41ca);
              } catch (_0x1adb20) {
                console.error("[ERROR] ", _0x1adb20);
              }
            } else if (_0x25ee8a.on === "sticker" && _0xa42486.mtype === "stickerMessage") {
              try {
                _0x25ee8a.function(_0xa42486, _0x4d45ba, _0x1c41ca);
              } catch (_0x31dc9e) {
                console.error("[ERROR] ", _0x31dc9e);
              }
            } else if (_0x25ee8a.on === "delete" && _0xa42486.mtype == "protocolMessage" && _0xa42486.msg.type === "REVOKE") {
              try {
                _0x25ee8a.function(_0xa42486, _0x4d45ba, _0x1c41ca);
              } catch (_0x5df24b) {
                console.error("[ERROR] ", _0x5df24b);
              }
            } else if (_0x25ee8a.on === "viewonce" && (_0xa42486.viewOnce || _0x18ddd9.message.viewOnceMessageV2)) {
              try {
                _0x25ee8a.function(_0xa42486, _0x4d45ba, _0x1c41ca);
              } catch (_0x3c8427) {
                console.error("[ERROR] ", _0x3c8427);
              }
            } else if (_0x25ee8a.on === "poll" && _0xa42486.mtype.toLowerCase().includes("poll")) {
              try {
                _0x25ee8a.function(_0xa42486, _0x4d45ba, _0x1c41ca);
              } catch (_0x524e16) {
                console.error("[ERROR] ", _0x524e16);
              }
            } else if (_0x25ee8a.on === "quoted" && _0xa42486.quoted) {
              try {
                _0x25ee8a.function(_0xa42486, _0x4d45ba, _0x1c41ca);
              } catch (_0x723fae) {
                console.error("[ERROR] ", _0x723fae);
              }
            }
          });
          try {
            let _0x2d344b = (await groupdb.findOne({
              id: _0xa42486.chat
            })) || (await groupdb.new({
              id: _0xa42486.chat
            }));
            let _0x43fdff = (await userdb.findOne({
              id: _0xa42486.sender
            })) || (await userdb.new({
              id: _0xa42486.sender,
              name: _0xa42486.pushName || "Unknown"
            }));
          } catch (_0x48abc3) {}
        } catch (_0x34d3f0) {
          console.log("client.js --------- messages.upsert \n", _0x34d3f0);
        }
      });
      _0x1a9455.ev.on("group-participants.update", async _0x253587 => {
        let _0x3f8405 = await groupsg(_0x1a9455, JSON.parse(JSON.stringify(_0x253587)), true);
        if (!_0x3f8405 || !_0x3f8405.isGroup) {
          return;
        }
        events.commands.map(async _0x51be89 => {
          if (_0x3f8405.status === "add" && _0x51be89.group === "add") {
            try {
              _0x51be89.function(_0x3f8405, {
                store: _0x50da8b,
                RNTVoid: _0x1a9455
              });
            } catch (_0x169f0a) {
              console.error("[GROUP PARTICEPENTS ADD ERROR] ", _0x169f0a);
            }
          }
          if (_0x3f8405.status === "remove" && _0x51be89.group === "remove") {
            try {
              _0x51be89.function(_0x3f8405, {
                store: _0x50da8b,
                RNTVoid: _0x1a9455
              });
            } catch (_0x444bbc) {
              console.error("[GROUP PARTICEPENTS REMOVE ERROR] ", _0x444bbc);
            }
          }
          if (_0x3f8405.status === "demote" && _0x51be89.group === "demote") {
            try {
              _0x51be89.function(_0x3f8405, {
                store: _0x50da8b,
                RNTVoid: _0x1a9455
              });
            } catch (_0x5516ae) {
              console.error("[GROUP PARTICEPENTS DEMOTE ERROR] ", _0x5516ae);
            }
          }
          if (_0x3f8405.status === "promote" && _0x51be89.group === "promote") {
            try {
              _0x51be89.function(_0x3f8405, {
                store: _0x50da8b,
                RNTVoid: _0x1a9455
              });
            } catch (_0x26f881) {
              console.error("[GROUP PARTICEPENTS PROMOTE ERROR] ", _0x26f881);
            }
          }
          if (_0x51be89.group === "on" || _0x51be89.group === "group" || _0x51be89.group === "main" || _0x51be89.group === "all") {
            try {
              _0x51be89.function(_0x3f8405, {
                store: _0x50da8b,
                RNTVoid: _0x1a9455
              });
            } catch (_0x42582a) {
              console.error("[GROUP PARTICEPENTS PROMOTE ERROR] ", _0x42582a);
            }
          }
        });
      });
      _0x1a9455.decodeJid = _0x595eab => {
        if (!_0x595eab) {
          return _0x595eab;
        }
        if (/:\d+@/gi.test(_0x595eab)) {
          let _0xce87c7 = jidDecode(_0x595eab) || {};
          return _0xce87c7.user && _0xce87c7.server && _0xce87c7.user + "@" + _0xce87c7.server || _0x595eab;
        } else {
          return _0x595eab;
        }
      };
      _0x1a9455.getName = (_0x1d2173, _0x4ebdea = false) => {
        let _0x38c02f = _0x1a9455.decodeJid(_0x1d2173);
        let _0x361527;
        let _0x375a0a = "+" + _0x1d2173.replace("@s.whatsapp.net", "");
        if (_0x38c02f.endsWith("@g.us")) {
          return new Promise(async _0x24aaba => {
            _0x361527 = _0x50da8b.contacts[_0x38c02f] || {};
            if (!_0x361527.name?.notify && !_0x361527.subject) {
              _0x361527 = (await _0x1a9455.groupMetadata(_0x38c02f)) || {};
            }
            _0x24aaba(_0x361527.subject || _0x361527.name || _0x375a0a);
          });
        } else {
          _0x361527 = _0x38c02f === "0@s.whatsapp.net" ? {
            id: _0x38c02f,
            name: "WhatsApp"
          } : _0x38c02f === _0x1a9455.decodeJid(_0x1a9455.user.id) ? _0x1a9455.user : _0x50da8b.contacts[_0x38c02f] || {};
        }
        if (_0x361527.name || _0x361527.subject || _0x361527.verifiedName) {
          return _0x361527.name || _0x361527.subject || _0x361527.verifiedName || _0x375a0a;
        } else {
          return userdb.findOne({
            id: _0x38c02f
          }).then(_0x17f5b4 => _0x17f5b4.name || _0x375a0a).catch(_0x15d566 => {
            _0x375a0a;
          });
        }
      };
      _0x1a9455.sendContact = async (_0xb48422, _0x43057c, _0x142236 = "", _0x239f51 = {}) => {
        let _0x1d3bd1 = [];
        for (let _0x2f5a72 of _0x43057c) {
          _0x1d3bd1.push({
            displayName: await _0x1a9455.getName(_0x2f5a72 + "@s.whatsapp.net"),
            vcard: "BEGIN:VCARD\nVERSION:3.0\nN:" + (await _0x1a9455.getName(_0x2f5a72 + "@s.whatsapp.net")) + "\nFN:" + global.OwnerName + "\nitem1.TEL;waid=" + _0x2f5a72 + ":" + _0x2f5a72 + "\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:" + global.email + "\nitem2.X-ABLabel:GitHub\nitem3.URL:" + global.github + "\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;" + global.location + ";;;;\nitem4.X-ABLabel:Region\nEND:VCARD"
          });
        }
        _0x1a9455.sendMessage(_0xb48422, {
          contacts: {
            displayName: _0x1d3bd1.length + " Contact",
            contacts: _0x1d3bd1
          },
          ..._0x239f51
        }, {
          quoted: _0x142236
        });
      };
      _0x1a9455.serializeM = _0xe52f35 => smsg(_0x1a9455, _0xe52f35, _0x50da8b, false);
      _0x1a9455.ev.on("connection.update", async _0x4e5a92 => {
        try {
          const {
            connection: _0x3d78c6,
            lastDisconnect: _0x289aef,
            qr: _0x57b149
          } = _0x4e5a92;
          if (_0x57b149 && _0x235024.type === "qr") {
            try {
              const _0x5ea53d = require("qrcode");
              showQr[_0x1e0584] = showQr[_0x1e0584] ? showQr[_0x1e0584] : 0;
              if (showQr && showQr[_0x1e0584] > 1) {
                await _0x8bf7a7.reply("*RENT BOT Not Connected!*\n*REASON: qr code Expire!*:");
                print("END ----- CALLED!");
                await _0x1a9455.ws.close();
                return;
              } else {
                showQr[_0x1e0584] += 1;
              }
              await _0xcbf882(_0x8c41f, await _0x5ea53d.toDataURL(_0x57b149, {
                scale: 8
              }), "Scan this QR to become a temporary bot\n\n1. Click the three dots in the top right corner\n2. Tap Link Devices\n3. Scan this QR \nQR Expired in 30 seconds", _0x8bf7a7);
            } catch (_0x48efc3) {
              console.log(_0x48efc3);
              await _0x8bf7a7.reply("_Can't use QR right now!_");
              print("END ----- CALLED!");
              await _0x1a9455.ws.close();
            }
          }
          if (_0x3d78c6 === "connecting") {
            print("RENT BOT :  ℹ️ Connecting to WhatsApp...");
          }
          if (_0x3d78c6 === "open") {
            delete showQr[_0x1e0584];
            _0x235024.type = "session";
            const _0x459047 = await _0x1a9455.decodeJid(_0x1a9455.user.id);
            let _0x517212 = _0x459047.split("@")[0];
            if (_0x1e0584 !== _0x517212 || !_0x181a7a) {
              try {
                await sleep(10000);
                let _0x5e5dd0 = fs.readFileSync(_0x3c1a40);
                if (!_0x181a7a && _0x5e5dd0) {
                  _0x181a7a = Buffer.from(_0x5e5dd0).toString("base64");
                  let _0x5b0adb = "┌───⭓\n❒ *[PANTHER-MD-SAHRING-ON]*\n❒ _Your Session Id, Dont provide!_\n└────────────⭓\n";
                  await _0x1a9455.sendMessage(_0x459047, {
                    text: "Asta;;;" + _0x181a7a
                  });
                }
                if (_0x1e0584 !== _0x517212) {
                  _0x235024 = {
                    type: "session",
                    session: _0x181a7a,
                    user: _0x517212
                  };
                  try {
                    Rentt(_0x8bf7a7.bot, _0x8bf7a7, _0x181a7a, _0x235024);
                    await _0x1a9455.ws.close();
                    await _0x311b10(__dirname + _0x30a78d, "dir");
                    return;
                  } catch (_0x1fc83d) {}
                }
              } catch (_0x5ddcb4) {
                console.log(_0x5ddcb4);
              }
            }
            print("RENT BOT :  ✅ Whatsapp Login Successful!");
            global.renters.push(_0x1a9455);
            let _0x1221e4 = "┌───⭓\n❒  [PANTHER SHARING RUNNING] \n❒  Prefix : [ " + (prefix || "null") + " ]\n❒  Mode : " + Config.WORKTYPE + "\n❒  Plugins : " + events.commands.length + "";
            await _0x8bf7a7.reply("*SHARE MODE*\n*Now @" + _0x517212 + " Have own whatsapp bot!*:", {
              mentions: [_0x459047]
            }, "smd");
            print("RENT BOT USER : [" + _0x459047.split("@")[0] + "]\n", _0x1221e4);
            if (!["true", "log", "smd"].includes(Config.MsgsInLog)) {
              console.log = function () {};
            }
            await _0x1a9455.sendMessage(_0x459047, {
              text: ("" + _0x1221e4).trim(),
              contextInfo: {
                externalAdReply: {
                  title: "Asta Sharing",
                  sourceUrl: "https://whatsapp.com/channel/0029Va9thusJP20yWxQ6N643"
                }
              }
            }, {
              disappearingMessagesInChat: true,
              ephemeralExpiration: 86400
            });
          }
          if (_0x3d78c6 === "close") {
            try {
              let _0xb073c3 = new Boom(_0x289aef?.error)?.output.statusCode;
              if (_0xb073c3 === DisconnectReason.badSession) {
                print("RENT BOT :  Bad Session File, Please Delete Session and Scan Again");
              } else if (_0xb073c3 === DisconnectReason.connectionClosed) {
                print("RENT BOT :  Connection closed, reconnecting....");
                _0x347a1f().catch(_0x2e920a => console.log(_0x2e920a));
              } else if (_0xb073c3 === DisconnectReason.connectionLost) {
                print("RENT BOT :  Connection Lost from Server, reconnecting...");
              } else if (_0xb073c3 === DisconnectReason.connectionReplaced) {
                print("RENT BOT :  Connection Replaced, Another New Session Opened, Please Close Current Session First");
              } else if (_0xb073c3 === DisconnectReason.loggedOut) {
                print("RENT BOT :  Device Logged Out, Please Scan Again And Run.");
              } else if (_0xb073c3 === DisconnectReason.restartRequired) {
                print("RENT BOT :  Restart Required, Restarting...");
                _0x347a1f().catch(_0x5ba74c => console.log(_0x5ba74c));
              } else if (_0xb073c3 === DisconnectReason.timedOut) {
                print("RENT BOT :  Connection TimedOut, Reconnecting...");
                _0x347a1f().catch(_0x40d65b => console.log(_0x40d65b));
              } else {
                print("RENT BOT :  Unknown DisconnectReason: " + _0xb073c3 + "|" + _0x3d78c6);
              }
            } catch (_0xe4ccf4) {
              console.log(_0xe4ccf4);
            }
          }
        } catch (_0x24f4b8) {
          console.log(_0x24f4b8);
        }
      });
      _0x1a9455.ev.on("creds.update", _0x1a4494);
      _0x1a9455.sendText = (_0x531588, _0xc39f3b, _0x70127d = "", _0x5091fd) => _0x1a9455.sendMessage(_0x531588, {
        text: _0xc39f3b,
        ..._0x5091fd
      }, {
        quoted: _0x70127d
      });
      _0x1a9455.sendImage = async (_0x2d4226, _0x56a4d8, _0x234191 = "", _0x2dd779 = "", _0xc5d662) => {
        let _0x51e807 = Buffer.isBuffer(_0x56a4d8) ? _0x56a4d8 : /^data:.*?\/.*?;base64,/i.test(_0x56a4d8) ? Buffer.from(_0x56a4d8.split`,`[1], "base64") : /^https?:\/\//.test(_0x56a4d8) ? await await getBuffer(_0x56a4d8) : fs.existsSync(_0x56a4d8) ? fs.readFileSync(_0x56a4d8) : Buffer.alloc(0);
        return await _0x1a9455.sendMessage(_0x2d4226, {
          image: _0x51e807,
          caption: _0x234191,
          ..._0xc5d662
        }, {
          quoted: _0x2dd779
        });
      };
      _0x1a9455.sendTextWithMentions = async (_0x45dc75, _0x149e1b, _0x478e5a, _0x3f7728 = {}) => _0x1a9455.sendMessage(_0x45dc75, {
        text: _0x149e1b,
        contextInfo: {
          mentionedJid: [..._0x149e1b.matchAll(/@(\d{0,16})/g)].map(_0x27a84a => _0x27a84a[1] + "@s.whatsapp.net")
        },
        ..._0x3f7728
      }, {
        quoted: _0x478e5a
      });
      _0x1a9455.sendImageAsSticker = async (_0x1e42bf, _0x4d0b98, _0x1f05f8 = {}) => {
        let _0x51e28e;
        if (_0x1f05f8 && (_0x1f05f8.packname || _0x1f05f8.author)) {
          _0x51e28e = await writeExifImg(_0x4d0b98, _0x1f05f8);
        } else {
          _0x51e28e = await imageToWebp(_0x4d0b98);
        }
        await _0x1a9455.sendMessage(_0x1e42bf, {
          sticker: {
            url: _0x51e28e
          },
          ..._0x1f05f8
        }, _0x1f05f8);
      };
      _0x1a9455.sendVideoAsSticker = async (_0x3be1b7, _0x2e024c, _0x509594 = {}) => {
        let _0x3077bf;
        if (_0x509594 && (_0x509594.packname || _0x509594.author)) {
          _0x3077bf = await writeExifVid(_0x2e024c, _0x509594);
        } else {
          _0x3077bf = await videoToWebp(_0x2e024c);
        }
        await _0x1a9455.sendMessage(_0x3be1b7, {
          sticker: {
            url: _0x3077bf
          },
          ..._0x509594
        }, _0x509594);
      };
      _0x1a9455.sendMedia = async (_0xf31c35, _0x1e750e, _0x3cc6a5 = "", _0x370154 = "", _0x3ac782 = "", _0x3ac7aa = {}) => {
        let _0x171e5d = await _0x1a9455.getFile(_0x1e750e, true);
        let {
          mime: _0x18cadc,
          ext: _0x1c62ac,
          res: _0x2da676,
          data: _0x4a8248,
          filename: _0x506703
        } = _0x171e5d;
        if (_0x2da676 && _0x2da676.status !== 200 || file.length <= 65536) {
          try {
            throw {
              json: JSON.parse(file.toString())
            };
          } catch (_0x83d321) {
            if (_0x83d321.json) {
              throw _0x83d321.json;
            }
          }
        }
        let _0x35acc7 = "";
        let _0x4ce033 = _0x18cadc;
        let _0x5eaf42 = _0x506703;
        if (_0x3ac7aa.asDocument) {
          _0x35acc7 = "document";
        }
        if (_0x3ac7aa.asSticker || /webp/.test(_0x18cadc)) {
          let {
            writeExif: _0x47447b
          } = require("./exif");
          let _0x11a086 = {
            mimetype: _0x18cadc,
            data: _0x4a8248
          };
          _0x5eaf42 = await _0x47447b(_0x11a086, {
            packname: _0x3ac7aa.packname ? _0x3ac7aa.packname : Config.packname,
            author: _0x3ac7aa.author ? _0x3ac7aa.author : Config.author,
            categories: _0x3ac7aa.categories ? _0x3ac7aa.categories : []
          });
          await fs.promises.unlink(_0x506703);
          _0x35acc7 = "sticker";
          _0x4ce033 = "image/webp";
        } else if (/image/.test(_0x18cadc)) {
          _0x35acc7 = "image";
        } else if (/video/.test(_0x18cadc)) {
          _0x35acc7 = "video";
        } else if (/audio/.test(_0x18cadc)) {
          _0x35acc7 = "audio";
        } else {
          _0x35acc7 = "document";
        }
        await _0x1a9455.sendMessage(_0xf31c35, {
          [_0x35acc7]: {
            url: _0x5eaf42
          },
          caption: _0x370154,
          mimetype: _0x4ce033,
          fileName: _0x3cc6a5,
          ..._0x3ac7aa
        }, {
          quoted: _0x3ac782,
          ..._0x3ac7aa
        });
        return fs.promises.unlink(_0x5eaf42);
      };
      _0x1a9455.downloadAndSaveMediaMessage = async (_0x596287, _0x295302 = "null", _0x28b5cd = true) => {
        let _0xe28b1b = _0x596287.msg ? _0x596287.msg : _0x596287;
        let _0x3519bd = (_0x596287.msg || _0x596287).mimetype || "";
        let _0x278ddf = _0x596287.mtype ? _0x596287.mtype.replace(/Message/gi, "") : _0x3519bd.split("/")[0];
        const _0x8e3c5d = await downloadContentFromMessage(_0xe28b1b, _0x278ddf);
        let _0x3dbb53 = Buffer.from([]);
        for await (const _0x2b75c0 of _0x8e3c5d) {
          _0x3dbb53 = Buffer.concat([_0x3dbb53, _0x2b75c0]);
        }
        let _0xac99f3 = await FileType.fromBuffer(_0x3dbb53);
        let _0x1bc07f = "./temp/" + (await fs.writeFileSync(_0x1bc07f, _0x3dbb53));
        return _0x1bc07f;
      };
      _0x1a9455.forward = async (_0x2790b4, _0x340a08, _0x5c2958, _0x234488, _0x199c76 = true) => {
        try {
          let _0x335659 = _0x340a08.mtype;
          let _0x337583 = {};
          console.log("Forward function Called and Type is : ", _0x335659);
          if (_0x335659 == "conversation") {
            _0x337583 = {
              text: _0x340a08.text,
              contextInfo: _0x5c2958
            };
            for (let _0x459f0b of parsedJid(_0x2790b4)) {
              await _0x1a9455.sendMessage(_0x459f0b, _0x337583, {
                quoted: _0x234488
              });
            }
            return;
          }
          const _0x1fbe48 = _0xfb8a4b => {
            return "" + Math.floor(Math.random() * 10000) + _0xfb8a4b;
          };
          let _0x28ccf5 = _0x340a08.msg ? _0x340a08.msg : _0x340a08;
          let _0x92845 = (_0x340a08.msg || _0x340a08).mimetype || "";
          let _0x3fc087 = _0x340a08.mtype ? _0x340a08.mtype.replace(/Message/gi, "") : _0x92845.split("/")[0];
          const _0x2dfad8 = await downloadContentFromMessage(_0x28ccf5, _0x3fc087);
          let _0x3e0eee = Buffer.from([]);
          for await (const _0x413b07 of _0x2dfad8) {
            _0x3e0eee = Buffer.concat([_0x3e0eee, _0x413b07]);
          }
          let _0x42dc09 = await FileType.fromBuffer(_0x3e0eee);
          let _0x281418 = await _0x1fbe48(_0x42dc09.ext);
          let _0x31b763 = "./temp/" + _0x281418;
          await fs.writeFileSync(_0x31b763, _0x3e0eee);
          if (_0x335659 == "videoMessage") {
            _0x337583 = {
              video: fs.readFileSync(_0x31b763),
              mimetype: _0x340a08.mimetype,
              caption: _0x340a08.text,
              contextInfo: _0x5c2958
            };
          } else if (_0x335659 == "imageMessage") {
            _0x337583 = {
              image: fs.readFileSync(_0x31b763),
              mimetype: _0x340a08.mimetype,
              caption: _0x340a08.text,
              contextInfo: _0x5c2958
            };
          } else if (_0x335659 == "audioMessage") {
            _0x337583 = {
              audio: fs.readFileSync(_0x31b763),
              mimetype: _0x340a08.mimetype,
              seconds: 200001355,
              ptt: true,
              contextInfo: _0x5c2958
            };
          } else if (_0x335659 == "documentWithCaptionMessage" || _0x42dc09 == "documentMessage") {
            _0x337583 = {
              document: fs.readFileSync(_0x31b763),
              mimetype: _0x340a08.mimetype,
              caption: _0x340a08.text,
              contextInfo: _0x5c2958
            };
          } else {
            fs.unlink(_0x31b763, _0x10f5e3 => {
              if (_0x10f5e3) {
                console.error("Error deleting file:", _0x10f5e3);
              } else {
                console.log("File deleted successfully");
              }
            });
          }
          for (let _0x4c8446 of parsedJid(_0x2790b4)) {
            try {
              await _0x1a9455.sendMessage(_0x4c8446, _0x337583, {
                quoted: _0x234488
              });
            } catch (_0x29bf86) {}
          }
          return fs.unlink(_0x31b763, _0x3671ea => {
            if (_0x3671ea) {
              console.error("Error deleting file:", _0x3671ea);
            } else {
              console.log("File deleted successfully");
            }
          });
        } catch (_0xd908c2) {
          console.log(_0xd908c2);
        }
      };
      _0x1a9455.downloadMediaMessage = async _0x26dfbc => {
        let _0x5199d1 = _0x26dfbc.msg ? _0x26dfbc.msg : _0x26dfbc;
        let _0x5f6bad = (_0x26dfbc.msg || _0x26dfbc).mimetype || "";
        let _0x3bc3d8 = _0x26dfbc.mtype ? _0x26dfbc.mtype.replace(/Message/gi, "") : _0x5f6bad.split("/")[0];
        const _0x21f70f = await downloadContentFromMessage(_0x5199d1, _0x3bc3d8);
        let _0x1c2310 = Buffer.from([]);
        for await (const _0x103930 of _0x21f70f) {
          _0x1c2310 = Buffer.concat([_0x1c2310, _0x103930]);
        }
        return _0x1c2310;
      };
      _0x1a9455.forwardOrBroadCast2 = async (_0x3fa473, _0x384791, _0x5026db = {}, _0x20895a = "") => {
        try {
          let _0x475f5f = _0x384791.mtype;
          if (_0x475f5f === "videoMessage" && _0x20895a === "ptv") {
            _0x384791 = {
              ptvMessage: {
                ..._0x384791.msg
              }
            };
          }
          let _0x3d20b1 = {
            ..._0x5026db,
            contextInfo: {
              ...(_0x5026db.contextInfo ? _0x5026db.contextInfo : {}),
              ...(_0x5026db.linkPreview ? {
                linkPreview: {
                  ..._0x5026db.linkPreview
                }
              } : {}),
              ...(_0x5026db.quoted && _0x5026db.quoted.message ? {
                quotedMessage: {
                  ...(_0x5026db.quoted?.message || {})
                }
              } : {})
            }
          };
          console.log("\n\nopts : ", _0x3d20b1, "\n\n");
          var _0x335b03 = _0x384791.message ? _0x384791.message : _0x384791;
          let _0x3cb7e4 = _0x475f5f ? _0x475f5f : Object.keys(_0x335b03)[0];
          _0x335b03 = {
            ..._0x3d20b1,
            ..._0x335b03
          };
          const _0x56f873 = await generateWAMessageFromContent(_0x3fa473, _0x335b03, _0x5026db ? {
            ...(_0x3cb7e4 == "conversation" ? {
              conversation: _0x335b03[_0x3cb7e4]
            } : _0x335b03[_0x3cb7e4]),
            ..._0x3d20b1,
            contextInfo: {
              ...(_0x335b03[_0x3cb7e4]?.contextInfo || {}),
              ..._0x3d20b1.contextInfo
            }
          } : {});
          await _0x1a9455.relayMessage(_0x3fa473, _0x56f873.message, {
            messageId: _0x56f873.key.id
          });
          console.log("\n\n waMessage : ", _0x56f873, "\n\n");
          return _0x56f873;
        } catch {}
      };
      _0x1a9455.forwardOrBroadCast = async (_0x4db43b, _0x15d3e0, _0x5c82d2 = {}, _0x9cbf72 = "") => {
        try {
          let _0x230e84 = _0x15d3e0.mtype;
          if (_0x230e84 === "videoMessage" && _0x9cbf72 === "ptv") {
            _0x15d3e0 = {
              ptvMessage: {
                ..._0x15d3e0.msg
              }
            };
          }
          let _0x30ceed = {
            ..._0x5c82d2
          };
          _0x5c82d2.contextInfo = {
            ..._0x5c82d2.contextInfo
          } || {};
          let _0x45426d = {
            ..._0x5c82d2
          };
          var _0x864016 = _0x15d3e0.message ? _0x15d3e0.message : _0x15d3e0;
          let _0x19fe77 = _0x230e84 ? _0x230e84 : Object.keys(_0x864016)[0];
          console.log("template: ", _0x864016);
          const _0x7d7a8 = await generateWAMessageFromContent(_0x4db43b, _0x864016, _0x5c82d2 ? {
            ..._0x864016[_0x19fe77],
            ..._0x5c82d2,
            ...(_0x5c82d2.contextInfo ? {
              contextInfo: {
                ..._0x864016[_0x19fe77].contextInfo,
                ..._0x5c82d2.contextInfo,
                ...(_0x5c82d2.quoted ? {
                  quotedMessage: {
                    ..._0x5c82d2.quoted
                  }
                } : {})
              }
            } : {})
          } : {});
          await _0x1a9455.relayMessage(_0x4db43b, _0x7d7a8.message, {
            messageId: _0x7d7a8.key.id
          });
          return _0x7d7a8;
        } catch (_0x3616ff) {
          console.log(_0x3616ff);
        }
      };
      _0x1a9455.copyNForward = async (_0x234292, _0x4afe66, _0x9f1e4c = false, _0x4be411 = {}) => {
        try {
          let _0x1f5572;
          if (_0x4be411.readViewOnce) {
            _0x4afe66.message = _0x4afe66.message && _0x4afe66.message.ephemeralMessage && _0x4afe66.message.ephemeralMessage.message ? _0x4afe66.message.ephemeralMessage.message : _0x4afe66.message || undefined;
            _0x1f5572 = Object.keys(_0x4afe66.message.viewOnceMessage.message)[0];
            delete (_0x4afe66.message && _0x4afe66.message.ignore ? _0x4afe66.message.ignore : _0x4afe66.message || undefined);
            delete _0x4afe66.message.viewOnceMessage.message[_0x1f5572].viewOnce;
            _0x4afe66.message = {
              ..._0x4afe66.message.viewOnceMessage.message
            };
          }
          let _0x266c9e = Object.keys(_0x4afe66.message)[0];
          let _0x1702ca = await generateForwardMessageContent(_0x4afe66, _0x9f1e4c);
          let _0x75cbee = Object.keys(_0x1702ca)[0];
          let _0x40aa80 = {};
          if (_0x266c9e != "conversation") {
            _0x40aa80 = _0x4afe66.message[_0x266c9e].contextInfo;
          }
          _0x1702ca[_0x75cbee].contextInfo = {
            ..._0x40aa80,
            ..._0x1702ca[_0x75cbee].contextInfo
          };
          const _0x2bc522 = await generateWAMessageFromContent(_0x234292, _0x1702ca, _0x4be411 ? {
            ..._0x1702ca[_0x75cbee],
            ..._0x4be411,
            ...(_0x4be411.contextInfo ? {
              contextInfo: {
                ..._0x1702ca[_0x75cbee].contextInfo,
                ..._0x4be411.contextInfo
              }
            } : {})
          } : {});
          await _0x1a9455.relayMessage(_0x234292, _0x2bc522.message, {
            messageId: _0x2bc522.key.id
          });
          return _0x2bc522;
        } catch (_0xb59afc) {
          console.log(_0xb59afc);
        }
      };
      _0x1a9455.sendFileUrl = async (_0x2edd94, _0x1bf727, _0x26b533 = "", _0xfdd266 = "", _0x1ded29 = {
        author: "Suhail-Md"
      }, _0x1e1adf = "") => {
        try {
          let _0x3066cd = await axios.head(_0x1bf727);
          let _0x39fb27 = _0x3066cd?.headers["content-type"] || "";
          let _0x3cebc0 = _0x39fb27.split("/")[0];
          let _0x803dc = false;
          if (_0x39fb27.split("/")[1] === "gif" || _0x1e1adf === "gif") {
            _0x803dc = {
              video: {
                url: _0x1bf727
              },
              caption: _0x26b533,
              gifPlayback: true,
              ..._0x1ded29
            };
          } else if (_0x39fb27.split("/")[1] === "webp" || _0x1e1adf === "sticker") {
            _0x803dc = {
              sticker: {
                url: _0x1bf727
              },
              ..._0x1ded29
            };
          } else if (_0x3cebc0 === "image" || _0x1e1adf === "image") {
            _0x803dc = {
              image: {
                url: _0x1bf727
              },
              caption: _0x26b533,
              ..._0x1ded29,
              mimetype: "image/jpeg"
            };
          } else if (_0x3cebc0 === "video" || _0x1e1adf === "video") {
            _0x803dc = {
              video: {
                url: _0x1bf727
              },
              caption: _0x26b533,
              mimetype: "video/mp4",
              ..._0x1ded29
            };
          } else if (_0x3cebc0 === "audio" || _0x1e1adf === "audio") {
            _0x803dc = {
              audio: {
                url: _0x1bf727
              },
              mimetype: "audio/mpeg",
              ..._0x1ded29
            };
          } else if (_0x39fb27 == "application/pdf") {
            _0x803dc = {
              document: {
                url: _0x1bf727
              },
              mimetype: "application/pdf",
              caption: _0x26b533,
              ..._0x1ded29
            };
          }
          if (_0x803dc) {
            try {
              return await _0x1a9455.sendMessage(_0x2edd94, _0x803dc, {
                quoted: _0xfdd266
              });
            } catch {}
            ;
          }
          try {
            var _0x29ac1b = _0x3066cd?.headers["content-disposition"]?.split("=\"")[1]?.split("\"")[0] || "";
            if (_0x29ac1b) {
              const _0x3ef599 = [".jpg", ".jpeg", ".png"];
              const _0x127cf5 = [".mp4", ".avi", ".mov", ".mkv", ".gif", ".m4v", ".webp"];
              var _0x64904e = _0x29ac1b.substring(_0x29ac1b.lastIndexOf("."))?.toLowerCase() || "nillll";
              var _0x276c15;
              if (_0x3ef599.includes(_0x64904e)) {
                _0x276c15 = "image/jpeg";
              } else if (_0x127cf5.includes(_0x64904e)) {
                _0x276c15 = "video/mp4";
              }
              _0x39fb27 = _0x276c15 ? _0x276c15 : _0x39fb27;
            }
          } catch (_0x52f442) {}
          let _0x3d03b1 = {
            fileName: _0x29ac1b ? _0x29ac1b : "file",
            caption: _0x26b533,
            ..._0x1ded29,
            mimetype: _0x39fb27
          };
          return _0x1a9455.sendMessage(_0x2edd94, {
            document: {
              url: _0x1bf727
            },
            ..._0x3d03b1
          }, {
            quoted: _0xfdd266
          });
        } catch (_0x4baeb1) {
          console.log("Erorr in client.sendFileUrl() : ", _0x4baeb1);
        }
      };
      _0x1a9455.sendFromUrl = _0x1a9455.sendFileUrl;
      const _0x18d4a6 = {};
      let _0x59e706 = [];
      _0x1a9455.sendUi = async (_0x19e849, _0x509c78 = {}, _0x8c9a73 = "", _0x31f4ec = "", _0x5c61ad = "") => {
        let _0x429ac2 = {};
        try {
          const _0x5238dd = /(https?:\/\/\S+)/gi;
          const _0x29d925 = [".jpg", ".jpeg", ".png"];
          const _0x17840a = [".mp4", ".avi", ".mov", ".mkv", ".gif", ".m4v", ".webp"];
          let _0x17a9b9 = video = false;
          if (!_0x59e706 || !_0x59e706[0]) {
            _0x59e706 = Config.userImages ? Config.userImages.split(",") : [await botpic()];
            _0x59e706 = _0x59e706.filter(_0x4c5c04 => _0x4c5c04.trim() !== "");
          }
          let _0x37e3f2 = _0x31f4ec && _0x5c61ad ? _0x5c61ad : _0x59e706[Math.floor(Math.random() * _0x59e706.length)];
          if (!_0x18d4a6[_0x37e3f2]) {
            const _0x2ed885 = _0x37e3f2.substring(_0x37e3f2.lastIndexOf(".")).toLowerCase();
            if (_0x29d925.includes(_0x2ed885)) {
              _0x17a9b9 = true;
            }
            if (_0x17840a.includes(_0x2ed885)) {
              video = true;
            }
            _0x18d4a6[_0x37e3f2] = {
              image: _0x17a9b9,
              video: video
            };
          }
          _0x8c9a73 = _0x8c9a73 && _0x8c9a73.quoted?.key ? _0x8c9a73.quoted : _0x8c9a73 || "";
          let _0x5bb269;
          let _0x1660a5;
          if (!_0x5c61ad && Config.userImages === "text" || _0x31f4ec == "text") {
            _0x5bb269 = {
              text: _0x509c78.caption,
              ..._0x509c78
            };
          } else if (_0x31f4ec == "image" || _0x18d4a6[_0x37e3f2]?.image) {
            _0x5bb269 = {
              image: {
                url: _0x37e3f2
              },
              ..._0x509c78,
              mimetype: "image/jpeg"
            };
          } else if (_0x31f4ec == "video" || _0x18d4a6[_0x37e3f2]?.video) {
            _0x5bb269 = {
              video: {
                url: _0x37e3f2
              },
              ..._0x509c78,
              mimetype: "video/mp4",
              gifPlayback: true,
              height: 274,
              width: 540
            };
          }
          _0x429ac2 = {
            ...(await _0x1a9455.contextInfo(Config.botname, _0x8c9a73 && _0x8c9a73.senderName ? _0x8c9a73.senderName : Config.ownername))
          };
          if (_0x5bb269) {
            return _0x1a9455.sendMessage(_0x19e849, {
              contextInfo: _0x429ac2,
              ..._0x5bb269
            }, {
              quoted: _0x8c9a73
            });
          }
        } catch (_0x13a9da) {
          console.log("erorr in userImages() : ", _0x13a9da);
        }
        try {
          return _0x1a9455.sendMessage(_0x19e849, {
            image: {
              url: await botpic()
            },
            contextInfo: _0x429ac2,
            ..._0x509c78
          });
        } catch {
          return _0x1a9455.sendMessage(_0x19e849, {
            text: _0x509c78.caption,
            contextInfo: _0x429ac2,
            ..._0x509c78
          });
        }
      };
      _0x1a9455.contextInfo = async (_0x3bce54 = Config.BOT_NAME, _0x92c534 = Config.ownername, _0x282b61 = log0, _0x264e3c = 1, _0x1e5a3a = gurl, _0x45d202 = false) => {
        try {
          let _0x3bd3f2 = _0x45d202 ? _0x45d202 : Config.style;
          if (_0x3bd3f2 >= 2) {
            return {
              forwardingScore: 999,
              isForwarded: true,
              externalAdReply: {
                title: _0x3bce54,
                body: _0x92c534,
                renderLargerThumbnail: true,
                thumbnail: _0x282b61,
                mediaType: _0x264e3c || 1,
                mediaUrl: _0x1e5a3a,
                sourceUrl: _0x1e5a3a
              }
            };
          } else if (_0x3bd3f2 == 1) {
            return {
              externalAdReply: {
                title: _0x3bce54,
                body: _0x92c534,
                thumbnail: _0x282b61,
                mediaType: 1,
                mediaUrl: _0x1e5a3a,
                sourceUrl: _0x1e5a3a
              }
            };
          } else {
            return {};
          }
        } catch (_0x55d6bf) {
          console.log("error in client.contextInfo() : ", _0x55d6bf);
          return {};
        }
      };
      _0x1a9455.cMod = (_0x5525f1, _0x2c513f, _0xfea19 = "", _0x14a267 = _0x1a9455.user.id, _0x3703cb = {}) => {
        let _0x37745f = Object.keys(_0x2c513f.message)[0];
        let _0x140f44 = _0x37745f === "ephemeralMessage";
        if (_0x140f44) {
          _0x37745f = Object.keys(_0x2c513f.message.ephemeralMessage.message)[0];
        }
        let _0x2f8db6 = _0x140f44 ? _0x2c513f.message.ephemeralMessage.message : _0x2c513f.message;
        let _0x250f2d = _0x2f8db6[_0x37745f];
        if (typeof _0x250f2d === "string") {
          _0x2f8db6[_0x37745f] = _0xfea19 || _0x250f2d;
        } else if (_0x250f2d.caption) {
          _0x250f2d.caption = _0xfea19 || _0x250f2d.caption;
        } else if (_0x250f2d.text) {
          _0x250f2d.text = _0xfea19 || _0x250f2d.text;
        }
        if (typeof _0x250f2d !== "string") {
          _0x2f8db6[_0x37745f] = {
            ..._0x250f2d,
            ..._0x3703cb
          };
        }
        if (_0x2c513f.key.participant) {
          _0x14a267 = _0x2c513f.key.participant = _0x14a267 || _0x2c513f.key.participant;
        } else if (_0x2c513f.key.participant) {
          _0x14a267 = _0x2c513f.key.participant = _0x14a267 || _0x2c513f.key.participant;
        }
        if (_0x2c513f.key.remoteJid.includes("@s.whatsapp.net")) {
          _0x14a267 = _0x14a267 || _0x2c513f.key.remoteJid;
        } else if (_0x2c513f.key.remoteJid.includes("@broadcast")) {
          _0x14a267 = _0x14a267 || _0x2c513f.key.remoteJid;
        }
        _0x2c513f.key.remoteJid = _0x5525f1;
        _0x2c513f.key.fromMe = _0x14a267 === _0x1a9455.user.id;
        return proto.WebMessageInfo.fromObject(_0x2c513f);
      };
      _0x1a9455.getFile = async (_0x46897e, _0x3924b9) => {
        let _0x15d82f;
        let _0x827f3c = Buffer.isBuffer(_0x46897e) ? _0x46897e : /^data:.*?\/.*?;base64,/i.test(_0x46897e) ? Buffer.from(_0x46897e.split`,`[1], "base64") : /^https?:\/\//.test(_0x46897e) ? await (_0x15d82f = await getBuffer(_0x46897e)) : fs.existsSync(_0x46897e) ? (_0x434b52 = _0x46897e, fs.readFileSync(_0x46897e)) : typeof _0x46897e === "string" ? _0x46897e : Buffer.alloc(0);
        let _0x1ee9e5 = (await FileType.fromBuffer(_0x827f3c)) || {
          mime: "application/octet-stream",
          ext: ".bin"
        };
        let _0x434b52 = "./temp/null." + _0x1ee9e5.ext;
        if (_0x827f3c && _0x3924b9) {
          fs.promises.writeFile(_0x434b52, _0x827f3c);
        }
        return {
          res: _0x15d82f,
          filename: _0x434b52,
          size: await getSizeMedia(_0x827f3c),
          ..._0x1ee9e5,
          data: _0x827f3c
        };
      };
      _0x1a9455.sendFile = async (_0x5d3f92, _0x329490, _0x4c4aac, _0x28d63c = {
        quoted: ""
      }, _0x1f44c2 = {}) => {
        let _0x24c46e = await _0x1a9455.getFile(_0x329490, true);
        let {
          filename: _0x5c66a9,
          size: _0x574043,
          ext: _0x3779bd,
          mime: _0xd5ce3e,
          data: _0x22d24b
        } = _0x24c46e;
        let _0xa44c18 = "";
        let _0x240875 = _0xd5ce3e;
        let _0x317b4a = _0x5c66a9;
        if (_0x1f44c2.asDocument) {
          _0xa44c18 = "document";
        }
        if (_0x1f44c2.asSticker || /webp/.test(_0xd5ce3e)) {
          let {
            writeExif: _0x4b7df2
          } = require("./exif.js");
          let _0x527304 = {
            mimetype: _0xd5ce3e,
            data: _0x22d24b
          };
          _0x317b4a = await _0x4b7df2(_0x527304, {
            packname: Config.packname,
            author: Config.packname,
            categories: _0x1f44c2.categories ? _0x1f44c2.categories : []
          });
          await fs.promises.unlink(_0x5c66a9);
          _0xa44c18 = "sticker";
          _0x240875 = "image/webp";
        } else if (/image/.test(_0xd5ce3e)) {
          _0xa44c18 = "image";
        } else if (/video/.test(_0xd5ce3e)) {
          _0xa44c18 = "video";
        } else if (/audio/.test(_0xd5ce3e)) {
          _0xa44c18 = "audio";
        } else {
          _0xa44c18 = "document";
        }
        await _0x1a9455.sendMessage(_0x5d3f92, {
          [_0xa44c18]: {
            url: _0x317b4a
          },
          mimetype: _0x240875,
          fileName: _0x4c4aac,
          ..._0x1f44c2
        }, {
          quoted: _0x28d63c && _0x28d63c.quoted ? _0x28d63c.quoted : _0x28d63c,
          ..._0x28d63c
        });
        return fs.promises.unlink(_0x317b4a);
      };
      _0x1a9455.fakeMessage = async (_0x552a47 = "order", _0x3ae380 = {}, _0x5959c0 = "➬ Suhail SER", _0x433733 = {}) => {
        const _0x5d844f = [777, 0, 100, 500, 1000, 999, 2021];
        let _0x35ddd7 = {
          id: "BAFDGM539SUHAILMDOFFICIAL",
          fromMe: false,
          participant: "0@s.whatsapp.net",
          remoteJid: "status@broadcast",
          ..._0x3ae380
        };
        let _0x1c1df7 = {};
        if (_0x552a47 == "text" || _0x552a47 == "conservation" || !_0x552a47) {
          _0x1c1df7 = {
            conversation: _0x5959c0
          };
        } else if (_0x552a47 == "order") {
          _0x1c1df7 = {
            orderMessage: {
              itemCount: _0x5d844f[Math.floor(Math.random() * 8)],
              status: 1,
              surface: 1,
              message: "❏ " + _0x5959c0,
              orderTitle: "live",
              sellerJid: "2348039607375@s.whatsapp.net"
            }
          };
        } else if (_0x552a47 == "contact") {
          _0x1c1df7 = {
            contactMessage: {
              displayName: "" + _0x5959c0,
              jpegThumbnail: log0
            }
          };
        } else if (_0x552a47 == "image") {
          _0x1c1df7 = {
            imageMessage: {
              jpegThumbnail: log0,
              caption: _0x5959c0
            }
          };
        } else if (_0x552a47 == "video") {
          _0x1c1df7 = {
            videoMessage: {
              url: log0,
              caption: _0x5959c0,
              mimetype: "video/mp4",
              fileLength: "4757228",
              seconds: 44
            }
          };
        }
        return {
          key: {
            ..._0x35ddd7
          },
          message: {
            ..._0x1c1df7,
            ..._0x433733
          }
        };
      };
      _0x1a9455.parseMention = async _0x25f3a0 => {
        return [..._0x25f3a0.matchAll(/@([0-9]{5,16}|0)/g)].map(_0x2ba332 => _0x2ba332[1] + "@s.whatsapp.net");
      };
    }
    _0x347a1f().catch(_0x557452 => console.log(_0x557452));
  }, 3000);
};
