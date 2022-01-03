const {
  MessageEmbed
} = require(`discord.js`);
var config = require(`${process.cwd()}/botconfig/config.json`);
var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `leaveserver`,
  type: "info",
  category: `👑 Owner`,
  aliases: [`serverleave`, "kickbot"],
  description: `Make the Bot Leave a specific Server`,
  usage: `leaveserver <GUILDID>`,
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    if (!config.ownerIDS.includes(message.author.id))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.user.username, es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL())
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["leaveserver"]["variable1"]))
        ]
      });
    if (!args[0])
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.user.username, es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL())
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["leaveserver"]["variable2"]))
          .setDescription(eval(client.la[ls]["cmds"]["owner"]["leaveserver"]["variable3"]))
        ]
      });
    let guild = client.guilds.cache.get(args[0]);
    if (!guild) return message.reply({
      content: eval(client.la[ls]["cmds"]["owner"]["leaveserver"]["variable4"])
    })
    guild.leave().then(g => {
      message.channel.send({
        content: eval(client.la[ls]["cmds"]["owner"]["leaveserver"]["variable5"])
      })
    }).catch(e => {
      message.reply(`${e.message ? e.message : e}`, {
        code: "js"
      })
    })
  },
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
