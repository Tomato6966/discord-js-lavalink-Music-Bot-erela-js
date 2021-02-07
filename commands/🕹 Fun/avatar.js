const Discord = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
    name: "avatar",
    category: "🕹 Fun",
    description: "Gets the avatar of a user or yourself",
    usage: "avatar [@USER]",
    run: async(client, message, args) => {
       /* If user isnt found it selects ur profile */
        const member = message.mentions.members.first() || message.member;

        if (!member.user.avatarURL) return message.channel.send(`That user does not have an avatar`);

        const avatar = new Discord.MessageEmbed()
            .setTitle(`${member.user.username}'s Avatar`)
            .setColor(ee.color).setFooter(ee.footertext+ " | Bittmax.de | Code: x10 == 5%", ee.footericon)
            .setImage(member.user.displayAvatarURL({dynamic: true}))
            .setURL(member.user.displayAvatarURL({dynamic: true}))
        message.channel.send(avatar)
    }
};