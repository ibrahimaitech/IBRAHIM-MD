const axios = require("axios");
const {
  randomeFunfacts,
  smd
} = require("../lib");
const fetch = require("node-fetch");
smd(
  {
    pattern: "rizz",
    desc: "Get a random pickup line.",
    category: "fun",
    filename: __filename,
  },
  async (m) => {
    try {
      const apiUrl = "https://api.popcat.xyz/pickuplines";
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();
      const { pickupline, contributor } = data;

      const message = `*Pickup Line:* ${pickupline}`;

      await m.send(message);
    } catch (e) {
      await m.error(`${e}\n\ncommand: rizz`, e);
    }
  }
);
smd({
  cmdname: "question",
  info: "Random Question.",
  type: "fun",
  filename: __filename
}, async (_0x526dda, _0x570e21, {
  smd: _0x59940a
}) => {
  try {
    await _0x526dda.reply(await randomeFunfacts(_0x59940a));
  } catch (_0x2763aa) {
    await _0x526dda.error(_0x2763aa + "\n\ncommand: " + _0x59940a, _0x2763aa);
  }
});
smd({
  cmdname: "truth",
  info: "truth and dare(truth game.).",
  type: "fun",
  filename: __filename
}, async (_0xc2b276, _0x3b493e, {
  smd: _0x52be61
}) => {
  try {
    await _0xc2b276.reply(await randomeFunfacts(_0x52be61));
  } catch (_0x28b284) {
    await _0xc2b276.error(_0x28b284 + "\n\ncommand: " + _0x52be61, _0x28b284);
  }
});
smd({
  cmdname: "dare",
  info: "truth and dare(dare game.).",
  type: "fun",
  filename: __filename
}, async (_0x330b72, _0x34d36a, {
  smd: _0x2a0858
}) => {
  try {
    await _0x330b72.reply(await randomeFunfacts(_0x2a0858));
  } catch (_0x27a0b8) {
    await _0x330b72.error(_0x27a0b8 + "\n\ncommand: " + _0x2a0858, _0x27a0b8);
  }
});
smd({
  cmdname: "joke",
  info: "Sends Joke in chat.",
  type: "fun",
  filename: __filename
}, async (_0x330ac0, _0x8b468d, {
  smd: _0x2e3522
}) => {
  try {
    await _0x330ac0.reply(await randomeFunfacts(_0x2e3522));
  } catch (_0x1817a2) {
    await _0x330ac0.error(_0x1817a2 + "\n\ncommand: " + _0x2e3522, _0x1817a2);
  }
});
smd({
  cmdname: "joke2",
  info: "Sends Joke in chat.",
  type: "fun",
  filename: __filename
}, async (_0x5c9c52, _0x6b6e25, {
  smd: _0x64ba
}) => {
  try {
    await _0x5c9c52.reply(await randomeFunfacts(_0x64ba));
  } catch (_0x35fd84) {
    await _0x5c9c52.error(_0x35fd84 + "\n\ncommand: " + _0x64ba, _0x35fd84);
  }
});
smd({
  cmdname: "fact",
  info: "Sends fact in chat.",
  type: "fun",
  filename: __filename
}, async (_0x1dc7e3, _0x16aaa1, {
  smd: _0x375b98
}) => {
  try {
    await _0x1dc7e3.reply(await randomeFunfacts(_0x375b98));
  } catch (_0x1e1a8b) {
    await _0x1dc7e3.error(_0x1e1a8b + "\n\ncommand: " + _0x375b98, _0x1e1a8b);
  }
});
smd({
  cmdname: "quotes",
  info: "Sends quotes in chat.",
  type: "fun",
  filename: __filename
}, async (_0x12963f, _0x4f30d2, {
  smd: _0x3462d1
}) => {
  try {
    await _0x12963f.reply(await randomeFunfacts(_0x3462d1));
  } catch (_0x18e714) {
    await _0x12963f.error(_0x18e714 + "\n\ncommand: " + _0x3462d1, _0x18e714);
  }
});
smd({
  cmdname: "define",
  info: "urban dictionary.",
  type: "fun",
  filename: __filename
}, async (_0x460337, _0x614c0a) => {
  try {
    let _0x328d73 = _0x614c0a ? _0x614c0a : _0x460337.reply_text;
    if (!_0x328d73) {
      return await _0x460337.send("*_Hey " + _0x460337.senderName + ", please provide a text!_*");
    }
    let {
      data: _0x330600
    } = await axios.get("http://api.urbandictionary.com/v0/define?term=" + _0x328d73);
    var _0x27eb8f = _0x330600 ? "*Word:* ```" + _0x328d73 + "``` \n*Definition:* ```" + _0x330600.list[0].definition.replace(/\[/g, "").replace(/\]/g, "") + "``` \n*Example:* ```" + _0x330600.list[0].example.replace(/\[/g, "").replace(/\]/g, "") + "```" : "*_No results found for given word_*";
    return _0x460337.reply(_0x27eb8f);
  } catch (_0x1d0916) {
    await _0x460337.error(_0x1d0916 + "\n\ncommand: define", _0x1d0916, "*No result for:* ```" + text + "```");
  }
});
smd({
   pattern: 'fakeinfo',
   fromMe: false,
   desc: 'Get fake information',
   type: 'fun'
}, async (message, match) => {
   try {
       const response = await axios.get('https://api.maher-zubair.tech/misc/fakeinfo');
       const data = response.data.result.results[0];
       
       const info = `
👤 *Name:* ${data.name.title} ${data.name.first} ${data.name.last}
📅 *Date of Birth:* ${new Date(data.dob.date).toLocaleDateString()}
📞 *Phone:* ${data.phone}
📧 *Email:* ${data.email}
🌐 *Location:* ${data.location.city}, ${data.location.state}, ${data.location.country}
🔑 *Username:* ${data.login.username}
📷 *Profile Picture:* [View Image](${data.picture.large})
       `;
       
       await message.send(info, { quoted: message.data });
   } catch (error) {
       console.error('Error fetching fake information:', error);
       await message.send('_Failed to fetch fake information._', { quoted: message.data });
   }
});
smd({
   pattern: 'insult',
   fromMe: false,
   desc: 'Get insulted',
   type: 'fun'
}, async (message, match) => {
   try {
       const response = await axios.get('https://api.maher-zubair.tech/misc/insult');
       const insult = response.data.result;
       
       await message.send(insult, { quoted: message.data });
   } catch (error) {
       console.error('Error fetching insult:', error);
       await message.send('_Failed to fetch insult._', { quoted: message.data });
   }
});
smd({
   pattern: 'lines',
   fromMe: false,
   desc: 'Get a nice message',
   type: 'fun'
}, async (message, match) => {
   try {
       const response = await axios.get('https://api.maher-zubair.tech/misc/lines');
       const messageText = response.data.result;
       
       await message.send(messageText, { quoted: message.data });
   } catch (error) {
       console.error('Error fetching message:', error);
       await message.send('_Failed to fetch message._', { quoted: message.data });
   }
});
