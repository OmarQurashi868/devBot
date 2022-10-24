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

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database connected"));

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
  console.log("Hi i'm from index");
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  console.log("message has prefix");

  const command = message.content.slice(PREFIX.length).split(/[()]/).shift();

  const msgContent = message.content
    .substring(PREFIX.length + command.length + 1)
    .slice(0, -2);

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

  let args = msgContent.split(/(?<=[^\\](?<=[ "'\n])),(?=[^\\](?<=[ "'\n]))/);

  if (!args[0].length == 0) {
    for (let i = 0; i < args.length; i++) {
      if (
        (args[i].trim().startsWith('"') || args[i].trim().startsWith("'")) &&
        (args[i].trim().endsWith('"') || args[i].trim().endsWith("'"))
      ) {
        args[i] = args[i].trim().substring(1).slice(0, -1).trim();
        continue;
      } else {
        message.channel.send(
          "All arguments must be wrapped in quotation marks ( \" or ' ). If you want quotation marks in your text you can escape them with a double backslash \\\\\\\\."
        );
        return;
      }
    }
  }

  console.log("after all the checks")

  const cmdList = client.commands.map((e) => e);

  switch (command) {
    case "ping":
      client.commands.get("ping").execute(message, args);
      break;
    case "log":
      client.commands.get("log").execute(message, args, message.guild.channels);
      break;
    case "help":
      console.log("under switch case help")
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
    case "info":
      client.commands.get("info").execute(message, args);
      break;
    default:
      message.channel.send(
        "Unknown function, for a list of functions please execute: `dev.help();`"
      );
  }
});

client.login(process.env.TOKEN);