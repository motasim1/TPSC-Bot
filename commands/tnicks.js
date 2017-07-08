const nicks = require("../data/nicks.json");
const Discord = require("discord.js");
const fs = require("fs")
exports.run = async function (bot, message, args) {
  let list = Object.keys(nicks);
  let found = '';
  let foundCounter = 0;
  let warnCase;
  //looking for the case id
  for (let i = 0; i < list.length; i++) {
          foundCounter++;
          found += `Nick ID: ${(nicks[list[i]].nickname.caseid)}\nUsername: ${nicks[list[i]].user.name}#${nicks[list[i]].user.discrim}\nServer: ${nicks[list[i]].server.name} - ${nicks[list[i]].server.id}\nNickname: ${nicks[list[i]].nick}\n\n`;
  }
  if (foundCounter == 0) return message.channel.send("No nicks found")
  message.channel.send("Found " + foundCounter + " nick(s).\n```" + found + "```");
}

exports.help = {
  name: "tnicks",
  description: "Shows the total requested nicks.",
  usage: "tnicks"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 20,
  aliases: []
}
