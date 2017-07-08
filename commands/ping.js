exports.run = async function (bot, message, args) {
  message.channel.send("Pong!")
}

exports.config = {
  enabled: true,
  guildOnly: false,
  permlevel: 0,
  aliases: []
}

exports.help = {
  name: "ping",
  description: "Ping/Pong command.",
  usage: "ping"
}
