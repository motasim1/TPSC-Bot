const kicks = require("../data/kicks.json");
const Discord = require("discord.js");
const fs = require("fs");
exports.run = async function (bot, message, args) {
  let perms = bot.elevation(message)
  let pid = args.slice(0).join(" ");
  if(pid.length < 1) return message.reply("Please provide a kick ID to remove.")
  let list = Object.keys(kicks);
  let found;

  for (let i=0; i < list.length; i++) {
    if(kicks[list[i]].kick.caseid === pid) {
      found = list[i];
      break;
    }
  }

  if(!found) return message.reply("No kick found with that kick ID.")
  if(perms < 20 && kicks[found].server.id !== message.guild.id) return message.reply("You can not do this as this kick was not issued in this server.")
  message.channel.send(`Deleting the case of ${kicks[found].user.name}\nReason: ${kicks[found].reason}\nServer: ${kicks[found].server.name}`)
  delete kicks[found]
  fs.writeFile("./data/kicks.json", JSON.stringify(kicks))
}

exports.help = {
  name: "rmkick",
  description: "Delete a kick with the ID.",
  usage: "unwarn <user mention>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 4,
  aliases: []
}
