const axios = require('axios')
const {cmd} = require("../lib/plugins");
const eco = require("discord-mongoose-economy");
const {
  smd,
  prefix,
  send,
  Config
} = require("../lib/");
smd({
  pattern: "guessage",
  alias: ["age"],
  desc: "Guesses the age of a person based on their name.",
  category: "fun",
  use: "guessage [name]",
  examples: ["guessage John", "guessage Emily"]
}, async (message, input) => {
  const name = input;
  if (!name) {
    return message.reply("Please provide a name to guess the age.");
  }
  try {
    const response = await axios.get(`https://api.agify.io/?name=${name}`);
    const {
      count,
      age
    } = response.data;
    const output = `
*Name:* ${name}
*Estimated Age:* ${age}
*Count:* ${count}
      `;
    await message.send(output);
  } catch (error) {
    await message.error(error + "\n\nCommand: guessage", error, "Failed to guess age.");
  }
});
smd({
  pattern: "guesscountry",
  alias: ["country"],
  desc: "Guesses the likely countries associated with a name.",
  category: "fun",
  use: "guesscountry [name]",
  examples: ["guesscountry Michael", "guesscountry Fatima"]
}, async (message, input) => {
  const name = input;
  if (!name) {
    return message.reply("Please provide a name to guess the country.");
  }
  try {
    const response = await axios.get(`https://api.nationalize.io/?name=${name}`);
    const {
      count,
      country
    } = response.data;
    let output = `
*Name:* ${name}
*Count:* ${count}
*Likely Countries:*
`;
    country.forEach((c, index) => {
      output += `\n${index + 1}. ${c.country_id} (${(c.probability * 100).toFixed(2)}%)`;
    });
    await message.send(output);
  } catch (error) {
    await message.error(error + "\n\nCommand: guesscountry", error, "Failed to guess country.");
  }
});
smd({
  pattern: "guessgender",
  alias: ["gender"],
  desc: "Guesses the gender of a person based on their name.",
  category: "fun",
  use: "guessgender [name]",
  examples: ["guessgender David", "guessgender Sarah"]
}, async (message, input) => {
  const name = input;
  if (!name) {
    return message.reply("Please provide a name to guess the gender.");
  }
  try {
    const response = await axios.get(`https://api.genderize.io/?name=${name}`);
    const {
      count,
      gender,
      probability
    } = response.data;
    const output = `
*Name:* ${name}
*Estimated Gender:* ${gender}
*Probability:* ${(probability * 100).toFixed(2)}%
*Count:* ${count}
      `;
    await message.send(output);
  } catch (error) {
    await message.error(error + "\n\nCommand: guessgender", error, "Failed to guess gender.");
  }
});
const astro_patch_numGuess = {};
class GuessingGame {
  constructor() {
    this.attempts = 0;
    this.player = "";
    this.id = "";
    this.status = false;
    this.mode = "low";
    this.randomNumber = 0;
    this.guessedNumber = 0;
  }
}
const logoName = "█▄ █ █   █  █▄ ▄█  ██▄ ██▀ █▀▄\n█ ▀█ █▄█  █  ▀  █  █▄█ █▄▄ █▀▄";
smd({
  cmdname: "guess",
  info: "Play Guessing Number game",
  filename: __filename,
  type: "game",
  use: "< easy | medium | hard >"
}, async (_0x435f9e, _0x4a2fab) => {
  try {
    const _0x131859 = _0x435f9e.chat;
    let _0x44b37a = astro_patch_numGuess[_0x131859];
    let _0x2bfba9 = _0x4a2fab.toLowerCase();
    let _0xc06dac = _0x44b37a && _0x44b37a?.player === _0x435f9e.sender ? true : _0x435f9e.isCreator;
    if (_0x2bfba9 === "end" && _0x44b37a) {
      if (_0xc06dac) {
        delete astro_patch_numGuess[_0x131859];
        return await _0x435f9e.reply("*_Number Guessing Game ended. Goodbye!_*");
      } else {
        return await _0x435f9e.reply("*_You're not player of running game!!_*");
      }
    } else if (_0x2bfba9 === "end" && !_0x44b37a) {
      return await _0x435f9e.reply("*_Hey " + (_0x435f9e.senderName || "buddy") + ", There's no game running yet!!_*");
    }
    if (_0x44b37a && _0x44b37a.status) {
      return await _0x435f9e.reply("*_A game is already in progress in this chat._*\n To End the Game:  .Guess end");
    }
    let _0x2f035f = "";
    let _0x29dc2e = 0;
    if (_0x2bfba9.includes("easy")) {
      _0x29dc2e = Math.floor(Math.random() * 100);
      _0x2f035f = "Easy";
    } else if (_0x2bfba9.includes("medium")) {
      _0x29dc2e = Math.floor(Math.random() * 1000);
      _0x2f035f = "Medium";
    } else if (_0x2bfba9.includes("hard")) {
      _0x29dc2e = Math.floor(Math.random() * 10000);
      _0x2f035f = "Hard";
    } else {
      return await _0x435f9e.send(logoName + "\n   𝗡𝘂𝗺𝗯𝗲𝗿 𝗚𝘂𝗲𝘀𝘀𝗶𝗻𝗴 𝗚𝗮𝗺𝗲 𝗠𝗲𝗻𝘂\n\n*Uhh Dear, Choose " + (_0x2bfba9 ? "a Valid Option" : "an Option") + " First, Like _" + prefix + "Guess Normal_*\n*𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗠𝗼𝗱𝗲𝘀:*\n  ▢ Easy   ( _0 to 100_)\n  ▢ Medium ( _0 to 1000_)\n  ▢ Hard   ( _0 to 10000_)\n  ▢ End  ( _End the Game_)\n");
    }
    if (!_0x44b37a) {
      astro_patch_numGuess[_0x131859] = new GuessingGame();
    }
    _0x44b37a = astro_patch_numGuess[_0x131859];
    _0x44b37a.status = true;
    _0x44b37a.randomNumber = _0x29dc2e;
    _0x44b37a.mode = _0x2f035f;
    _0x44b37a.player = _0x435f9e.sender;
    _0x44b37a.id = _0x435f9e.chat;
    await _0x435f9e.reply(logoName + "\n  𝗡𝘂𝗺𝗯𝗲𝗿 𝗚𝘂𝗲𝘀𝘀𝗶𝗻𝗴 𝗚𝗮𝗺𝗲 𝗦𝘁𝗮𝗿𝘁𝗲𝗱\n\n*𝗦𝗲𝗹𝗲𝗰𝘁𝗲𝗱 𝗠𝗼𝗱𝗲 : _" + _0x44b37a.mode + "_* \n\t▢ *_Well, I'm thinking of a number between " + (_0x44b37a.mode === "Easy" ? "1 and 100" : _0x44b37a.mode === "Medium" ? "1 and 1000" : "1 and 10000") + "._*\n\n*𝗬𝗼𝘂𝗿 𝗧𝗮𝘀𝗸 :*\n   _▢ You Task is to Guess That Number._\n   _▢ Checks How Sharp is Your Memory._\n   _▢ Lets see How Many Attempts You Take To Guess Number._");
  } catch (_0x55d9e4) {
    await _0x435f9e.error(_0x55d9e4 + "\n\ncommand:guess", _0x55d9e4);
  }
});
const astro_patch_cfg = {};
const quotes = ["Connect Four: Where strategy meets fun!", "Let the battle of four-in-a-row begin!", "It's time to connect and conquer!", "Can you outsmart your opponent in Connect Four?", "Challenge your mind with Connect Four's strategic gameplay.", "Connect Four: A game of wits and tactics.", "Four in a row, that's the way to go!", "Connect Four: Unleash your strategic genius.", "Get ready to drop and connect your way to victory!", "Connect Four: Where every move counts.", "Prove your skills in the ultimate Connect Four showdown!", "Connect Four: The classic game of strategy and anticipation.", "Connect Four: Easy to learn, hard to master.", "Who will be the first to connect their pieces and claim victory?", "Prepare for a thrilling battle of strategy in Connect Four.", "Get ready to connect and win!", "Who will be the Connect Four champion?", "Strategize and conquer the board!", "Let the Connect Four battle begin!", "Connect Four: The ultimate test of skill!"];
class ConnectFourGame {
  constructor() {
    this.player1 = "";
    this.player2 = "";
    this.rowsMatrix = 6;
    this.columnsMatrix = 7;
    this.currentPlayer = "";
    this.gameStatus = false;
    this.attempts = {};
    this.matrix = [["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"], ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"], ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"], ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"], ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"], ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"]];
  }
  async updateLastIndex(_0xff60d2) {
    let _0x47973e = this.currentPlayer === this.player1 ? "🔵" : "🔴";
    let _0x2aa8d4 = this.matrix.length - 1;
    while (_0x2aa8d4 > 0 && this.matrix[_0x2aa8d4][_0xff60d2] !== "⚪") {
      _0x2aa8d4--;
    }
    if (this.matrix[_0x2aa8d4][_0xff60d2] == "⚪") {
      this.matrix[_0x2aa8d4][_0xff60d2] = _0x47973e;
      return true;
    } else {
      return false;
    }
  }
  async printMatrix() {
    let _0x14453f = "";
    for (let _0x90aa39 = 0; _0x90aa39 < this.matrix.length; _0x90aa39++) {
      _0x14453f += "\n| ";
      for (let _0x5cfaf1 = 0; _0x5cfaf1 < this.matrix[_0x90aa39].length; _0x5cfaf1++) {
        _0x14453f += this.matrix[_0x90aa39][_0x5cfaf1] + " | ";
      }
    }
    return _0x14453f;
  }
  async checkWin() {
    let _0x1ec623 = this.currentPlayer === this.player1 ? "🔵" : "🔴";
    for (let _0x5a1b58 = 0; _0x5a1b58 < this.matrix.length; _0x5a1b58++) {
      for (let _0x498289 = 0; _0x498289 <= this.matrix[_0x5a1b58].length - 4; _0x498289++) {
        if (this.matrix[_0x5a1b58][_0x498289] === _0x1ec623 && this.matrix[_0x5a1b58][_0x498289 + 1] === _0x1ec623 && this.matrix[_0x5a1b58][_0x498289 + 2] === _0x1ec623 && this.matrix[_0x5a1b58][_0x498289 + 3] === _0x1ec623) {
          return this.currentPlayer;
        }
      }
    }
    for (let _0x14a347 = 0; _0x14a347 <= this.matrix.length - 4; _0x14a347++) {
      for (let _0x22245c = 0; _0x22245c < this.matrix[_0x14a347].length; _0x22245c++) {
        if (this.matrix[_0x14a347][_0x22245c] === _0x1ec623 && this.matrix[_0x14a347 + 1][_0x22245c] === _0x1ec623 && this.matrix[_0x14a347 + 2][_0x22245c] === _0x1ec623 && this.matrix[_0x14a347 + 3][_0x22245c] === _0x1ec623) {
          return this.currentPlayer;
        }
      }
    }
    for (let _0x24e1a4 = 0; _0x24e1a4 <= this.matrix.length - 4; _0x24e1a4++) {
      for (let _0x21c69f = 0; _0x21c69f <= this.matrix[_0x24e1a4].length - 4; _0x21c69f++) {
        if (this.matrix[_0x24e1a4][_0x21c69f] === _0x1ec623 && this.matrix[_0x24e1a4 + 1][_0x21c69f + 1] === _0x1ec623 && this.matrix[_0x24e1a4 + 2][_0x21c69f + 2] === _0x1ec623 && this.matrix[_0x24e1a4 + 3][_0x21c69f + 3] === _0x1ec623) {
          return this.currentPlayer;
        }
      }
    }
    for (let _0x1306cd = 0; _0x1306cd <= this.matrix.length - 4; _0x1306cd++) {
      for (let _0x205612 = this.matrix[_0x1306cd].length - 1; _0x205612 >= 3; _0x205612--) {
        if (this.matrix[_0x1306cd][_0x205612] === _0x1ec623 && this.matrix[_0x1306cd + 1][_0x205612 - 1] === _0x1ec623 && this.matrix[_0x1306cd + 2][_0x205612 - 2] === _0x1ec623 && this.matrix[_0x1306cd + 3][_0x205612 - 3] === _0x1ec623) {
          return this.currentPlayer;
        }
      }
    }
    return null;
  }
}
smd({
  cmdname: "cfg",
  info: "Start Connect Four game session.",
  filename: __filename,
  type: "game",
  use: "< @user >"
}, async _0x211ed5 => {
  const _0x4f21cc = _0x211ed5.chat;
  let _0x20d34d = astro_patch_cfg[_0x4f21cc];
  if (_0x20d34d && _0x20d34d.gameStatus) {
    return await _0x211ed5.send("*A game is already in progress in this chat.*\n*Game Between :- _@" + _0x20d34d.player1.split("@")[0] + "_ vs _@" + _0x20d34d.player2.split("@")[0] + "_*\n_If You @{message.sender.split(\"@\")[0]} wants to Play,_ \n_Then Delete Cfg Session:- {prefix}delcfg_\n", {
      mentions: [_0x20d34d.player1, _0x20d34d.player2]
    });
  }
  if (!_0x20d34d) {
    _0x20d34d = new ConnectFourGame();
    astro_patch_cfg[_0x4f21cc] = _0x20d34d;
  }
  try {
    let _0x33f19d = _0x211ed5.quoted ? _0x211ed5.quoted.sender : _0x211ed5.mentionedJid ? _0x211ed5.mentionedJid[0] : "-";
    _0x33f19d = _0x33f19d === _0x211ed5.sender ? "" : "" + _0x33f19d;
    if (_0x33f19d.includes("@")) {
      _0x20d34d.player1 = _0x211ed5.sender;
      _0x20d34d.player2 = _0x33f19d;
      _0x20d34d.gameStatus = true;
    } else if (!_0x20d34d.player1 || _0x20d34d.player1 === _0x211ed5.sender) {
      _0x20d34d.player1 = _0x211ed5.sender;
      return await _0x211ed5.send("▄▀▀ ▄▀▄ █▄ █ █▄ █ ▄▀▀ ▀█▀ \n▀▄▄ ▀▄▀ █ ▀█ █ ▀█ ▀▄▄    █\n   𝗖𝗼𝗻𝗻𝗲𝗰𝘁 𝗙𝗼𝘂𝗿 𝗚𝗮𝗺𝗲 𝗦𝗲𝘀𝘀𝗶𝗼𝗻 \n\n*Connect Four Game Session Created...*\n*room Id : _cfg-" + _0x4f21cc.split("@")[0] + "_*\n\n_Player 1: @" + _0x20d34d.player1.split("@")[0] + " Joined_\n_Waiting For Another Player To Start Game..._\n\n*Type _.cfg to Join This Game Session.*", {
        mentions: [_0x20d34d.player1]
      });
    } else if (_0x211ed5.sender != _0x20d34d.player1) {
      _0x20d34d.player2 = _0x211ed5.sender;
      _0x20d34d.gameStatus = true;
    }
  } catch (_0x264edb) {
    await _0x211ed5.reply("errors : " + _0x264edb);
  }
  if (_0x20d34d.gameStatus) {
    _0x20d34d.currentPlayer = _0x20d34d.player1;
    _0x20d34d.attempts[_0x20d34d.player1] = 0;
    _0x20d34d.attempts[_0x20d34d.player2] = 0;
    let _0x364961 = await _0x20d34d.printMatrix();
    let _0x2d3c4c = "▄▀▀ ▄▀▄ █▄ █ █▄ █ ▄▀▀ ▀█▀\n▀▄▄ ▀▄▀ █ ▀█ █ ▀█ ▀▄▄    █\n   𝗖𝗼𝗻𝗻𝗲𝗰𝘁 𝗙𝗼𝘂𝗿 𝗚𝗮𝗺𝗲 𝗦𝘁𝗮𝗿𝘁𝗲𝗱 \n\n" + _0x364961 + " \n◣━━━━━━━━━━ ━━━━━━━━━━◢\n\n*Connet Four Game Session started* \n*room Id : _cfg-" + _0x4f21cc.split("@")[0] + "_*\n\n*Current Turn: _@" + _0x20d34d.player1.split("@")[0] + "_*\n*Next Turn :  _@" + _0x20d34d.player2.split("@")[0] + "_*\n*_Hey @" + _0x20d34d.currentPlayer.split("@")[0] + ", Please take your turn_*\n▢ _Enter Line Number Between *'1'* to *'7'*_\n\n*Connect Four Game Task :*\n  _Player Needs To Connect Four Colors in a Sequence,_\n  _You can Connect Four Colors ▢Horizontally, ▢Vertically, ▢Diagonally._         \n\n*Lets Play :- _" + quotes[Math.floor(Math.random() * quotes.length)] + "_*\n";
    await _0x211ed5.send(_0x2d3c4c, {
      mentions: [_0x20d34d.player1, _0x20d34d.player2, _0x20d34d.currentPlayer]
    });
  }
});
smd({
  pattern: "delcfg",
  desc: "deletes Connect Four running session.",
  filename: __filename,
  category: "game"
}, async ({
  chat: _0xa871db,
  isCreator: _0x5157de,
  send: _0x4b76e6,
  reply: _0x28e18a,
  sender: _0xea0ced,
  senderName: _0x2c14e6
}) => {
  let _0x202014 = astro_patch_cfg[_0xa871db];
  if (_0x202014) {
    if (!_0x5157de && _0xea0ced !== _0x202014.player2 && _0xea0ced !== _0x202014.player1) {
      await _0x28e18a("*_Hey " + _0x2c14e6 + ", You're not player of running game_*\n");
    } else {
      delete astro_patch_cfg[_0xa871db];
      await _0x28e18a("▄▀▀ ▄▀▄ █▄ █ █▄ █ ▄▀▀ ▀█▀\n▀▄▄ ▀▄▀ █ ▀█ █ ▀█ ▀▄▄    █\n   𝗖𝗼𝗻𝗻𝗲𝗰𝘁 𝗙𝗼𝘂𝗿 𝗚𝗮𝗺𝗲 𝗗𝗲𝗹𝗲𝘁𝗲𝗱\n\n*Room Id : _cfg-" + _0xa871db.split("@")[0] + "_ Cleared Successfully*\n*_Connect Four Game Session Deleted From This Chat..._*\n");
    }
  } else {
    await _0x28e18a("▄▀▀ ▄▀▄ █▄ █ █▄ █ ▄▀▀ ▀█▀ \n▀▄▄ ▀▄▀ █ ▀█ █ ▀█ ▀▄▄    █\n  𝗖𝗼𝗻𝗻𝗲𝗰𝘁 𝗙𝗼𝘂𝗿 𝗚𝗮𝗺𝗲 404𝗘𝗿𝗿𝗼𝗿   \n\n*Uhh Dear, _Theres No Game Started yet in This Chat_*\n");
  }
});
smd({
  on: "text"
}, async (_0xcabf04, _0x265843) => {
  const _0x4d1cd7 = _0xcabf04.chat;
  const _0x47f35e = astro_patch_cfg[_0x4d1cd7];
  if (!_0x47f35e) {
    return;
  }
  let _0x5acce8 = parseInt(_0xcabf04.text ? _0xcabf04.text.split(" ")[0] : "NaN");
  if (_0x47f35e.gameStatus && _0x47f35e.currentPlayer === _0xcabf04.sender && !isNaN(_0x5acce8)) {
    try {
      let _0x423cec = _0x5acce8 - 1;
      if (_0x423cec < 0 || _0x423cec >= _0x47f35e.columnsMatrix) {
        return;
      }
      let _0x3e702a = await _0x47f35e.updateLastIndex(_0x423cec);
      if (!_0x3e702a) {
        return await _0xcabf04.bot.sendMessage(_0xcabf04.chat, {
          text: "*_Invalid move Dear @" + _0x47f35e.currentPlayer.split("@")[0] + ", Line you enter is completely Filled. Please Give Other Line Numbers._*",
          mentions: [_0x47f35e.currentPlayer]
        }, {
          quoted: _0xcabf04
        });
      }
      let _0x1521ca = (await _0x47f35e.checkWin()) || false;
      _0x47f35e.attempts[_0x47f35e.currentPlayer]++;
      let _0x3fe5ce = await _0x47f35e.printMatrix();
      _0x47f35e.currentPlayer = _0x47f35e.currentPlayer === _0x47f35e.player1 ? _0x47f35e.player2 : _0x47f35e.player1;
      if (!_0x1521ca) {
        let _0x2c98f1 = "▄▀▀ ▄▀▄ █▄ █ █▄ █ ▄▀▀ ▀█▀ \n▀▄▄ ▀▄▀ █ ▀█ █ ▀█ ▀▄▄    █\n   𝗖𝗼𝗻𝗻𝗲𝗰𝘁 𝗙𝗼𝘂𝗿 cfg_𝗲 𝗕𝗼𝗮𝗿𝗱\n\n" + _0x3fe5ce + "\n◣━━━━━━━━━━ ━━━━━━━━━━◢\n\n*Current Turn " + (_0x47f35e.currentPlayer === _0x47f35e.player1 ? "🔵" : "🔴") + " : _@" + _0x47f35e.currentPlayer.split("@")[0] + "_*\n*Nextt Turn  " + (_0x47f35e.currentPlayer === _0x47f35e.player1 ? "🔴" : "🔵") + " : _@" + (_0x47f35e.currentPlayer === _0x47f35e.player1 ? _0x47f35e.player2 : _0x47f35e.player1).split("@")[0] + "_*\n\n ▢ *_Please take your turn to Break Pattern_*\n ▢ _Enter Line Number Between *'1'* to *'7'*_\n\n*Connent Four Game Quote :*\n  ▢ _" + quotes[Math.floor(Math.random() * quotes.length)] + "_\n";
        return await _0xcabf04.send(_0x2c98f1, {
          mentions: [_0x47f35e.player1, _0x47f35e.player2]
        });
      } else {
        delete astro_patch_cfg[_0x4d1cd7];
        return await _0xcabf04.send("▄▀▀ ▄▀▄ █▄ █ █▄ █ ▄▀▀ ▀█▀ \n▀▄▄ ▀▄▀ █ ▀█ █ ▀█ ▀▄▄    █\n   𝗖𝗼𝗻𝗻𝗲𝗰𝘁 𝗙𝗼𝘂𝗿 𝗚𝗮𝗺𝗲 𝗙𝗶𝗻𝗶𝘀𝗵𝗲𝗱\n\n*𝗪𝗶𝗻𝗻𝗲𝗿 𝗢𝗳 𝗧𝗵𝗲 𝗚𝗮𝗺𝗲 𝗜𝘀: _@" + _0x1521ca.split("@")[0] + "_*\n*𝗟𝗼𝗼𝘀𝗲𝗿 𝗢𝗳 𝗧𝗵𝗲 𝗚𝗮𝗺𝗲 𝗜𝘀: _@" + _0x47f35e.currentPlayer.split("@")[0] + "_*\n\n" + _0x3fe5ce + "\n◣━━━━━━━━━━ ━━━━━━━━━━◢     \n\n*_Congratulations! @" + _0x1521ca.split("@")[0] + " you win the Game!_* \n_You Connect Four Colors in_ '" + _0x47f35e.attempts[_0x1521ca] + "' _Turns._\n\n_Connect Four Game Session Finished Now_\n_Type_ .Cfg _to Start Again Connect Four Session._\n", {
          mentions: [_0x47f35e.player1, _0x47f35e.player2]
        });
      }
    } catch (_0x30983e) {
      return await console.log("Connect Four Game Error : ", _0x30983e);
    }
  }
});
const countries = {
  Afghanistan: "Kabul",
  Albania: "Tirana",
  Algeria: "Algiers",
  Angola: "Luanda",
  Argentina: "Buenos Aires",
  Armenia: "Yerevan",
  Australia: "Canberra",
  Austria: "Vienna",
  Azerbaijan: "Baku",
  Bahamas: "Nassau",
  Bahrain: "Manama",
  Bangladesh: "Dhaka",
  Barbados: "Bridgetown",
  Belarus: "Minsk",
  Belgium: "Brussels",
  Belize: "Belmopan",
  Benin: "Porto-Novo",
  Bhutan: "Thimphu",
  Bolivia: "Sucre",
  Botswana: "Gaborone",
  Brazil: "Brasília",
  Bulgaria: "Sofia",
  "Burkina Faso": "Ouagadougou",
  Burundi: "Gitega",
  "Cabo Verde": "Praia",
  Cambodia: "Phnom Penh",
  Cameroon: "Yaoundé",
  Canada: "Ottawa",
  "Central African Republic": "Bangui",
  Chad: "N'Djamena",
  Chile: "Santiago",
  China: "Beijing",
  Colombia: "Bogotá",
  Comoros: "Moroni",
  "Costa Rica": "San jose",
  "Cote d'Ivoire": "Yamoussoukro",
  Croatia: "Zagreb",
  Cuba: "Havana",
  Cyprus: "Nicosia",
  "Czech Republic": "Prague",
  Denmark: "Copenhagen",
  Djibouti: "Djibouti",
  Dominica: "Roseau",
  "Dominican Republic": "Santo Domingo",
  Ecuador: "Quito",
  Egypt: "Cairo",
  "El Salvador": "San Salvador",
  "Equatorial Guinea": "Malabo",
  Eritrea: "Asmara",
  Estonia: "Tallinn",
  Eswatini: "Mbabane",
  Ethiopia: "Addis Ababa",
  Fiji: "Suva",
  Finland: "Helsinki",
  France: "Paris",
  Gabon: "Libreville",
  Gambia: "Banjul",
  Georgia: "Tbilisi",
  Germany: "Berlin",
  Ghana: "Accra",
  Greece: "Athens",
  Grenada: "St. George's",
  Guatemala: "Guatemala City",
  Guinea: "Conakry",
  "Guinea-Bissau": "Bissau",
  Guyana: "Georgetown",
  Haiti: "Port prince",
  Honduras: "Tegucigalpa",
  Hungary: "Budapest",
  Iceland: "Reykjavik",
  India: "New Delhi",
  Indonesia: "Jakarta",
  Iran: "Tehran",
  Iraq: "Baghdad",
  Ireland: "Dublin",
  Israel: "Jerusalem",
  Italy: "Rome",
  Jamaica: "Kingston",
  Japan: "Tokyo",
  Jordan: "Amman",
  Kazakhstan: "Nur Sultan",
  Kenya: "Nairobi",
  Kiribati: "Tarawa",
  "Korea, North": "Pyongyang",
  "Korea, South": "Seoul",
  Kosovo: "Pristina",
  Kuwait: "Kuwait",
  Kyrgyzstan: "Bishkek",
  Laos: "Vientiane",
  Latvia: "Riga",
  Lebanon: "Beirut",
  Lesotho: "Maseru",
  Liberia: "Monrovia",
  Libya: "Tripoli",
  Liechtenstein: "Vaduz",
  Lithuania: "Vilnius",
  Luxembourg: "Luxembourg City",
  Madagascar: "Antananarivo",
  Malawi: "Lilongwe",
  Malaysia: "Kuala Lumpur",
  Maldives: "Male",
  Mali: "Bamako",
  Malta: "Valletta",
  "Marshall Islands": "Majuro",
  Mauritania: "Nouakchott",
  Mauritius: "Port Louis",
  Mexico: "Mexico City",
  Micronesia: "Palikir",
  Moldova: "Chisinau",
  Monaco: "Monaco",
  Mongolia: "Ulaanbaatar",
  Montenegro: "Podgorica",
  Morocco: "Rabat",
  Mozambique: "Maputo",
  Myanmar: "Naypyidaw",
  Namibia: "Windhoek",
  Nauru: "Yaren",
  Nepal: "Kathmandu",
  Netherlands: "Amsterdam",
  "New Zealand": "Wellington",
  Nicaragua: "Managua",
  Niger: "Niamey",
  Nigeria: "Abuja",
  "North Macedonia": "Skopje",
  Norway: "Oslo",
  Oman: "Muscat",
  Pakistan: "Islamabad",
  Palau: "Ngerulmud",
  Palestine: "Ramallah",
  Panama: "Panama City",
  Paraguay: "Asunción",
  Peru: "Lima",
  Philippines: "Manila",
  Poland: "Warsaw",
  Portugal: "Lisbon",
  Qatar: "Doha",
  Romania: "Bucharest",
  Russia: "Moscow",
  Rwanda: "Kigali",
  "Saint Kitts": "Basseterre",
  "Saint Lucia": "Castries",
  Samoa: "Apia",
  "San Marino": "San Marino",
  "Saudi Arabia": "Riyadh",
  Senegal: "Dakar",
  Serbia: "Belgrade",
  Seychelles: "Victoria",
  "Sierra Leone": "Freetown",
  Singapore: "Singapore",
  Slovakia: "Bratislava",
  Slovenia: "Ljubljana",
  "Solomon Islands": "Honiara",
  Somalia: "Mogadishu",
  "South Africa": "Pretoria",
  "South Sudan": "Juba",
  Spain: "Madrid",
  "Sri Lanka": "Colombo",
  Sudan: "Khartoum",
  Suriname: "Paramaribo",
  Sweden: "Stockholm",
  Switzerland: "Bern",
  Syria: "Damascus",
  Taiwan: "Taipei",
  Tajikistan: "Dushanbe",
  Tanzania: "Dodoma",
  Thailand: "Bangkok",
  "Timor-Leste": "Dili",
  Togo: "Lome",
  Tonga: "Nuku'alofa",
  Tunisia: "Tunis",
  Turkey: "Ankara",
  Turkmenistan: "Ashgabat",
  Tuvalu: "Funafuti",
  Uganda: "Kampala",
  Ukraine: "Kyiv",
  "United Arab Emirates": "Abu Dhabi",
  "United Kingdom": "London",
  "United States": "Washington",
  Uruguay: "Montevideo",
  Uzbekistan: "Tashkent",
  Vanuatu: "Port Vila",
  Vatican: "Vatican City",
  Venezuela: "Caracas",
  Vietnam: "Hanoi",
  Yemen: "Sana",
  Zambia: "Lusaka",
  Zimbabwe: "Harare"
};
let captions = {
  waitTime: 30,
  winReward: 2000,
  onStart: "*Capital Finding Game Started*\n*Player:* _@$player_\n*Task :* _Tell the Capital of *$country*_\n\n_Your Time Starts Now, You Have $waitTime seconds to Answer_",
  onTimeOut: "*Game Over, run out of time*\n\n*Player:* _@$player_\n*Reason:* _TimeOut!, You're not responed_\n\n*Answer:*\n The Capital of *$country* is *$capital*",
  onLimitEnd: "*Game Over, Attempts limit Exceed*\n\n*Player:* _@$player_\n*Reason:* _Not responed right answer in 3 attemps_\n\n*Answer:*\n The Capital of *$country* is *$capital*",
  onWrongAns: "*_Uhh dear, Your answer is not correct_*\n\n*Player:* _@$player_\n_You have *$attempt more attempt!*_\n\n*You have $waitTime seconds to answer!*",
  onWinGame: "*_Waoww, Your Answer is Correct_*\n*Player:* _@$player_\n\n_Capital of *$country* is *$capital*._\n_You give right answer in *$attempt attepmt*_\n_$amount cash added in your wallet_"
};
let astro_patch_Capital = {
  id: "",
  player: "",
  country: "",
  capital: "",
  attempts: 0,
  waitTime: 20,
  preAns: "previousAnswer",
  timer: ""
};
async function timerFuntions(_0x538b5f, _0x59929b) {
  await _0x538b5f.bot.sendMessage(_0x538b5f.chat, {
    text: captions.onTimeOut.replace("$player", _0x59929b.player.split("@")[0]).replace("$country", _0x59929b.country).replace("$capital", _0x59929b.capital),
    mentions: [_0x59929b.player]
  });
  delete astro_patch_Capital[_0x538b5f.sender];
}
smd({
  pattern: "co",
  alias: ["capital"],
  desc: "Find capital of the city",
  category: "game",
  filename: __filename
}, async _0x45934d => {
  const _0x304497 = Object.keys(countries);
  let _0x4f5d8a = _0x304497[Math.floor(Math.random() * _0x304497.length)];
  let _0x59e991 = countries[_0x4f5d8a];
  console.log("country : ", _0x4f5d8a);
  console.log("capital : ", _0x59e991);
  if (!astro_patch_Capital[_0x45934d.sender]) {
    astro_patch_Capital[_0x45934d.sender] = {
      id: _0x45934d.chat,
      player: _0x45934d.sender,
      country: _0x4f5d8a,
      capital: _0x59e991,
      attempts: 0,
      waitTime: captions.waitTime,
      preAns: _0x45934d.text,
      timer: ""
    };
  }
  let _0x5645fb = astro_patch_Capital[_0x45934d.sender];
  await _0x45934d.bot.sendMessage(_0x45934d.chat, {
    text: captions.onStart.replace("$player", _0x5645fb.player.split("@")[0]).replace("$country", _0x5645fb.country).replace("$waitTime", _0x5645fb.waitTime),
    mentions: [_0x5645fb.player]
  });
  _0x5645fb.timer = setTimeout(() => {
    timerFuntions(_0x45934d, _0x5645fb);
  }, _0x5645fb.waitTime * 1000);
});
let hcg_Logo = "█▄█ ▀ █▀▄ █▀▄ ██▀ █▄ █\n█   █ █ █▄▀ █▄▀ █▄▄ █ ▀█\n  ".trim();
const astro_patch_hcg = {};
class HiddenCardGame {
  constructor() {
    this.column = 4;
    this.row = 4;
    this.player1 = "";
    this.player2 = "";
    this.currentPlayer = "";
    this.board = [];
    this.hiddenCardIndex = 7;
    this.gameStatus = false;
    this.attempts = {};
  }
  startGame(_0x133f2f, _0x26c29f) {
    this.player1 = _0x133f2f;
    this.player2 = _0x26c29f;
    this.attempts[this.player1] = 0;
    this.attempts[this.player2] = 0;
    this.currentPlayer = _0x133f2f;
    this.board = this.createBoard();
    this.gameStatus = true;
  }
  createBoard() {
    const _0x1cc73d = [];
    for (let _0x24ec78 = 0; _0x24ec78 < this.row; _0x24ec78++) {
      const _0x55d31f = [];
      for (let _0x45d52c = 0; _0x45d52c < this.column; _0x45d52c++) {
        _0x55d31f.push("🈲");
      }
      _0x1cc73d.push(_0x55d31f);
    }
    return _0x1cc73d;
  }
  makeMove(_0xa4cc81, _0xb34f99) {
    if (!this.gameStatus) {
      return "";
    }
    if (_0xa4cc81 !== this.currentPlayer) {
      return "*_Hey Buddy, It's not your turn._*";
    }
    this.attempts[this.currentPlayer]++;
    const _0x52c4bf = _0xb34f99 - 1;
    if (this.isValidMove(_0x52c4bf)) {
      if (_0x52c4bf === this.hiddenCardIndex) {
        this.board[Math.floor(_0x52c4bf / this.row)][_0x52c4bf % this.column] = "🃏";
        let _0x5b6677 = this.displayBoard();
        this.gameStatus = false;
        return hcg_Logo + "  𝗤𝗨𝗘𝗘𝗡 𝗖𝗔𝗥𝗗 𝗙𝗢𝗨𝗡𝗗`\n\n*𝗪𝗶𝗻𝗻𝗲𝗿 𝗜𝘀: _@" + _0xa4cc81.split("@")[0] + "_*\n*𝗟𝗼𝗼𝘀𝗲𝗿 𝗜𝘀: _@" + (_0xa4cc81 === this.player1 ? this.player2 : this.player1).split("@")[0] + "_*\n\n" + _0x5b6677 + " \n\n\n*_Congratulations!_* \n  *_@" + _0xa4cc81.split("@")[0] + " you won the Game!!*_ \n_You found the Hidden Card in " + this.attempts[this.currentPlayer] + " Attempts._\n\n_Hidden Queen Game Session Finished Now_\n_Type *.hcg* to Start Hidden Queen Session._\n\n```\t 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗦𝘂𝗵𝗮𝗶𝗹 𝗠𝗱 ```\n";
      } else {
        this.board[Math.floor(_0x52c4bf / this.row)][_0x52c4bf % this.column] = "🟦";
        const _0x3d1f61 = this.checkGameResult();
        if (_0x3d1f61 === "continue") {
          this.currentPlayer = _0xa4cc81 === this.player1 ? this.player2 : this.player1;
          return hcg_Logo + "  𝗤𝗨𝗘𝗘𝗡 𝗖𝗔𝗥𝗗 𝗚𝗔𝗠𝗘` \n\n" + this.displayBoard() + "\n\n_Current Turn: @" + this.currentPlayer.split("@")[0] + "_\n_Next @" + (this.currentPlayer === this.player1 ? this.player2 : this.player1).split("@")[0] + "_\n\n\n ▢ *_Please take your turn & find card_*\n ▢ _Enter a number b/w *1* to *" + this.row * this.column + "* !!!_\n\n```\t 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗦𝘂𝗵𝗮𝗶𝗹 𝗠𝗱 ```";
        } else {
          this.gameStatus = false;
          return "┏━━━━━━━━━━━━━━━━━━┓\n┃     𝗛𝗖𝗚---𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗚𝗔𝗠𝗘     ┃\n┗━━━━━━━━━━━━━━━━━━┛\n\n\t*_Damnn!!! The hidden card was not found. Game over._*\n\n```\t 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗦𝘂𝗵𝗮𝗶𝗹 𝗠𝗱 ```";
        }
      }
    } else {
      return "┏━━━━━━━━━━━━━━━━━━┓\n┃     𝗛𝗖𝗚---𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗠𝗢𝗩𝗘     ┃\n┗━━━━━━━━━━━━━━━━━━┛\n\n𝗡𝗢𝗧𝗘:\n  Hey _@" + this.currentPlayer.split("@")[0] + "_ (•̪●), \n▢ _You provide an Invalid or Already used number_\n▢ _Provide a number between *1* and *" + this.row * this.column + "* !!!_\n\n```\t Powered by Suhail MD ```";
    }
  }
  isValidMove(_0x59acbc) {
    return _0x59acbc >= 0 && _0x59acbc < this.row * this.column && this.board[Math.floor(_0x59acbc / this.row)][_0x59acbc % this.column] === "🈲";
  }
  checkGameResult() {
    if (this.board.some(_0x59f339 => _0x59f339.includes("🈲"))) {
      return "continue";
    } else {
      return "end";
    }
  }
  displayBoard() {
    let _0x4a7e34 = "\t ";
    let _0x5f3cda = "◣━━";
    for (let _0x52b6e0 = 0; _0x52b6e0 < this.row; _0x52b6e0++) {
      for (let _0x23bf9b = 0; _0x23bf9b < this.column; _0x23bf9b++) {
        _0x4a7e34 += this.board[_0x52b6e0][_0x23bf9b] + " ";
      }
      _0x5f3cda += "━━";
      _0x4a7e34 += "\n\t ";
    }
    _0x5f3cda += "◢";
    return "\t " + _0x4a7e34.trim() + "\n" + _0x5f3cda;
  }
}
smd({
  pattern: "hcg",
  desc: "Starts a Hidden Card Game.",
  filename: __filename,
  category: "game"
}, async (_0x2f9c0f, _0x40c02a) => {
  const _0x2ffd5e = _0x2f9c0f.chat;
  let _0x53feb3 = astro_patch_hcg[_0x2ffd5e];
  if (_0x53feb3 && _0x53feb3.gameStatus) {
    return await _0x2f9c0f.reply("*_A game is already in progress in this chat._*");
  }
  if (!_0x53feb3) {
    _0x53feb3 = new HiddenCardGame();
    astro_patch_hcg[_0x2ffd5e] = _0x53feb3;
  }
  let _0x42c980 = _0x2f9c0f.quoted ? _0x2f9c0f.quoted.sender : _0x2f9c0f.mentionedJid ? _0x2f9c0f.mentionedJid[0] : false;
  let _0x2e5c0c = 5;
  let _0x57fb8 = 5;
  if (_0x40c02a) {
    _0x2e5c0c = parseInt(_0x40c02a) || 5;
    _0x2e5c0c = _0x2e5c0c > 2 && _0x2e5c0c < 8 ? _0x2e5c0c : 5;
  }
  _0x53feb3.row = _0x2e5c0c;
  _0x53feb3.column = _0x2e5c0c;
  if (!_0x53feb3.player1 || _0x2f9c0f.sender === _0x53feb3.player1) {
    if (_0x42c980 && _0x42c980 !== _0x2f9c0f.sender) {
      _0x53feb3.player1 = _0x2f9c0f.sender;
      _0x53feb3.player2 = _0x42c980;
      _0x53feb3.startGame(_0x53feb3.player1, _0x53feb3.player2);
    } else {
      _0x53feb3.player1 = _0x2f9c0f.sender;
      return await _0x2f9c0f.send("┏━━━━━━━━━━━━━━━━━━┓\n┃     𝗛𝗜𝗗𝗗𝗘𝗡 𝗖𝗔𝗥𝗗 𝗚𝗔𝗠𝗘     ┃\n┗━━━━━━━━━━━━━━━━━━┛\n\n_*Hidden Card Game Created...*_\n_Player 1: @" + _0x53feb3.player1.split("@")[0] + " Joined_\n_Waiting For Another Player To Start Game..._\n\n*Type _" + prefix + "Hcg_ to Join This Game.*", {
        mentions: [_0x53feb3.player1]
      });
    }
  } else if (_0x2f9c0f.sender !== _0x53feb3.player1) {
    _0x53feb3.player2 = _0x2f9c0f.sender;
    _0x53feb3.startGame(_0x53feb3.player1, _0x53feb3.player2);
  }
  if (_0x53feb3.gameStatus) {
    _0x53feb3.hiddenCardIndex = Math.floor(Math.random() * (_0x53feb3.row * _0x53feb3.column));
    return await _0x2f9c0f.send("┏━━━━━━━━━━━━━━━━━━┓\n┃     𝗛𝗜𝗗𝗗𝗘𝗡 𝗖𝗔𝗥𝗗 𝗚𝗔𝗠𝗘     ┃\n┗━━━━━━━━━━━━━━━━━━┛\n\n*Hidden Card Game started*\n_Current Turn: @" + _0x53feb3.currentPlayer.split("@")[0] + "_\n_Next Turn : @" + (_0x53feb3.currentPlayer === _0x53feb3.player1 ? _0x53feb3.player2 : _0x53feb3.player1).split("@")[0] + "_\n\n_Board Size : *" + _0x53feb3.row + "x" + _0x53feb3.column + "*_\n_Theres a Hidden Queen Card *\"🃏\"* in Board_\n_Enter a number to find the Queen Card_\n\n" + _0x53feb3.displayBoard() + " ", {
      mentions: [_0x53feb3.player1, _0x53feb3.player2, _0x53feb3.currentPlayer]
    });
  }
});
smd({
  cmdname: "delhcg",
  info: "deletes hidden card running session.",
  filename: __filename,
  type: "game"
}, async ({
  chat: _0x4cf9b7,
  isCreator: _0x43e54f,
  send: _0x35cae7,
  reply: _0x24df9e,
  sender: _0x434bc1
}) => {
  let _0x3c3320 = astro_patch_hcg[_0x4cf9b7];
  if (_0x3c3320) {
    if (!_0x43e54f && _0x434bc1 !== _0x3c3320.player2 && _0x434bc1 !== _0x3c3320.player1) {
      await _0x35cae7("┏━━━━━━━━━━━━━━━━━━┓\n┃     𝗛𝗜𝗗𝗗𝗘𝗡 𝗖𝗔𝗥𝗗 𝗚𝗔𝗠𝗘     ┃\n┗━━━━━━━━━━━━━━━━━━┛\n\n*Uhh Please, _You are not a Player of running game!!!_\n");
    } else {
      delete astro_patch_hcg[_0x4cf9b7];
      await _0x24df9e("\n" + hcg_Logo + "𝗖𝗔𝗥𝗗 𝗚𝗔𝗠𝗘 𝗗𝗘𝗟𝗘𝗧𝗘𝗗\n\n*Room Id : _hcg-" + _0x4cf9b7.split("@")[0] + "_ Cleared Successfully*\n*_Hidden Card Game Session Deleted From This Chat..._*\n");
    }
  } else {
    _0x24df9e("┏━━━━━━━━━━━━━━━━━━┓\n┃   𝗤𝗨𝗘𝗘𝗡 𝗖𝗔𝗥𝗗 404𝗘𝗿𝗿𝗼𝗿    ┃\n┗━━━━━━━━━━━━━━━━━━┛ \n\n*Uhh Dear, _Theres No Game Started yet in This Chat_*\n");
  }
});
cmd({
  on: "text"
}, async _0x16aecb => {
  if (!_0x16aecb || _0x16aecb.isBaileys) {
    return;
  }
  const _0x5d0144 = _0x16aecb.chat;
  const _0x2091f2 = parseInt(_0x16aecb.text ? _0x16aecb.text : "null");
  try {
    const _0x35d41c = astro_patch_hcg[_0x5d0144];
    if (_0x35d41c && _0x35d41c.gameStatus && _0x35d41c.currentPlayer === _0x16aecb.sender && !isNaN(_0x2091f2) && _0x16aecb.text) {
      const _0x2b3010 = _0x35d41c.makeMove(_0x16aecb.sender, _0x2091f2);
      if (!_0x35d41c.gameStatus) {
        delete astro_patch_hcg[_0x16aecb.chat];
      }
      if (_0x2b3010) {
        await send(_0x16aecb, _0x2b3010, {
          mentions: [_0x35d41c.player1, _0x35d41c.player2]
        });
      } else {
        "";
      }
    }
  } catch (_0x40ad36) {
    console.log("Hidden card game error : ", _0x40ad36);
  }
  try {
    const _0x34ca41 = astro_patch_numGuess[_0x5d0144];
    if (_0x34ca41) {
      if (_0x34ca41.id === _0x16aecb.chat && _0x34ca41.player === _0x16aecb.sender && !isNaN(_0x2091f2)) {
        _0x34ca41.guessedNumber = _0x2091f2;
        _0x34ca41.attempts++;
        if (_0x34ca41.guessedNumber < _0x34ca41.randomNumber) {
          await _0x16aecb.send(logoName + "\n  𝗡𝘂𝗺𝗯𝗲𝗿 𝗬𝗼𝘂 𝗚𝘂𝗲𝘀𝘀𝗲𝗱 𝗶𝘀 𝗟𝗼𝘄\n\n*Player : _@" + _0x34ca41.player.split("@")[0] + "_*  \n*Attempts :* _" + _0x34ca41.attempts + " yet_\n\n*Number Info:*\n *_▢ Its Too Low Number!_*\n *_▢ Try to Guess a High Number From ' " + _0x34ca41.guessedNumber + "'._* \n *_▢ Make Sure to guess Number Between " + (_0x34ca41.mode === "Easy" ? "1 and 100" : _0x34ca41.mode === "Medium" ? "1 and 1000" : "1 and 10000") + "._*\n", {
            mentions: [_0x34ca41.player]
          }, "");
        } else if (_0x34ca41.guessedNumber > _0x34ca41.randomNumber) {
          await _0x16aecb.send(logoName + "\n 𝗡𝘂𝗺𝗯𝗲𝗿 𝗬𝗼𝘂 𝗚𝘂𝗲𝘀𝘀𝗲𝗱 𝗶𝘀 𝗛𝗶𝗴𝗵\n\n*Player : _@" + _0x34ca41.player.split("@")[0] + "_*  \n*Attempts :* _" + _0x34ca41.attempts + " yet_\n\n*Number Info:*\n *_▢ Its Too High Number!_*\n *_▢ Try to Guess a Smaller Number From ' " + _0x34ca41.guessedNumber + "'._* \n *_▢ Make Sure to guess Number Between " + (_0x34ca41.mode === "Easy" ? "1 and 100" : _0x34ca41.mode === "Medium" ? "1 and 1000" : "1 and 10000") + "._*\n", {
            mentions: [_0x34ca41.player]
          });
        } else {
          await _0x16aecb.send(logoName + "\n  𝗡𝘂𝗺𝗯𝗲𝗿 𝗚𝘂𝗲𝘀𝘀𝗶𝗻𝗴 𝗚𝗮𝗺𝗲 𝗙𝗶𝗻𝗶𝘀𝗵𝗲𝗱\n\n*𝗠𝗼𝗱𝗲 You Played : _" + _0x34ca41.mode.toUpperCase() + "_* \n*_Congratulations! @" + _0x34ca41.player.split("@")[0] + " you won the Game!_* \n  _▢ You guessed the correct number ' *" + _0x34ca41.randomNumber + "* '._\n  _▢ You take " + _0x34ca41.attempts + " attempts to Guess that Number._\n", {
            mentions: [_0x34ca41.player]
          });
          delete astro_patch_numGuess[_0x5d0144];
        }
      }
    }
  } catch (_0x1fe0b3) {
    console.log("Error in Number Guess Game, from command.On() --> ", _0x1fe0b3);
  }
  try {
    const _0x2e9c6b = astro_patch_Capital[_0x16aecb.sender];
    if (_0x2e9c6b && _0x2e9c6b.id === _0x5d0144 && _0x2e9c6b.player === _0x16aecb.sender && _0x2e9c6b.preAns !== _0x16aecb.text) {
      _0x2e9c6b.attempts += 1;
      clearTimeout(_0x2e9c6b.timer);
      _0x2e9c6b.preAns = _0x2e9c6b.text;
      if (_0x16aecb.text.toLowerCase() === _0x2e9c6b.capital.toLowerCase()) {
        let _0x15c4a0 = parseInt(captions.winReward) || 2000;
        await _0x16aecb.bot.sendMessage(_0x5d0144, {
          text: captions.onWinGame.replace("$player", _0x2e9c6b.player.split("@")[0]).replace("$country", _0x2e9c6b.country).replace("$capital", _0x2e9c6b.capital).replace("$amount", "" + _0x15c4a0).replace("$attempt", "" + _0x2e9c6b.attempts),
          mentions: [_0x2e9c6b.player]
        });
        delete astro_patch_Capital[_0x16aecb.sender];
        try {
          if (global.isMongodb) {
            await eco.give(_0x2e9c6b.player, "Suhail", _0x15c4a0);
          }
        } catch { }
      } else if (_0x2e9c6b.attempts <= 3) {
        await _0x16aecb.bot.sendMessage(_0x5d0144, {
          text: captions.onWrongAns.replace("$player", _0x2e9c6b.player.split("@")[0]).replace("$attempt", "" + (3 - _0x2e9c6b.attempts)).replace("$waitTime", _0x2e9c6b.waitTime),
          mentions: [_0x2e9c6b.player]
        });
        _0x2e9c6b.timer = setTimeout(() => {
          timerFuntions(_0x16aecb, _0x2e9c6b);
        }, _0x2e9c6b.waitTime * 1000);
      } else if (_0x2e9c6b.attempts > 3) {
        await _0x16aecb.bot.sendMessage(_0x5d0144, {
          text: captions.onLimitEnd.replace("$player", _0x2e9c6b.player.split("@")[0]).replace("$country", _0x2e9c6b.country).replace("$capital", _0x2e9c6b.capital),
          mentions: [_0x2e9c6b.player]
        });
        delete astro_patch_Capital[_0x16aecb.sender];
      }
    }
  } catch (_0x588e9e) {
    console.log("Error in game Capital Of Country --> ", _0x588e9e);
  }
});
const games = {};
const astro_patch_wcg = {};
const numbersArray = [40, 45, 50];
class WordChainGame {
  constructor() {
    this.player1 = "";
    this.player2 = "";
    this.currentPlayer = "";
    this.previousWord = "";
    this.wordChain = "";
    this.wordsCount = 0;
    this.wordLength = 4;
    this.longestWordBy = "Theres No Word yet";
    this.gameStatus = false;
    this.botPlayer = false;
    this.wrongAttempts = {};
    this.maxAttempts = 5;
    this.turnTimeLimit = 45;
    this.turnStartTime = 45;
    this.currentRemTime = 45;
    this.turnIntervalId = null;
  }
  stopTurn() {
    clearInterval(this.turnIntervalId);
  }
  async AwaitForSeconds(_0x3dad62) {
    await new Promise(_0x4ac2f5 => setTimeout(_0x4ac2f5, _0x3dad62 * 1000));
    this.botPlayer = false;
  }
  async startTurn(_0x346961) {
    this.turnIntervalId = setInterval(() => {
      const _0x27a820 = Math.floor((Date.now() - this.turnStartTime) / 1000);
      this.currentRemTime = this.turnTimeLimit - _0x27a820;
      if (this.currentRemTime === 0 && this.gameStatus) {
        try {
          this.botPlayer = true;
          if (this.wordsCount !== 0 && this.player2 && this.player1) {
            _0x346961.send("*_Damn, Time's up!_*\n _@" + this.currentPlayer.split("@")[0] + " Lost Game...!_", {
              mentions: [this.currentPlayer]
            });
            this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
            let _0x3a725c = "@" + this.currentPlayer.split("@")[0] + " Won The Game.\nWrong Attempt By Player : " + this.wrongAttempts[this.currentPlayer] + "\n\n\t\t*Game Information*\n\nTotal Chain Words : " + this.wordsCount + "  \n" + this.longestWordBy + "\n*_Chain Started From :-_*  " + this.wordChain + " ...!  \n";
            _0x346961.send(_0x3a725c, {
              mentions: [this.currentPlayer]
            });
          } else if (this.wordsCount === 0 && this.player2 && this.player1) {
            _0x346961.bot.sendMessage(_0x346961.from, {
              text: "*Wcg Session Terminated,* \nPLayer1 @" + this.player1.split("@")[0] + " And Player2 @" + this.player2.split("@")[0] + " both didn't take any move yet*",
              mentions: [this.player1, this.player2]
            });
          } else if (!this.player2 || !this.player1) {
            _0x346961.bot.sendMessage(_0x346961.chat, {
              text: "*Word Chain Game Session Expired,*\n*Reason : _One Player Still Missing_*"
            });
          }
          this.stopTurn();
          delete astro_patch_wcg[_0x346961.chat];
        } catch (_0x2eafa3) {
          return _0x346961.reply("Error while ending game : " + _0x2eafa3);
        }
      } else if (this.currentRemTime === 10) {
        this.botPlayer = true;
        if (this.player2 && this.player1) {
          let _0x3ed90a = "*Reminder : Game Terminates After " + this.currentRemTime + "s*\n\n*_Waiting For @" + this.currentPlayer.split("@")[0] + "'s Responce_*    \n_Take Your Turn, Otherwise Game Terminates_\n_Make Sure Your Word Must Start With *" + this.previousWord.slice(-1) + "* , and Must Have Atleast *" + this.wordLength + "* letters_\n\nYou Still Have *" + this.currentRemTime + "Secs* to Answer\nGive Your Best To Make Difficult For Opponent";
          _0x346961.send(_0x3ed90a, {
            mentions: [this.currentPlayer]
          }, "suhail");
        } else if (!this.player2 || !this.player1) {
          _0x346961.bot.sendMessage(_0x346961.jid, {
            text: "_Still Waiting For Player to Start Word Chain Game..._\n _Type *" + prefix + "wcg* to Join The Game_  \nOtherwise : _Wcg Session Expires After " + this.currentRemTime + "s_"
          });
        }
        this.AwaitForSeconds(1);
      }
    }, 1000);
  }
}
smd({
  pattern: "wcg",
  desc: "starts a Word Chain game.",
  filename: __filename,
  category: "game"
}, async (_0x5a8e18, _0x42e9b0) => {
  const _0x3e403e = _0x5a8e18.chat;
  let _0x17a140 = astro_patch_wcg[_0x3e403e];
  if (_0x42e9b0.startsWith("end") && _0x17a140) {
    _0x17a140.stopTurn();
    delete astro_patch_wcg[_0x3e403e];
    return await _0x5a8e18.reply("Game ended. Goodbye!");
  }
  if (_0x17a140 && _0x17a140.gameStatus) {
    return await _0x5a8e18.reply("A game is already in progress in this chat.\nType ```.wcg end``` Terminate the Session");
  }
  let _0x44a1fc = _0x5a8e18.quoted ? _0x5a8e18.quoted.sender : _0x5a8e18.mentionedJid ? _0x5a8e18.mentionedJid[0] : false;
  if (!_0x17a140) {
    _0x17a140 = new WordChainGame();
    astro_patch_wcg[_0x3e403e] = _0x17a140;
  }
  if (!_0x17a140.player1 || _0x5a8e18.sender === _0x17a140.player1) {
    if (_0x44a1fc && _0x44a1fc !== _0x5a8e18.sender) {
      _0x17a140.player1 = _0x5a8e18.sender;
      _0x17a140.player2 = _0x44a1fc;
      _0x17a140.gameStatus = true;
    } else {
      _0x17a140.player1 = _0x5a8e18.sender;
      _0x17a140.turnStartTime = Date.now();
      _0x17a140.startTurn(_0x5a8e18);
      return await _0x5a8e18.bot.sendMessage(_0x5a8e18.from, {
        text: "_Game Starting..._\nPLayer 1 : _@" + _0x17a140.player1.split("@")[0] + " Joined_ \n\n_Needs Another Player To Start Game..._\nType *_" + prefix + "wcg_* to Join This Game.",
        mentions: [_0x17a140.player1]
      });
    }
  } else if (_0x5a8e18.sender !== _0x17a140.player1) {
    _0x17a140.player2 = _0x5a8e18.sender;
    _0x17a140.gameStatus = true;
  }
  if (_0x17a140.gameStatus) {
    _0x17a140.stopTurn();
    _0x17a140.botPlayer = true;
    _0x17a140.turnStartTime = Date.now();
    _0x17a140.startTurn(_0x5a8e18);
    _0x17a140.wrongAttempts[_0x17a140.player1] = 0;
    _0x17a140.wrongAttempts[_0x17a140.player2] = 0;
    _0x17a140.previousWord = String.fromCharCode("a".charCodeAt(0) + Math.floor(Math.random() * 26));
    _0x17a140.wordChain = _0x17a140.previousWord;
    _0x17a140.currentPlayer = _0x17a140.player1;
    _0x17a140.AwaitForSeconds(3);
    return await _0x5a8e18.bot.sendMessage(_0x5a8e18.chat, {
      text: "*_Game started Now..._*\n _Turn : @" + _0x17a140.player1.split("@")[0] + "_\n _Next @" + _0x17a140.player2.split("@")[0] + "_\n *Let's play! :* @" + _0x17a140.currentPlayer.split("@")[0] + "'s Word Must Start With *_\"" + _0x17a140.previousWord + "\"_* .\n_you Have " + _0x17a140.turnTimeLimit + "Secs to Answer_\n",
      mentions: [_0x17a140.player1, _0x17a140.player2, _0x17a140.currentPlayer]
    });
  }
});
smd({
  cmdname: "delwcg",
  info: "deletes word chain game running session.",
  filename: __filename,
  type: "game"
}, async ({
  chat: _0x4d8134,
  isCreator: _0x283363,
  send: _0x52d274,
  reply: _0x54222a,
  sender: _0x2b145d,
  isAdmin: _0x1bb0fc
}) => {
  let _0x19b4bc = astro_patch_wcg[_0x4d8134];
  if (_0x19b4bc) {
    if (!_0x283363 && _0x2b145d !== _0x19b4bc.player2 && _0x2b145d !== _0x19b4bc.player1 && !_0x1bb0fc) {
      await _0x52d274("┏━━━━━━━━━━━━━━━━━━┓\n┃     WORD CHAIN GAME     ┃\n┗━━━━━━━━━━━━━━━━━━┛\n\n*Uhh Please, _You are not a Player of running game!!!_\n");
    } else {
      _0x19b4bc.stopTurn();
      await _0x54222a(("┏━━━━━━━━━━━━━━━━━━┓\n┃     WORD CHAIN GAME     ┃\n┗━━━━━━━━━━━━━━━━━━┛\n\n*Room Id : _wcg-" + _0x4d8134.split("@")[0] + "_ Cleared Successfully*\n*_Word Chain Game Session Deleted From This Chat..._*\n\n\n\n" + (_0x19b4bc.wordsCount > 0 ? "\t*Game Information*\n\nTotal Chain Words : " + _0x19b4bc.wordsCount + "  \n" + _0x19b4bc.longestWordBy + "\n*_Chain Started From :-_*  " + _0x19b4bc.wordChain + " ...!" : "") + "\n\n").trim());
      console.log("counts : ", _0x19b4bc.wordsCount);
      delete astro_patch_hcg[_0x4d8134];
    }
  } else {
    _0x54222a("┏━━━━━━━━━━━━━━━━━━┓\n┃   WORD CHAIN 404Error    ┃\n┗━━━━━━━━━━━━━━━━━━┛ \n\n*Uhh Dear, _Theres No Game Started yet in This Chat_*\n");
  }
});
smd({
  on: "text"
}, async (_0x31d911, _0x9c17da, {
  isCreator: _0x561706
}) => {
  if (_0x31d911.isBot) {
    return;
  }
  const _0x2b4276 = _0x31d911.chat;
  const _0x1dda4f = astro_patch_wcg[_0x2b4276];
  if (!_0x1dda4f) {
    return;
  }
  const _0x2339e2 = _0x31d911.user;
  if (_0x1dda4f.gameStatus && _0x1dda4f.currentPlayer === _0x31d911.sender && _0x31d911.text && !_0x1dda4f.botPlayer) {
    const _0x679d9a = _0x9c17da.split(" ")[0].trim().toLowerCase();
    if (_0x679d9a.length >= _0x1dda4f.wordLength && _0x679d9a.charAt(0) === _0x1dda4f.previousWord.slice(-1)) {
      if (_0x679d9a.length > _0x1dda4f.wordLength) {
        _0x1dda4f.longestWordBy = "Longest Word With " + _0x679d9a.length + " letters is *" + _0x679d9a + "* by @" + _0x1dda4f.currentPlayer.split("@")[0];
      }
      _0x1dda4f.wordsCount++;
      _0x1dda4f.botPlayer = true;
      _0x1dda4f.stopTurn();
      _0x1dda4f.turnStartTime = Date.now();
      _0x1dda4f.startTurn(_0x31d911);
      _0x1dda4f.previousWord = _0x679d9a;
      _0x1dda4f.wordChain += "\t⇢" + _0x1dda4f.previousWord;
      _0x1dda4f.turnTimeLimit = Math.floor(Math.random() * 10) + 35;
      await _0x31d911.bot.sendMessage(_0x31d911.chat, {
        react: {
          text: "✅",
          key: _0x31d911.key
        }
      });
      _0x1dda4f.currentPlayer = _0x1dda4f.currentPlayer === _0x1dda4f.player1 ? _0x1dda4f.player2 : _0x1dda4f.player1;
      let _0x3dc7a4 = "\n*Word Accepted...? ✅*\n_Current Turn : @" + _0x1dda4f.currentPlayer.split("@")[0] + "_\n_Next Turn : @" + (_0x1dda4f.currentPlayer === _0x1dda4f.player1 ? _0x1dda4f.player2 : _0x1dda4f.player1).split("@")[0] + "_\n\n_Your word must start with *'" + _0x1dda4f.previousWord.slice(-1).toUpperCase() + "'* , and must have atleast *'" + _0x1dda4f.wordLength + "'* letters_\n_you have *" + _0x1dda4f.turnTimeLimit + "Secs* to answer_\n_Total words yet : " + _0x1dda4f.wordsCount + "\n\n            ";
      if (_0x2339e2 === _0x1dda4f.currentPlayer) {
        _0x1dda4f.AwaitForSeconds(3);
      } else {
        _0x1dda4f.botPlayer = false;
      }
      return await _0x31d911.bot.sendMessage(_0x31d911.from, {
        text: _0x3dc7a4,
        mentions: [_0x1dda4f.player1, _0x1dda4f.player2]
      });
    } else if (!_0x1dda4f.botPlayer) {
      _0x1dda4f.botPlayer = true;
      await _0x31d911.bot.sendMessage(_0x31d911.chat, {
        react: {
          text: "❎",
          key: _0x31d911.key
        }
      });
      if (!_0x1dda4f.wrongAttempts[_0x1dda4f.currentPlayer]) {
        _0x1dda4f.wrongAttempts[_0x1dda4f.currentPlayer] = 1;
      } else {
        _0x1dda4f.wrongAttempts[_0x1dda4f.currentPlayer]++;
      }
      if (_0x1dda4f.wrongAttempts[_0x1dda4f.currentPlayer] >= _0x1dda4f.maxAttempts) {
        _0x1dda4f.stopTurn();
        delete astro_patch_wcg[_0x2b4276];
        let _0x422e2e = _0x1dda4f.wordChain.split(",");
        return await _0x31d911.reply("Wrong Attempt Exceeds! : " + _0x1dda4f.wrongAttempts[_0x1dda4f.currentPlayer] + "\n Game Terminated, " + _0x1dda4f.currentPlayer.split("@")[0] + " Can't Find a Word That should start with \"" + _0x1dda4f.previousWord.slice(-1) + "\".\n\n\n*Total Chain Words : " + _0x422e2e.length + "\n Started From : " + _0x422e2e.join("\t⇢") + "  \n\nGame ended.*");
      }
      let _0x552145 = _0x679d9a.charAt(0) === _0x1dda4f.previousWord.slice(-1) ? _0x679d9a.length > _0x1dda4f.wordLength ? "_Word Length is Smaller Then " + _0x1dda4f.wordLength + " letters_" : "Invalid Word" : "Given Word Not Start With '" + _0x1dda4f.previousWord.slice(-1) + "'";
      let _0x358bf0 = "Word Not Accepted...? ❎\nReason : _" + _0x552145 + "_\n\n_Current Turn : @" + _0x1dda4f.currentPlayer.split("@")[0] + "_\n_Next Turn : @" + (_0x1dda4f.currentPlayer === _0x1dda4f.player1 ? _0x1dda4f.player2 : _0x1dda4f.player1).split("@")[0] + "_\n\n_You Word Must Start With *" + _0x1dda4f.previousWord.slice(-1) + "* , and Must Have Atleast *4* letters_\n_Try Again, you Still Have " + _0x1dda4f.currentRemTime + "Secs to Answer_\n";
      await _0x31d911.sendMessage(_0x31d911.chat, {
        text: _0x358bf0,
        mentions: [_0x1dda4f.player1, _0x1dda4f.player2]
      });
      if (_0x1dda4f.currentPlayer === _0x2339e2) {
        return await _0x1dda4f.AwaitForSeconds(3);
      } else {
        _0x1dda4f.botPlayer = false;
      }
    }
  }
});
const stickers = ["https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/ᴅɪᴄᴇ/sᴜʜᴀɪʟ-ᴍᴅ-ᴅɪᴄᴇ-1.webp", "https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/ᴅɪᴄᴇ/sᴜʜᴀɪʟ-ᴍᴅ-ᴅɪᴄᴇ-2.webp", "https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/ᴅɪᴄᴇ/sᴜʜᴀɪʟ-ᴍᴅ-ᴅɪᴄᴇ-3.webp", "https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/ᴅɪᴄᴇ/sᴜʜᴀɪʟ-ᴍᴅ-ᴅɪᴄᴇ-3.webp", "https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/ᴅɪᴄᴇ/sᴜʜᴀɪʟ-ᴍᴅ-ᴅɪᴄᴇ-4.webp", "https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/ᴅɪᴄᴇ/sᴜʜᴀɪʟ-ᴍᴅ-ᴅɪᴄᴇ-4.webp", "https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/ᴅɪᴄᴇ/sᴜʜᴀɪʟ-ᴍᴅ-ᴅɪᴄᴇ-5.webp", "https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/ᴅɪᴄᴇ/sᴜʜᴀɪʟ-ᴍᴅ-ᴅɪᴄᴇ-6.webp"];
smd({
  pattern: "dice",
  desc: "Rolling Dice Game",
  filename: __filename,
  category: "game"
}, async _0x1894c6 => {
  try {
    try {
      const _0x4cde9e = Math.floor(Math.random() * stickers.length);
      return await _0x1894c6.bot.sendMessage(_0x1894c6.chat, {
        sticker: {
          url: stickers[_0x4cde9e]
        },
        packname: "ᴅɪᴄᴇ",
        author: "sᴜʜᴀɪʟ-ᴍᴅ"
      });
    } catch (_0xd37c6a) {
      const _0x312d64 = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
      const _0xdf7a0 = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"];
      let _0x1d0302 = Math.floor(Math.random() * _0x312d64.length);
      let _0x58b954 = await _0x1894c6.bot.sendMessage(_0x1894c6.chat, {
        text: _0x312d64[_0x1d0302]
      });
      return await _0x1894c6.react(_0xdf7a0[_0x1d0302], _0x58b954);
    }
  } catch (_0x54b873) {
    await _0x1894c6.error(_0x54b873 + "\n\ncommand: dice", _0x54b873);
  }
});
let A = ["😺", "👻", "⏳", "🍫"];
let B = ["🥳", "🍂", "😎", "💀"];
let C = ["💍", "🍁", "🔥", "💥"];
let D = ["✨", "❄️", "⭐", "🌚"];
let gtc = {};
function getEmojy(_0x87048e) {
  return _0x87048e[Math.floor(Math.random() * _0x87048e.length)];
}
const randomChar = require("anime-character-random");
smd({
  cmdname: "gtc",
  info: "Guess the anime name, a new game",
  type: "game",
  filename: __filename,
  use: "<guess name>"
}, async _0x525366 => {
  try {
    const _0x620752 = await randomChar.GetChar();
    const _0xad866 = [_0x620752.OtherCharacterList[0], _0x620752.OtherCharacterList[1], _0x620752.OtherCharacterList[2], _0x620752.CharacterName];
    const _0x1051f1 = _0xad866.sort(() => Math.random() - 0.5);
    let _0x5a9511 = _0x1051f1.indexOf(_0x620752.CharacterName);
    let _0x54e542 = getEmojy(A);
    var _0x1bf40d = getEmojy(B);
    var _0x45283d = getEmojy(C);
    var _0x2b5e13 = getEmojy(D);
    let _0x2e99fd = "*[GUESS THE ANIME NAME]*\n\n_React the message with correct emojy!_\n\n\n" + _0x54e542 + ") " + _0x1051f1[0] + "\n" + _0x1bf40d + ") " + _0x1051f1[1] + "\n" + _0x45283d + ") " + _0x1051f1[2] + "\n" + _0x2b5e13 + ") " + _0x1051f1[3] + "\n\n\n" + Config.caption + "\n";
    let {
      key: _0xdff25a
    } = await _0x525366.send(_0x620752.CharacterImage, {
      caption: _0x2e99fd
    }, "image");
    let _0x525613 = _0xdff25a.id;
    gtc[_0x525613] = {};
    gtc[_0x525613].emojies = [_0x54e542, _0x1bf40d, _0x45283d, _0x2b5e13];
    gtc[_0x525613].ans = _0x620752.CharacterName;
    gtc[_0x525613].emoji = gtc[_0x525613].emojies[_0x5a9511];
    console.log("gtc : ", gtc[_0x525613]);
  } catch (_0x5e93e0) {
    await _0x525366.error(_0x5e93e0 + "\n\ncommand: gtc(game)", _0x5e93e0);
  }
});
smd({
  on: "text"
}, async _0x3344e4 => {
  if (_0x3344e4.reaction || _0x3344e4.reply_message) {
    let _0x2fce2b = _0x3344e4.reaction ? _0x3344e4.msg.key.id : _0x3344e4.reply_message ? _0x3344e4.reply_message.id : false;
    if (!gtc[_0x2fce2b] || !gtc[_0x2fce2b].emojies.includes(_0x3344e4.text)) {
      return;
    }
    console.log("gtc : ", gtc);
    if (_0x3344e4.text == gtc[_0x2fce2b].emoji) {
      await _0x3344e4.send("*_Waow you @" + _0x3344e4.senderNum + " Guess the Correct Name!_*\n*_[NAME IS]: '" + gtc[_0x2fce2b].emoji + ") " + gtc[_0x2fce2b].ans + "'_*", {
        mentions: [_0x3344e4.sender]
      });
      delete gtc[_0x2fce2b];
    } else {
      if (!gtc[_0x2fce2b][_0x3344e4.sender]) {
        gtc[_0x2fce2b][_0x3344e4.sender] = 1;
      } else {
        gtc[_0x2fce2b][_0x3344e4.sender]++;
      }
      if (gtc[_0x2fce2b][_0x3344e4.sender] >= 2) {
        await _0x3344e4.send("*Hey @" + _0x3344e4.senderNum + "You Lose!*\n_Better luck next time!_\n*Name is:* " + gtc[_0x2fce2b].emoji + ") " + gtc[_0x2fce2b].ans, {
          mentions: [_0x3344e4.sender]
        });
        delete gtc[_0x2fce2b];
      } else if (gtc[_0x2fce2b][_0x3344e4.sender] > 0) {
        await _0x3344e4.send("*Hey @" + _0x3344e4.senderNum + " InCorrect answer!*\n_Try another emoji, you have one move!_", {
          mentions: [_0x3344e4.sender]
        });
      }
    }
  }
});
smd({
  pattern: "ttt",
  desc: "Play TicTacToe",
  filename: __filename,
  category: "game"
}, async (_0xe274e9, _0x2df401) => {
  let _0xf9f8b5 = require("../lib/ttt");
  this.game = this.game ? this.game : {};
  if (Object.values(this.game).find(_0x8e29bc => _0x8e29bc.id.startsWith("tictactoe") && [_0x8e29bc.game.playerX, _0x8e29bc.game.playerO].includes(_0xe274e9.sender))) {
    return _0xe274e9.reply("_A game is already going on_");
  }
  var _0xa3e5ff = Object.values(this.game).find(_0x5bdc17 => _0x5bdc17.state === "WAITING" && (_0x2df401 ? _0x5bdc17.name === _0x2df401 : true));
  let _0x89a570 = _0xe274e9.sender;
  let _0x17f1a7 = _0xe274e9.quoted ? _0xe274e9.quoted.sender : _0xe274e9.mentionedJid ? _0xe274e9.mentionedJid[0] : false;
  if (!_0xa3e5ff && _0x17f1a7 && _0x89a570 && _0x89a570 != _0x17f1a7) {
    _0xa3e5ff = {
      id: "tictactoe-" + +new Date(),
      x: _0xe274e9.chat,
      o: "",
      game: new _0xf9f8b5(_0x17f1a7, "o"),
      state: "WAITING"
    };
    if (_0x2df401) {
      _0xa3e5ff.name = _0x2df401;
    }
    this.game[_0xa3e5ff.id] = _0xa3e5ff;
  }
  let _0x26e17d = Object.values(this.game).find(_0x337ecd => _0x337ecd.state === "WAITING" && (_0x2df401 ? _0x337ecd.name === _0x2df401 : true));
  if (_0x26e17d) {
    _0x26e17d.o = _0xe274e9.chat;
    _0x26e17d.game.playerO = _0xe274e9.sender || _0xe274e9.mentionedJid[0];
    _0x26e17d.state = "PLAYING";
    let _0x563dae = _0x26e17d.game.render().map(_0x4eec74 => {
      return {
        X: "❌",
        O: "⭕",
        1: "1️⃣",
        2: "2️⃣",
        3: "3️⃣",
        4: "4️⃣",
        5: "5️⃣",
        6: "6️⃣",
        7: "7️⃣",
        8: "8️⃣",
        9: "9️⃣"
      }[_0x4eec74];
    });
    let _0x3a639c = "\nCurrent turn: @" + _0x26e17d.game.currentTurn.split("@")[0] + "\nRoom ID: " + _0x26e17d.id + "\n" + _0x563dae.slice(0, 3).join("  ") + "\n" + _0x563dae.slice(3, 6).join("  ") + "\n" + _0x563dae.slice(6).join("  ") + "\n";
    return await _0xe274e9.bot.sendMessage(_0xe274e9.chat, {
      text: _0x3a639c,
      mentions: [_0x26e17d.game.currentTurn]
    });
  } else {
    _0x26e17d = {
      id: "tictactoe-" + +new Date(),
      x: _0xe274e9.chat,
      o: "",
      game: new _0xf9f8b5(_0xe274e9.sender, "o"),
      state: "WAITING"
    };
    if (_0x2df401) {
      _0x26e17d.name = _0x2df401;
    }
    _0xe274e9.reply("_Waiting for player,use .ttt to join this game._ ");
    this.game[_0x26e17d.id] = _0x26e17d;
  }
});
smd({
  pattern: "delttt",
  desc: "deletes TicTacToe running session.",
  filename: __filename,
  category: "game"
}, async _0x1abbe9 => {
  try {
    this.game = this.game ? this.game : false;
    let _0x25fffe = Object.values(this.game).find(_0x1649fb => _0x1649fb.id.startsWith("tictactoe"));
    let _0x3a992a = _0x1abbe9.isGroup && _0x1abbe9.isAdmin || _0x1abbe9.isCreator ? true : false;
    if (_0x25fffe) {
      if (_0x3a992a || [_0x25fffe.game.playerX, _0x25fffe.game.playerO].includes(_0x1abbe9.sender)) {
        delete this.game;
        return _0x1abbe9.reply("_Successfully Deleted running TicTacToe game._");
      } else {
        return _0x1abbe9.reply("*Uhh Please, _You are not a Player of running game!!!_");
      }
    } else {
      return _0x1abbe9.reply("No TicTacToe game🎮 is running.");
    }
  } catch (_0x483b2b) {
    await _0x1abbe9.error(_0x483b2b + "\n\ncommand: delttt", _0x483b2b);
  }
});
smd({
  on: "text"
}, async _0x303e73 => {
  this.game = this.game ? this.game : {};
  let _0x5aaad7 = Object.values(this.game).find(_0x16bcc1 => _0x16bcc1.id && _0x16bcc1.game && _0x16bcc1.state && _0x16bcc1.id.startsWith("tictactoe") && [_0x16bcc1.game.playerX, _0x16bcc1.game.playerO].includes(_0x303e73.sender) && _0x16bcc1.state == "PLAYING");
  if (_0x5aaad7) {
    let _0x5ade22;
    let _0x3fbb59 = false;
    let _0x1e00eb = false;
    let _0x560530 = false;
    if (!/^([1-9]|(me)?give_up|surr?ender|off|skip)$/i.test(_0x303e73.text)) {
      return;
    }
    _0x560530 = !/^[1-9]$/.test(_0x303e73.text);
    if (_0x303e73.sender !== _0x5aaad7.game.currentTurn) {
      if (!_0x560530) {
        return true;
      }
    }
    if (!_0x560530 && (_0x5ade22 = _0x5aaad7.game.turn(_0x303e73.sender === _0x5aaad7.game.playerO, parseInt(_0x303e73.text) - 1)) < 1) {
      _0x303e73.reply({
        "-3": "The game is over.",
        "-2": "Invalid",
        "-1": "_Invalid Position_",
        0: "_Invalid Position_"
      }[_0x5ade22]);
      return true;
    }
    if (_0x303e73.sender === _0x5aaad7.game.winner) {
      _0x3fbb59 = true;
    } else if (_0x5aaad7.game.board === 511) {
      _0x1e00eb = true;
    }
    let _0x2929f6 = _0x5aaad7.game.render().map(_0x584d3c => {
      return {
        X: "❌",
        O: "⭕",
        1: "1️⃣",
        2: "2️⃣",
        3: "3️⃣",
        4: "4️⃣",
        5: "5️⃣",
        6: "6️⃣",
        7: "7️⃣",
        8: "8️⃣",
        9: "9️⃣"
      }[_0x584d3c];
    });
    if (_0x560530) {
      _0x5aaad7.game._currentTurn = _0x303e73.sender === _0x5aaad7.game.playerX;
      _0x3fbb59 = true;
    }
    let _0x283c15 = _0x560530 ? _0x5aaad7.game.currentTurn : _0x5aaad7.game.winner;
    let _0x28a3a4 = "Room ID: " + _0x5aaad7.id + "\n\n" + _0x2929f6.slice(0, 3).join("  ") + "\n" + _0x2929f6.slice(3, 6).join("  ") + "\n" + _0x2929f6.slice(6).join("  ") + "\n" + (_0x3fbb59 ? "@" + _0x283c15.split("@")[0] + " Won ! and got 2000💎 in wallet🤑" : _0x1e00eb ? "Game Tied,well done to both of you players." : "Current Turn " + ["❌", "⭕"][_0x5aaad7.game._currentTurn * 1] + " @" + _0x5aaad7.game.currentTurn.split("@")[0]) + "\n⭕:- @" + _0x5aaad7.game.playerO.split("@")[0] + "\n❌:- @" + _0x5aaad7.game.playerX.split("@")[0];
    if ((_0x5aaad7.game._currentTurn ^ _0x560530 ? _0x5aaad7.x : _0x5aaad7.o) !== _0x303e73.chat) {
      _0x5aaad7[_0x5aaad7.game._currentTurn ^ _0x560530 ? "x" : "o"] = _0x303e73.chat;
    }
    if (_0x3fbb59 && isMongodb) {
      await eco.give(_0x303e73.sender, "Suhail", 2000);
    }
    if (_0x3fbb59 || _0x1e00eb) {
      await _0x303e73.bot.sendMessage(_0x303e73.chat, {
        text: _0x28a3a4,
        mentions: [_0x5aaad7.game.playerO, _0x5aaad7.game.playerX]
      });
      delete this.game[_0x5aaad7.id];
    } else {
      await _0x303e73.bot.sendMessage(_0x303e73.chat, {
        text: _0x28a3a4,
        mentions: [_0x5aaad7.game.playerO, _0x5aaad7.game.playerX]
      });
    }
  }
});