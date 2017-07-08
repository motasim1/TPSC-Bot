const nicks = require("../data/nicks.json");
const Discord = require("discord.js");
const fs = require("fs")
const config = require("../config.json")
exports.run = async function (bot, message, args) {
  let c = message.content
  let nick = c.split(" ").splice(1).join(" ")

  let caseid = genToken(5)

  function genToken(length) {
      let key = ""
      let possible = "0123456789"

      for (let i = 0; i < length; i++) {
          key += possible.charAt(Math.floor(Math.random() * possible.length))
      }

      return key
  }
  const embed = new Discord.RichEmbed()
  .setTitle("Nick Change Request")
  .setColor("#00fffa")
  .addField("Case ID:", caseid)
  .addField("User:", message.author.tag)
  .addField("Desired nickname:", nick)
  let ch = message.guild.channels.find("name", "nick_change_requests")
  if(!ch) return;
  bot.channels.get(ch.id).send({embed: embed})
  nicks[caseid] = {
    "nickname" : {
      "caseid" : caseid
    },
    "user": {
      "name": message.author.username,
      "discrim": message.author.discriminator,
      "id": message.author.id
    },
    "server": {
      "name": message.guild.name,
      "id": message.guild.id,
      "channel": message.channel.name,
      "channel_id": message.channel.id
    },
    "nick": nick
  }
  fs.writeFile("./data/nicks.json", JSON.stringify(nicks))
}

exports.help = {
  name: "nick",
  description: "Request a nickname change.",
  usage: "nick <desired nickname>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0,
  aliases: []
}
