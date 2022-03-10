# Personal Discord bot for League of Devs server
This is just a personal side-project to test a gimmick I had in mind. The gimmick is that the bot commands are formatted like functions...

# Commands

# Bins
## dev.bins();
Shows the current bins stored in the server.
Bins are basically stored preset messages that users can call by their names.
## dev.bin(name);
Returns the bin with the corresponding name.
## dev.mkBin(name, message);
Creates a new bin with the name and message provided.
## dev.rmBin(name);
Removes the bin with the corresponding name.

# Misc.
## dev.help([command]);
If the optional argument is provided, returns the description of the provided command (`dev.help(bins);). Otherwise returns a list of all commands.
## dev.log(message, [channel]);
Sends the provided message back again, optionally to the provided channel.
## dev.ping();
Sends back a pong!