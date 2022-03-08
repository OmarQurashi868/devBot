module.exports = {
  name: "help",
  description: "Returns list of commands...",
  args: 0,
  execute(message, args, cmdList) {
    if (args.length === 1) {
      cmdList.forEach((cmd) => {
        if (cmd.name === args[0]) {
          message.channel.send(`\`\`\`${cmd.description}\`\`\``);
          return;
        }
      });
      message.channel.send(
        `\`\`\`Function with the name ${args[0]} was not found.\`\`\``
      );
      return;
    } else if (args.length > 1) {
      message.channel.send(
        "```This function does not take that many arguments.```"
      );
      return;
    }
    const backticks = "```";
    let content = "```js\n";
    cmdList.forEach((cmd) => {
      const text = `dev.${cmd.name}(${cmd.args != 0 ? "args" : ""}); // ${
        cmd.description
      }\n`;
      content = content + text;
    });
    content = content + "```";
    message.channel.send(content);
  },
};
