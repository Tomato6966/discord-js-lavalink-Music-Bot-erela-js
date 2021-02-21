const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "slowmode",
    category: "⛔️ Administration",
    aliases: ["slow"],
    description: "Changes the slowmode of the channel",
    usage: "slowmode <Amount>",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, cmduser, text, prefix) => {
          try {
            if (!isNaN(args[0]) || parseInt(args[0]) < 0) {
                let embed = new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setDescription(`✅Slowmode successfully set to ${args[0]}!`);
                message.channel.send(embed);
                message.channel.setRateLimitPerUser(args[0]);
            } else {
                let embed2 = new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setDescription(`Thats not an number!`);
                message.channel.send(embed2);
            }
        } catch (e) {
            console.log(String(e.stack).red);
            return message.channel.send("there was an error setting the Slowmode.");
        }
    },
};
