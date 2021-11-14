const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `volume`,
  category: `🎶 Music`,
  aliases: [`vol`],
  description: `Changes the Volume`,
  usage: `volume <0-150>`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "check_dj": true,
    "previoussong": false
  },
  type: "queuesong",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //if the Volume Number is out of Range return error msg
    if (Number(args[0]) <= 0 || Number(args[0]) > 150)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["music"]["volume"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["music"]["volume"]["variable2"]))
        ]
      });
    //if its not a Number return error msg
    if (isNaN(args[0]))
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["music"]["volume"]["variable3"]))
          .setDescription(eval(client.la[ls]["cmds"]["music"]["volume"]["variable4"]))
        ]
      });
    //change the volume
    player.setVolume(Number(args[0]));
    //send success message
    return message.reply({
      embeds: [new MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["music"]["volume"]["variable5"]))
        .setDescription(eval(client.la[ls]["cmds"]["music"]["volume"]["variable6"]))
        .setColor(es.color)
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
