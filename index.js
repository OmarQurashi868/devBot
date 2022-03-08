const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
try {
  require("dotenv").config();
} catch {
  console.log("dotenv skipped");
}

const PREFIX = "dev.";

client.commands = new Collection();

const cmdFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of cmdFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const tokenError = "Unexpected token, format should be `dev.command(*args*);`";

client.on("ready", () => {
  console.log("Bot is up and running...");
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const body = message.content.slice(PREFIX.length).split(/[()]/);

  const command = body.shift();

  let args = [];
  if (body.length > 1) {
    args = body[0].split(",");
    args.forEach(e => {
      e = e.trim();
    })
  }

  const msg = message.content
    .slice(PREFIX.length)
    .slice(command.length)
    .slice(0, -1);

  if (message.content.startsWith(PREFIX) && !message.author.bot) {
    if (!message.content.endsWith(";")) {
      message.channel.send(tokenError);
      return;
    } else if (!msg.startsWith("(") || !msg.endsWith(")")) {
      message.channel.send(tokenError);
      return;
    } else if (msg.match(/\(/g).length != 1 || msg.match(/\)/g).length != 1) {
      message.channel.send(tokenError);
      return;
    }
  }
  const cmdList = client.commands.map((e) => e)

  switch (command) {
    case "ping":
      client.commands.get("ping").execute(message, args);
      break;
    case "log":
      client.commands.get("log").execute(message, args);
      break;
    case "help":
      client.commands.get("help").execute(message, args, cmdList);
      break;
    default:
      message.channel.send(
        "Unknown function, please execute `dev.help();` for a list of functions."
      );
  }
});

client.login(process.env.TOKEN);
