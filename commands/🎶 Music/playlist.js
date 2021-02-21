const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const playermanager = require("../../handlers/playermanager");
module.exports = {
    name: "playlist",
    category: "🎶 Music",
    aliases: ["pl"],
    description: "Plays a playlist from youtube",
    usage: "playlist <URL>",
    run: async (client, message, args, cmduser, text, prefix) => {
        //if not in a voice Channel return error
        if (!message.member.voice.channel)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle("❌ Error | You need to join a voice channel.")
            );
        //if no args return error
        if (!args.length)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle("❌ Error | You need to give me a URL or a search term.")
            );
        //play the playlist
        playermanager(client, message, args, "playlist");
    },
};
