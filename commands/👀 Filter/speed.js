const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `rate`,
  category: `👀 Filter`,
  aliases: [``],
  description: `Allows you to change the RATE of the TRACK`,
  usage: `rate <Multiplicator>   |   Multiplicator could be: 0  -  3`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    if (!args.length)
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["filter"]["speed"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["filter"]["speed"]["variable2"]))
        ]
      });
    if (isNaN(args[0]))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["filter"]["speed"]["variable3"]))
          .setDescription(eval(client.la[ls]["cmds"]["filter"]["speed"]["variable4"]))
        ]
      });
    if (Number(args[0]) >= 3 || Number(args[0]) <= 0)
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["filter"]["speed"]["variable5"]))
          .setDescription(eval(client.la[ls]["cmds"]["filter"]["speed"]["variable6"]))
        ]
      });
    player.node.send({
      op: "filters",
      guildId: message.guild.id,
      equalizer: player.bands.map((gain, index) => {
        var Obj = {
          "band": 0,
          "gain": 0,
        };
        Obj.band = Number(index);
        Obj.gain = Number(gain)
        return Obj;
      }),
      timescale: {
        "speed": 1.0,
        "pitch": 1.0,
        "rate": Number(args[0])
      },
    });
    player.set("filter", "⏱ Speed");
    player.set("filtervalue", Number(args[0]));
    if (!message.channel) return;
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
        .setTitle(eval(client.la[ls]["cmds"]["filter"]["speed"]["variable7"]))
        .setDescription(eval(client.la[ls]["cmds"]["filter"]["speed"]["variable8"]))
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
