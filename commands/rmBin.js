const Database = require("better-sqlite3");

module.exports = {
  name: "rmBin",
  description: "Removes the bin with the corresponding name...",
  format: "dev.rmBin(name);",
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
    const result = dbCheck.get(givenName);
    if (result) {
      const bin = db.prepare("DELETE FROM bins WHERE NAME = ?");
      const result = bin.run(givenName);
      message.channel.send("Bin deleted successfully.");
      return;
    } else {
      message.channel.send(`Bin with name ${givenName} was not found.`);
      return;
    }
  },
};
