const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '!'
let yardım = new Discord.RichEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor('RANDOM')
.addField('EL Turco BOT|Yardım Sistemi',`
**t!moderasyon** : Moderasyon komutlarını Açar.
**t!kullanıcı** : Kullanıcı komutlarını Açar.
**t!eğlence** : Eğlence komutlarını açar.
**t!oyun** : Oyun komutlarını açar.
**t!bot** : Bot yardım menüsünü açar.`)
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
.setThumbnail(client.user.avatarURL)
 message.channel.send(yardım) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["help"], 
  permLevel: 0
};
exports.help = {
  name: 'yardım'
};
//Lord Creative  