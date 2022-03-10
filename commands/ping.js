module.exports = {
  name: "ping",
  description: "Replies with pong...",
  format: "dev.ping();",
  execute(message, args) {
    if (args.length > 0 && args[0] != "") {
      message.channel.send("This function does not take any arguments.");
      return;
    }
    message.channel.send("Pong!");
  },
};
