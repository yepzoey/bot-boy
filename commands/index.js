const { Client, MessageEmbed } = require('discord.js');

const poll = require('./poll');

let descriptions = '';
const commands = [
  poll

].reduce((all, cmd) => {
  cmd.triggers.forEach(trigger => all[trigger] = cmd.handler);
  descriptions += `**${cmd.name}** - ${cmd.description}
Usage: ${cmd.triggers.map(t => '!' + t).join(' or ')} ${cmd.example || ''}
`;
  return all;
}, {});

const allCommands = (message) => {
  const helpm = new MessageEmbed()
    .setColor('#8743e0')
    .setTitle('Bot Boy Help')
    .addField('General', '`poll`')
  message.channel.send(helpm)
  //message.channel.send(descriptions);
};

commands['commands'] = allCommands;
commands['help'] = allCommands;

module.exports = {
  handle: (command, message) => {
    if (command && commands[command]) {
      commands[command](message);
    }
  }
};