const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `loopqueue`,
  category: `🎶 Music`,
  aliases: [`repeatqueue`, `lq`, `rq`, `loopqu`, `repeatqu`],
  description: `Repeats the Queue`,
  usage: `loopqueue`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "check_dj": true,
    "previoussong": false
  },
  type: "queue",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //define the Embed
    const embed = new MessageEmbed()
      .setTitle(player.queueRepeat ? client.la[ls].cmds.music.loop.queue.disabled : client.la[ls].cmds.music.loop.queue.enabled)
      .setColor(es.color)

    //If trackrepeat was active add informational message + disable it
    if (player.trackRepeat) {
      embed.setDescription(client.la[ls].cmds.music.loop.andsong);
      player.setTrackRepeat(false);
    }
    //change Queue Mode
    player.setQueueRepeat(!player.queueRepeat);
    //Send Success Message
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
