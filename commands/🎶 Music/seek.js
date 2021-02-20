const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { createBar, format } = require("../../handlers/functions");
module.exports = {
    name: "seek",
    category: "🎶 Music",
    aliases: ["vol"],
    description: "Changes the position(seek) of the Song",
    usage: "seek <Duration in Seconds>",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));
        if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
        if (Number(args[0]) < 0 || Number(args[0]) >= player.queue.current.duration / 1000) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`You may seek from\`0\`-\`${player.queue.current.duration}\``));
        player.seek(Number(args[0]) * 1000);
        const embed = new MessageEmbed()
            .setTitle(`✅ Seeked song to: ${format(Number(args[0]) * 1000)}`)
            .addField("⏳ Progress: ", createBar(player))
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon);
        return message.channel.send(embed);
    },
};
