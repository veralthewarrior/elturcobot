const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '!'
let yardım = new Discord.RichEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor('RANDOM')
.addField('EL Turco BOT| Eğlence Sistemi',
`  :jigsaw: **öp** -> etiketlediğiniz kişiyi öpersiniz :D \n :jigsaw: **stresçarkı** -> sters çarkı çevirirsiniz. \n :jigsaw: **woodie** -> woodie hakkında bilgi verir. \n :jigsaw: **afewlater** -> profil fotoğrafınıza afewlater efekti ekler. \n :jigsaw: **ara155** -> polisi arar. (ciddiye almayın.) \n :jigsaw: **atasozu** -> rastgele atasözleri söyler. \n :jigsaw: **aşkölçer** -> etiketlediğiniz kişiyi ne kadar sevdiğinizi gösterir :D \n :jigsaw: **balıktut** -> balık tutarsınız. \n :jigsaw: **bjk** -> profil fotoğrafınıza bjk efekti ekler. \n :jigsaw: **boks-makinesi** -> boks makinesine yumruk atarsın.`)
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
  name: 'eğlence'
};
