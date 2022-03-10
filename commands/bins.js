const Database = require("better-sqlite3");

module.exports = {
  name: "bins",
  description: "Returns a list with all saved bins...",
  format: "dev.bins();",
  execute(message, args, guildId) {
    const db = new Database(`./store/${guildId}.db`, { verbose: console.log });
    const createTable = db.prepare(
      "CREATE TABLE IF NOT EXISTS bins (_id INTEGER PRIMARY KEY, name TEXT NOT NULL, message TEXT NOT NULL);"
    );
    createTable.run();
    if (args.length != 1 && args[0] != "") {
      message.channel.send("This function takes no arguments.");
      return;
    }
    const bins = db.prepare("SELECT * FROM bins");
    const result = bins.all();
    if (!result) {
      message.channel.send("Bins are empty.");
      return;
    } else {
      let content = "";
      result.map((bin) => {
        const text = `-${bin.name}\n`;
        content = content + text;
      });
      message.channel.send(content);
      return;
    }
  },
};
