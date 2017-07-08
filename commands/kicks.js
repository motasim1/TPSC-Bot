const kicks = require("../data/kicks.json");
const Discord = require("discord.js");
const fs = require("fs")
exports.run = async function (bot, message, args) {
  let user = message.mentions.users.array()[0];
  if (!user) return message.channel.send("You need to mention the user");
  let list = Object.keys(kicks);
  let found = '';
  let foundCounter = 0;
  let warnCase;
  //looking for the case id
  for (let i = 0; i < list.length; i++) {
      if (kicks[list[i]].user.id == user.id) {
          foundCounter++;
          found += `Case ID: ${(kicks[list[i]].kick.caseid)}\nUsername: ${kicks[list[i]].user.name}#${kicks[list[i]].user.discrim}\nAdmin: ${kicks[list[i]].admin.name}#${kicks[list[i]].admin.discrim}\nServer: ${kicks[list[i]].server.name}\nReason: ${kicks[list[i]].reason}\n\n`;
      }
  }
  if (foundCounter == 0) return message.channel.send("No kicks found for that user")
  message.channel.send("Found " + foundCounter + " kick(s).\n```" + found + "```");
}

exports.help = {
  name: "kicks",
  description: "Shows the kicks for the mentioned user.",
  usage: "kicks <user mention>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0,
  aliases: []
}
