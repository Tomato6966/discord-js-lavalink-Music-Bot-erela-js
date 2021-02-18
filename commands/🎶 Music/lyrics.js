const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const { KSoftClient } = require("@ksoft/api");
const ee = require("../../botconfig/embed.json");
const lyricsFinder = require("lyrics-finder");
module.exports = {
    name: "lyrics",
    category: "🎶 Music",
    aliases: ["songlyrics", "ly", "tracklyrics"],
    description: "Shows The Lyrics of the current track",
    usage: "lyrics [Songtitle]",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));
        if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
        let title = player.queue.current.title;
        let author = player.queue.current.author;
        if (args[0]) {
            title = args.join(" ");
            const embed = new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle(`Searching lyrics for:🔎\`${title}\``.substr(0, 256));
            message.channel.send(embed).then((msg) => msg.delete({ timeout: 5000 }));
        }
        let lyrics = null;
        if (config.lyricssettings.lyrics_finder) {
            if (config.lyricssettings.ksoft_api.use_this_instead) {
                const ksoft = new KSoftClient(config.lyricssettings.ksoft_api.api_key);
                await ksoft.lyrics.get(title).then(async (track) => {
                    if (!track.lyrics) return message.repply(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(":x: Error | No Lyrics found for:"));
                    lyrics = track.lyrics;
                });
            } else {
                try {
                    lyrics = await lyricsFinder(title, author ? author : "");
                    if (!lyrics) return message.repply(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(":x: Error | No Lyrics found for:"));
                } catch (e) {
                    console.log(String(e.stack).red);
                    return message.repply(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(":x: Error | No Lyrics found for:"));
                }
            }
        }
        let lyricsEmbed = new MessageEmbed().setTitle(`Lyrics for:📃\`${title}\``.substr(0, 256)).setDescription(lyrics).setColor(ee.color).setFooter(ee.footertext, ee.footericon);
        if (lyricsEmbed.description.length >= 2048);
        lyricsEmbed.setDescription(lyricsEmbed.description.substr(2040) + " ...");
        message.channel.send(lyricsEmbed).then((msg) => {
            player.set("lyricsmessage", msg.id);
        });
    },
};
