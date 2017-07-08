const Discord = require("discord.js")
exports.run = async function (bot, message) {
  const guildArray = bot.guilds.array()
  while (guildArray.length) {
    const embed = new Discord.RichEmbed();
    const guilds = guildArray.splice(0,25);
    for (const guild of guilds) {
      embed.addField(`${guild.name} (${guild.owner.user.username}#${guild.owner.user.discriminator} (${guild.owner.user.id})) - ${guild.memberCount}`, guild.id);
      embed.setColor('#00ffff')
      embed.setTitle('Servers')
      embed.setDescription(`I am serving these servers. I am now in ${bot.guilds.size} servers`)
    }
    message.channel.send({embed: embed});
  }
}

exports.help = {
  name: "servers",
  description: "Shows all the servers the bot is in.",
  usage: "servers"
}

exports.config = {
  enabled: true,
  guildOnly: false,
  permlevel: 10,
  aliases: []
}
