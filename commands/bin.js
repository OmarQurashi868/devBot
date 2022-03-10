const Database = require("better-sqlite3");

module.exports = {
  name: "bin",
  description: "Returns the message for the bin with the provided name...",
  format: "dev.bin(name);",
  execute(message, args, guildId) {
    const db = new Database(`./store/${guildId}.db`, { verbose: console.log });
    const createTable = db.prepare(
      "CREATE TABLE IF NOT EXISTS bins (_id INTEGER PRIMARY KEY, name TEXT NOT NULL, message TEXT NOT NULL);"
    );
    if (args.length != 1) {
      message.channel.send("This function takes exactly 1 argument.");
      return;
    }
    const givenName = args[0].trim();
    const dbCheck = db.prepare("SELECT * FROM bins WHERE name = ?");
    const checkResult = dbCheck.get(givenName);
    if (!checkResult) {
      message.channel.send(
        `Bin with name ${givenName} does not exist`
      );
      return;
    } else {
      message.channel.send(checkResult.message);
      return;
    }
  },
};
