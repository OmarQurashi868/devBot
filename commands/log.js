module.exports = {
  name: "log",
  description: "Logs arguments...",
  args: -1,
  execute(message, args) {
    if (!args[0].length === 0) {
      message.channel.send("``` ```");
    } else if (!args[0].startsWith(`"`) || !args[0].endsWith(`"`)) {
      message.channel.send(`\`\`\`${args} is undefined.\`\`\``);
    } else {
      message.channel.send(`\`\`\`${args[0].slice(0, -1).substring(1)}\`\`\``);
    }
  },
};
