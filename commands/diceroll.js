exports.run = async function (bot, message) {
  let rolls = Math.floor(Math.random() * 100)
  message.channel.send(rolls)
}

exports.help = {
  name: "diceroll",
  description: "Rolls a dice.",
  usage: "diceroll"
}

exports.config = {
  enabled: true,
  guildOnly: false,
  permlevel: 0,
  aliases: []
}
