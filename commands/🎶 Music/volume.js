const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "volume",
    category: "🎶 Music",
    aliases: ["vol"],
    description: "Changes the Volume",
    usage: "volume <0-150>",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));
        if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
        if (Number(args[0]) <= 0 || Number(args[0]) > 150) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You may set the volume `1` - `150`"));
        if(isNaN(args[0])) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You may set the volume `1` - `150`").setDescription("It Must be a Number"));
        player.setVolume(Number(args[0]));
        return message.channel.send(new MessageEmbed().setTitle(`🔊 Volume set to: **\`${player.volume} %\`**`).setColor(ee.color).setFooter(ee.footertext, ee.footericon));
    },
};
