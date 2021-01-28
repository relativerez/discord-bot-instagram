require("dotenv").config();
const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();

client.on('warn', console.warn);
client.on('error', console.error);
client.on('guildMemberAdd', () => {});
client.on('guildMemberRemove', () => {});
client.on('disconnect', () => {});
client.on('reconnecting', () => { });

client.on('ready', async () => {
  client.user.setActivity(`${process.env.DISCORD_PREFIX}instagram @user`);
});

client.on('message', async (message) => {

  const prefix = process.env.PREFIX;
  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  try {
    let commandFile = require(`./src/commands/${command}.js`);
    commandFile.run(client, message, args, axios, prefix);
  } catch (e) {
    console.log(e.stack);
  }
});

client.login(process.env.DISCORD_TOKEN);
