const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const playermanager = require(`${process.cwd()}/handlers/playermanager`);
module.exports = {
  name: `playprevious`,
  category: `🎶 Music`,
  aliases: [`pp`, `ppre`, `playprevius`, `playprevios`],
  description: `Plays the Previous played Song and skips the current Song`,
  usage: `playprevious`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "check_dj": true,
    "previoussong": true
  },
  type: "song",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {




    //plays it
    if (player.queue.previous.uri.includes("soundcloud")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Playing the Previous Track on ${emoji.msg.soundcloud} Soundcloud`)
          .setDescription(`[${layer.queue.previous.title}](${layer.queue.previous.uri})`)
        ]
      })
      playermanager(client, message, Array(player.queue.previous.uri), `song:soundcloud`);
    } else if (player.queue.previous.uri.includes("spotify")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Playing the Previous Track on ${emoji.msg.spotify} Spotify`)
          .setDescription(`[${layer.queue.previous.title}](${layer.queue.previous.uri})`)
        ]
      })
      playermanager(client, message, Array(player.queue.previous.uri), `song:raw`);
    } else if (player.queue.previous.uri.includes("apple")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Playing the Previous Track on ${emoji.msg.apple} Apple-Music`)
          .setDescription(`[${layer.queue.previous.title}](${layer.queue.previous.uri})`)
        ]
      })
      playermanager(client, message, Array(player.queue.previous.uri), `song:raw`);
    } else {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Playing the Previous Track on ${emoji.msg.youtube} Youtube`)
          .setDescription(`[${layer.queue.previous.title}](${layer.queue.previous.uri})`)
        ]
      })
      //play from YOUTUBE
      playermanager(client, message, Array(player.queue.previous.uri), `song:youtube`);
    }
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
