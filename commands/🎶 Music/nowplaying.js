const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { createBar, format } = require("../../handlers/functions");
module.exports = {
    name: "nowplaying",
    category: "🎶 Music",
    aliases: ["np", "current"],
    description: "Shows information about the current Song",
    usage: "nowplaying",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));
        if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
        if (!player.queue.current) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("No song is currently playing in this guild."));
        const { title, author, uri } = player.queue.current;
        const embed = new MessageEmbed()
            .setAuthor("Current song playing:", message.author.displayAvatarURL({ dynamic: true }))
            .setThumbnail(player.queue.current.displayThumbnail(1))
            .setURL(uri)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${player.playing ? "▶" : "⏸"}**${title}**`)
            .addField("Duration: ", "`" + format(player.queue.current.duration) + "`", true)
            .addField("Song By: ", "`" + author + "`", true)
            .addField("Queue length: ", `\`${player.queue.length}Songs\``, true)
            .addField("⏳ Progress: ", createBar(player))
            .setFooter(`Requested by: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({ dynamic: true }));
        return message.channel.send(embed);
    },
};
