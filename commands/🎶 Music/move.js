const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { format, arrayMove } = require("../../handlers/functions");
module.exports = {
    name: "move",
    category: "🎶 Music",
    aliases: ["mv"],
    description: "Shows the Queue",
    usage: "move <from> <to>",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.channel.send("there is no player for this guild.");
        if (!args[0]) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("❌ | Wrong Command Usage!").setDescription(`Usage:\`?move<from><to>\`\nExample:\`?move 4 1\``));
        if (!args[1]) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("❌ | Wrong Command Usage!").setDescription(`Usage:\`?move<from><to>\`\nExample:\`?move 4 1\``));
        if (isNaN(args[0]) || args[0] <= 1 || args[0] > player.queue.length)
            return message.channel.send(
                new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle("❌ | Error Your Input must be a Number greater then `1` and smaller then `" + player.queue.length + "`")
            );
        let song = player.queue[args[0] - 1];
        player.queue = arrayMove(player.queue, args[0] - 1, args[1] - 1);
        message.channel.send(
            new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`✅ Successfully moved the Song in the Queue from Position \`${args[0]}\` to Position: \`${args[1]}\``)
                .setThumbnail(song.displayThumbnail())
                .setDescription(`[${song.title}](${song.uri}) - \`${format(song.duration)}\``)
        );
    },
};
