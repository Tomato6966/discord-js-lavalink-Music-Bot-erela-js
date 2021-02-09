const Discord = require("discord.js")
const {
    MessageEmbed
} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")

module.exports = {
    name: "searchsc",
    category: "🎶 Music",
    aliases: ["searchsoundcloud", "scsearch", "soundcloudsearch"],
    description: "Searches a song from soundcloud",
    usage: "search <Song / URL>",
    run: async (client, message, args) => {
        const {
            channel
        } = message.member.voice;
        if (!channel) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));

        if (!args.length) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("you need to give me a URL or a search term."));

        const search = args.join(" ");
        let res;
        try {
            // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
            res = await client.manager.search({query: search, source: "soundcloud"}, message.author);
            // Check the load type as this command is not that advanced for basics
            if (res.loadType === "LOAD_FAILED") throw res.exception;
            else if (res.loadType === "PLAYLIST_LOADED") throw {
                message: "Playlists are not supported with this command. Use `?playlist`"
            };
        } catch (err) {
           return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`There was an error while searching:`).setDescription(`\`\`\`${err.message}\`\`\``));
        }
        try {

            let max = 10,
                collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
            if (res.tracks.length < max) max = res.tracks.length;
            track = res.tracks[0]

            const results = res.tracks
                .slice(0, max)
                .map((track, index) => `**${++index})** [\`${String(track.title).substr(0, 60)}\`](${track.uri}) - ${format(track.duration)}`)
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


            // Create the player 
            const player = client.manager.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id,
                selfDeafen: true,
            });


            if (player.state !== "CONNECTED") {
                // Connect to the voice channel and add the track to the queue
                player.connect();
                player.queue.add(track);
                player.play()
            } else {
                player.queue.add(res.tracks[0]);
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Added to Queue 🩸 **\`${res.tracks[0].title}\`**`)
                    .setURL(res.tracks[0].uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
                    .setThumbnail(res.tracks[0].displayThumbnail(1))
                    .addField("Duration: ", `\`${res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration)}\``, true)
                    .addField("Song By: ", `\`${res.tracks[0].author}\``, true)
                    .addField("Queue length: ", `\`${player.queue.length} Songs\``, true)
                    .setFooter(`Requested by: ${res.tracks[0].requester.tag}`, res.tracks[0].requester.displayAvatarURL({
                        dynamic: true
                    }))
                return message.channel.send(embed).then(msg => msg.delete({
                    timeout: 4000
                }).catch(e => console.log(String(e.stack).red)));
            }

        } catch (e) {
            console.log(String(e.stack).red)
            message.channel.send(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle(":x: Found nothing for: " + search))
        }
    }
};
function format(millis){
    var h=Math.floor(millis/360000),m=Math.floor(millis/60000),s=((millis%60000)/1000).toFixed(0);
    if(h<1) return(m<10?'0':'')+m+":"+(s<10?'0':'')+s;
    else return(h<10?'0':'')+h+":"+(m<10?'0':'')+m+":"+(s<10?'0':'')+s;
    }
    