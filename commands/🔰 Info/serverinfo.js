const Discord = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
    name: "serverinfo",
    aliases: ["sinfo"],
    category: "🔰 Info",
    description: "Shows info about a server",
    usage: "serverinfo",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      message.channel.send(new Discord.MessageEmbed()
        .setTitle("Server Information")
        .setColor(ee.color)
        .addField("Server Name", "\`" + message.guild.name + "\`")
        .addField("Owner", "\`" + `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}\`"`, true)
        .addField("Channels", "\`" + message.guild.channels.cache.size + "\`", true)
        .addField("Roles", "\`" + message.guild.roles.cache.size + "\`", true)
        .addField("Created On", "\`" + message.guild.createdAt + "\`")
        .addField("You Joined", "\`" + message.member.joinedAt + "\`")
        .addField("Total Members", "\`" + message.guild.memberCount + "\`")
        .setThumbnail(message.guild.iconURL({dynamic: true }))
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL({dynamic: true})));
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
