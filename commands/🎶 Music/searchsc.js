const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const playermanager = require(`${process.cwd()}/handlers/playermanager`);
module.exports = {
  name: `searchsc`,
  category: `🎶 Music`,
  aliases: [`searchsoundcloud`, `scsearch`, `soundcloudsearch`],
  description: `Searches a song from soundcloud`,
  usage: `search <Song / URL>`,
  cooldown: 5,
  parameters: {
    "type": "music",
    "activeplayer": false,
    "previoussong": false
  },
  type: "queue",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //if no args return error
    if (!args[0])
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)

          .setTitle(eval(client.la[ls]["cmds"]["music"]["searchsc"]["variable1"]))
        ]
      });
    //search a song for soundcloud
    playermanager(client, message, args, `search:soundcloud`);
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
