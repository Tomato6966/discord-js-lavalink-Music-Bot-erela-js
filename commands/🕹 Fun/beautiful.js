const { MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: "beautiful",
    aliases: ["beautiful"],
    category: "🕹 Fun",
    description: "IMAGE CMD",
    usage: "beautiful",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      let tempmsg = await message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setAuthor("Loading...", "https://cdn.discordapp.com/emojis/769935094285860894.gif")
      );
      let user = message.mentions.users.first() || message.author;
      let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
      let image = await canvacord.Canvas.beautiful(avatar);
      let attachment = await new MessageAttachment(image, "beautiful.png");

      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setImage("attachment://beautiful.png")
        .attachFiles(attachment)
      ).catch((e) => console.log(String(e.stack).red))
      .then(msg=> tempmsg.delete())
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
