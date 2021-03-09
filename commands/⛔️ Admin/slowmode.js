const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `slowmode`,
    category: `⛔️ Admin`,
    aliases: [`slow`],
    description: `Changes the slowmode of the channel`,
    usage: `slowmode <AmountInSeconds>`,
    memberpermissions: [`ADMINISTRATOR`],
    run: async (client, message, args, cmduser, text, prefix) => {
    try {
      if (!isNaN(args[0]) || parseInt(args[0]) < 0) {
          message.channel.setRateLimitPerUser(args[0]);
          message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.SUCCESS} Success | Set Slowmode to: ${args[0]}!`)
          );
      } else {
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | Your Input is not a Number, please retry!`)
            .setDescription(`Usage: \`${prefix}slowmode <AmountInSeconds>\`\n\nExample: \`${prefix}slowmode 5\``)
        );
      }
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
