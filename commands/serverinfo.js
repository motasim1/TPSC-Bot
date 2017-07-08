const Discord = require("discord.js")
exports.run = async function (bot, message, args) {
  let server = message.guild
  const embed = new Discord.RichEmbed()
  .setTitle(server.name)
  .setColor("RANDOM")
  .setThumbnail(server.iconURL)
  .addField("Name:", server.name)
  .addField("ID:", server.id)
  .addField("Members:", server.memberCount)
  .addField("Owner:", server.owner.user.tag)
  .addField("Verification Level:", server.verificationLevel)
  message.channel.send({embed: embed})
}

exports.help = {
  name: "serverinfo",
  description: "Shows the server information.",
  usage: "serverinfo"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0,
  aliases: ["information", "server info"]
}
