const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '!'
let yardım = new Discord.RichEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor('RANDOM')
.addField('EL Turco BOT| Oyun Sistemi',
` :game_die: **8ball** -> soru sorarsınız ve cevap verir.  \n :game_die: **adamasmaca** -> adam asmaca oynarsınız. \n :game_die: **1v1** -> etiketlediğiniz kişi ile 1v1 atarsınız. \n :game_die: **slot** -> slot oyunu oynarsınız. \n :game_die: **kelime-tahmini** -> kelime tahmini oynarsınız.`)
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
.setThumbnail(client.user.avatarURL)
 message.channel.send(yardım) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["eylence, eglence,"], 
  permLevel: 0
};
exports.help = {
  name: 'oyun'
};
