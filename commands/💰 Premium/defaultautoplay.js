const {
  MessageEmbed
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: "defaultautoplay",
  category: "💰 Premium",
  aliases: ["default-autoplay", "defaultap", "default-ap"],
  cooldown: 10,
  usage: "defaultautoplay",
  description: "Toggles if it Autoplay should be enabled on default or not! [Default: true]",
  memberpermissions: ["ADMINISTRATOR"],
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //change the default autoplay to "true"
    client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "defaultap"), "defaultap");

    return message.reply({
      embeds: [new MessageEmbed()
        .setFooter(client.getFooter(es))
        .setColor(es.color)
        .setTitle(eval(client.la[ls]["cmds"]["settings"]["defaultautoplay"]["variable1"]))
        .setDescription(eval(client.la[ls]["cmds"]["settings"]["defaultautoplay"]["variable2"]))
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
