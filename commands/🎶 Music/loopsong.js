const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `loopsong`,
  category: `🎶 Music`,
  aliases: [`repeatsong`, `ls`, `rs`, `repeattrack`, `looptrack`, `lt`, `rt`],
  description: `Repeats the current song`,
  usage: `loopsong`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "check_dj": true,
    "previoussong": false
  },
  type: "song",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //define the Embed
    const embed = new MessageEmbed()
      .setTitle(player.trackRepeat ? client.la[ls].cmds.music.loop.track.disabled : client.la[ls].cmds.music.loop.track.enabled)
      .setColor(es.color)

    //if there is active queue loop, disable it + add embed information
    if (player.queueRepeat) {
      embed.setDescription(client.la[ls].cmds.music.loop.andqueue);
      player.setQueueRepeat(false);
    }
    //set track repeat to revers of old track repeat
    player.setTrackRepeat(!player.trackRepeat);
    //send informational message
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
