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
  message.channel.send(`Deleting the case of ${nicks[found].user.name}\NNickname: ${nicks[found].nick}\nServer: ${nicks[found].server.name}`)
  delete nicks[found]
  fs.writeFile("./data/nicks.json", JSON.stringify(nicks))
}

exports.help = {
  name: "deletenick",
  description: "Deletes the nick change request by ID",
  usage: "deletenick <ID>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 20,
  aliases: []
}
