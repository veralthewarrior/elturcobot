const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let mesaj = args.slice(0).join(' ');
if(!message.member.hasPermission("SEND_MESSAGES")) return message.channel.send("Reis bunu kullanmanı isterdim ama sahip izin vermemiş senin kullanmana. ")
if (mesaj.length < 1) return message.reply('Zihin okuma gücümü şu an kullanmak istemiyorum. Usta sen deli misin? Zihnini nasıl okuyacağım? Yazmamı istediğin şeyi bana yazman gerekiyor.');
  message.delete();
  message.channel.send(mesaj);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yaz',
  description: '',
  usage: 'yaz [yazdırmak istediğiniz şey]'
};
//Lord Creative