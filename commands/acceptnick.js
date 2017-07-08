const nicks = require("../data/nicks.json");
const Discord = require("discord.js");
const fs = require("fs");
exports.run = async function (bot, message, args) {
  let pid = args.slice(0).join(" ");
  if(pid.length < 1) return message.reply("Please provide a nick ID to accept.")
  let list = Object.keys(nicks);
  let found;

  for (let i=0; i < list.length; i++) {
    if(nicks[list[i]].nickname.caseid === pid) {
      found = list[i];
      break;
    }
  }

  if(!found) return message.channel.send("```Error: The nickname with the provided ID does not exist.```")
  if(nicks[found].server.id !== message.guild.id) return message.reply("You can not do this as this nickname was not requested in this server.")
  message.guild.member(nicks[found].user.id).setNickname(nicks[found].nick)
  message.channel.send("```Done```")
  message.guild.member(nicks[found].user.id).send(`Your nick change request got accepted`)
  delete nicks[found]
  fs.writeFile("./data/nicks.json", JSON.stringify(nicks))
}

exports.help = {
  name: "acceptnick",
  description: "Accepts the nick change request by ID",
  usage: "acceptnick <ID>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 2,
  aliases: []
}
