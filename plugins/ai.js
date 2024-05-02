const fs = require("fs-extra");
const {
  aitts,
  smd,
  prefix,
  Config,
  parsedJid,
  sleep,
} = require("../lib");
const axios = require("axios");
const { send } = require("../lib");
const fetch = require("node-fetch");
function _0x2a0d(_0x32de74, _0xce23fd) {
  const _0x3ffb1a = _0x2953();
  _0x2a0d = function (_0x151552, _0x18c062) {
    _0x151552 = _0x151552 - 233;
    let _0x5c396f = _0x3ffb1a[_0x151552];
    return _0x5c396f;
  };
  return _0x2a0d(_0x32de74, _0xce23fd);
}
function _0x2953() {
  const _0x4f0c10 = [
    "json",
    "choices",
    "2KTKIiW",
    "application/json",
    "chat",
    "http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[",
    "4017447FwUKbt",
    "2673069xtYnEg",
    "REMOVE_BG_KEY",
    "Bearer ",
    "image-alpha-001",
    "320668Kzvhym",
    "data",
    "then",
    "message",
    "1548910BYiCAA",
    "error in aiResponce : ",
    "119490ILpvcx",
    "system",
    "sender",
    "binary",
    "from",
    "log",
    "dalle",
    "https://api.remove.bg/v1.0/removebg",
    "567277OBjzQH",
    "length",
    "get",
    "POST",
    "stringify",
    "content",
    "512x512",
    "78qmNvDj",
    "https://api.openai.com/v1/images/generations",
    "Error While getting Ai responce ",
    "url",
    "catch",
    "]&msg=[",
    "split",
    "8yTiNwA",
    "You",
    "gpt",
    "1769427SEqioY",
  ];
  _0x2953 = function () {
    return _0x4f0c10;
  };
  return _0x2953();
}
(function (_0x4f4b4b, _0x46381a) {
  const _0x23b0f7 = _0x2a0d;
  const _0x17ab9c = _0x4f4b4b();
  while (true) {
    try {
      const _0x24d937 =
        (parseInt(_0x23b0f7(264)) / 1) * (-parseInt(_0x23b0f7(241)) / 2) +
        parseInt(_0x23b0f7(238)) / 3 +
        -parseInt(_0x23b0f7(250)) / 4 +
        (-parseInt(_0x23b0f7(256)) / 5) * (parseInt(_0x23b0f7(271)) / 6) +
        (parseInt(_0x23b0f7(246)) / 7) * (parseInt(_0x23b0f7(235)) / 8) +
        parseInt(_0x23b0f7(245)) / 9 +
        -parseInt(_0x23b0f7(254)) / 10;
      if (_0x24d937 === _0x46381a) {
        break;
      } else {
        _0x17ab9c.push(_0x17ab9c.shift());
      }
    } catch (_0x1a2819) {
      _0x17ab9c.push(_0x17ab9c.shift());
    }
  }
})(_0x2953, 305050);
async function aiResponce(_0x109acf, _0xf00650, _0x2728a0 = "") {
  const _0x242f00 = _0x2a0d;
  let _0x2d78d9 = "";
  try {
    if (_0xf00650 === _0x242f00(243)) {
      _0x2d78d9 = await (
        await axios[_0x242f00(266)](
          _0x242f00(244) +
            _0x109acf[_0x242f00(258)][_0x242f00(234)]("@")[0] +
            _0x242f00(233) +
            _0x2728a0 +
            "]"
        )
      )[_0x242f00(251)].cnt;
    } else if (_0xf00650 === _0x242f00(237)) {
      const _0x3e1043 = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: _0x242f00(248) + Config.OPENAI_API_KEY,
          },
          body: JSON[_0x242f00(268)]({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: _0x242f00(257),
                content: _0x242f00(236),
              },
              {
                role: "user",
                content: _0x2728a0,
              },
            ],
          }),
        }
      );
      const _0x26c61c = await _0x3e1043[_0x242f00(239)]();
      if (
        !_0x26c61c[_0x242f00(240)] ||
        _0x26c61c[_0x242f00(240)][_0x242f00(265)] === 0
      ) {
        _0x2d78d9 = "*Invalid ChatGPT API Key, Please Put New Key*";
      } else {
        _0x2d78d9 =
          _0x26c61c[_0x242f00(240)][0][_0x242f00(253)][_0x242f00(269)];
      }
    } else if (_0xf00650 === _0x242f00(262)) {
      const _0x1a4db1 = await fetch(_0x242f00(272), {
        method: _0x242f00(267),
        headers: {
          "Content-Type": _0x242f00(242),
          Authorization: _0x242f00(248) + Config.OPENAI_API_KEY,
        },
        body: JSON[_0x242f00(268)]({
          model: _0x242f00(249),
          prompt: _0x2728a0,
          size: _0x242f00(270),
          response_format: _0x242f00(274),
        }),
      });
      const _0x2cdadf = await _0x1a4db1[_0x242f00(239)]();
      _0x2d78d9 = _0x2cdadf[_0x242f00(251)][0][_0x242f00(274)];
    }
    if (_0xf00650 === "rmbg") {
      const _0x142226 = {
        image_url: _0x2728a0,
        size: "auto",
      };
      axios
        .post(_0x242f00(263), _0x142226, {
          headers: {
            "X-Api-Key": Config[_0x242f00(247)],
          },
          responseType: "arraybuffer",
        })
        [_0x242f00(252)]((_0x18f9bd) => {
          const _0x382416 = _0x242f00;
          _0x2d78d9 = Buffer[_0x382416(260)](
            _0x18f9bd[_0x382416(251)],
            _0x382416(259)
          );
        })
        [_0x242f00(275)]((_0x25d8c1) => {
          _0x2d78d9 = false;
        });
    }
    return _0x2d78d9;
  } catch (_0x4eee67) {
    console[_0x242f00(261)](_0x242f00(255), _0x4eee67);
    return _0x242f00(273);
  }
}
smd(
  {
    pattern: "rmbg",
    alias: ["removebg"],
    desc: "Removes the background from an image.",
    category: "ai",
    filename: __filename,
    use: "<image URL>",
  },
  async (message, input) => {
    try {
      const url = input.trim();
      if (!url || !isValidUrl(url)) {
        return await message.send("*_Please provide a valid image URL._*");
      }

      const apiUrl = `https://aemt.me/removebg?url=${encodeURIComponent(url)}`;
      const response = await axios.get(apiUrl, {
        headers: {
          "accept": "application/json",
        },
      });
      const data = response.data;

      if (!data || !data.url || !data.url.status === "true") {
        return await message.reply("*Failed to remove background from the image.*");
      }

      const resultUrl = data.url.result;
      const imageBuffer = await axios.get(resultUrl, { responseType: "arraybuffer" });
      const buffer = Buffer.from(imageBuffer.data, "binary");
      await message.bot.sendMessage(message.chat, { image: buffer }, { quoted: message });
    } catch (error) {
      await message.error(error + "\n\nCommand: rmbg", error, "*Failed to remove background from the image.*");
    }
  }
);

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}
smd(
  {
    pattern: "sd",
    desc: "Generates an image using Stable Diffusion AI.",
    category: "ai",
    filename: __filename,
    use: "<text>",
  },
  async (message, input) => {
    try {
      const text = input.trim();
      if (!text) {
        return await message.send("*_Please provide some text to generate an image._*");
      }

      const apiUrl = `https://aemt.me/stablediffusion?text=${encodeURIComponent(text)}`;
      const response = await axios.get(apiUrl, {
        headers: {
          "accept": "application/json",
        },
        responseType: "arraybuffer",
      });

      if (!response.data) {
        return await message.reply("*Failed to generate an image using Stable Diffusion AI.*");
      }

      const buffer = Buffer.from(response.data, "binary");
      await message.bot.sendMessage(message.chat, { image: buffer }, { quoted: message });
    } catch (error) {
      await message.error(error + "\n\nCommand: stablediffusion", error, "*Failed to use Stable Diffusion AI.*");
    }
  }
);
smd(
  {
    pattern: "bard",
    desc: "Generates a response from Bard AI.",
    category: "ai",
    filename: __filename,
    use: "<text>",
  },
  async (message, input) => {
    try {
      const text = input.trim();
      if (!text) {
        return await message.send("*_Please provide some text to generate a response._*");
      }

      const apiUrl = `https://aemt.me/bard?text=${encodeURIComponent(text)}`;
      const response = await axios.get(apiUrl, {
        headers: {
          "accept": "application/json",
        },
      });
      const data = response.data;

      if (!data || !data.status) {
        return await message.reply("*Failed to generate a response from Bard AI.*");
      }

      const result = data.result;
      return await message.send(`*Bard AI:* ${result}`, { quoted: message });
    } catch (error) {
      await message.error(error + "\n\nCommand: bard", error, "*Failed to use Bard AI.*");
    }
  }
);
smd({
  pattern: "gpt4",
  category: "ai",
  desc: "Chat with GPT-4 AI model",
  use: "<text>",
  filename: __filename,
}, async (message, text, { cmdName }) => {
  if (!text) return message.reply(`*_Please provide a query_*\n*_Example ${prefix + cmdName} What is the meaning of life?_*`);

  try {
    const res = await (await fetch(`https://api.maher-zubair.tech/ai/chatgptv4?q=${text}`)).json();

    if (!res.status === 200) return message.send("*There's a problem, try again later!*");

    const { result } = res;
    const astro = "PANTHER 𝙂𝙋𝙏4\n "
    const tbl = "```";
    await send(message, `${astro}${tbl}${result}${tbl}`);
  } catch (e) {
    return await message.error(`${e}\n\n command: ${cmdName}`, e, `*_An error occurred while processing your request_*`);
  }
});
smd({
  pattern: "gemini",
  category: "ai",
  desc: "Chat with Bard AI model",
  use: "<text>",
  filename: __filename,
}, async (message, text, { cmdName }) => {
  if (!text) return message.reply(`*_Please provide a query_*\n*_Example ${prefix + cmdName} What is the meaning of life?_*`);

  try {
    const res = await (await fetch(`https://api.maher-zubair.tech/ai/gemini?q=${text}`)).json();

    if (!res.status === 200) return message.send("*There's a problem, try again later!*");

    const { result } = res;
    const astro = "Panther*GEMINI* 𝘼𝙄"
    const tbl = "```";
    await send(message, `${astro}${tbl}${result}${tbl}`);
  } catch (e) {
    return await message.error(`${e}\n\n command: ${cmdName}`, e, `*_An error occurred while processing your request_*`);
  }
});
smd(
  {
    cmdname: "alexa2",
    category: "ai",
    use: "[text]",
    filename: __filename,
    info: "chat with simsimi alexa ai!",
  },
  async (_0xe6d6e, _0x23f786) => {
    try {
      if (!_0x23f786) {
        return await _0xe6d6e.reply(
          "Hi *" + _0xe6d6e.senderName + "*, do you want to talk?"
        );
      }
      const _0x55bb61 = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "text=" + encodeURIComponent(_0x23f786) + "&lc=en&key=",
      };
      const _0x5099c8 = await fetch(
        "https://api.simsimi.vn/v2/simtalk",
        _0x55bb61
      );
      const _0x2c3e12 = await _0x5099c8.json();
      if (_0x2c3e12.status === "200" && _0x2c3e12.message) {
        _0xe6d6e.reply(_0x2c3e12.message);
      } else {
        _0xe6d6e.reply("*No Responce!*");
      }
    } catch (_0xfee6e3) {
      await _0xe6d6e.error(
        _0xfee6e3 + "\n\ncommand : poetry",
        _0xfee6e3,
        false
      );
    }
  }
);
smd(
  {
    pattern: "chat",
    desc: "chat with an AI",
    category: "ai",
    use: "<Hii, Astro>",
    filename: __filename,
  },
  async (_0x1c0160, _0x482db1) => {
    try {
      return _0x1c0160.reply(await aiResponce(_0x1c0160, "chat", _0x482db1));
    } catch (_0x4adf95) {
      await _0x1c0160.error(
        _0x4adf95 + "\n\ncommand: chat",
        _0x4adf95,
        "*_no responce from chatbot, sorry!!_*"
      );
    }
  }
);
smd(
  {
    pattern: "dalle",
    alias: ["dall", "dall-e"],
    desc: "chat with an AI",
    category: "ai",
    use: "<Hii, Astro>",
    filename: __filename,
  },
  async (_0x21be87, _0x17d498) => {
    try {
      if (!_0x17d498) {
        return await _0x21be87.reply(
          "*Give Me A Query To Get Dall-E Reponce?*"
        );
      }
      const _0x27bd9a =
        "https://gurugpt.cyclic.app/dalle?prompt=" +
        encodeURIComponent(_0x17d498);
      try {
        return await _0x21be87.bot.sendMessage(_0x21be87.chat, {
          image: {
            url: _0x27bd9a,
          },
          caption:
            "[PROMPT]: ```" + _0x17d498 + " ```  \n " + Config.caption + " ",
        });
      } catch (_0x5cee92) {
        console.log("ERROR IN DALLE RESPONCE FROM API GURUGPT\n", _0x5cee92);
      }
      if (
        Config.OPENAI_API_KEY == "" ||
        !Config.OPENAI_API_KEY ||
        !("" + Config.OPENAI_API_KEY).startsWith("sk")
      ) {
        return _0x21be87.reply(
          "```You Dont Have OPENAI API KEY \nPlease Create OPEN API KEY from Given Link \nhttps://platform.openai.com/account/api-keys\nAnd Set Key in Heroku OPENAI_API_KEY Var```"
        );
      }
      return await _0x21be87.bot.sendMessage(_0x21be87.chat, {
        image: {
          url: await aiResponce(_0x21be87, "dalle", _0x17d498),
        },
        caption: "*---Your DALL-E Result---*\n" + Config.caption,
      });
    } catch (_0x25b4b9) {
      await _0x21be87.error(
        _0x25b4b9 + "\n\ncommand: dalle",
        _0x25b4b9,
        "*_No responce from Dall-E Ai, Sorry!!_*"
      );
    }
  }
);
smd(
  {
    pattern: "imagine",
    alias: ["imagin"],
    desc: "chat with an AI",
    category: "ai",
    use: "<boy walking on street>",
    filename: __filename,
  },
  async (_0x9bac01, _0x3700d4) => {
    try {
      let _0x2968fd = _0x3700d4 || _0x9bac01.reply_text;
      if (!_0x2968fd) {
        return await _0x9bac01.reply("*Give Me A Query To Get imagination?*");
      }
      let _0x24d5e9 = false;
      try {
        const _0x156dd7 = await fetch(
          "https://aemt.me/openai?text=" +
            (_0x2968fd +
              " \nNOTE: Make sure to looks like imagination, make it short and concise, also in english!")
        );
        const _0x49b22e = await _0x156dd7.json();
        _0x24d5e9 =
          _0x49b22e && _0x49b22e.status && _0x49b22e.result
            ? _0x49b22e.result
            : "";
      } catch (_0xf1623a) {
        _0x24d5e9 = false;
      }
      try {
        await Draw(_0x2968fd || _0x9bac01.reply_text).then((_0x1f03a3) => {
          _0x9bac01.bot.sendMessage(_0x9bac01.chat, {
            image: _0x1f03a3,
            caption:
              "*[IMAGININATION]:* ```" +
              _0x2968fd +
              " ```" +
              (_0x24d5e9
                ? "\n\n*[RESPONCE]:* ```" + _0x24d5e9 + "``` \n"
                : "") +
              "  \n " +
              Config.caption +
              " ",
          });
        });
        return;
      } catch (_0x45726b) {
        console.log("ERROR IN IMAGINE RESPONCE FROM IMAGINE API n", _0x45726b);
      }
      if (
        Config.OPENAI_API_KEY == "" ||
        !Config.OPENAI_API_KEY ||
        !("" + Config.OPENAI_API_KEY).startsWith("sk")
      ) {
        return _0x9bac01.reply(
          "```You Dont Have OPENAI API KEY \nPlease Create OPEN API KEY from Given Link \nhttps://platform.openai.com/account/api-keys\nAnd Set Key in Heroku OPENAI_API_KEY Var```"
        );
      }
      return await _0x9bac01.bot.sendMessage(_0x9bac01.chat, {
        image: {
          url: await aiResponce(_0x9bac01, "dalle", _0x2968fd),
        },
        caption: "*---Your DALL-E Result---*\n" + Config.caption,
      });
    } catch (_0x5d8080) {
      await _0x9bac01.error(
        _0x5d8080 + "\n\ncommand: imagine",
        _0x5d8080,
        "*_No responce from Server side, Sorry!!_*"
      );
    }
  }
);
smd(
  {
    pattern: "imagine2",
    alias: ["imagin2"],
    desc: "chat with an AI",
    category: "ai",
    use: "<boy walking on street>",
    filename: __filename,
  },
  async (_0x39716c, _0xe79cfd) => {
    try {
      let _0x5e79d4 = _0xe79cfd || _0x39716c.reply_text;
      if (!_0x5e79d4) {
        return await _0x39716c.reply("*Give Me A Query To Get imagination?*");
      }
      const _0x14515f =
        "https://gurugpt.cyclic.app/dalle?prompt=" +
        encodeURIComponent(
          _0x5e79d4 + " \nNOTE: Make sure to looks like imagination"
        );
      let _0x5d0b6a = false;
      try {
        const _0x37057d = await fetch(
          "https://aemt.me/openai?text=" +
            (_0x5e79d4 +
              " \nNOTE: Make sure to looks like imagination, make it short and concise, also in english!")
        );
        const _0x644785 = await _0x37057d.json();
        _0x5d0b6a =
          _0x644785 && _0x644785.status && _0x644785.result
            ? _0x644785.result
            : "";
      } catch (_0x3ecac9) {
        _0x5d0b6a = false;
      }
      try {
        return await _0x39716c.bot.sendMessage(_0x39716c.chat, {
          image: {
            url: _0x14515f,
          },
          caption:
            "*[IMAGININATION]:* ```" +
            _0x5e79d4 +
            " ```" +
            (_0x5d0b6a ? "\n\n*[RESPONCE]:* ```" + _0x5d0b6a + "``` \n" : "") +
            "  \n " +
            Config.caption +
            " ",
        });
      } catch (_0x484392) {
        console.log("ERROR IN IMAGINE RESPONCE FROM API GURUGPT\n", _0x484392);
      }
      if (
        Config.OPENAI_API_KEY == "" ||
        !Config.OPENAI_API_KEY ||
        !("" + Config.OPENAI_API_KEY).startsWith("sk")
      ) {
        return _0x39716c.reply(
          "```You Dont Have OPENAI API KEY \nPlease Create OPEN API KEY from Given Link \nhttps://platform.openai.com/account/api-keys\nAnd Set Key in Heroku OPENAI_API_KEY Var```"
        );
      }
      return await _0x39716c.bot.sendMessage(_0x39716c.chat, {
        image: {
          url: await aiResponce(_0x39716c, "dalle", _0x5e79d4),
        },
        caption: "*---Your DALL-E Result---*\n" + Config.caption,
      });
    } catch (_0x110b5d) {
      await _0x39716c.error(
        _0x110b5d + "\n\ncommand: imagine",
        _0x110b5d,
        "*_No responce from Server side, Sorry!!_*"
      );
    }
  }
);
async function Draw(_0x3ab488) {
  const _0x54c8a4 = await fetch(
    "https://api-inference.huggingface.co/models/prompthero/openjourney-v2",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer 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",
      },
      body: JSON.stringify({
        inputs: _0x3ab488,
      }),
    }
  ).then((_0x5838c2) => _0x5838c2.blob());
  const _0x1c59a6 = await _0x54c8a4.arrayBuffer();
  return Buffer.from(_0x1c59a6);
}
smd(
  {
    pattern: "aitts",
    desc: "Text to Voice Using Eleven Lab Ai",
    category: "ai",
    use: "<Hii, Ibrahim>",
    filename: __filename,
  },
  async (_0x1a01af, _0x1ac85a) => {
    await aitts(_0x1a01af, _0x1ac85a || _0x1a01af.reply_text);
  }
);
const astro_patch_AnonyMsg = {};
let isAnnonyMsgAlive = "";
let cmdName = "rcg";
class AnonymousMsg {
  constructor() {
    this.id = "";
    this.sender = "";
    this.reciever = "";
    this.senderMsg = "";
    this.tellinfo = 0;
    this.howmanyreply = 0;
  }
}
smd(
  {
    pattern: "anonymsg",
    alias: ["recognition", "anonychat"],
    desc: "Send message Annonymously",
    category: "ai",
    use: "<Hii, Ibrahim>",
    filename: __filename,
  },
  async (_0x358984, _0x20693a, { smd: _0x12d243 }) => {
    try {
      let _0x32512b = _0x20693a ? _0x20693a : _0x358984.reply_text;
      if (!_0x32512b) {
        return await _0x358984.send(
          "*provide number with msg to send Anonymously.* \n*Example " +
            (prefix + _0x12d243) +
            " 2348039607375,your_Message*",
          {},
          "",
          _0x358984
        );
      }
      if (_0x358984.isCreator && _0x32512b === "info") {
        return await _0x358984.reply(
          isAnnonyMsgAlive == ""
            ? "*Theres no Anonymous Chat created yet*"
            : "*Anonymous Chat Recivers*\n_" + isAnnonyMsgAlive + "_"
        );
      }
      const _0x201d91 = _0x32512b.indexOf(",");
      if (_0x201d91 === -1) {
        return await _0x358984.reply(
          "*Invalid format. Please provide both number and Message separated by a comma.*"
        );
      }
      let _0x12e2ef = _0x32512b.slice(0, _0x201d91).trim() + "@s.whatsapp.net";
      let _0x5f656f = _0x32512b.slice(_0x201d91 + 1).trim();
      let _0x48975a = (await parsedJid(_0x12e2ef)) || [];
      if (_0x48975a[0]) {
        const { date: _0xbcd286, time: _0x47ad13 } = await getDateTime();
        const _0x3e1b1c =
          "anony-msg-" + Math.floor(100000 + Math.random() * 900000);
        panther_patch_AnonyMsg[_0x3e1b1c] = new AnonymousMsg();
        let _0x3079e2 = panther_patch_AnonyMsg[_0x3e1b1c];
        _0x3079e2.id = _0x3e1b1c;
        _0x3079e2.sender = _0x358984.sender;
        _0x3079e2.reciever = _0x48975a[0];
        _0x3079e2.msgStatus = true;
        _0x3079e2.senderMsg = _0x358984;
        _0x5f656f =
          "*Black-Panther-Md• ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ*\n\n*Msg_Id:* " +
          _0x3079e2.id +
          "\n*Date:* _" +
          _0xbcd286 +
          "_\n*Time:* _" +
          _0x47ad13 +
          "_\n\n*Message:* " +
          _0x5f656f +
          "\n\n\n" +
          Config.caption;
        isAnnonyMsgAlive = isAnnonyMsgAlive + "," + _0x3079e2.reciever;
        await _0x358984.bot.sendMessage(_0x3079e2.reciever, {
          text: _0x5f656f,
        });
        return await _0x358984.reply("*_Anonymous message sent succesfully_*");
      } else {
        return await _0x358984.reply("*_Provided number is not valid!!!_*");
      }
    } catch (_0x51ed58) {
      await _0x358984.error(
        _0x51ed58 + "\n\ncommand: " + _0x12d243,
        _0x51ed58,
        "*_Can't send annonymously message yet, Sorry!!_*"
      );
    }
  }
);
smd(
  {
    on: "text",
  },
  async (_0x2acf30) => {
    try {
      if (
        _0x2acf30.quoted &&
        isAnnonyMsgAlive.includes(_0x2acf30.sender) &&
        _0x2acf30.text.length > 2
      ) {
        const _0x2dfb59 = _0x2acf30.reply_text.split("\n");
        if (_0x2dfb59.length < 3) {
          return;
        }
        if (
          _0x2acf30.reply_text.includes("Panther-ᴍᴅ • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ") &&
          _0x2dfb59[0].includes("Panther-ᴍᴅ • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ") &&
          _0x2dfb59[2].includes("Msg_Id")
        ) {
          let _0x1b0d01 = "" + _0x2dfb59[2].replace("*Msg_Id:* ", "").trim();
          let _0x2ecd2a = astro_patch_AnonyMsg[_0x1b0d01];
          if (!_0x2ecd2a) {
            return;
          }
          try {
            if (_0x2ecd2a) {
              let _0x13a11c = _0x2acf30.text.split(",")[0].trim();
              if (_0x13a11c.toLowerCase().startsWith("reply")) {
                _0x2ecd2a.howmanyreply += 1;
                const _0x5a2204 = _0x2acf30.text.indexOf(",");
                let _0x3f6b59 =
                  "*Panther-ᴍᴅ • ʏᴏᴜʀ ᴀɴᴏɴʏ-ᴍsɢ ʀᴇᴘʟʏ*\n\n*_From @" +
                  _0x2ecd2a.reciever.split("@")[0] +
                  "_*\n*_Msg_Id: " +
                  _0x2ecd2a.id +
                  "_*\n\n*Message:* " +
                  _0x2acf30.text.slice(_0x5a2204 + 1).trim() +
                  "\n\n\n\n" +
                  Config.caption;
                if (_0x2ecd2a.howmanyreply >= 2) {
                  isAnnonyMsgAlive = isAnnonyMsgAlive.replace(
                    "," + _0x2acf30.sender,
                    ""
                  );
                }
                await _0x2acf30.bot.sendMessage(
                  _0x2ecd2a.sender,
                  {
                    text: _0x3f6b59,
                    mentions: [_0x2ecd2a.reciever],
                  },
                  {
                    quoted: _0x2ecd2a.senderMsg,
                  }
                );
                if (_0x2ecd2a.howmanyreply >= 2) {
                  isAnnonyMsgAlive = isAnnonyMsgAlive.replace(
                    "," + _0x2acf30.sender,
                    ""
                  );
                  delete astro_patch_AnonyMsg[_0x1b0d01];
                }
                return await _0x2acf30.reply(
                  "*_Your Message succesfully deliver to User_* " +
                    (_0x2ecd2a.howmanyreply == 1
                      ? "\n*you can reply 1 more time*"
                      : "") +
                    " "
                );
              } else if (_0x2ecd2a.tellinfo === 0) {
                _0x2ecd2a.tellinfo = 1;
                let _0x362db6 =
                  "*Basically, Its an Annonymous Message*\n\n_Msg_Id: " +
                  _0x2ecd2a.id +
                  "_\n_this message sended by a chatbot_\n_User not wants to expose itself to send that msg_\n\n\n*if you wanna reply to that user,*\n*Send msg by replying to above message*\n*Type like:* reply, Type_your_Message_Here\n*Example:* reply, Can you text me from your number\n\n\n" +
                  Config.caption;
                _0x2acf30.bot.sendMessage(
                  _0x2ecd2a.reciever,
                  {
                    text: _0x362db6,
                  },
                  {
                    quoted: _0x2acf30,
                  }
                );
              } else if (_0x2ecd2a.tellinfo === 1) {
                _0x2ecd2a.tellinfo = 2;
                _0x2acf30.reply(
                  "*Please follow the format if reply to msg*\n*Type like: _reply, Type_your_Message_Here_*"
                );
              }
            }
          } catch (_0x58832f) {
            console.log("error : ", _0x58832f);
          }
        }
      }
    } catch {}
  }
);

smd(
  {
    pattern: "advt",
    alias: ["advertisement"],
    category: "ai",
    desc: "Advertise of your Message, by sending it to provided nmbr range.",
    use: "234803xx,Your_text_here",
    fromMe: true,
    filename: __filename,
  },
  async (_0x165087, _0x13462a) => {
    try {
      let _0x14810d = _0x13462a ? _0x13462a : _0x165087.reply_text;
      if (!_0x14810d) {
        return await _0x165087.reply(
          "*Advertise of your Message*\n*by sending it to provided nmbr range.*\n" +
            prefix +
            "advt 234803xx,Your_text_here"
        );
      }
      const _0x94ba67 = _0x14810d.indexOf(",");
      if (_0x94ba67 === -1) {
        return await _0x165087.send(
          "*Invalid format. Please provide number and Message separated by a comma.*"
        );
      }
      let _0xd9b857 = "" + _0x14810d.slice(0, _0x94ba67).trim();
      let _0x321dea =
        _0x14810d.slice(_0x94ba67 + 1).trim() + "\n\n\n" + Config.caption;
      if (!_0xd9b857.includes("x")) {
        return _0x165087.send(
          "*You did not add x in number.*\n*Ex: " +
            prefix +
            "advt 234803xx,Your_Message_here*  \n " +
            Config.caption
        );
      }
      await _0x165087.send(
        "*Sending message to given number range.!*\n*It may take some time, so wait please*"
      );
      function _0x4affa2(_0x9f9b09, _0x557f5a) {
        return _0x9f9b09.split(_0x557f5a).length - 1;
      }
      var _0x43ad94 = _0xd9b857.split("x")[0];
      var _0x1d8f31 = _0xd9b857.split("x")[_0x4affa2(_0xd9b857, "x")]
        ? _0xd9b857.split("x")[_0x4affa2(_0xd9b857, "x")]
        : "";
      var _0x43415b = _0x4affa2(_0xd9b857, "x");
      var _0x4f926f;
      if (_0x43415b == 1) {
        _0x4f926f = 10;
      } else if (_0x43415b == 2) {
        _0x4f926f = 100;
      } else if (_0x43415b == 3) {
        _0x4f926f = 1000;
      } else if (_0x43415b > 3) {
        return await _0x165087.send("*Only 3(x) are Allowed in number*");
      }
      let _0x1e111b = 0;
      let _0x5c0975 = "";
      var _0x5b9d27 = "";
      for (let _0x3e0552 = 0; _0x3e0552 < _0x4f926f; _0x3e0552++) {
        var _0x4d017c = await _0x165087.bot.onWhatsApp(
          "" + _0x43ad94 + _0x3e0552 + _0x1d8f31 + "@s.whatsapp.net"
        );
        if (_0x4d017c[0]) {
          _0x5b9d27 = _0x4d017c[0].jid;
          if (_0x5c0975.includes(_0x5b9d27)) {
            continue;
          }
          await sleep(1500);
          await _0x165087.bot.sendMessage(_0x5b9d27, {
            text: _0x321dea,
          });
          _0x5c0975 = _0x5c0975 + "," + _0x5b9d27;
          _0x1e111b += 1;
        }
      }
      return await _0x165087.send(
        "*_Advertisement of your Message is Done,_* \n\n*_Message Succesfully sent to " +
          _0x1e111b +
          " chats_*\nLast_User: " +
          _0x5b9d27.split("@")[0] +
          "\nSearch_No: " +
          _0x4f926f +
          " number searched\n\n\n" +
          Config.caption
      );
    } catch (_0xfcb50a) {
      await _0x165087.error(
        _0xfcb50a + "\n\ncommand: dalle",
        _0xfcb50a,
        "*_No responce from Server side, Sorry!!_*"
      );
    }
  }
);
async function processing(_0x2f3dd0, _0x615984) {
  try {
    const _0x19a878 = require("form-data");
    return new Promise(async (_0x41cb49, _0x35934d) => {
      Form = new _0x19a878();
      scheme = "https://inferenceengine.vyro.ai/" + _0x615984;
      Form.append("model_version", 1, {
        "Content-Transfer-Encoding": "binary",
        contentType: "multipart/form-data; charset=uttf-8",
      });
      Form.append("image", Buffer.from(_0x2f3dd0), {
        filename: _0x615984 + ".jpg",
        contentType: "image/jpeg",
      });
      Form.submit(
        {
          url: scheme,
          host: "inferenceengine.vyro.ai",
          path: "/" + _0x615984,
          protocol: "https:",
          headers: {
            "User-Agent": "okhttp/4.9.3",
            Connection: "Keep-Alive",
            "Accept-Encoding": "gzip",
          },
        },
        function (_0x9b5341, _0x51434f) {
          if (_0x9b5341) {
            _0x35934d();
          }
          let _0x567d22 = [];
          _0x51434f
            .on("data", function (_0x2b5127, _0x4d261c) {
              _0x567d22.push(_0x2b5127);
            })
            .on("end", () => {
              _0x41cb49(Buffer.concat(_0x567d22));
            })
            .on("error", (_0x403a63) => {
              _0x35934d();
            });
        }
      );
    });
  } catch (_0x2c5371) {
    console.log(_0x2c5371);
    return _0x2f3dd0;
  }
}
smd(
  {
    cmdname: "remini",
    desc: "enhance image quality!",
    type: "ai",
    filename: __filename,
  },
  async (_0x1bd29b) => {
    let _0x4da3a4 = _0x1bd29b.image ? _0x1bd29b : _0x1bd29b.reply_message;
    if (!_0x4da3a4 || !_0x4da3a4.image) {
      return await _0x1bd29b.send("*Reply to image, to enhance quality!*");
    }
    try {
      let _0x5b1096 = await _0x4da3a4.download();
      const _0x1ac1f7 = await processing(_0x5b1096, "enhance");
      await _0x1bd29b.send(_0x1ac1f7, {}, "img", _0x1bd29b);
      _0x5b1096 = false;
    } catch (_0x4eecc9) {
      _0x1bd29b.error(
        _0x4eecc9 + "\n\nCommand: remini",
        _0x4eecc9,
        "*Process Denied :(*"
      );
    }
  }
);
smd(
  {
    cmdname: "dehaze",
    desc: "enhance image quality!",
    type: "ai",
    filename: __filename,
  },
  async (_0x2a1135) => {
    let _0xa78bb3 = _0x2a1135.image ? _0x2a1135 : _0x2a1135.reply_message;
    if (!_0xa78bb3 || !_0xa78bb3.image) {
      return await _0x2a1135.send("*Reply to image, to enhance quality!*");
    }
    try {
      let _0x4e83ce = await _0xa78bb3.download();
      const _0x65b7b8 = await processing(_0x4e83ce, "dehaze");
      await _0x2a1135.send(_0x65b7b8, {}, "img", _0x2a1135);
      _0x4e83ce = false;
    } catch (_0x44fb27) {
      _0x2a1135.error(
        _0x44fb27 + "\n\nCommand: dehaze",
        _0x44fb27,
        "*Process Denied :(*"
      );
    }
  }
);
smd(
  {
    cmdname: "recolor",
    desc: "enhance image quality!",
    type: "ai",
    filename: __filename,
  },
  async (_0x18f8e1) => {
    let _0x220e4a = _0x18f8e1.image ? _0x18f8e1 : _0x18f8e1.reply_message;
    if (!_0x220e4a || !_0x220e4a.image) {
      return await _0x18f8e1.send("*Reply to image, to enhance quality!*");
    }
    try {
      let _0x38f64d = await _0x220e4a.download();
      const _0x51042 = await processing(_0x38f64d, "recolor");
      await _0x18f8e1.send(_0x51042, {}, "img", _0x18f8e1);
      _0x38f64d = false;
    } catch (_0x4a62c8) {
      _0x18f8e1.error(
        _0x4a62c8 + "\n\nCommand: recolor",
        _0x4a62c8,
        "*Process Denied :(*"
      );
    }
  }
);
