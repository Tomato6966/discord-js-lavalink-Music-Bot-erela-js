const { MessageEmbed } = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: "docs",
    category: "💪 Source-Help",
    aliases: ["docs"],
    cooldown: 5,
    usage: "docs",
    description: "Shows information about docs",
    run: async (client, message, args, user, text, prefix) => {
    try{
      message.channel.send(new MessageEmbed()
        .setTitle(`This Bot is made by \`Tomato#6966\` and **this** is the Source Code link to this Bot`)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`WOAH THERE ARE DOCS!?!!?\n[\`CLICK HERE\`](https://discord.js.org/#/docs/main/stable/general/welcome)\nYes, discord.js has docs that can be used when creating a bot with it.\nIf you need some pointers for using the docs watch a video by one of our Lower Management Members\n\nhttps://www.youtube.com/watch?v=CvcDpm4PsnI`)
      );
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
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
