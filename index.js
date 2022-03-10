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

const tokenError =
  "Unexpected token, format should be:\n`dev.command([args]);` or use `dev.help();` for a list of functions.";

client.on("ready", () => {
  console.log("Bot is up and running...");
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const command = message.content.slice(PREFIX.length).split(/[()]/).shift();

  const msgContent = message.content
    .substring(PREFIX.length + command.length + 1)
    .slice(0, -2);

  const body = message.content.slice(PREFIX.length).split(/[()]/);
  body.shift();

  let args = [];
  if (body.length > 1) {
    args = body[0].split(",");
    args.forEach((e) => {
      e = e.trim();
    });
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
    } else if (
      (msg.match(/\(/g).length != 1 || msg.match(/\)/g).length != 1) &&
      !msg.includes("```")
    ) {
      message.channel.send(tokenError);
      return;
    }
  }
  const cmdList = client.commands.map((e) => e);

  switch (command) {
    case "ping":
      client.commands.get("ping").execute(message, args);
      break;
    case "log":
      client.commands.get("log").execute(message, args, message.guild.channels);
      break;
    case "help":
      client.commands.get("help").execute(message, args, cmdList);
      break;
    case "mkBin":
      client.commands.get("mkBin").execute(message, args, message.guildId);
      break;
    case "bin":
      client.commands.get("bin").execute(message, args, message.guildId);
      break;
    case "bins":
      client.commands.get("bins").execute(message, args, message.guildId);
      break;
    case "rmBin":
      client.commands.get("rmBin").execute(message, args, message.guildId);
      break;
    default:
      message.channel.send(
        "Unknown function, for a list of functions please execute: `dev.help();`"
      );
  }
});

client.login(process.env.TOKEN);
