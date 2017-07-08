const bans = require("../data/bans.json");
const Discord = require("discord.js");
const fs = require("fs");
exports.run = async function (bot, message, args) {
  let perms = bot.elevation(message)
  let pid = args.slice(0).join(" ");
  if(pid.length < 1) return message.reply("Please provide a ban ID to remove.")
  let list = Object.keys(bans);
  let found;

  for (let i=0; i < list.length; i++) {
    if(bans[list[i]].ban.caseid === pid) {
      found = list[i];
      break;
    }
  }

  if(!found) return message.reply("No ban found with that ban ID.")
  if(perms < 20 && bans[found].server.id !== message.guild.id) return message.reply("You can not do this as this kick was not issued in this server.")
  message.channel.send(`Deleting the case of ${bans[found].user.name}\nReason: ${bans[found].reason}\nServer: ${bans[found].server.name}`)
  delete bans[found]
  fs.writeFile("./data/bans.json", JSON.stringify(bans))
}

exports.help = {
  name: "rmban",
  description: "Delete a ban with the ID.",
  usage: "rmban <ban ID>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 4,
  aliases: []
}
