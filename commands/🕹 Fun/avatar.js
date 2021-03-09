const Discord = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: "avatar",
    category: "🕹 Fun",
    description: "Gets the avatar of a user or yourself",
    usage: "avatar [@USER]",
    run: async(client, message, args, cmduser, text, prefix) => {
    try{
      const member = message.mentions.members.first() || message.member;
      if (!member.user.displayAvatarURL({dynamic: true}))
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | That user does not have an Avatar`)
            .setDescription(`\`\`\`${e.message}\`\`\``)
        );
      message.channel.send(new Discord.MessageEmbed()
          .setTitle(`${member.user.username}'s Avatar`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setImage(member.user.displayAvatarURL({dynamic: true, size: 1024}))
          .setURL(member.user.displayAvatarURL({dynamic: true, size: 1024})))
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
