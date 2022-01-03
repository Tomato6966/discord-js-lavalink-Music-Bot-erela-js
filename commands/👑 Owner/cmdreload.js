var {
  MessageEmbed
} = require(`discord.js`);
var config = require(`${process.cwd()}/botconfig/config.json`);
var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `cmdreload`,
  category: `👑 Owner`,
  type: "info",
  aliases: [`commandreload`],
  description: `Reloads a command`,
  usage: `cmdreload <CMD>`,
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    if (!config.ownerIDS.includes(message.author.id))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.user.username, es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL())
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["cmdreload"]["variable1"]))
        ]
      });
    if (!args[0])
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.getFooter(es))
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["cmdreload"]["variable2"]))
        ]
      });
    let reload = false;
    let err = null;
    let thecmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
    if (thecmd) {
      for (let i = 0; i < client.categories.length; i += 1) {
        let dir = client.categories[i];
        try {
          delete require.cache[require.resolve(`${process.cwd()}/commands/${dir}/${thecmd.name}.js`)] // usage !reload <name>
          client.commands.delete(thecmd.name)
          const pull = require(`${process.cwd()}/commands/${dir}/${thecmd.name}.js`)
          client.commands.set(thecmd.name, pull)
          reload = true;
        } catch (e){
          err = e;
        }
      }
    } else {
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.getFooter(es))
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["cmdreload"]["variable3"]))
        ]
      });
    }
    if (reload)
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(es.color)
          .setFooter(client.getFooter(es))
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["cmdreload"]["variable4"]))
        ]
      });
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.getFooter(es))
        .setTitle(eval(client.la[ls]["cmds"]["owner"]["cmdreload"]["variable5"]))
        .setDescription(`Cmd is now removed from the BOT COMMANDS!\n\`\`\`${String(err.message ? err.message : e).substr(0, 1900)}\`\`\``)
      ]
    });
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
