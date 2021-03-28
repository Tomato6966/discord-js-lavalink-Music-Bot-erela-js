const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  format,
  arrayMove
} = require(`../../handlers/functions`);
module.exports = {
  name: `move`,
  category: `🎶 Music`,
  aliases: [`mv`],
  description: `Shows the Queue`,
  usage: `move <from> <to>`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //if no FROM args return error
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} | Wrong Command Usage!`)
          .setDescription(`Usage: \`${prefix}move <from> <to>\`\nExample: \`${prefix}move ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 } 1\``)
        );
      //If no TO args return error
      if (!args[1])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} | Wrong Command Usage!`)
          .setDescription(`Usage: \`${prefix}move <from> <to>\`\nExample: \`${prefix}move ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 } 1\``));
      //if its not a number or too big / too small return error
      if (isNaN(args[0]) || args[0] <= 1 || args[0] > player.queue.length)
        return message.channel.send(
          new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} | Error Your Input must be a Number greater then \`1\` and smaller then \`${player.queue.length}\``)
        );
      //get the new Song
      let song = player.queue[player.queue.length - 1];
      //move the Song to the first position using my selfmade Function and save it on an array
      let QueueArray = arrayMove(player.queue, player.queue.length - 1, 0);
      //clear teh Queue
      player.queue.clear();
      //now add every old song again
      for (const track of QueueArray)
        player.queue.add(track);
      //send informational message
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Success | Mmoved the Song in the Queue from Position \`${args[0]}\` to Position: \`${args[1]}\``)
        .setThumbnail(song.displayThumbnail())
        .setDescription(`[${song.title}](${song.uri}) - \`${format(song.duration)}\` - requested by **${song.requester.tag}**`)
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
