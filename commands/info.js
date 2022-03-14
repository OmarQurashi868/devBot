module.exports = {
    name: "info",
    description: "Replies with information about the bot...",
    format: "dev.info();",
    execute(message, args) {
      if (args.length > 0 && args[0] != "") {
        message.channel.send("This function does not take any arguments.");
        return;
      }
      message.channel.send("Hello, I am devBot!\nMy Github: <https://github.com/OmarQurashi868/devBot>\nMy Creator: Psycho#0211 || OmarQurashi868@gmail.com");
    },
  };
  