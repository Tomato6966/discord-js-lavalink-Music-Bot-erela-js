const config = require(`../../botconfig/config.json`);
const emoji = require(`../../botconfig/emojis.json`);
const ee = require(`../../botconfig/embed.json`)
const {MessageEmbed} =require(`discord.js`)
module.exports = {
    name: `react`,
    category: `⛔️ Administration`,
    aliases: [`delete`],
    description: `Closes the ticket`,
    useage: `react <msgid> <Emoji>`,
    memberpermissions: [`MANAGE_GUILD`],
    run: async (client, message, args, cmduser, text, prefix) => {
    try {
      if(!args[0])
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | Please Include a MessageID`)
            .setDescription(`Usage: \`${prefix}react <msgid> <Emoji>\`\nExample: \`${prefix}react 442355791412854784 ${emoji.msg.SUCCESS}\``)
        );
      if(args[0].length != 18)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | Please Include a Valid MessageID`)
        );

      if(!args[1])
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | Please Include a Emoji`)
            .setDescription(`Usage: \`${prefix}react <msgid> <Emoji>\`\nExample: \`${prefix}react 442355791412854784 ${emoji.msg.SUCCESS}\``)
        );

      let emoji = args[1];
      if(emoji.length == 18) emoji = message.guild.emojis.cache.get(args[0]);
      if(!emoji)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | Please Include a valid Emoji`)
            .setDescription(`Usage: \`${prefix}react <msgid> <Emoji>\`\nExample: \`${prefix}react 442355791412854784 ${emoji.msg.SUCCESS}\``)
        );

      message.channel.messages.fetch(args[0])
          .then((msg) => msg.react(args[1]).catch((e) => console.log(String(e.stack).red)))
          .catch((e) => console.log(String(e.stack).red));
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
