const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const songoftheday = require("../../botconfig/songoftheday.json");
module.exports = {
    name: "songoftheday",
    category: "🔰 Info",
    aliases: ["songoftheday"],
    description: "Shows you the Current Song of the Day!",
    usage: "songoftheday",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext,ee.footericon)
        .setThumbnail(songoftheday.track.thumbnail)
        .setAuthor("Today's Song of the Day", message.author.displayAvatarURL({dynamic: true}))
        .setTitle(songoftheday.track.title)
        .setURL(songoftheday.track.url)
        .setDescription(`**Duration:**\n\`${songoftheday.track.duration}\`\n\n${songoftheday.message}\n\nCheck out Today's Song of the Day by typing \`${prefix}playsongoftheday\``)
      )
      //play the SONG from YOUTUBE
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
};
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
