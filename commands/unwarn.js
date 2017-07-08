const warns = require("../data/warns.json");
const Discord = require("discord.js");
const fs = require("fs");
exports.run = async function (bot, message, args) {
  let perms = bot.elevation(message)
  let pid = args.slice(0).join(" ");
  if(pid.length < 1) return message.reply("Please provide a warning ID to remove.")
  let list = Object.keys(warns);
  let found;

  for (let i=0; i < list.length; i++) {
    if(warns[list[i]].warning.caseid === pid) {
      found = list[i];
      break;
    }
  }

  if(!found) return message.reply("No warning found with that warning ID.")
  if(perms < 20 && warns[found].server.id !== message.guild.id) return message.reply("You can not do this as this warning was not issued in this server.")
  message.channel.send(`Deleting the case of ${warns[found].user.name}\nReason: ${warns[found].reason}\nServer: ${warns[found].server.name}`)
  delete warns[found]
  fs.writeFile("./data/warns.json", JSON.stringify(warns))
}

exports.help = {
  name: "unwarn",
  description: "Delete a warning for the mentioned user.",
  usage: "unwarn <user mention>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 4,
  aliases: []
}
