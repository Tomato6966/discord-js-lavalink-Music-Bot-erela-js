const config = require("../../botconfig/config.json");
const ms = require("ms");
module.exports = {
    name: "unmute",
    category: "⛔️ Administration",
    aliases: [""],
    cooldown: 4,
    usage: "unmute @User",
    description: "Unmutes a User!",
    memberpermissions: ["KICK_MEMBERS"],
    run: async (client, message, args, cmduser, text, prefix) => {
     try{
        let member = message.mentions.members.first();
        if (!member) return message.channel.send("ERROR, please ping a USER! Usage: `mute @User <Time> [REASON]` example: `mute @User 10m He is doing bad stuff!`");
        args.shift();
        if (!message.member.hasPermission("ADMINISTRATOR") && member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send("❌ I cannot mute this Member, because he is higher/Equal to your Rang Position!");
        }
        let allguildroles = message.guild.roles.cache.array();
        let mutedrole = false;
        for (let i = 0; i < allguildroles.length; i++) {
            if (allguildroles[i].name.toLowerCase().includes("muted")) {
                mutedrole = allguildroles[i];
                break;
            }
        }
        if (!mutedrole) {
            return message.channel.send("❌ You never muted someone, there is no muted role yet!");
        }
        if (mutedrole.position > message.guild.me.roles.highest.position) {
            return message.channel.send("❌ I cannot access the Role, because it's above me!");
        }
        try {
            member.roles.remove(mutedrole);
        } catch {
            message.channel.send("Something went wrong!");
        }
        message.channel.send(`✅|${member.user}got**UNMUTED**`);
        member.send(`✅|**${message.author.tag}**unmuted you`);
    } catch (e) {
        console.log(String(e.stack).red)
        return message.channel.send(
            new MessageEmbed()
            .setColor("RED")
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
    },
};
