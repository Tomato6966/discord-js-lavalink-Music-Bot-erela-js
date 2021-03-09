const { MessageEmbed } = require("discord.js");
const got = require("got");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: "amazeme",
    aliases: ["amazeme"],
    category: "🕹 Fun",
    description: "IMAGE CMD",
    usage: "amazeme",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      got("https://www.reddit.com/r/interestingasfuck/random.json")
      .then((response) => {
          let content = JSON.parse(response.body);
          var title = content[0].data.children[0].data.title;
          var amazeme = content[0].data.children[0].data.url;
          let jokeembed = new MessageEmbed().setDescription(`[\`Click here\`](${amazeme})`).setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle(title).setTimestamp();
          if (amazeme.toLowerCase().endsWith("png") || amazeme.toLowerCase().endsWith("jpg") || amazeme.toLowerCase().endsWith("jpeg") || amazeme.toLowerCase().endsWith("gif")) jokeembed.setImage(amazeme);
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
  }
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
