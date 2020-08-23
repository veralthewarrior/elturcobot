const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  
  let p = '+'
  let arg = args.slice(0).join(' ');
  
  if (!arg[0]) {
  const embed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor(0xF001FA)
  .setDescription(`[**EL TURCO BOT**]`)
  .addField(`**Moderasyon Komutları**`,`:white_small_square: \`t!otorol\` = Sunucu giriş yapanlara belirlediğiniz rolü verir. \n:white_small_square: \`t!sayaç\` = Sunucu için sayaç ayarlar. \n:white_small_square: \`t!ban\` = İstediğiniz kişiyi sunucudan engeller. \n:white_small_square: \`t!unban\` = Engellediğiniz kişinin engelini kaldırır .\n:white_small_square: \`t!banlist\` = Engellenmiş kişileri gösterir.\n:white_small_square: \`t!küfür-engel [aç-kapat]\` = Küfürü Engeller. \n:white_small_square: \`t!reklam-engelleme \` = Reklam Paylaşmasını Engeller.  \n:white_small_square: \`t!oylama\` = Oylama başlatırsınız. \n:white_small_square: \`t!slowmode\` = Yavaş Modu Açar. \n:white_small_square: \`t!sil\` = İstediniz Kadar Mesaj Siler. \n:white_small_square: \`t!mute\` = İstediğiniz Kişiyi Geçici Olarak Susturursunuz.\n:white_small_square: \`t!dc\` = Discord daveti oluşturur.\n:white_small_square: \`t!sunucubilgi\` = Sunucu bilgisine ulaşırsınız. \n:white_small_square: \`t!sunucukur\` = Otomatik sunucu kurar. \n:white_small_square: \`t!kick\` = Etiketlediğiniz kişiyi sunucudan atar.  `)
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
  name: 'moderasyon',
  description: 'Gelişmiş Yardım Menüsü',
  usage: 'yardım'
}
//Lord Creative