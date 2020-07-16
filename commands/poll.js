const options = [
  '🇦',
  '🇧',
  '🇨',
  '🇩',
  '🇪',
  '🇫',
  '🇬',
  '🇭',
  '🇮',
  '🇯',
  '🇰',
  '🇱',
  '🇲',
  '🇳',
  '🇴',
  '🇵',
  '🇶',
  '🇷',
  '🇸',
  '🇹',
  '🇺',
  '🇻',
  '🇼',
  '🇽',
  '🇾',
  '🇿',
];

const pollLog = {};
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'poll',
  triggers: ['poll'],
  description: "```" + 'Ask a polling question. Vote by emoji reaction. Question and options must be wrapped in double quotes. Questions with no provided options are treated as Yes / No / Unsure questions.' + "```",
  example: '"Thoughtful question here?" "Optional Answer A" "Optional Answer B"',
  handler: (message) => {
    let args = message.content.match(/"(.+?)"/g);
    if (args) {
      if (args.length === 1) { // yes no unsure question
        const question = args[0].replace(/"/g, '');
        pollLog[message.author.id] = {
          lastPoll: Date.now()
        };
        const pls = new MessageEmbed()
          .setColor('#8743e0')
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription("```" + `${question}` + "```")
        message.channel.send(pls)
          .then(async (pollMessage) => {
            await pollMessage.react('👍');
            await pollMessage.react('👎');
            message.delete({ timeout: 1000 });
          });
      } else { // multiple choice
        args = args.map(a => a.replace(/"/g, ''));
        const question = args[0];
        const questionOptions = [...new Set(args.slice(1))];
        if (questionOptions.length > 20) {
          return message.channel.send(`${message.author} Polls are limited to 20 options.`);
        }
        else {
          pollLog[message.author.id] = {
            lastPoll: Date.now()
          };
          const plss = new MessageEmbed()
            .setColor('#8743e0')
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription("```" + `${question}` + "```" + '\n' +
              `${questionOptions
                .map((option, i) => `${options[i]} - ${option}`).join('\n')}`)
          message.channel.send(plss)
            .then(async (pollMessage) => {
              for (let i = 0; i < questionOptions.length; i++) {
                await pollMessage.react(options[i]);
              }
              message.delete({ timeout: 1000 });
            });
        }
      }
    } else {
      const initiate = new MessageEmbed()
        .setColor('#8743e0')
        .setTitle("Start Poll")
        .setDescription(`To send a poll do: \r\n\r\n!poll "question" "option 1" "option 2" "option 3" etc.`);
      message.channel.send(initiate);
      message.delete({ timeout: 1000 });
    }
  }
};