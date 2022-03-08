module.exports = {
  name: "ping",
  description: "Replies with pong...",
  args: 0,
  execute(message, args) {
    if (args.length > 0) {
      message.channel.send("```This function does not take any arguments.```");
      return;
    }
    message.channel.send("```Pong!```");
  },
};
