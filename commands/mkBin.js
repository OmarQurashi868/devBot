const Database = require("better-sqlite3");

module.exports = {
  name: "mkBin",
  description: "Creates a new bin using the name and message provided...",
  format: "dev.mkBin(name, message);",
  execute(message, args, guildId) {
    const db = new Database(`./store/${guildId}.db`, { verbose: console.log });
    const createTable = db.prepare(
      "CREATE TABLE IF NOT EXISTS bins (_id INTEGER PRIMARY KEY, name TEXT NOT NULL, message TEXT NOT NULL);"
    );
    if (args.length != 2) {
      message.channel.send("This function takes exactly 2 arguments.");
      return;
    }
    const givenName = args[0].trim();
    const givenMsg = args[1];
    const dbCheck = db.prepare("SELECT * FROM bins WHERE name = ?");
    const checkResult = dbCheck.get(givenName);
    if (!checkResult) {
      const newBin = db.prepare(
        "INSERT INTO bins (name, message) VALUES (?, ?)"
      );
      const result = newBin.run(givenName, givenMsg);
      message.channel.send("Bin created successfully.");
      return;
    } else {
      message.channel.send(
        `Bin with name ${givenName} already exists.`
      );
      return;
    }
  },
};
