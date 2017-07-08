exports.run = async function (bot, message, args) {
  message.reply("This will kick inactive people. Are you sure? Type `yes` for yes. Command will be canceled over 30 seconds.").then(() => {
    message.channel.awaitMessages(response => response.content === 'yes' || response.content === "Yes", {
        max: 1,
        time: 30000,
        errors: ['time'],
    }).then((collected) => {
        message.guild.pruneMembers(30)
        .then(pruned => {
          message.channel.send(`I pruned ${pruned} people.`)
        })
        .catch(console.error);
    }).catch(() => {
        message.channel.send("command canceled.");
    })
})
}

exports.help = {
  name: "prune",
  description: "Kicks inactive people.",
  usage: "prune"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 6,
  aliases: []
}
