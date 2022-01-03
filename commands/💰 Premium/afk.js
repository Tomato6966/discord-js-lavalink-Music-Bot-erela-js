const {
  MessageEmbed
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: "afk",
  category: "💰 Premium",
  cooldown: 10,
  aliases: ["24/7", "afkmusic"],
  usage: "afk",
  description: "Toggles if the Current Queue should be stated on 'afk' or not [DEFAULT: false]",
  parameters: {
    "type": "music",
    "activeplayer": true,
  },
  type: "music",
  run: async (client, message, args, user, text, prefix, player, es, ls) => {
    //set the player afk
    player.set(`afk`, !player.get(`afk`))
    //return an information message
    return message.reply({
      embeds: [new MessageEmbed()
        .setFooter(client.getFooter(es))
        .setColor(es.color)
        .setTitle(eval(client.la[ls]["cmds"]["settings"]["afk"]["variable1"]))
        .setDescription(eval(client.la[ls]["cmds"]["settings"]["afk"]["variable2"]))
      ]
    });
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
