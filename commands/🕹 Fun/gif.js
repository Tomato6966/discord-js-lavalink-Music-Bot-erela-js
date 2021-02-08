const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const rgif = require("discord-gifs");
const path = require("path");
module.exports = {
    name: path.parse(__filename).name,
    category: "🕹 Fun",
    cooldown: 1,
    useage: `${path.parse(__filename).name} [@User]`,
    description: "Random gif",
    run: async (client, message, args) => {
      return message.reply(
        new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)  
            .setImage(rgif.randomgifs())
           )}
}