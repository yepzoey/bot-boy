const Discord = require('discord.js');

const client = new Discord.Client();

const commands = require('./commands');

const {
  token,
} = require('./config');

client.on('ready', async () => {
  client.user.setActivity("cursed sonic | !help");
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  if (message.content[0] === '!') {
    const command = message.content.split(' ')[0].substr(1).toLowerCase();
    commands.handle(command, message);
  }
});

client.login(process.env.token);