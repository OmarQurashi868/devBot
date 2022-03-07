module.exports = {
  name: "help",
  description: "Returns list of commands...",
  args: 0,
  execute(message, args, cmdList) {
    const backticks = "```";
    const content = `${backticks}js\n${cmdList.map((cmd) =>`dev.${cmd.name}(${cmd.args != 0 ? "args" : ""}); // ${cmd.description}\n`)}${backticks}`;
    message.channel.send(content);
  },
};
