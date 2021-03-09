const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
const axios = require("axios");
module.exports = {
  name: "djs",
  category: "💪 Source-Help",
  aliases: ["discordjs", "djscode", "djshelp"],
  cooldown: 5,
  usage: "djs [QUEURY]",
  description: "DOES SEARCH FOR THE DISCORD.JS DOCS and gives u help",
  run: async (client, message, args, user, text, prefix) => {
    try {
      const urltosearch = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${args.join(" ")}`;
      axios.get(urltosearch).then(embed => {
          const { data } = embed;
          data.color = ee.color
          message.channel.send({embed: data});
      });
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR}  ERROR | An error occurred`)
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
