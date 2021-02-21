const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const playermanager = require("../../handlers/playermanager");
module.exports = {
    name: "play",
    category: "🎶 Music",
    aliases: ["p"],
    description: "Plays a song from youtube",
    usage: "play <Song / URL>",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        if (!args.length) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("you need to give me a URL or a search term."));
        playermanager(client, message, args, "song:youtube");
    },
};
