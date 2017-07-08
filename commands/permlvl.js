exports.run = async function (bot, message, perms) {
  let permlvl = bot.elevation(message)
  message.reply(`Your permission level is: ${permlvl}`)
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0,
  aliases: []
}

exports.help = {
  name: "permlvl",
  description: "Shows your permission level.",
  usage: "permlvl"
}
