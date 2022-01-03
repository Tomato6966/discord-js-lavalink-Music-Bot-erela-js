const {
  MessageEmbed
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  duration,
  nFormatter,
  handlemsg
} = require(`${process.cwd()}/handlers/functions`)
const moment = require("moment")
const fs = require('fs')
module.exports = {
  name: "commandcount",
  category: "🔰 Info",
  aliases: ["cmdcount"],
  usage: "commandcount",
  description: "Shows the Amount of Commands",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    let tempmsg = await message.reply({
      embeds: [new MessageEmbed()
        .setColor(es.color)
        .setAuthor(handlemsg(client.la[ls].cmds.info.commandcount.tempmsg), "https://cdn.discordapp.com/emojis/756773010123522058.gif", "https://discord.gg/milrato")
      ]
    })
    let lines = 0
    let letters = 0
    var walk = function(dir) {
      var results = [];
      var list = fs.readdirSync(dir);
      list.forEach(function(file) {
        file = dir + '/' + file;
        if (!file.includes("node_modules")) {
          var stat = fs.statSync(file);
          if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
          } else {
            results.push(file);
          }
        }
      });
      return results;
    }
    for (const source of walk(process.cwd())) {
      try {
        let data = await fs.readFileSync(source, 'utf8')
        letters += await data.length;
        lines += await data.split('\n').length;
      } catch {}
    }

    await tempmsg.edit({
      embeds: [new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
        .setFooter(client.getFooter(es))
        .setTitle(handlemsg(client.la[ls].cmds.info.commandcount.title, {
          cmdcount: client.commands.size
        }) + ` | **[\`${client.slashCommands.size}\`] Slashcommands**`)
        .setDescription(handlemsg(client.la[ls].cmds.info.commandcount.description, {
          catcount: client.categories.length,
          lines: lines,
          letters: nFormatter(letters, 4)
        }))
      ]
    });

  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
