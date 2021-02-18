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
        if (!message.member.voice.channel) return message.reply("you need to join a voice channel.");
        if (!args.length) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("you need to give me a URL or a search term."));
        playermanager(client, message, args, "playlist");
    },
};
