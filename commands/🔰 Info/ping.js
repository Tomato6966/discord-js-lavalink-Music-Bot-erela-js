const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "ping",
    category: "🔰 Info",
    aliases: ["latency"],
    cooldown: 2,
    usage: "ping",
    description: "Gives you information on how fast the Bot can respond to you",
    run: async (client, message, args, user, text, prefix) => {
        const embed = new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon);
        const msg = await message.channel.send(embed.setTitle(`🏓Pinging....`));
        msg.edit(embed.setTitle(`🏓 Ping is \`${Math.round(client.ws.ping)}ms\``));
    },
};
