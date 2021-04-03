const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);

module.exports = {
  name: "avatar",
  aliases: ["av"],
  category: "🔰 Info",
  description: "Get the Avatar of an user",
  usage: "avatar [@USER]",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      
      const user = message.mentions.users.first() || message.author;
      if (!user)
        return message.channel.send(new MessageEmbed()          
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
          .setTitle(":x: Error | Please Mention the User you wanna get Information about")
        );
      message.channel.send(new Discord.MessageEmbed()
        .setTitle(`Avatar from \`${user.tag}\``)
        .setURL(user.displayAvatarURL({
          dynamic: true,
          size: 1024
        }))          .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setImage(user.displayAvatarURL({
          dynamic: true,
          size: 1024
        }))
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()          
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
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
