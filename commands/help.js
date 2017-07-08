const config = require("../config.json")
exports.run = async function (bot, message, args) {
  if (args.length < 1) {
  const commandNames = Array.from(bot.commands.keys());
  const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
message.channel.send(`= Command List = ${config.prefix}help [command]\n\n${bot.commands.map(c => `${config.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description} - Permission level: ${c.config.permlevel}`).join('\n')}`, {code:'asciidoc'});
} else {
  let perms = bot.elevation(message)
  var can_i;
  let command = args.slice(0).join(" ")
  if(command.length < 1) return;
  if (bot.commands.has(command)) {
    command = bot.commands.get(command);
    if(perms < command.config.permLevel) {
      can_i = "No"
    } else {
      can_i = "Yes"
    }
    message.channel.send(`= Detailed help for :: ${command.help.name} = \n\nGuild only :: ${command.config.guildOnly}\n\nEnabled :: ${command.config.enabled}\n\nInfo :: ${command.help.description}\n\nRequired permission level :: ${command.config.permlevel}\n\nCan I run the command :: ${can_i} (Your permission level is : ${perms})\n\nusage :: ${config.prefix}${command.help.usage}`, {code:'asciidoc'});
} else {
message.channel.send(`Error :: The command "${command}" does not exist. `, {code:'asciidoc'});
}
}
}

exports.config = {
  enabled: true,
  guildOnly: false,
  permlevel: 0,
  aliases: []
}

exports.help = {
  name: "help",
  description: "Shows help for all commands or for one.",
  usage: 'help [command]'
}
