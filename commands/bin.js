const Bin = require("../models/bin.js");

module.exports = {
  name: "bin",
  description: "Returns the message for the bin with the provided name...",
  format: "dev.bin(name);",
  async execute(message, args, guildId) {
    if (args.length != 1) {
      message.channel.send("This function takes exactly 1 argument.");
      return;
    }
    const givenName = args[0]
    let result;
    try {
      result = await Bin.findOne({ name: givenName });
    } catch (err) {
      message.channel.send(err.message);
      return;
    }
    if (!result) {
      message.channel.send(`Bin with name ${givenName} does not exist`);
      return;
    } else {
      message.channel.send(result.message);
      return;
    }
  },
};
