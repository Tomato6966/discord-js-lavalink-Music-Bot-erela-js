const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
    name: "ban",
    category: "⛔️ Administration",
    aliases: [""],
    description: "Bans a Member from a Guild",
    usage: "ban @User",
    run: async(client, message, args) => {
        //Allowed user:
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You are not allowed to run this command!");
        let kickmember = message.mentions.members.first() || message.guild.members.cache.get(args[0] ? args[0]: "");
        if(!kickmember) return message.reply("Please add a Member you want to kick!");
        // Gets the kcik reason
		let reason = args.slice(1).join(" ");
		if(!reason){
			reason = "NO REASON"
		}

        const memberPosition = kickmember.roles.highest.position;
		const moderationPosition = message.member.roles.highest.position;
		if(moderationPosition <= memberPosition){
			return message.reply("I cannot ban someone, who is above/equal you");
		}

        if(!kickmember.bannable) {
			return message.reply("The Member is not bannable, sorry!");
		}
        try {
            kickmember.ban(reason).then(()=>{
                message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`✅ Succesfully banned: ${kickmember.user.tag}`)
                .setDescription(`Reason: ${reason}`)
                )
            })
        }
        catch (error) {
            console.log(String(error.stack).red);
            return message.reply('there was an error trying to ban the Member.');
        }
    }
};