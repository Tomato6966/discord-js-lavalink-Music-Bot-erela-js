
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const got = require('got');
const path = require("path");
module.exports = {

  name: path.parse(__filename).name,
  category: "🕹 Fun",
  useage: `${path.parse(__filename).name} [@User]`,
description: "*Image cmd in the style:* " + path.parse(__filename).name ,
  run: async (client, message, args) => {
   
    got('https://www.reddit.com/r/jokes/random/.json').then(response => {
      let content = JSON.parse(response.body);
      var title = content[0].data.children[0].data.title;
      var joke = content[0].data.children[0].data.selftext;
      let jokeembed = new MessageEmbed()
      .setDescription(joke)
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)  
      .setTitle(title)
      .setAuthor(`${client.user.username} | Joke`)
      .setTimestamp()  
    return message.channel.send(jokeembed);
    }).catch(e=>console.log(String(e.stack).red));
  }

};
