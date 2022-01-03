const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  createBar,
  format
} = require(`${process.cwd()}/handlers/functions`);
module.exports = {
  name: `nowplaying`,
  category: `🎶 Music`,
  aliases: [`np`, "trackinfo"],
  description: `Shows detailled information about the current Song`,
  usage: `nowplaying`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  type: "song",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //if no current song return error
    if (!player.queue.current)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["music"]["nowplaying"]["variable1"]))
        ]
      });
    const embed = new MessageEmbed()
      .setAuthor(client.getFooter(`Current song playing:`, message.guild.iconURL({
        dynamic: true
      })))
      .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
      .setURL(player.queue.current.uri)
      .setColor(es.color)
      .setTitle(eval(client.la[ls]["cmds"]["music"]["nowplaying"]["variable2"]))
      .addField(`${emoji.msg.time} Progress: `, createBar(player))
      .addField(`${emoji.msg.time} Duration: `, `\`${format(player.queue.current.duration).split(" | ")[0]}\` | \`${format(player.queue.current.duration).split(" | ")[1]}\``, true)
      .addField(`${emoji.msg.song_by} Song By: `, `\`${player.queue.current.author}\``, true)
      .addField(`${emoji.msg.repeat_mode} Queue length: `, `\`${player.queue.length} Songs\``, true)
      .setFooter(client.getFooter(`Requested by: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
        dynamic: true
      })))
    //Send Now playing Message
    return message.reply({
      embeds: [embed]
    });
  }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
