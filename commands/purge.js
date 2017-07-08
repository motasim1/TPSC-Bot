exports.run = async function (bot, message, args) {
  if(!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.reply("I do not have the correct permissionsions").catch(console.error);
const user = message.mentions.users.first();
const amount = !!parseInt(message.content.split(" ")[1]) ? parseInt(message.content.split(" ")[1]) : parseInt(message.content.split(" ")[2])
if(amount <= 1) return message.reply('The minimum is 2.')
if (!amount) return message.reply("Please specify an amount to delete!");
if (!amount && !user) return message.reply("Please specify an user and amount, or just an amount, of messages to purge!");
message.channel.fetchMessages({
  limit: amount,
}).then((messages) => {
  if (user) {
    const filterBy = user ? user.id : Client.user.id;
    messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
    message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    message.reply(`I have deleted ${amount} messages of ${user}`).then(message => {
      message.delete(10000)
    })
  } else {
  message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
  message.reply(`I have deleted ${amount} messages`).then(message => {
    message.delete(10000)
  })
}
});
}

exports.config = {
  enabled: true,
  guildOnly: false,
  permlevel: 2,
  aliases: []
}

exports.help = {
  name: "purge",
  description: "Delete an amount of messages.",
  usage: "purge [user] <amount of messages>"
}
