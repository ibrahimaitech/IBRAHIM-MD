let { smd, textToLogoGenerator, prefix } = require(lib_dir);

smd(
  {
    cmdname: "logo1",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      if (!match)
        return message.reply(`*_Example : ${prefix + cmdName} Ibrahim_*`);
      await require(lib_dir).textToLogoGenerator(
        message,
        "hieu-ung-chu/tao-hieu-ung-chu-mam-anh-sang-74",
        match,
        "ser",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
smd(
  {
    cmdname: "logo2",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      if (!match)
        return message.reply(`*_Example : ${prefix + cmdName} Ibrahim_*`);
      return await textToLogoGenerator(
        message,
        "tao-hieu-ung-chu-digital-glitch-truc-tuyen-941",
        match,
        "Astro",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
smd(
  {
    cmdname: "logo3",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      if (!match)
        return message.reply(`*_Example : ${prefix + cmdName} Ibrahim_*`);
      return await textToLogoGenerator(
        message,
        "tao-hieu-ung-chu-pixel-glitch-truc-tuyen-940",
        match,
        "Astro",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
smd(
  {
    cmdname: "logo4",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      if (!match)
        return message.reply(`*_Example : ${prefix + cmdName} Ibrahim_*`);
      return await textToLogoGenerator(
        message,
        "tao-hieu-ung-chu-graffiti-duong-pho-an-tuong-online-795",
        match,
        "Astro",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
smd(
  {
    cmdname: "logo5",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      if (!match)
        return message.reply(`*_Example : ${prefix + cmdName} Ibrahim_*`);
      return await textToLogoGenerator(
        message,
        "hieu-ung-chu/chu-graffiti-online-mau-8-182",
        match,
        "Astro",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
smd(
  {
    cmdname: "logo6",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      return await textToLogoGenerator(
        message,
        "tao-hieu-ung-chu-graffiti-sieu-ngau-online-794",
        text1,
        text2
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
smd(
  {
    cmdname: "logo7",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      //if (!text) return message.reply(`*_Example : ${prefix+cmdName} text1;text2_*`);
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text1)
        return await message.reply(`*_Example : ${prefix + cmdName} text1_*`);
      return await textToLogoGenerator(
        message,
        "hieu-ung-chu/tao-cover-graffiti-online-181",
        text1,
        text2 || "ser",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
smd(
  {
    cmdname: "logo8",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      await textToLogoGenerator(
        message,
        "tao-logo-gradient-3d-truc-tuyen-501",
        text1,
        text2,
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
smd(
  {
    cmdname: "logo9",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      await textToLogoGenerator(
        message,
        "tao-logo-chu-truc-tuyen-499",
        text1,
        text2,
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
smd(
  {
    cmdname: "logo10",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      await textToLogoGenerator(
        message,
        "tao-logo-phong-cach-pornhub-612",
        text1,
        text2,
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
smd(
  {
    cmdname: "logo11",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      return await textToLogoGenerator(
        message,
        "tao-logo-3d-phong-cach-avengers-445",
        text1,
        text2,
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
smd(
  {
    cmdname: "logo12",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      return await textToLogoGenerator(
        message,
        "tao-logo-phong-cach-marvel-419",
        text1,
        text2,
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
