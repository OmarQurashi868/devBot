const Bin = require("../models/bin.js");

module.exports = {
  name: "rmBin",
  description: "Removes the bin with the corresponding name...",
  format: "dev.rmBin(name);",
  async execute(message, args, guildId) {
    if (args.length != 1) {
      message.channel.send("This function takes exactly 1 argument.");
      return;
    }
    const givenName = args[0].trim();
    const reqBin = await Bin.findOne({ name: givenName }).exec();
    if (reqBin) {
      try {
        await reqBin.remove();
      } catch (err) {
        message.channel.send(err.message);
        return;
      }
      message.channel.send("Bin deleted successfully.");
    } else {
      message.channel.send(`Bin with name ${givenName} was not found.`);
      return;
    }
  },
};
