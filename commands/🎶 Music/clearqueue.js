const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "clearqueue",
    category: "🎶 Music",
    aliases: ["clearqu"],
    description: "Cleares the Queue",
    usage: "clearqueue",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));
        if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
        player.queue.clear();
        const embed = new MessageEmbed().setTitle("🗑 The queue is now cleared.").setColor(ee.color).setFooter(ee.footertext, ee.footericon);
        return message.channel.send(embed);
    },
};
