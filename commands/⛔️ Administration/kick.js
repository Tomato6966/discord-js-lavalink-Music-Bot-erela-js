const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "kick",
    category: "⛔️ Administration",
    aliases: [""],
    description: "Kicks a Member from a Guild",
    usage: "kick @User",
    memberpermissions: ["KICK_MEMBERS"],
    run: async (client, message, args, cmduser, text, prefix) => {
        let kickmember = message.mentions.members.first() || message.guild.members.cache.get(args[0] ? args[0] : "");
        if (!kickmember) return message.channel.send("Please add a Member you want to kick!");
        let reason = args.slice(1).join(" ");
        if (!reason) {
            reason = "NO REASON";
        }
        const memberPosition = kickmember.roles.highest.position;
        const moderationPosition = message.member.roles.highest.position;
        if (moderationPosition <= memberPosition) {
            return message.channel.send("I cannot kick someone, who is above/equal you");
        }
        if (!kickmember.kickable) {
            return message.channel.send("The Member is not kickable, sorry!");
        }
        try {
            kickmember.kick(reason).then(() => {
                message.channel.send(new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle(`✅Succesfully kicked:${kickmember.user.tag}`).setDescription(`Reason:${reason}`));
            });
        } catch (e) {
            console.log(String(e.stack).red);
            return message.channel.send("there was an error trying to kick the Member.");
        }
    },
};
