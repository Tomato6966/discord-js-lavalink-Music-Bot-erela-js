const {
  MessageEmbed
} = require(`discord.js`)
const config = require(`../../botconfig/config.json`)
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `forward`,
  category: `🎶 Music`,
  aliases: [`seekforwards`, `fwd`],
  description: `Seeks a specific amount of Seconds forwards`,
  usage: `forward <Duration in Seconds>`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      //if no args available, return error
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | You may forward for \`1\` - \`${player.queue.current.duration}\``)
        );
      //get the seektime variable of the user input
      let seektime = Number(player.position) + Number(args[0]) * 1000;
      //if the userinput is smaller then 0, then set the seektime to just the player.position
      if (Number(args[0]) <= 0) seektime = Number(player.position);
      //if the seektime is too big, then set it 1 sec earlier
      if (Number(seektime) >= player.queue.current.duration) seektime = player.queue.current.duration - 1000;
      //seek to the new Seek position
      player.seek(Number(seektime));
      //Send Success Message
      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.forward} Forwarded the Song `)
        .setDescription(`Forwarded for \`${args[0]} Seconds\` to: ${format(Number(player.position))}`)
        .addField(`${emoji.msg.time} Progress: `, createBar(player))
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
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
