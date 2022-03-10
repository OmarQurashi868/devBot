module.exports = {
  name: "help",
  description:
    "Returns the description of the provided function, otherwise returns list of all functions...",
  format: "dev.help([arg]);",
  execute(message, args, cmdList) {
    if (args.length === 1 && args[0] != "") {
      for (let i = 0; i < cmdList.length; i++) {
        if (cmdList[i].name === args[0]) {
          message.channel.send(
            `\`${cmdList[i].format}\`\n${cmdList[i].description}`
          );
          return;
        }
      }
      message.channel.send(
        `Function with the name ${args[0]} was not found. Use \`dev.help();\` instead.`
      );
      return;
    } else if (args.length > 1) {
      message.channel.send("This function does not take that many arguments.");
      return;
    }
    let content = "";
    cmdList.forEach((cmd) => {
      const text = `\`${cmd.format}\n\`${cmd.description}\n`;
      content = content + text;
    });
    message.channel.send(content);
  },
};
