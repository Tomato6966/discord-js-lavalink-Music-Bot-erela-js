const Discord = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: "userinfo",
    aliases: ["uinfo"],
    category: "🔰 Info",
    description: "Get information about a user",
    usage: "userinfo [@USER]",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const user = message.mentions.users.first() || message.author;
      if (!user)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("${emoji.msg.ERROR} Error | Please Mention the User you wanna get Information about")
        );
      message.channel.send(new Discord.MessageEmbed()
        .setTitle("User Info:")
        .addField("Full Username", `\`${user.tag}\``)
        .addField("ID", `\`${user.id}\``)
        .addField("Playing", `\`[ ${user.presence.activities} ]\``, true)
        .addField("Status", `\`${user.presence.status}\``, true)
        .addField("Joined Discord At",`\`${user.createdAt}\``)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setThumbnail(user.displayAvatarURL({dynamic: true, size: 1024}))
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
