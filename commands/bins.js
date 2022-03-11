const Bin = require("../models/bin.js");

module.exports = {
  name: "bins",
  description: "Returns a list with all saved bins...",
  format: "dev.bins();",
  async execute(message, args, guildId) {
    if (args.length != 1 && args[0] != "") {
      message.channel.send("This function takes no arguments.");
      return;
    }
    const bins = await Bin.find()
    if (bins.length === 0) {
      message.channel.send("Bins are empty.");
      return;
    } else {
      let content = "";
      bins.map((bin) => {
        const text = `- ${bin.name}\n`;
        content = content + text;
      });
      message.channel.send(content);
      return;
    }
  },
};
