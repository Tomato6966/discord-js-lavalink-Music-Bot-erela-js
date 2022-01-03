const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `bassboost`,
  category: `👀 Filter`,
  aliases: [`bb`],
  description: `Changes the Bass gain`,
  usage: `bassboost <none/low/medium/high>`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    let level = `none`;
    if (!args.length || (!client.bassboost[args[0].toLowerCase()] && args[0].toLowerCase() != `none`))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["filter"]["bassboost"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["filter"]["bassboost"]["variable2"]))
        ]
      });
    level = args[0].toLowerCase();
    switch (level) {
      case `none`:
        player.setEQ(client.bassboost.none);
        player.set("eq", "🎚 No Bass");
        player.set("filter", "🎚 No Bass");
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
            "rate": 1.0
          },
        });
        break;
      case `low`:
        player.set("filter", "🎚 Low Bass");
        player.setEQ(client.bassboost.low);
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
            "rate": 1.0
          },
        });
        break;
      case `medium`:
        player.set("filter", "🎚 Medium Bass");
        player.setEQ(client.bassboost.medium);
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
            "rate": 1.0
          },
        });
        break;
      case `high`:
        player.set("filter", "🎚 High Bass");
        player.setEQ(client.bassboost.high);
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
            "rate": 1.0
          },
        });
      case `earrape`:
        player.set("filter", "🎚 Earrape Bass");
        player.setEQ(client.bassboost.high);
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
            "rate": 1.0
          },
        });
        break;
    }
    if (!message.channel) return;
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
        .setTitle(eval(client.la[ls]["cmds"]["filter"]["bassboost"]["variable3"]))
        .setDescription(eval(client.la[ls]["cmds"]["filter"]["bassboost"]["variable4"]))
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
