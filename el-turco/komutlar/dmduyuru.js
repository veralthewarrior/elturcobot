const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.channel.send('Bu komutu doğru uygulamam için birşey yazmalısın sahip!');
  message.delete();
      const mesajat = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('' + mesaj + '')

      client.users.forEach(u => {
u.sendEmbed(mesajat)
})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['dd'],
  permLevel: 4
};

exports.help = {
  name: 'duyurdm',
  description: 'Sunucuda bulunan tüm eli güzel abilere mesaj atar',
  usage: 'dmduyuru [duyurmak istediğiniz şey]'
};
//Lord Creative