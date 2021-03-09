const { MessageEmbed, splitMessage } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { inspect } = require(`util`);
module.exports = {
    name: `eval`,
    category: `👑 Owner`,
    aliases: [`evaluate`],
    description: `eval Command`,
    usage: `eval <CODE>`,
    run: async (client, message, args, cmduser, text, prefix) => {
      if (!config.ownerIDS.includes(message.author.id))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username, ee.footericon)
          .setTitle(`${emoji.msg.ERROR}  Error | You are not allowed to run this command! Only the Owner is allowed to run this Cmd`)
        );
      if(!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username, ee.footericon)
          .setTitle(`${emoji.msg.ERROR}  Error | You have to at least include one evaluation arguments`)
        );
      let evaled;
      try {
        if (args.join(` `).includes(`token`)) return console.log(`ERROR NO TOKEN GRABBING ;)`.red);

        evaled = await eval(args.join(` `));
        //make string out of the evaluation
        let string = inspect(evaled);
        //if the token is included return error
        if (string.includes(client.token)) return console.log(`ERROR NO TOKEN GRABBING ;)`.red);
        //define queueembed
        let evalEmbed = new MessageEmbed()
          .setTitle(`Lava Music | Evaluation`)
          .setColor(ee.color);
        //split the description
        const splitDescription = splitMessage(string, {
          maxLength: 2040,
          char: `\n`,
          prepend: ``,
          append: ``
        });
        //For every description send a new embed
        splitDescription.forEach(async (m) => {
          //(over)write embed description
          evalEmbed.setDescription(````` + m + `````);
          //send embed
          message.channel.send(evalEmbed);
        });
      } catch (e) {
          console.log(String(e.stack).bgRed)
          return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
  						.setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR}  ERROR | An error occurred`)
              .setDescription(`\`\`\`${e.message}\`\`\``)
          );
      }
    },
};
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
