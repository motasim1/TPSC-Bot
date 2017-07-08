const nicks = require("../data/nicks.json")
exports.run = async function (bot, message, args) {
  let pid = args.slice(0).join(" ");
  if(pid.length < 1) return message.reply("Please provide a nick ID.")
  let list = Object.keys(nicks);
  let found;

  for (let i=0; i < list.length; i++) {
    if(nicks[list[i]].nickname.caseid === pid) {
      found = list[i];
      break;
    }
  }

  if(!found) return message.reply("No nick request found with that ID.")
  message.channel.send("```" + `Nickname: ${nicks[found].nick}\nRequester: ${nicks[found].user.name}#${nicks[found].user.discrim}\nServer: ${nicks[found].server.name}` + "```")
}

exports.help = {
  name: "nickinfo",
  description: "Shows information about a nick request.",
  usage: "nickinfo <nick ID>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0,
  aliases: []
}
