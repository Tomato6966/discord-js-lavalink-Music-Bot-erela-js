const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { createBar, format } = require("../../handlers/functions");
module.exports = {
    name: "rewind",
    category: "🎶 Music",
    aliases: ["seekbackwards", "rew"],
    description: "Seeks a specific amount of Seconds backwards",
    usage: "rewind <Duration in Seconds>",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));
        if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
        if (!args[0]) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`You may rewind for \`1\`-\`${player.queue.current.duration}\``));
        let seektime = player.position - Number(args[0]) * 1000;
        if (seektime >= player.queue.current.duration - player.position || seektime < 0) {
            seektime = 0;
        }
        player.seek(Number(seektime));
        return message.channel.send(new MessageEmbed()
            .setTitle(`⏪ Rewinded the song for: \`${args[0]} Seconds\`, to: ${format(Number(player.position))}`)
            .addField("⏳ Progress: ", createBar(player))
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          );
    },
};
