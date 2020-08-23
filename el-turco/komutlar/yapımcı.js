const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  
  let p = '+'
  let arg = args.slice(0).join(' ');
  
  if (!arg[0]) {
  const embed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor(0xF001FA)
  .setDescription(`[**EL TURCO BOT**]`)
  .addField(`**Yapımcı Komutları**`,`:white_small_square: \`t!ayrıl\` = sunucudan ayrılır. \n :white_small_square: \`t!seviye-ekle\` = seviye ekler. \n :white_small_square: \`t!seviye-sil\` = seviyesiler. `)
  return message.channel.sendEmbed(embed);
  
      
       
  }
   
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permlevel: 0
};

exports.help = {
  name: 'yapımcı',
  description: 'Bot Menüsü',
  usage: 'yardım'
}
//Lord Creative