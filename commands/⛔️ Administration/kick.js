const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "kick",
    category: "⛔️ Administration",
    aliases: [""],
    description: "Kicks a Member from a Guild",
    usage: "kick @User",
    run: async (client, message, args, cmduser, text, prefix) => {
        message.delete({ timeout: 350 }).catch((e) => console.log(String(e.stack).red));
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You are not allowed to run this command!");
        let kickmember = message.mentions.members.first() || message.guild.members.cache.get(args[0] ? args[0] : "");
        if (!kickmember) return message.reply("Please add a Member you want to kick!");
        let reason = args.slice(1).join(" ");
        if (!reason) {
            reason = "NO REASON";
        }
        const memberPosition = kickmember.roles.highest.position;
        const moderationPosition = message.member.roles.highest.position;
        if (moderationPosition <= memberPosition) {
            return message.reply("I cannot kick someone, who is above/equal you");
        }
        if (!kickmember.kickable) {
            return message.reply("The Member is not kickable, sorry!");
        }
        try {
            kickmember.kick(reason).then(() => {
                message.channel.send(new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle(`✅Succesfully kicked:${kickmember.user.tag}`).setDescription(`Reason:${reason}`));
            });
        } catch (e) {
            console.log(String(e.stack).red);
            return message.reply("there was an error trying to kick the Member.");
        }
    },
};
