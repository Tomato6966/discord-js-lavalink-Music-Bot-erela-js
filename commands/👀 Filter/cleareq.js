const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `cleareq`,
  category: `👀 Filter`,
  aliases: [`ceq`, `reseteq`, `clearequalizer`, `resetequalizer`, `restoreequalizer`, `req`],
  description: `Clears the Equalizer`,
  usage: `clearEQ`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    player.clearEQ();
    player.set("eq", "💣 None");
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
        .setTitle(eval(client.la[ls]["cmds"]["filter"]["cleareq"]["variable1"]))
        .addField(eval(client.la[ls]["cmds"]["filter"]["cleareq"]["variablex_2"]), eval(client.la[ls]["cmds"]["filter"]["cleareq"]["variable2"]))
        .addField(eval(client.la[ls]["cmds"]["filter"]["cleareq"]["variablex_3"]), eval(client.la[ls]["cmds"]["filter"]["cleareq"]["variable2"]))
        .setDescription(eval(client.la[ls]["cmds"]["filter"]["cleareq"]["variable4"]))
      ]
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
