const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  
  let p = '+'
  let arg = args.slice(0).join(' ');
  
  if (!arg[0]) {
  const embed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor(0xF001FA)
  .setDescription(`[**EL TURCO BOT**]`)
  .addField(`**Bot Yardım Komutları**`,`:white_small_square: \`t!ping\` = Botun pingini gösterir. \n:white_small_square: \`t!dc\` = Sunucu davet linki oluşturur. \n:white_small_square: \`t!davet\` = Botun davet linkini atar. \n:white_small_square: \`t!prefix\` = Botun prefixini değiştirir. \n:white_small_square: \`t!destek\` = Botun destek sunucusunu ve yapımcı ismini gösterir. \n:white_small_square: \`t!yaz\` = Bota İstediğiniz Şeyi Yazdırırsınız. \n:white_small_square: \`t!hesapla\` = Bir işlem belirtirsiniz ve hesaplar. \n:white_small_square: \`t!davet-takip\` = Kimin kaç davet yaptığını görüntüler. \n:white_small_square: \`t!yardım\` = Yardım menüsü açılır. \n:white_small_square: \`t!botkontrol\` = botu kontrol eder. \n:white_small_square: \`t!yapımcı\` = yapımcı komutlarını gösterir. `)
  return message.channel.sendEmbed(embed);
  
      
       
  }
   
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım','help','y'],
  permlevel: 0
};

exports.help = {
  name: 'bot',
  description: 'Bot Menüsü',
  usage: 'yardım'
}
//Lord Creative