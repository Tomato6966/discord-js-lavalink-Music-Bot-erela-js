const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "shuffle",
    category: "🎶 Music",
    aliases: ["mix"],
    description: "Shuffles the Queue",
    usage: "shuffle",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));
        if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
        player.queue.shuffle();
        return message.channel.send(new MessageEmbed().setTitle("🔀 The queue is now shuffled.").setColor(ee.color).setFooter(ee.footertext, ee.footericon));
    },
};
