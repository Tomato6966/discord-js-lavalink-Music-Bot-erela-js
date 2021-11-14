const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`${process.cwd()}/botconfig/config.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const radios = require(`${process.cwd()}/botconfig/radiostations.json`);
const playermanager = require(`${process.cwd()}/handlers/playermanager`);
const {
  stations
} = require(`${process.cwd()}/handlers/functions`);
module.exports = {
  name: `radio`,
  category: `🎶 Music`,
  aliases: [`stream`],
  description: `Plays a defined radiostream`,
  usage: `radio <1-183>`,
  parameters: {
    "type": "music",
    "activeplayer": false,
    "previoussong": false
  },
  type: "song",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //if no args send all stations
    if (!args[0]) return stations(client, config.prefix, message);
    //if not a number error
    if (isNaN(args[0])) {
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["music"]["radio"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["music"]["radio"]["variable2"]))
        ]
      });
    }
    //if the volume number is not valid
    if (Number(args[1]) > 150 || Number(args[1]) < 1)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)

          .setTitle(eval(client.la[ls]["cmds"]["music"]["radio"]["variable3"]))
          .setDescription(eval(client.la[ls]["cmds"]["music"]["radio"]["variable4"]))
        ]
      });
    //define the volume
    let volume;
    //if its not a number for volume, set it to 50
    if (isNaN(args[1])) {
      volume = 50;
    }
    //otherwise set it to the args
    else {
      volume = args[1];
    }
    //define args 2 of each single input
    let args2;
    if (Number([args[0]]) > 0 && Number(args[0]) <= 10) args2 = radios.EU.United_Kingdom[Number(args[0]) - 1].split(` `);
    else if (Number([args[0]]) > 10 && Number(args[0]) <= 20) args2 = radios.EU.Austria[Number(args[0]) - 10 - 1].split(` `);
    else if (Number([args[0]]) > 20 && Number(args[0]) <= 30) args2 = radios.EU.Belgium[Number(args[0]) - 20 - 1].split(` `);
    else if (Number([args[0]]) > 30 && Number(args[0]) <= 40) args2 = radios.EU.Bosnia[Number(args[0]) - 30 - 1].split(` `);
    else if (Number([args[0]]) > 40 && Number(args[0]) <= 50) args2 = radios.EU.Czech[Number(args[0]) - 40 - 1].split(` `);
    else if (Number([args[0]]) > 50 && Number(args[0]) <= 60) args2 = radios.EU.Denmark[Number(args[0]) - 50 - 1].split(` `);
    else if (Number([args[0]]) > 60 && Number(args[0]) <= 70) args2 = radios.EU.Germany[Number(args[0]) - 60 - 1].split(` `);
    else if (Number([args[0]]) > 70 && Number(args[0]) <= 80) args2 = radios.EU.Hungary[Number(args[0]) - 70 - 1].split(` `);
    else if (Number([args[0]]) > 80 && Number(args[0]) <= 90) args2 = radios.EU.Ireland[Number(args[0]) - 80 - 1].split(` `);
    else if (Number([args[0]]) > 90 && Number(args[0]) <= 100) args2 = radios.EU.Italy[Number(args[0]) - 90 - 1].split(` `);
    else if (Number([args[0]]) > 100 && Number(args[0]) <= 110) args2 = radios.EU.Luxembourg[Number(args[0]) - 100 - 1].split(` `);
    else if (Number([args[0]]) > 110 && Number(args[0]) <= 120) args2 = radios.EU.Romania[Number(args[0]) - 110 - 1].split(` `);
    else if (Number([args[0]]) > 120 && Number(args[0]) <= 130) args2 = radios.EU.Serbia[Number(args[0]) - 120 - 1].split(` `);
    else if (Number([args[0]]) > 130 && Number(args[0]) <= 140) args2 = radios.EU.Spain[Number(args[0]) - 130 - 1].split(` `);
    else if (Number([args[0]]) > 140 && Number(args[0]) <= 150) args2 = radios.EU.Sweden[Number(args[0]) - 140 - 1].split(` `);
    else if (Number([args[0]]) > 150 && Number(args[0]) <= 160) args2 = radios.EU.Ukraine[Number(args[0]) - 150 - 1].split(` `);
    else if (Number([args[0]]) > 160 && Number(args[0]) <= 183) args2 = radios.OTHERS.request[Number(args[0]) - 160 - 1].split(` `);
    //if not found send an error
    else
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)

          .setTitle(eval(client.la[ls]["cmds"]["music"]["radio"]["variable5"]))
          .setDescription(eval(client.la[ls]["cmds"]["music"]["radio"]["variable6"]))
        ]
      });
    //get song information of it
    const song = {
      title: args2[0].replace(`-`, ` `),
      url: args2[1]
    };
    //define an embed
    let embed = new MessageEmbed()
      .setColor(es.color)

      .setTitle(`Searching: ${emoji.msg.search}` + song.title)
    try {
      embed.setURL(song.url)
    } catch {}
    //send the message of the searching
    message.reply({
      embeds: [embed]
    })
    //play the radio but make the URL to an array ;) like that: [ `urlhere` ]
    playermanager(client, message, Array(song.url), `song:radio`);
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
