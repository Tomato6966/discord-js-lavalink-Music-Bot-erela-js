const Discord = require("discord.js")
const {
    MessageEmbed
} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const {
    format
} = require("duratiform")
module.exports = {
    name: "play",
    category: "🎶 Music",
    aliases: ["p"],
    description: "Plays a song from youtube",
    usage: "play <Song / URL>",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply("you need to join a voice channel.");
        if (!args.length) return message.reply("you need to give me a URL or a search term.");

        const search = args.join(" ");
        let res;
        try {
            // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
            res = await client.manager.search(search, message.author);
            // Check the load type as this command is not that advanced for basics
            if (res.loadType === "LOAD_FAILED") throw res.exception;
            else if (res.loadType === "PLAYLIST_LOADED") throw {
                message: "Playlists are not supported with this command."
            };
        } catch (err) {
            return message.reply(`there was an error while searching: ${err.message}`);
        }

        //If there is already a player then just add it to the queue...
        if (client.manager.players.get(message.guild.id)) {
            // Create the player 
            const player = client.manager.players.get(message.guild.id);
            player.queue.add(res.tracks[0]);
            let track = res.tracks[0];
            let embed = new Discord.MessageEmbed()
                .setTitle(`Added to Queue 🩸 **${track.title}**.`)
                .setURL(track.uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
                .setThumbnail(track.displayThumbnail(1))
                .addField("Duration: ", `\`${track.isStream ? "LIVE STREAM" : format(track.duration, '(h:h:)(m:mm:)(s:ss)')}\``, true)
                .addField("Song By: ", `\`${track.author}\``, true)
                .addField("Queue length: ", `\`${player.queue.length} Songs\``, true)
                .setFooter(`Requested by: ${track.requester.tag}`, track.requester.displayAvatarURL({
                    dynamic: true
                }))
            return message.reply(embed).then(msg => msg.delete({
                timeout: 4000
            }).catch(e => console.log(e)));
        } else {
            // Create the player 
            const player = client.manager.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id,
                selfDeafen: true,
            });

            // Connect to the voice channel and add the track to the queue
            player.connect();
            player.queue.add(res.tracks[0]);

            player.play()
            let track = res.tracks[0];
            let embed = new Discord.MessageEmbed()
                .setTitle(`Searching 🔍 **${track.title}**.`)
                .setURL(track.uri).setColor("YELLOW")
                .setThumbnail(track.displayThumbnail(1))
                .addField("Duration: ", `\`${track.isStream ? "LIVE STREAM" : format(track.duration, '(h:h:)(m:mm:)(s:ss)')}\``, true)
                .addField("Song By: ", `\`${track.author}\``, true)
                .addField("Queue length: ", `\`${player.queue.length} Songs\``, true)
                .setFooter(`Requested by: ${track.requester.tag}`, track.requester.displayAvatarURL({
                    dynamic: true
                }))
            return message.reply(embed).then(msg => msg.delete({
                timeout: 4000
            }).catch(e => console.log(e)));
        }

    }
};