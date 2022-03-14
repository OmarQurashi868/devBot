module.exports = {
  name: "log",
  description: "Logs arguments...",
  format: 'dev.log("text", [destination]);',
  async execute(message, args, channels) {
    if (args.length === 1) {
      if (args[0].length < 2) {
        message.channel.send("Argument cannot be empty.");
        return;
      } else {
        message.channel.send(`${args[0].trim()}`);
        return;
      }
    } else if (args.length === 2) {
      if (args[1].startsWith("<#") && args[1].endsWith(">")) {
        const channelId = args[1].substring(2).slice(0, -1);
        try {
          await channels.fetch(channelId).then(async (channel) => {
            try {
              await channel.send(`${args[0].trim()}`);
            } catch (err) {
              message.channel.send(
                `Message not sent because of the following error:\n${err.toString()}`
              );
              return;
            }
            message.channel.send("Message sent.");
            return;
          });
        } catch (err) {
          message.channel.send(
            `Message not sent because of the following error:\n${err.toString()}`
          );
          return;
        }
      } else {
        message.channel.send(
          "Channel must be mentioned in the second argument."
        );
        return;
      }
    } else {
      message.channel.send("This function can only take 1 or 2 arguments;");
      return;
    }
  },
};
