const Bin = require("../models/bin.js");

module.exports = {
  name: "mkBin",
  description: "Creates a new bin using the name and message provided...",
  format: "dev.mkBin(name, message);",
  async execute(message, args, guildId) {
    if (args.length != 2) {
      message.channel.send("This function takes exactly 2 arguments.");
      return;
    }
    const givenName = args[0].trim();
    const givenMsg = args[1];
    const checkResult = await Bin.findOne({ name: givenName }).exec();
    if (!checkResult) {
      const newBin = new Bin({ name: givenName, message: givenMsg });
      try {
        const savedBin = await newBin.save();
      } catch (err) {
        message.channel.send(err.message);
        return;
      }
      message.channel.send("Bin created successfully.");
    } else {
      message.channel.send(`Bin with name ${givenName} already exists.`);
      return;
    }
  },
};
