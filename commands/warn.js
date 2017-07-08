const warns = require("../data/warns.json");
const Discord = require("discord.js");
const fs = require("fs")
exports.run = async function (bot, message, args) {
  let c = message.content
  let usr = message.mentions.users.array()[0]
  if (!usr) return message.channel.send("You need to mention the user");
  let rsn = c.split(" ").splice(1).join(" ").replace(usr, "").replace("<@!" + usr.id + ">", "")
  if(rsn.length < 1) return message.reply("Please provide a reason for this warning.")
  if(!message.guild.member(usr).kickable) return message.channel.send("```You can not warn that member.```")
  let caseid = genToken(20)


  function genToken(length) {
      let key = ""
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

      for (let i = 0; i < length; i++) {
          key += possible.charAt(Math.floor(Math.random() * possible.length))
      }

      return key
  }


  warns[caseid] = {
    "warning" : {
      "caseid" : caseid
    },
      "admin": {
          "name": message.author.username,
          "discrim": message.author.discriminator,
          "id": message.author.id
      },
      "user": {
          "name": usr.username,
          "discrim": usr.discriminator,
          "id": usr.id
      },
      "server": {
          "name": message.guild.name,
          "id": message.guild.id,
          "channel": message.channel.name,
          "channel_id": message.channel.id
      },
      "reason": rsn
  }
  const embed = new Discord.RichEmbed()
  .setTitle("Warn")
  .setColor("#ffff00")
  .setDescription(`Whoah, it seems that you got warned in **${message.guild.name}**`)
  .addField("Moderator:", message.author.tag)
  .addField("Reason:", rsn)
  message.guild.member(usr).send({embed: embed})
  message.channel.send(usr + " was warned for `" + rsn + "`, check logs for more info")
  fs.writeFile("./data/warns.json", JSON.stringify(warns))
}

exports.help = {
  name: "warn",
  description: "Warns the mentioned user.",
  usage: "warn <user mention> <reason>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 2,
  aliases: []
}
