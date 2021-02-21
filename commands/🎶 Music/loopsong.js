const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "loopsong",
    category: "🎶 Music",
    aliases: ["repeatsong", "ls", "rs", "repeattrack", "looptrack", "lt", "rt"],
    description: "Repeats the current song",
    usage: "loopsong",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));
        if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
        const embed = new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon);
        if (player.queueRepeat) {
            embed.setDescription(`And**Queue**Repeat got**disabled**`);
            player.setQueueRepeat(false);
        }
        player.setTrackRepeat(!player.trackRepeat);
        return message.channel.send(embed.setTitle(`🔀 Track Loop is now ${player.trackRepeat ? "active" : "disabled"}.`));
    },
};
