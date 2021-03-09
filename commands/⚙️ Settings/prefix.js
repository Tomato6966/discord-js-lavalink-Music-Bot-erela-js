const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `prefix`,
    aliases: [`prefix`],
    category: `⚙️ Settings`,
    description: `Let's you change the Prefix of the BOT`,
    usage: `prefix <NEW PREFIX>`,
    memberpermissions: [`ADMINISTRATOR`],
    run: async (client, message, args) => {
    try{
    //get the current prefix from the database
    let prefix = client.settings.get(message.guild.id, `prefix`);
    //if not in the database for some reason use the default prefix
    if (prefix === null) prefix = config.prefix;
    //if no args return error
    if (!args[0])
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} Error | Please provide a new prefix!`)
        .setDescription(`Current prefix: \`${prefix}\``)
      );
    //if there are multiple arguments
    if (args[1])
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} Error | The prefix can\'t have two spaces`)
      );
    //if the prefix is too long
    if (args[0].length > 5)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} Error | The prefix can\'t be Longer then \`5\``)
      );
    //set the new prefix
    client.settings.set(message.guild.id, args[0], `prefix`);
    //return success embed
    return message.channel.send(new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`${emoji.msg.SUCCESS} Success | Set new prefix to **\`${args[0]}\`**`)
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
