const Discord = require("discord.js")
const {
    MessageEmbed
} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
    name: "playlist",
    category: "🎶 Music",
    aliases: ["pl"],
    description: "Plays a playlist from youtube",
    usage: "playlist <URL>",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply("you need to join a voice channel.");

        if (!args.length) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("you need to give me a URL or a search term."))

        const search = args.join(" ");
        let res;
        try {
            // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
            res = await client.manager.search(search, message.author);
            // Check the load type as this command is not that advanced for basics
            if (res.loadType === "LOAD_FAILED") throw res.exception;
            else if (res.loadType === "SEARCH_RESULT") throw {
                message: "Searches are not supported with this command. Use `?play` or `?search`"
            };
        } catch (err) {
           return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`There was an error while searching:`).setDescription(`\`\`\`${err.message}\`\`\``));
        }


        try {
            // Create the player 
            const player = client.manager.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id,
                selfDeafen: true,
            });

            // Connect to the voice channel and add the track to the queue
            if (player.state !== "CONNECTED") {
                player.connect();
                player.queue.add(res.tracks);
                let nembed = new Discord.MessageEmbed()
                    .setTitle(`Added Playlist 🩸 **\`${res.playlist.name}\`**`)
                    .setURL(res.playlist.uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
                    .setThumbnail(res.tracks[0].displayThumbnail(1))
                    .addField("Duration: ", `\`${format(res.playlist.duration)}\``, true)
                    .addField("Queue length: ", `\`${player.queue.length} Songs\``, true)
                    .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                message.channel.send(nembed).then(msg => msg.delete({
                    timeout: 4000
                }).catch(e => console.log(String(e.stack).red)));
                player.play();
            } else {
                player.queue.add(res.tracks);
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Added Playlist 🩸 **\`${res.playlist.name}\`**`)
                    .setURL(res.playlist.uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
                    .setThumbnail(res.tracks[0].displayThumbnail(1))
                    .addField("Duration: ", `\`${format(res.playlist.duration)}\``, true)
                    .addField("Queue length: ", `\`${player.queue.length} Songs\``, true)
                    .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({
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
    