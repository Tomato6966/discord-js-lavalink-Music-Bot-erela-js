const {
  MessageEmbed
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: "defaultvolume",
  category: "💰 Premium",
  aliases: ["default-volume", "defaultvol", "default-vol"],
  cooldown: 10,
  usage: "defaultvolume <Volume>",
  description: "Defines the Default Volume on 1. Track start [Default: 15]",
  memberpermissions: ["ADMINISTRATOR"],
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    if (!args[0]) {
      return message.reply({
        embeds: [new MessageEmbed()
          .setFooter(client.getFooter(es)).setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["settings"]["defaultvolume"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["settings"]["defaultvolume"]["variable2"]))
        ]
      });
    }
    let volume = args[0];
    if (isNaN(volume)) {
      return message.reply({
        embeds: [new MessageEmbed()
          .setFooter(client.getFooter(es)).setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["settings"]["defaultvolume"]["variable3"]))
          .setDescription(eval(client.la[ls]["cmds"]["settings"]["defaultvolume"]["variable4"]))
        ]
      });
    }
    if (Number(volume) > 150 || Number(volume) < 1) {
      return message.reply({
        embeds: [new MessageEmbed()
          .setFooter(client.getFooter(es)).setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["settings"]["defaultvolume"]["variable5"]))
          .setDescription(eval(client.la[ls]["cmds"]["settings"]["defaultvolume"]["variable6"]))
        ]
      });
    }
    //set the new volume
    client.settings.set(message.guild.id, Number(volume), "defaultvolume");
    //send an information message
    return message.reply({
      embeds: [new MessageEmbed()
        .setFooter(client.getFooter(es))
        .setColor(es.color)
        .setTitle(eval(client.la[ls]["cmds"]["settings"]["defaultvolume"]["variable7"]))
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
