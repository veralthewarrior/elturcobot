const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if (message.author.id !== "317743503054471180") return message.reply(':no_entry: Hop, hemşerim nereye?');
   message.channel.send('Sunucudan yavaşça ayrılıyorum, arkamdan gelen olursa sıkarım kafasına!');
   message.guild.leave()
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ayrıl'],
  permLevel: 4,
  kategori: "yapımcı"
};

exports.help = {
  name: 'ayrıl',
  description: 'Bot Sunucudan Ayrılır.',
  usage: 'ayrıl'
};