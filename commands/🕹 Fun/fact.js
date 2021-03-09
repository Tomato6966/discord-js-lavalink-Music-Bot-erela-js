const client = require("nekos.life");
const Discord = require("discord.js");
const neko = new client();
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const path = require("path");
module.exports = {
    name: path.parse(__filename).name,
    category: "🕹 Fun",
    useage: `${path.parse(__filename).name}[@User]`,
    description: "*Image cmd in the style:* " + path.parse(__filename).name,
    run: async (client, message, args, cmduser, text, prefix) => {
      try{
        let owo;
        owo = await neko.sfw.fact();
        console.log(owo);
        const fact = new Discord.MessageEmbed().setTitle("Fact").setDescription(owo.fact).setColor(ee.color).setFooter(ee.footertext, ee.footericon);
        message.channel.send(fact).catch((e) => console.log(String(e.stack).red));
      } catch (e) {
          console.log(String(e.stack).bgRed)
          return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
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
