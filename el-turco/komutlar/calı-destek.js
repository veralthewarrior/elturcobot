const Discord = require('discord.js');

exports.run = async (client, message, params) => {
    if(message.channel.type == "dm")  return;
  if(message.channel.type !== "text") return;
  var channel = client.channels.find('id', '696450712649072767')
    const asdf = await client.channels.get(message.channel.id).createInvite()
  message.delete();
  const embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .setTitle("El Turco' »  Bot | Destek")
  .setDescription("**Destek Komudunu kullandığınız için teşekkür ederiz, eğer canlı destek görmek istiyorsan discordumuza gelmen gerekiyor.**")
  .setDescription("**Discord Destek Sunucumuz:**\n**[https://discord.gg/W5aj9uD]**  》 @⏃ veralthewarrior☭#0434")
  .setColor("#31ff00")
 message.channel.send(embed)
      const invite = new Discord.RichEmbed()
  .setAuthor("» Destek | Talep")
  .addField('**» Kullanıcı Adı: **', message.author.username + '#' + message.author.discriminator)
  .addField('**» Sunucu Adı: **', message.guild.name)
  .setDescription(asdf.url)
      channel.send(invite)
};
  
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['canlıdestek'],
  permLevel: 0
};

exports.help = {
  name: 'destek',
  description: 'Canlı Destek Tablebi Oluşturur.',
  usage: '-canlı-destek'
};
//Lord Creative