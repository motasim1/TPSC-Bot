const Discord = require("discord.js");
const sql = require("sqlite");
const bot = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");

var no_perms = "```Sorry, but you do not have the right permissions to execute this command.```"

var developer = user_id => bot.guilds.get('327064568671240195').roles.get('327064946066325514').members.map(member => member.id).indexOf(user_id) > -1;
var lead_dev = user_id => bot.guilds.get("327064568671240195").roles.get("327065607256408066").members.map(member => member.id).indexOf(user_id) > - 1;
var bot_support = user_id => bot.guilds.get("327064568671240195").roles.get("327065128925134858").members.map(member => member.id).indexOf(user_id) > - 1;
var staff = user_id => bot.guilds.get("327064568671240195").roles.get("327065314355314688").members.map(member => member.id).indexOf(user_id) > - 1;

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

bot.elevation = message => {
  var permlevel = 0;
  if(!message.guild) return;
  if(message.member.roles.has(config.modrole.id)) permlevel = 2;
  if(message.member.roles.has(config.adminrole.id)) permlevel = 4;
  if(message.member.hasPermission("ADMINISTRATOR")) permlevel = 6;
  if(message.author.id === message.guild.owner.id) permlevel = 8;
  if(message.author.id === "229232856063410176") permlevel = 999999999999999999
  return permlevel;
};


bot.on("ready", () => {
  fs.readdir("./commands", (err, files) => {
    if(err) console.error(err);
    console.log(`Loading a total of ${files.length} commands!`);
    files.forEach(filename => {
      let props = require(`./commands/${filename}`);
      bot.commands.set(props.help.name, props);
      props.config.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
    });
  });
  console.log("Online and ready!")
  console.log(`Serving a total of ${bot.guilds.size} servers and ${bot.users.size} users.`)
})


bot.on("message", message => {
  if(message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  let command = message.content.toLowerCase().split(' ')[0].slice(config.prefix.length);
  let perms = bot.elevation(message);
  let args = message.content.split(' ').slice(1);
  let cmd;

  if (bot.commands.has(command)) {
  cmd = bot.commands.get(command);
  } else if (bot.aliases.has(command)) {
  cmd = bot.commands.get(bot.aliases.get(command));
  }
  if(!cmd) return;
    if (cmd) {
      if (perms < cmd.config.permlevel) {
        message.author.send(no_perms)
      } else {
        if(cmd.config.guildOnly == true && message.channel.type == "dm") {
          message.channel.send("```Error: This command is only available in a server.```")
        } else {
        cmd.run(bot, message, args, perms);
      }
      }
    }

    if(message.content === config.prefix + "agree") {
      if(message.channel.name !== "agree") return;
      let logs = config.logchannel
      let modch = message.guild.channels.find("name", logs)
      if(!modch) return message.reply("Please contact the server owner with the following: No log channel found.").then(message => {
        message.delete(10000)
      })
      let role = message.guild.roles.find("name", "Member")
      if(!role) return message.reply("Please contact the server owner with the following: No log channel found.").then(message => {
        message.delete(10000)
      })
      message.member.addRole(role)
      message.author.send("Hey, you just agreed to the guidelines/rules and got the Member role. You may now talk in every channel.")
      const embed = new Discord.RichEmbed()
      .setTitle("Guidelines")
      .setColor("#00ff43")
      .setDescription(`**${message.author.tag}** just agreed to the guidelines and gained the Member role.`)
      bot.channels.get(modch.id).send({embed: embed})
    }
})

bot.login(config.token)
