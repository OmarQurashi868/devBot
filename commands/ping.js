module.exports = {
  name: "ping",
  description: "Replies with pong...",
  args: 0,
  execute(message, args) {
    message.channel.send("Pong!");
  },
};
