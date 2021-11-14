const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `stop`,
  category: `🎶 Music`,
  aliases: [`leave`, "dis", "disconnect", "votestop", "voteleave", "votedis", "votedisconnect", "vstop", "vleave", "vdis", "vdisconnect"],
  description: `Stops current track and leaves the channel`,
  usage: `stop`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "check_dj": true,
    "previoussong": false
  },
  type: "song",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //stop playing
    player.destroy();
    //React with the emoji
    return message.react(emoji.react.stop).catch((e) => {})
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
