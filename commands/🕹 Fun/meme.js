
const fetch = require("node-fetch");
const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
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
  description: "*Image cmd in the style:* " + path.parse(__filename).name ,
    run: async (client, message, args) => {
     const data = await fetch(`https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`)
     .then(response => response.json())
     .then(body => body.data);
     const selected = data[Math.floor(Math.random() * data.length)];
     return message.channel.send(new MessageEmbed().setImage(`https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`) .setColor(ee.color)
     .setFooter(ee.footertext, ee.footericon)  .setTimestamp() );
     
    }
}