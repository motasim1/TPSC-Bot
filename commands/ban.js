const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const bans = require("../data/bans.json");
exports.run = async function (bot, message, args) {
  let caseid = genToken(5)


  function genToken(length) {
      let key = ""
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

      for (let i = 0; i < length; i++) {
          key += possible.charAt(Math.floor(Math.random() * possible.length))
      }

      return key
  }
  let mention = message.mentions.users.first();
  let reason = args.slice(1).join(" ")
  let logs = config.logchannel
  if(!message.mentions.users.size) return message.reply("Please mention someone to ban!")
  if(message.mentions.users.size > 1) return message.reply("You can not ban multiple people.")
  if(reason.length < 1) return message.reply("Please provide a reason for this ban.")
  let modch = message.guild.channels.find("name", logs)
  if(!modch) return message.reply("I can not find a mod logs channel. Please be sure that there is a channel called `" + logs + "`")
  //if(!message.guild.member(mention).banable) return message.reply("I can not ban that member.")
  const embed = new Discord.RichEmbed()
  .setTitle("Ban")
  .setColor("#ff0000")
  .setDescription(`${mention} got banned from the server.`)
  .addField("ID:", caseid)
  .addField("User:", mention.tag)
  .addField("Moderator:", message.author.tag)
  .addField("Reason:", reason)
  message.guild.defaultChannel.send({embed: embed})
  bot.channels.get(modch.id).send({embed: embed})
  const uembed = new Discord.RichEmbed()
  .setTitle("Ban")
  .setColor("#ff0000")
  .setDescription(`Whoah, it seems that you got banned from **${message.guild.name}**`)
  .addField("Moderator:", message.author.tag)
  .addField("Reason:", reason)
  message.guild.member(mention).send({embed: uembed})
  message.guild.member(mention).ban(7)
  message.reply(`I have banned **${mention.tag}** and I deleted his/her messages in the past 7 days.`)
  bans[caseid] = {
    "ban" : {
      "caseid" : caseid
    },
    "admin": {
      "name": message.author.username,
      "discrim": message.author.discriminator,
      "id": message.author.id
    },
    "user" : {
      "name" : mention.username,
      "discrim" : mention.discriminator,
      "id" : mention.id
    },
    "server": {
      "name": message.guild.name,
      "id": message.guild.id,
      "channel": message.channel.name,
      "channel_id": message.channel.id
    },
    "reason": reason
  }
  fs.writeFile("./data/bans.json", JSON.stringify(bans))
}

exports.help = {
  name: "ban",
  description: "Bans the mentioned user.",
  usage: "ban <user mention> <reason>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 4,
  aliases: []
}
