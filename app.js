require("dotenv").config();
const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();

client.on('warn', console.warn);
client.on('error', console.error);

client.on('ready', async () => {
  client.user.setActivity(`${process.env.DISCORD_PREFIX}instagram @user`);
});

client.on('guildMemberAdd', () => {});
client.on('guildMemberRemove', () => {});
client.on('disconnect', () => {});
client.on('reconnecting', () => {});
client.on('message', async (message) => {

  if (!message.content.startsWith(process.env.DISCORD_PREFIX) || message.author.bot) return;

  const args = message.content.slice(process.env.DISCORD_PREFIX.length).split(' ');
  const command = args.shift().toLowerCase();

  try {
    let commandFile = require(`./src/commands/${command}.js`);
    commandFile.run(client, message, args, axios);
  } catch (e) {
    console.log(e.stack);
  }
});

client.login(process.env.DISCORD_TOKEN);