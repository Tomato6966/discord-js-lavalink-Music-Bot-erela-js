const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { createBar, format } = require("../../handlers/functions");
module.exports = {
    name: "restart",
    category: "🎶 Music",
    aliases: ["replay"],
    description: "Restarts the current song",
    usage: "restart",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));
        if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
        player.seek(0);
        const embed = new MessageEmbed()
            .setTitle(`✅Restarted the current Song!`)
            .addField(
                "Progress: ",
                createBar(player.queue.current.duration == 0 ? player.position : player.queue.current.duration, player.position, 25, "▬", config.settings.progressbar_emoji) +
                    "\n**" +
                    new Date(player.position).toISOString().substr(11, 8) +
                    " / " +
                    (player.queue.current.duration == 0 ? " ◉ LIVE" : new Date(player.queue.current.duration).toISOString().substr(11, 8)) +
                    "**"
            )
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon);
        return message.channel.send(embed);
    },
};
