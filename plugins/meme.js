const axios = require("axios");
const fs = require("fs-extra");
const {
  exec
} = require("child_process");
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const fetch = require("node-fetch");
const {
  userdb,
  tiny,
  fancytext,
  smdBuffer,
  getBuffer,
  sleep,
  listall,
  getRandom,
  prefix,
  smd,
  generateSticker,
  TelegraPh,
  Config,
  tlang
} = require("../lib/");
let s_ser = Config.WORKTYPE === "public" ? false : true;
smd({
  pattern: "trump",
  alias: ["tea", "kofi"],
  category: "meme",
  desc: "give text to creat trum tweet",
  filename: __filename
}, async (_0x2e919e, _0x3211d9) => {
  try {
    if (!_0x3211d9) {
      return await _0x2e919e.send("*provide text!*");
    }
    const _0x1fe1f4 = "./plugins/meme.say/trumSay.png";
    const _0x6eae84 = "./temp/trump.png";
    const _0x37de91 = 70;
    const _0x562e1c = 150;
    const _0x8d5fe7 = 700;
    const _0x5c1e91 = 4;
    let _0x3516c1 = await addTextToImage(_0x1fe1f4, _0x6eae84, "  " + _0x3211d9, _0x37de91, _0x562e1c, _0x8d5fe7, _0x5c1e91, "35");
    await sleep(1500);
    await _0x2e919e.bot.sendMessage(_0x2e919e.jid, {
      image: {
        url: _0x3516c1
      },
      caption: Config.caption
    });
  } catch (_0x17be15) {
    return await _0x2e919e.error(_0x17be15 + "\n\n command: coffe", _0x17be15, "*_Didn't get any results, Sorry!_*");
  }
});
smd({
  pattern: "mia",
  alias: ["tea", "kofi"],
  category: "meme",
  desc: "Finds info about song",
  filename: __filename
}, async (_0x196aaf, _0xb868e4) => {
  try {
    if (!_0xb868e4) {
      return await _0x196aaf.send("*provide text!*");
    }
    const {
      sleep: _0x1e5f8e
    } = require("../lib");
    const _0x45716c = "./plugins/meme.say/mia.png";
    const _0x349967 = "./temp/mia.png";
    const _0x205145 = 90;
    const _0x4fffeb = 120;
    const _0x29c4a0 = 600;
    const _0x1b6b56 = 3;
    const _0x19aff6 = "35";
    let _0x458c49 = await addTextToImage(_0x45716c, _0x349967, "  " + _0xb868e4, _0x205145, _0x4fffeb, _0x29c4a0, _0x1b6b56, _0x19aff6);
    await _0x1e5f8e(1500);
    await _0x196aaf.bot.sendMessage(_0x196aaf.jid, {
      image: {
        url: _0x458c49
      },
      caption: Config.caption
    });
  } catch (_0x5cbdac) {
    return await _0x196aaf.error(_0x5cbdac + "\n\n command: coffe", _0x5cbdac, "*_Didn't get any results, Sorry!_*");
  }
});
smd({
  pattern: "johni",
  alias: ["tea", "kofi"],
  category: "meme",
  desc: "Finds info about song",
  filename: __filename
}, async (_0x3e4e5f, _0xc96ca7) => {
  try {
    if (!_0xc96ca7) {
      return await _0x3e4e5f.send("*provide text!*");
    }
    const {
      sleep: _0xb12005
    } = require("../lib");
    const _0x340a07 = "./plugins/meme.say/johni.png";
    const _0x57864f = "./temp/johni.png";
    const _0x2df546 = 40;
    const _0x3436d9 = 210;
    const _0x1f11ae = 570;
    const _0x4bdade = 3;
    const _0x539a5e = "30";
    let _0xb1f16a = await addTextToImage(_0x340a07, _0x57864f, "  " + _0xc96ca7, _0x2df546, _0x3436d9, _0x1f11ae, _0x4bdade, _0x539a5e);
    await _0xb12005(1500);
    await _0x3e4e5f.bot.sendMessage(_0x3e4e5f.jid, {
      image: {
        url: _0xb1f16a
      },
      caption: Config.caption
    });
  } catch (_0x53b0a7) {
    return await _0x3e4e5f.error(_0x53b0a7 + "\n\n command: coffe", _0x53b0a7, "*_Didn't get any results, Sorry!_*");
  }
});
smd({
  pattern: "elon",
  alias: ["tea", "kofi"],
  category: "meme",
  desc: "Finds info about song",
  filename: __filename
}, async (_0x102280, _0x5103d0) => {
  try {
    if (!_0x5103d0) {
      return await _0x102280.send("*provide text!*");
    }
    const {
      sleep: _0x4a4a57
    } = require("../lib");
    const _0x17181a = "./plugins/meme.say/elon.jpg";
    const _0x3ec84e = "./temp/elon.png";
    const _0x8750aa = 60;
    const _0x46941a = 130;
    const _0x47429e = 900;
    const _0x5461e5 = 5;
    let _0x499f7b = await addTextToImage(_0x17181a, _0x3ec84e, "\t" + _0x5103d0, _0x8750aa, _0x46941a, _0x47429e, _0x5461e5);
    await _0x4a4a57(1500);
    await _0x102280.bot.sendMessage(_0x102280.jid, {
      image: {
        url: _0x499f7b
      },
      caption: Config.caption
    });
  } catch (_0x443f32) {
    return await _0x102280.error(_0x443f32 + "\n\n command: coffe", _0x443f32, "*_Didn't get any results, Sorry!_*");
  }
});
smd({
  pattern: "mark",
  alias: ["tea", "kofi"],
  category: "meme",
  desc: "Finds info about song",
  filename: __filename
}, async (_0x27b8ff, _0x53affd) => {
  try {
    if (!_0x53affd) {
      return await _0x27b8ff.send("*provide text!*");
    }
    const {
      sleep: _0x445b13
    } = require("../lib");
    const _0xf83242 = "./plugins/meme.say/mark.png";
    const _0x564c44 = "./temp/mark.png";
    const _0xabdc6f = 30;
    const _0x452cba = 80;
    const _0x1b5119 = 500;
    const _0x59eae9 = 3;
    const _0x48235d = "20";
    let _0x21dd56 = await addTextToImage(_0xf83242, _0x564c44, "  " + _0x53affd, _0xabdc6f, _0x452cba, _0x1b5119, _0x59eae9, _0x48235d);
    await _0x445b13(1500);
    await _0x27b8ff.bot.sendMessage(_0x27b8ff.jid, {
      image: {
        url: _0x21dd56
      },
      caption: Config.caption
    });
  } catch (_0x117a0a) {
    return await _0x27b8ff.error(_0x117a0a + "\n\n command: coffe", _0x117a0a, "*_Didn't get any results, Sorry!_*");
  }
});
smd({
  pattern: "ronaldo",
  alias: ["tea", "kofi"],
  category: "meme",
  desc: "Finds info about song",
  filename: __filename
}, async (_0x510e3f, _0x338922) => {
  try {
    if (!_0x338922) {
      return await _0x510e3f.send("*provide text!*");
    }
    const {
      sleep: _0xb860d4
    } = require("../lib");
    const _0x395e = "./plugins/meme.say/ronaldo.png";
    const _0x40e38d = "./temp/ronaldo.png";
    const _0x3ffcaa = 50;
    const _0x42b27d = 140;
    const _0x3943e8 = 600;
    const _0x3def83 = 4;
    const _0x2f0120 = "35";
    let _0x5f154f = await addTextToImage(_0x395e, _0x40e38d, "  " + _0x338922, _0x3ffcaa, _0x42b27d, _0x3943e8, _0x3def83, _0x2f0120);
    await _0xb860d4(1500);
    await _0x510e3f.bot.sendMessage(_0x510e3f.jid, {
      image: {
        url: _0x5f154f
      },
      caption: Config.caption
    });
  } catch (_0x217be1) {
    return await _0x510e3f.error(_0x217be1 + "\n\n command: ronaldo", _0x217be1, "*_Didn't get any results, Sorry!_*");
  }
});
smd({
  pattern: "modi",
  alias: ["tea", "kofi"],
  category: "meme",
  desc: "Finds info about song",
  filename: __filename
}, async (_0x570869, _0x5706ad) => {
  try {
    if (!_0x5706ad) {
      return await _0x570869.send("*provide text!*");
    }
    const {
      sleep: _0x569e63
    } = require("../lib");
    const _0x376671 = "./plugins/meme.say/modi.png";
    const _0x421d98 = "./temp/modi.png";
    const _0x4fbe21 = 20;
    const _0x2c7e3b = 70;
    const _0x355c11 = 500;
    const _0x104f3a = 4;
    const _0x2bbc60 = "20";
    let _0x2c7d13 = await addTextToImage(_0x376671, _0x421d98, "  " + _0x5706ad, _0x4fbe21, _0x2c7e3b, _0x355c11, _0x104f3a, _0x2bbc60);
    await _0x569e63(1500);
    await _0x570869.bot.sendMessage(_0x570869.jid, {
      image: {
        url: _0x2c7d13
      },
      caption: Config.caption
    });
  } catch (_0x5c2f8f) {
    return await _0x570869.error(_0x5c2f8f + "\n\n command: modi", _0x5c2f8f, "*_Didn't get any results, Sorry!_*");
  }
});
smd({
  pattern: "imran",
  alias: ["tea", "kofi"],
  category: "meme",
  desc: "Finds info about song",
  filename: __filename
}, async (_0x3faf31, _0x336e80) => {
  try {
    if (!_0x336e80) {
      return await _0x3faf31.send("*provide text!*");
    }
    const {
      sleep: _0x1f1261
    } = require("../lib");
    const _0x2cb643 = "./plugins/meme.say/imran.png";
    const _0x4909fc = "./temp/imran.png";
    const _0x396f03 = 20;
    const _0x17f44a = 70;
    const _0xd147d9 = 500;
    const _0x124113 = 5;
    const _0x22ac13 = "20";
    let _0xc5a93c = await addTextToImage(_0x2cb643, _0x4909fc, "  " + _0x336e80, _0x396f03, _0x17f44a, _0xd147d9, _0x124113, _0x22ac13);
    await _0x1f1261(1500);
    await _0x3faf31.bot.sendMessage(_0x3faf31.jid, {
      image: {
        url: _0xc5a93c
      },
      caption: Config.caption
    });
  } catch (_0x4f2426) {
    return await _0x3faf31.error(_0x4f2426 + "\n\n command: imran", _0x4f2426, "*_Didn't get any results, Sorry!_*");
  }
});
const {
  createCanvas,
  loadImage
} = require("canvas");
async function addTextToImage(_0x58895c, _0x202ed4, _0x48abef, _0x4c9443, _0x564cb0, _0xe20474, _0x1ceb13, _0x4b0dfb = "30") {
  const _0x37f236 = await loadImage(_0x58895c);
  const _0x19a5bd = createCanvas(_0x37f236.width, _0x37f236.height);
  const _0x33a874 = _0x19a5bd.getContext("2d");
  _0x33a874.drawImage(_0x37f236, 0, 0, _0x19a5bd.width, _0x19a5bd.height);
  _0x33a874.font = _0x4b0dfb + "px Arial";
  _0x33a874.fillStyle = "black";
  _0x33a874.textAlign = "left";
  _0x33a874.textBaseline = "top";
  const _0x2523d0 = splitTextIntoLines(_0x48abef, _0x33a874, _0xe20474);
  if (_0x2523d0.length > _0x1ceb13) {
    _0x2523d0.splice(_0x1ceb13);
    const _0x22df3c = _0x2523d0[_0x1ceb13 - 1];
    const _0x1a273c = _0x22df3c.slice(0, _0x22df3c.length - 10) + "...Read More";
    _0x2523d0[_0x1ceb13 - 1] = _0x1a273c;
  }
  _0x2523d0.forEach((_0x49cdd3, _0x395f00) => {
    _0x33a874.fillText(_0x49cdd3, _0x4c9443, _0x564cb0 + _0x395f00 * 25);
  });
  const _0x32c36e = fs.createWriteStream(_0x202ed4);
  const _0x4f5585 = _0x19a5bd.createPNGStream();
  _0x4f5585.pipe(_0x32c36e);
  await new Promise(_0x37d5b5 => {
    _0x32c36e.on("finish", _0x37d5b5);
  });
  return _0x202ed4;
  console.log("Image with text created:", _0x202ed4);
}
function splitTextIntoLines(_0x17ef5c, _0x51a0cf, _0x4d7f68) {
  const _0x2e805a = _0x17ef5c.split(" ");
  const _0x32417c = [];
  let _0x4af771 = "";
  for (const _0xfba324 of _0x2e805a) {
    const _0x3509ff = _0x4af771 === "" ? _0xfba324 : _0x4af771 + " " + _0xfba324;
    const _0x46ffa7 = _0x51a0cf.measureText(_0x3509ff).width;
    if (_0x46ffa7 <= _0x4d7f68) {
      _0x4af771 = _0x3509ff;
    } else {
      _0x32417c.push(_0x4af771);
      _0x4af771 = _0xfba324;
    }
  }
  if (_0x4af771 !== "") {
    _0x32417c.push(_0x4af771);
  }
  return _0x32417c;
}