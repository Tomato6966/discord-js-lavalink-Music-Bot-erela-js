const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `removedupes`,
  category: `🎶 Music`,
  aliases: [`removedupe`, `removedupetrack`, `rdt`, `removeduplicated`, `removeduplicateds`],
  description: `Removes all duplicated tracks in the Queue`,
  usage: `removedupes`,
  cooldown: 10,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //make a new array of each single song which is not a dupe
      let tracks = player.queue;
      const newtracks = [];
      for (let i = 0; i < tracks.length; i++) {
        let exists = false;
        for (j = 0; j < newtracks.length; j++) {
          if (tracks[i].uri === newtracks[j].uri) {
            exists = true;
            break;
          }
        }
        if (!exists) {
          newtracks.push(tracks[i]);
        }
      }
      //clear the Queue
      player.queue.clear();
      //now add every not dupe song again
      for (const track of newtracks)
        player.queue.add(track);
      //Send Success Message
      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.cleared} I removed the track at position: \`${Number(args[0])}\``)
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
