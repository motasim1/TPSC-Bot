const bans = require("../data/bans.json");
const Discord = require("discord.js");
const fs = require("fs")
exports.run = async function (bot, message, args) {
  let user = message.mentions.users.array()[0];
  if (!user) return message.channel.send("You need to mention the user");
  let list = Object.keys(bans);
  let found = '';
  let foundCounter = 0;
  let warnCase;
  //looking for the case id
  for (let i = 0; i < list.length; i++) {
      if (bans[list[i]].user.id == user.id) {
          foundCounter++;
          found += `Case ID: ${(bans[list[i]].ban.caseid)}\nUsername: ${bans[list[i]].user.name}#${bans[list[i]].user.discrim}\nAdmin: ${bans[list[i]].admin.name}#${bans[list[i]].admin.discrim}\nServer: ${bans[list[i]].server.name}\nReason: ${bans[list[i]].reason}\n\n`;
      }
  }
  if (foundCounter == 0) return message.channel.send("No bans found for that user")
  message.channel.send("Found " + foundCounter + " ban(s).\n```" + found + "```");
}

exports.help = {
  name: "bans",
  description: "Shows the bans for the mentioned user.",
  usage: "bans <user mention>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0,
  aliases: []
}
