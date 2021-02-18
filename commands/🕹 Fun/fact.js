const client = require("nekos.life");
const Discord = require("discord.js");
const neko = new client();
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const path = require("path");
module.exports = {
    name: path.parse(__filename).name,
    category: "🕹 Fun",
    useage: `${path.parse(__filename).name}[@User]`,
    description: "*Image cmd in the style:* " + path.parse(__filename).name,
    run: async (client, message, args, cmduser, text, prefix) => {
        let owo;
        owo = await neko.sfw.fact();
        console.log(owo);
        const fact = new Discord.MessageEmbed().setTitle("Fact").setDescription(owo.fact).setColor(ee.color).setFooter(ee.footertext, ee.footericon);
        message.channel.send(fact).catch((e) => console.log(String(e.stack).red));
    },
};
