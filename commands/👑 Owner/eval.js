const {
  MessageEmbed,
  Util: {
    splitMessage
  },
  MessageAttachment,
  MessageActionRow,
  MessageButton,
  Collection
} = require(`discord.js`);
const Discord = require(`discord.js`);
const moment = require("moment");
const ms = require("ms")
var config = require(`${process.cwd()}/botconfig/config.json`);
var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  inspect
} = require(`util`);
module.exports = {
  name: `eval`,
  category: `👑 Owner`,
  aliases: [`evaluate`],
  description: `eval Command`,
  usage: `eval <CODE>`,
  type: "bot",
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
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["eval"]["variable2"]))
        ]
      });
    const token = client.token.split("").join("[^]{0,2}");
    const rev = client.token.split("").reverse().join("[^]{0,2}");
    const filter = new RegExp(`${token}|${rev}`, "g");
    let output = await eval(args.join(` `));
    if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
    //make string out of the evaluation
    output = inspect(output, { depth: 0, maxArrayLength: null });
    //replace with the token
    output = output.replace(filter, "**\\*\\*\\*\\*\\*\\*\\*\\*T\\*O\\*K\\*E\\*N\\*\\*\\*\\*\\*\\*\\*\\***");
    let string = output;
    //if the token is included return error
    //if (string.includes(client.token)) return console.log(`ERROR NO TOKEN GRABBING ;)`.dim);
    //define queueembed
    let evalEmbed = new MessageEmbed()
      .setTitle(eval(client.la[ls]["cmds"]["owner"]["eval"]["variable3"]))
      .setColor(es.color);
    //split the description
    const splitDescription = splitMessage(string, {
      maxLength: 2040,
      char: `\n`,
      prepend: ``,
      append: ``
    });
    //(over)write embed description
    evalEmbed.setDescription(eval(client.la[ls]["cmds"]["owner"]["eval"]["variable4"]));
    //send embed
    message.channel.send({
      embeds: [evalEmbed]
    });
  },
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
