const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "stop",
    category: "🎶 Music",
    aliases: ["leave"],
    description: "Stops current track and leaves the channel",
    usage: "stop",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));
        if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
        if (!player.queue.current) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("No song is currently playing in this guild."));
        player.destroy();
        return message.channel.send(new MessageEmbed().setTitle("⏹ Stopped and left your channel").setColor(ee.color).setFooter(ee.footertext, ee.footericon));
    },
};
