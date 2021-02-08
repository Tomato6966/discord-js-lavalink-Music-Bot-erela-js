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
    name: "search",
    category: "🎶 Music",
    aliases: ["search"],
    description: "Searches a song from youtube",
    usage: "search <Song / URL>",
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
            const player = client.manager.players.get(message.guild.id);

            let max = 10,
                collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
            if (res.tracks.length < max) max = res.tracks.length;
            track = res.tracks[0]

            const results = res.tracks
                .slice(0, max)
                .map((track, index) => `${++index} - \`${track.title}\``)
                .join('\n');
            let searchembed = new Discord.MessageEmbed()
                .setTitle(`Search result for: 🔎 **${search}**.`)
                .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
                .setDescription(results)
                .setFooter(`Search-Request by: ${track.requester.tag}`, track.requester.displayAvatarURL({
                    dynamic: true
                }))
            message.channel.send(searchembed)
            message.reply(new Discord.MessageEmbed().setColor(ee.color).setTitle("Pick your Song with the `INDEX Number`"))
            try {
                collected = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 30e3,
                    errors: ['time']
                });
            } catch (e) {
                if (!player.queue.current) player.destroy();
                return message.reply("you didn't provide a selection.");
            }
            const first = collected.first().content;
            if (first.toLowerCase() === 'end') {
                if (!player.queue.current) player.destroy();
                return message.channel.send(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle(':x: Cancelled selection.'));
            }
            const index = Number(first) - 1;
            if (index < 0 || index > max - 1) return message.reply(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle(`:x:The number you provided too small or too big (1-${max}).`));
            track = res.tracks[index];
            player.queue.add(track);
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

            let max = 10,
                collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
            if (res.tracks.length < max) max = res.tracks.length;
            track = res.tracks[0]

            const results = res.tracks
                .slice(0, max)
                .map((track, index) => `**${++index})** [\`${String(track.title).substr(0, 60)}\`](${track.uri}) - ${format(track.duration, '(h:h:)(m:mm:)(s:ss)')}`)
                .join('\n');
            let searchembed = new Discord.MessageEmbed()
                .setTitle(`Search result for: 🔎 **${search}**.`)
                .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
                .setDescription(results)
                .setFooter(`Search-Request by: ${track.requester.tag}`, track.requester.displayAvatarURL({
                    dynamic: true
                }))
            message.channel.send(searchembed)
            await message.channel.send(new Discord.MessageEmbed().setColor(ee.color).setTitle("Pick your Song with the `INDEX Number`"))
            try {
                collected = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 30e3,
                    errors: ['time']
                });
            } catch (e) {
                if (!player.queue.current) player.destroy();
                return message.reply("you didn't provide a selection.");
            }
            const first = collected.first().content;
            if (first.toLowerCase() === 'end') {
                if (!player.queue.current) player.destroy();
                return message.channel.send(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle(':x: Cancelled selection.'));
            }
            const index = Number(first) - 1;
            if (index < 0 || index > max - 1) return message.reply(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle(`:x:The number you provided too small or too big (1-${max}).`));
            track = res.tracks[index];
            player.queue.add(track);
            player.play()
        }
    }
};