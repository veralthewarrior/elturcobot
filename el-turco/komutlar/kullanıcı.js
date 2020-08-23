const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  
  let p = '+'
  let arg = args.slice(0).join(' ');
  
  if (!arg[0]) {
  const embed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor(0xF001FA)
  .setDescription(`[**EL TURCO BOT**]`)
  .addField(`**Kullanıcı-Komutları**`,`:white_small_square: \`t!ping\` = Botun pingini gösterir. \n:white_small_square: \`t!avatar\` = Avatarını gösterir.\n:white_small_square: \`t!rolbilgi\` = Rol hakkında bilgi alırsınız.\n:white_small_square: \`t!yaz\` = Bota İstediğiniz Şeyi Yazdırırsınız.  \n:white_small_square: \`t!kullanıcıbilgim\` = Bilgilerinizi Gösterir. \n:white_small_square: \`t!hesapla\` = Bir işlem belirtirsiniz ve hesaplar. \n:white_small_square: \`t!yetkilerim\` = Sunucuda bulunan yetkilerinizi gösterir. \n:white_small_square: \`t!davet-takip\` = Kimin kaç davet yaptığını görüntüler. \n:white_small_square: \`t!resimliyazı\` = Resimli yazı yazmanızı sağlar. \n:white_small_square: \`t!botkontrol\` = botu kontrol eder. `)
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
  name: 'kullanıcı',
  description: 'Gelişmiş Yardım Menüsü',
  usage: 'yardım'
}
//Lord Creative