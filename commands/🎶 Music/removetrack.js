const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "removetrack",
    category: "🎶 Music",
    aliases: ["rt", "remove"],
    description: "Removes a track from the Queue",
    usage: "removetrack <Trackindex>",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));
        if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
        if (!args[0]) return message.channel.send("Please include a track Usage: `removetrack <Trackindex>` e.g: `removetrack 3`");
        if (isNaN(args[0])) return message.channel.send("It has to be a queue Number");
        let trackn = Number(args[0]);
        if (trackn > player.queue.size) return message.channel.send("That song is not in the queue, sorry");
        player.queue.remove(trackn - 1);
        const embed = new MessageEmbed().setTitle(`🌀 I removed the track at position: \`${trackn}\``).setColor(ee.color).setFooter(ee.footertext, ee.footericon);
        return message.channel.send(embed);
    },
};
