const warns = require("../data/warns.json");
const Discord = require("discord.js");
const fs = require("fs")
exports.run = async function (bot, message, args) {
  let list = Object.keys(warns);
  let found = '';
  let foundCounter = 0;
  let warnCase;
  //looking for the case id
  for (let i = 0; i < list.length; i++) {
          foundCounter++;
          found += `Case ID: ${(warns[list[i]].warning.caseid)}\nUsername: ${warns[list[i]].user.name}#${warns[list[i]].user.discrim}\nAdmin: ${warns[list[i]].admin.name}#${warns[list[i]].admin.discrim}\nServer: ${warns[list[i]].server.name}\nReason: ${warns[list[i]].reason}\n\n`;
  }
  if (foundCounter == 0) return message.channel.send("No warnings found")
  message.channel.send("Found " + foundCounter + " warning(s).\n```" + found + "```");
}

exports.help = {
  name: "twarnings",
  description: "Shows the total issued warnings.",
  usage: "twarnings"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 20,
  aliases: []
}
