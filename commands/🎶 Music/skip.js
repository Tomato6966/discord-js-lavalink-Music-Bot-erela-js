const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "forceskip",
    category: "🎶 Music",
    aliases: ["fs"],
    description: "Forces to skip the current song",
    usage: "forceskip",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));
        if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
        if (player.queue.size == 0) {
          message.channel.send(new MessageEmbed().setTitle("⏹ Stopped and left your channel").setColor(ee.color).setFooter(ee.footertext, ee.footericon));
          player.destroy();
        }
        player.stop();
        return message.channel.send(new MessageEmbed().setTitle("⏭ Skipped to the next song").setColor(ee.color).setFooter(ee.footertext, ee.footericon));
    },
};
