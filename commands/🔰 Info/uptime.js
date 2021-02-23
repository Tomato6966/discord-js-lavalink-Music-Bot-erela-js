const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { Duration } = require("../../handlers/functions")
module.exports = {
    name: "uptime",
    category: "🔰 Info",
    aliases: [""],
    cooldown: 10,
    usage: "uptime",
    description: "Returns the duration on how long the Bot is online",
    run: async (client, message, args, user, text, prefix) => {
    try{
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`:white_check_mark: **${client.user.username}** is since ${duration(client.uptime)} online`)
      );
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
