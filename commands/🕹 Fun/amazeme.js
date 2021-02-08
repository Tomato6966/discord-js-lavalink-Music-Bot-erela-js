
const { MessageEmbed } = require("discord.js");
const got = require('got');
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
  name: "amazeme",
	aliases: ["amazeme"],
    category: "🕹 Fun",
    description: "IMAGE CMD",
    usage: "amazeme",
    run: async (client, message, args) => {
   
    got('https://www.reddit.com/r/interestingasfuck/random.json').then(response => {
      let content = JSON.parse(response.body);
      var title = content[0].data.children[0].data.title;
      var amazeme = content[0].data.children[0].data.url;
      let jokeembed = new MessageEmbed()
      .setDescription(`[\`Click here\`](${amazeme})`)
      .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon) 
      .setTitle(title)
      .setTimestamp()
    if(amazeme.toLowerCase().endsWith("png")||amazeme.toLowerCase().endsWith("jpg")||amazeme.toLowerCase().endsWith("jpeg")||amazeme.toLowerCase().endsWith("gif")) jokeembed.setImage(amazeme);
    return message.channel.send(jokeembed);
    }).catch(console.error);
  }

};
