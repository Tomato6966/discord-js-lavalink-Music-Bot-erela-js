const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "loopqueue",
    category: "🎶 Music",
    aliases: ["repeatqueue", "lq", "rq", "loopqu", "repeatqu"],
    description: "Repeats the Queue",
    usage: "loopqueue",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));
        if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
        const embed = new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon);
        if (player.trackRepeat) {
            embed.setDescription(`And**Song**Repeat got**disabled**`);
            player.setTrackRepeat(false);
        }
        player.setQueueRepeat(!player.queueRepeat);
        return message.channel.send(embed.setTitle(`🔀 Queue Loop is now ${player.queueRepeat ? "active" : "disabled"}.`));
    },
};
