const config = require("../../botconfig/config.json");
const ms = require("ms");
const ee = require("../../botconfig/embed.json")
module.exports = {
    name: "mute",
    category: "⛔️ Administration",
    aliases: [""],
    cooldown: 4,
    usage: "mute @User <Time+Format(e.g: 10m)> [REASON]",
    description: "Mutes a User for a specific Time!",
    memberpermissions: ["KICK_MEMBERS"],
    run: async (client, message, args, cmduser, text, prefix) => {
       try{
      let member = message.mentions.members.first();
        if (!member) return message.channel.send("ERROR, please ping a USER! Usage: `mute @User <Time+Format(e.g: 10m)> [REASON]` example: `mute @User 10m He is doing bad stuff!`");
        args.shift();
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send("❌ I cannot mute this Member, because he is higher/Equal to your Rang Position!");
        }
        let time = args[0];
        if (!time) return message.channel.send("ERROR, please add a TIME! Usage: `mute @User <Time+Format(e.g: 10m)> [REASON]` example: `mute @User 10m He is doing bad stuff!`");
        args.shift();
        let reason = args.join(" ");
        let allguildroles = message.guild.roles.cache.array();
        let mutedrole = false;
        for (let i = 0; i < allguildroles.length; i++) {
            if (allguildroles[i].name.toLowerCase().includes("muted")) {
                mutedrole = allguildroles[i];
                break;
            }
        }
        if (!mutedrole) {
            let highestrolepos = message.guild.me.roles.highest.position;
            mutedrole = await message.guild.roles.create({ data: { name: "muted", color: "#222222", hoist: true, position: Number(highestrolepos) - 1 }, reason: "This role got created, to mute Members!" }).catch((e) => {
                console.log(String(e.stack).red);
                message.channel.send("I COULD NOT CREATE A ROLE, sorry");
            });
        }
        if (mutedrole.position > message.guild.me.roles.highest.position) {
            return message.channel.send("❌ I cannot access the Role, because it's above me!");
        }
        let mutetime;
        try {
            mutetime = ms(time);
        } catch {
            return message.channel.send("ERROR, please add a TIME! Usage: `mute @User <Time+Format(e.g: 10m)> [REASON]` example: `mute @User 10m He is doing bad stuff!`");
        }
        if (!mutetime || mutetime === undefined) return message.channel.send("ERROR, please add a TIME! Usage: `mute @User <Time+Format(e.g: 10m)> [REASON]` example: `mute @User 10m He is doing bad stuff!`");
        await message.guild.channels.cache.forEach((ch) => {
            try {
                ch.updateOverwrite(mutedrole, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false, SPEAK: false });
            } catch (e) {
                console.log(String(e.stack).red);
            }
        });
        try {
            member.roles.add(mutedrole);
        } catch {
            message.channel.send("Something went wrong!");
        }
        message.channel.send(`✅ ${member.user} got **MUTED** for \`${ms(mutetime, { long: true })}\` ${reason ? `\n**REASON**\n> ${reason.substr(0, 1800)}` : "\nNO REASON"}`).catch((e) => console.log(String(e.stack).red));
        member.send(`✅ **${message.author.tag}** muted you for \`${ms(mutetime, { long: true })}\` ${reason ? `\n**REASON**\n> ${reason.substr(0, 1800)}` : "\nNO REASON"}`).catch((e) => console.log(String(e.stack).red));
        setTimeout(() => {
            try {
                message.channel.send(`✅ ${member.user} got **UNMUTED** after\`${ms(mutetime, { long: true })}\` ${reason ? `\n**REASON**\n> ${reason.substr(0, 1800)}` : "\nNO REASON"}`).catch((e) => console.log(String(e.stack).red));
                member.roles.remove(mutedrole);
            } catch {
                message.channel.send("Something went wrong!");
            }
        }, mutetime);
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
