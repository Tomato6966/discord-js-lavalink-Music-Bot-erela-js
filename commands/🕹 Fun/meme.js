const fetch = require("node-fetch");
const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
const subreddits = [
  "memes",
  "DeepFriedMemes",
  "bonehurtingjuice",
  "surrealmemes",
  "dankmemes",
  "meirl",
  "me_irl",
  "funny"
];
const path = require("path");
module.exports = {
  name: path.parse(__filename).name,
  category: "🕹 Fun",
  useage: `${path.parse(__filename).name} [@User]`,
  description: "*Image cmd in the style:* " + path.parse(__filename).name,
  run: async (client, message, args, cmduser, text, prefix) => {
    try{
      const data = await fetch(`https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`)
        .then(response => response.json())
        .then(body => body.data);
      const selected = data[Math.floor(Math.random() * data.length)];
      return message.channel.send(new MessageEmbed().setImage(`https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`).setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTimestamp());
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
