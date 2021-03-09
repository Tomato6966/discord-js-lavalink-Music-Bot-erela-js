const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const got = require("got");
const path = require("path");
module.exports = {
    name: path.parse(__filename).name,
    category: "🕹 Fun",
    useage: `${path.parse(__filename).name}[@User]`,
    description: "*Image cmd in the style:* " + path.parse(__filename).name,
    run: async (client, message, args, cmduser, text, prefix) => {
      try{
        got("https://www.reddit.com/r/jokes/random/.json")
        .then((response) => {
            let content = JSON.parse(response.body);
            var title = content[0].data.children[0].data.title;
            var joke = content[0].data.children[0].data.selftext;
            let jokeembed = new MessageEmbed().setDescription(joke).setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle(title).setAuthor(`${client.user.username}|Joke`).setTimestamp();
            return message.channel.send(jokeembed);
        })
        .catch((e) => console.log(String(e.stack).red));
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
