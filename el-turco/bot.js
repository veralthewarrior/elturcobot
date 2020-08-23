const Discord = require("discord.js");//Lord Creative
const client = new Discord.Client();//Lord Creative
const ayarlar = require("./ayarlar.json");//Lord Creative
const chalk = require("chalk");//Lord Creative
const moment = require("moment");//Lord Creative
var Jimp = require("jimp");//Lord Creative
const { Client, Util } = require("discord.js");//Lord Creative
const weather = require("weather-js");//Lord Creative
const fs = require("fs");//Lord Creative
const db = require("quick.db");//Lord Creative
const http = require("http");//Lord Creative
const express = require("express");//Lord Creative
require("./util/eventLoader.js")(client);//Lord Creative
const path = require("path");//Lord Creative
const request = require("request");//Lord Creative
const snekfetch = require("snekfetch");//Lord Creative
const queue = new Map();//Lord Creative
const YouTube = require("simple-youtube-api");//Lord Creative
const ytdl = require("ytdl-core");//Lord Creative

const app = express();//Lord Creative
app.get("/", (request, response) => {//Lord Creative
  console.log(Date.now() + "Lord Creative  7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");//Lord Creative
  response.sendStatus(200);//Lord Creative
});//Lord Creative
app.listen(process.env.PORT);//Lord Creative
setInterval(() => {//Lord Creative
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);//Lord Creative
}, 280000);//Lord Creative
//Lord Creative
var prefix = ayarlar.prefix;//Lord Creative

const log = message => {//Lord Creative
  console.log(`${message}`);//Lord Creative
};

client.commands = new Discord.Collection();//Lord Creative
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });//Lord Creative
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }//Lord Creative
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);//Lord Creative
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {//Lord Creative
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }//Lord Creative
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {//Lord Creative
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {//Lord Creative
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);
/////

//---------------------------------KOMUTLAR---------------------------------\\
//Lord Creative
///otorol///
client.on("guildMemberAdd", async (member, guild, message) => {
  let role = db.fetch(`otorolisim_${member.guild.id}`);
  let otorol = db.fetch(`autoRole_${member.guild.id}`);//Lord Creative
  let i = db.fetch(`otorolKanal_${member.guild.id}`);
  if (!otorol || otorol.toLowerCase() === "yok") return;
  else {
    try {
      if (!i) return;
      if (!role) {
        member.addRole(member.guild.roles.get(otorol));
        var embed = new Discord.RichEmbed()
          .setDescription(
            "**Sunucuya Yeni Katılan** @" +
              member.user.tag +
              " **Kullanıcısına** <@&" +
              otorol +
              ">  **Rolü verildi:white_check_mark:**"
          )
          .setColor("0x36393E")
          .setFooter(`wonders Otorol Sistemi`);
        member.guild.channels.get(i).send(embed);
      } else if (role) {
        member.addRole(member.guild.roles.get(otorol));
        var embed = new Discord.RichEmbed()
          .setDescription(
            `**Sunucuya Yeni Katılan** \`${member.user.tag}\` **Kullanıcısına** \`${role}\` **Rolü verildi. <a:blobjoining:696373472431177781>**`
          )
          .setColor("0x36393E")
          .setFooter(`El Turco Otorol Sistemi`);
        member.guild.channels.get(i).send(embed);
      }
    } catch (e) {
      console.log(e);
    }
  }
});
///küfür///
client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`küfürFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const küfür = [
      "amcık",
      "yarrak",
      "orospu",
      "piç",
      "sikerim",
      "sikik",
      "amına",
      "pezevenk",
      "yavşak",
      "ananı",
      "anandır",
      "orospu",
      "evladı",
      "göt",
      "pipi",
      "sokuk",
      "yarak",
      "bacını",
      "karını",
      "amk",
      "aq",
      "mk",
      "anaskm",
      "skm",
      "sikim",
      "çocuğu",
      "oç",
      "sg",
      "siktir",
      "sie",
      "sikiş",
      "sik",
      "götelek"
    ];
    if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_WEBHOOKS")) {
          msg.delete();
          let embed = new Discord.RichEmbed()
            .setColor(0xffa300)
            .setFooter("El Turco | Küfür Sistemi", client.user.avatarURL)
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL
            )
            .setDescription(
              "ElTurco, " +
                `***${msg.guild.name}***` +
                " adlı sunucunda küfür yakaladım, ilgilen şu ibneyle"
            )
            .addField(
              "Küfür Eden Kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(
              `${msg.author}, Küfür etmek yasak birader ne bu rahatlık amk.`
            )
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});
///reklam///
client.on("message", async msg => {
  let antoxd = await db.fetch(`antoxd${msg.guild.id}`);
  if (antoxd === "acik") {//Lord Creative
    const reklam = ["discord.gg", "https://discordapp.com/invite/"];
    if (reklam.some(word => msg.content.includes(word))) {
      msg.delete();
    }
  }
});
///sayaç///
client.on("guildMemberAdd", async member => {
  let frenzysayı = await db.fetch(`FrenzyCode+SayaçSayı_${member.guild.id}`);
  let frenzykanal = await db.fetch(`FrenzyCode+SayaçKanal_${member.guild.id}`);
  if (!frenzysayı || !frenzykanal) return;
  let sonuç = frenzysayı - member.guild.memberCount;
  client.channels
    .get(frenzykanal)
    .send(
      `<a:blobjoining:698617723684519967> | O Sunucumuza Yeni Biri Geldi Ve İsmi ${member}, Hoşgeldin  **${frenzysayı}** Kişiye Ulaşmak İçin  **${sonuç}** Kişi Kaldı.`
    );
});
client.on("guildMemberRemove", async member => {
  let frenzysayı = await db.fetch(`FrenzyCode+SayaçSayı_${member.guild.id}`);
  let frenzykanal = await db.fetch(`FrenzyCode+SayaçKanal_${member.guild.id}`);
  if (!frenzysayı || !frenzykanal) return;
  let sonuç = frenzysayı - member.guild.memberCount;

  client.channels
    .get(frenzykanal)
    .send(
      `<a:ablobleaving:698617725936861214> | Olamaz ${member}, Sunucudan Ayrıldı! **${frenzysayı}** Kişiye Ulaşmak İçin  **${sonuç}** Kişi Kaldı.`
    );
  return;
});
///sa-as///
client.on("message", msg => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Sa") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Sea") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "sea") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");//Lord Creative
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Selamın Aleyküm") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "selamın aleyküm") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Selamun Aleyküm") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "selamun aleyküm") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "veral") {
    msg.reply("**Sahip kesin yemek yiyodur veya oyun oynuyodur xd https://cdn.discordapp.com/attachments/730606870183673886/732290695682850856/tenor.gif  **");
    }
  });

client.on("message", msg => {
  if (msg.content.toLowerCase() === "canberk") {
    msg.reply("**https://cdn.discordapp.com/attachments/663330907033305108/732212754634768404/xmB8fQJ.gif Oyun oynuyordur şimdi bre susak :heart:**  ");//Lord Creative
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "youtube") {
    msg.reply("**__https://www.youtube.com/channel/UCeyE0K2buq8HWvAiXnluFJQ?view_as=subscriber__** : ");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "YOUTUBE") {
    msg.reply("**__https://www.youtube.com/channel/UCeyE0K2buq8HWvAiXnluFJQ?view_as=subscriber__** : ");
  }
});

///reklam-engelle///
client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`reklamFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const reklam = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net",//Lord Creative
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az",
      ".org"
    ];
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          msg.delete();
          let embed = new Discord.RichEmbed()
            .setColor(0xffa300)
            .setFooter(
              "El Turco  -|-  Reklam engellendi.",
              client.user.avatarURL
            )
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL
            )
            .setDescription(
              " El Turco | Reklam Sistemi, " +
                `**${msg.guild.name}**` +
                " Reklamcı buldum hadi sikelim."
            )
            .addField(
              "Reklamı yapan kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(`${msg.author.tag}, Reklam Yapmak Yasak!`)
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});
///davet-ayarla///
const invites = {};

const wait = require('util').promisify(setTimeout);

client.on('ready', () => {

  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', member => {
  
  
 
  member.guild.fetchInvites().then(guildInvites => {
    
    if (db.has(`dKanal_${member.guild.id}`) === false) return
    const channel = db.fetch(`dKanal_${member.guild.id}`).replace("<#", "").replace(">", "")
    
    const ei = invites[member.guild.id];
  
    invites[member.guild.id] = guildInvites;
 
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

    const davetçi = client.users.get(invite.inviter.id);
     db.add(`davet_${invite.inviter.id + member.guild.id}`,1)
let bal  = db.fetch(`davet_${invite.inviter.id + member.guild.id}`)
   member.guild.channels.get(channel).send(`<a:blobjoining:696373472431177781> ** <@${member.id}> Joined**; İnvited by **${davetçi.tag}** (`+'**'+bal+'** invites)')
  })

});
client.on("guildMemberRemove", async member => {
//Lord Creative
    member.guild.fetchInvites().then(guildInvites => {

      const ei = invites[member.guild.id];
  
    invites[member.guild.id] = guildInvites;
 
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

       db.subtract(`davet_${invite.inviter.id + member.guild.id}`,1)
    })
})
///sunucukur///
client.on("message", async message => {
    const ms = require("ms");
    const prefix =
      (await require("quick.db").fetch(`prefix_${message.guild.id}`)) ||
      ayarlar.prefix;
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    let u = message.mentions.users.first() || message.author;
    if (command === "sunucu-kur") {
      if (
        message.guild.channels.find(channel => channel.name === "Bot Kullanımı")
      )
        return message.channel.send(" Bot Paneli Zaten Ayarlanmış.");
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(
          " Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir."
        );
      message.channel.send(
        `Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`
      );
      message.channel
        .awaitMessages(response => response.content === "evet", {
          max: 1,
          time: 10000,
          errors: ["time"]
        })
        .then(collected => {
          message.guild.createChannel("|▬▬|ÖNEMLİ KANALLAR|▬▬|", "category", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ]);

          message.guild
            .createChannel("「📃」kurallar", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])//Lord Creative
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel("「🚪」gelen-giden", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel("「✅」sayaç", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel("「💾」log-kanalı", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel("「📢」duyuru-odası", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])//Lord Creative
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
        })
        .then(collected => {
          message.guild.createChannel("|▬▬|GENEL KANALLAR|▬▬|", "category", [
            {
              id: message.guild.id
            }
          ]);

          message.guild
            .createChannel(`「💡」şikayet-ve-öneri`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`「👥」pre-arama-odası`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`「📷」görsel-içerik`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`「🤖」bot-komutları`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`「💬」sohbet`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(//Lord Creative
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );

          message.guild
            .createChannel(`🏆》Kurucu Odası`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
                )
              )
            )
            .then(c => {
              let role = message.guild.roles.find("name", "@everyone");
              let role2 = message.guild.roles.find("name", "Kurucu");

              c.overwritePermissions(role, {
                CONNECT: false
              });
              c.overwritePermissions(role2, {
                CONNECT: true
              });
            });

          message.guild.createChannel("|▬▬|SES KANALLARI|▬▬|", "category", [
            {
              id: message.guild.id
            }
          ]);

          message.guild
            .createChannel(`🏆》Yönetici Odası`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
                )
              )
            )
            .then(c => {
              let role = message.guild.roles.find("name", "@everyone");
              let role2 = message.guild.roles.find("name", "Kurucu");
              let role3 = message.guild.roles.find("name", "Yönetici");
              c.overwritePermissions(role, {
                CONNECT: false
              });
              c.overwritePermissions(role2, {
                CONNECT: true
              });
              c.overwritePermissions(role3, {
                CONNECT: true
              });
            });

          message.guild//Lord Creative
            .createChannel(`💬》Sohbet Odası`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
                )
              )
            )
            .then(c => {
              let role = message.guild.roles.find("name", "@everyone");
              c.overwritePermissions(role, {
                CONNECT: true
              });
            });

          message.guild.createChannel("|▬▬|OYUN ODALARI|▬▬|", "category", [
            {
              id: message.guild.id
            }
          ]);

          message.guild
            .createChannel(`🎮》LOL`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》ZULA`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》COUNTER STRİKE`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》PUBG`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )//Lord Creative
              )
            );
          message.guild
            .createChannel(`🎮》FORTNİTE`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》MİNECRAFT`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》ROBLOX`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》WOLFTEAM`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );

          message.guild.createRole({
            name: "Kurucu",
            color: "RED",
            permissions: ["ADMINISTRATOR"]
          });

          message.guild.createRole({
            name: "Yönetici",
            color: "BLUE",
            permissions: [
              "MANAGE_GUILD",
              "MANAGE_ROLES",
              "MUTE_MEMBERS",
              "DEAFEN_MEMBERS",
              "MANAGE_MESSAGES",
              "MANAGE_NICKNAMES",
              "KICK_MEMBERS"
            ]
          });
//Lord Creative
          message.guild.createRole({
            name: "Moderatör",
            color: "GREEN",
            permissions: [
              "MANAGE_GUILD",
              "MANAGE_ROLES",
              "MUTE_MEMBERS",
              "DEAFEN_MEMBERS",
              "MANAGE_MESSAGES",
              "MANAGE_NICKNAMES"
            ]
          });

          message.guild.createRole({
            name: "V.I.P",
            color: "00ffff"
          });

          message.guild.createRole({
            name: "Üye",
            color: "WHITE"
          });

          message.guild.createRole({
            name: "Bot",
            color: "ORANGE"
          });
//Lord Creative
          message.channel.send("Gerekli Odalar Kuruldu!");
        });
    }
  });

client.on("message", async message => {

  if (message.author.bot) return;

  if (!message.guild) return;

  let prefix = db.get(`prefix_${message.guild.id}`);

  if (prefix === null) prefix = prefix;

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)

  message.member = await message.guild.fetchMember(message);

  const args = message.content

    .slice(prefix.length)

    .trim()

    .split(/ +/g);

  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;
  
  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);

});



// SEVIYE \\
const dba = require('quick.db');
client.on("message", async msg => {
      const emoji = client.emojis.get('706673080402968707');
      let guncelseviye = await db.fetch(`seviye_${msg.author.id + msg.guild.id}`,);

      const seviyeatlama = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription(`
      ${emoji} **Level Atlayan:** <@${msg.author.id}>
      ${emoji} **Level: ** ${guncelseviye}
`);  
  
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;

  if (msg.content.length > 7) {
    dba.add(`puan_${msg.author.id + msg.guild.id}`, 1);
  }
  
  
  if (dba.fetch(`puan_${msg.author.id + msg.guild.id}`) > 150) {
  
  
  let seviyelog = msg.guild.channels.find(`name`, "💎┊seviye");    
  msg.guild.channels.get(seviyelog.id).send(seviyeatlama)
    
    
    dba.add(`seviye_${msg.author.id + msg.guild.id}`, 1);

    dba.delete(`puan_${msg.author.id + msg.guild.id}`);
  }
});
// SEVIYE \\

// TALEP \\
client.on('message', msg => {
  if (msg.content.toLowerCase().startsWith(prefix + `talep`)) {
  if (msg.channel.name== '「⚡」bot・ayar') { //talep komutunun kullanılacağı kanalın adını girin!
    const cwbotlist = new Discord.RichEmbed()
    .addField(" Hata ", `Bu Sunucuda \`Destek Ekibi\` Adında Bir Rol Yok!`)
    .setColor("RANDOM")
   
    if (!msg.guild.roles.exists("name", "Destek Ekibi")) return msg.author.send(cwbotlist) + msg.guild.owner.send(`${msg.guild.name} Adlı Sunucunda, \`Destek Ekibi\` Böyle Bir Rol Olmadığı İçin, Destek Talebi Açılamıyor!`);
    if(msg.guild.channels.find('name', 'Destek Talepleri')) { //destek hangi kategoride açılcaksa o kategorinin adını girin!
      msg.guild.createChannel(`🔨・destek-${msg.member.user.username}`, "text").then(c => {
      const category = msg.guild.channels.find('name', 'Destek Talepleri') //destek hangi kategoride açılcaksa o kategorinin adını girin!
      c.setParent(category.id)
      let role = msg.guild.roles.find("name", "Destek Ekibi"); //destek yetkilisinin rolünün adını girin!
      let role2 = msg.guild.roles.find("name", "@everyone"); //kurcalamayın burayı!
      c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });

      const codework = new Discord.RichEmbed()
      .setColor("RANDOM")
      .addField(`Merhaba ${msg.author.username}!`, `Destek Ekibimiz En Kısa Sürede Seninle İlgilenecektir. \nDestek Talebini Sonlandırmak İçin \`${prefix}sonlandır\` yazabilirsin.`)
      .addField(`Talep Oluşturan Kullanıcı;`, `<@${msg.author.id}>`, true)
      .setFooter(`${client.user.username} | Destek Sistemi`)
      .setTimestamp()
      c.send({ embed: codework });
      c.send(`Yeni Bir Destek Talebi Oluşturuldu, Lütfen İlgileniniz. @here`)
      msg.delete()
      }).catch(console.error);
      }
    }
   }
});

client.on("message", message => {
if (message.content.toLowerCase().startsWith(prefix + `sonlandır`)) { //Sonlandırma komutu
    if (!message.channel.name.startsWith(`🔨・destek-`)) return message.channel.send(`Bu komut sadece Destek Talebi kanallarında kullanılabilir!`);

    var codework2 = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Destek Talebi Kapatma İşlemi`)
    .setDescription(`Destek talebini kapatmayı onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
    .setFooter(`${client.user.username} | Destek Sistemi`)
    message.channel.send(codework2)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Destek Talebi kapatma isteğin zaman aşımına uğradı!').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}
});