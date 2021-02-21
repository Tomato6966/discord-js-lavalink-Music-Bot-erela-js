const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "invite",
    category: "🔰 Info",
    aliases: ["add"],
    cooldown: 2,
    usage: "invite",
    description: "Gives you an Invite link for this Bot",
    run: async (client, message, args, user, text, prefix) => {
        const embed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(":heart: Thanks for inviting me!")
            .setFooter(ee.footertext, ee.footericon)
            .setURL("https://discord.com/api/oauth2/authorize?client_id=742672021422342165&permissions=8&scope=bot")
            .setDescription("[Click here](https://discord.com/api/oauth2/authorize?client_id=742672021422342165&permissions=8&scope=bot)");
        message.channel.send(embed);
    },
};
