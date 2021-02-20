const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const config = require("../botconfig/config.json")
const ee = require("../botconfig/embed.json")
const { format,isrequestchannel,edit_request_message_queue_info } = require("../handlers/functions")
module.exports = async (client, message, args, type) => {
    client.premium.ensure(message.guild.id, {
        "enabled": false,
        "twentyfourseven": false,
      })
      //ensuring MEMBER premium
      client.premium.ensure(message.author.id, {
        "enabled": false,
        "twentyfourseven": false,
      })
    if(type.includes("song")) song(client, message, args, type);
    if(type.includes("playlist")) playlist(client, message, args, type);
    if(type.includes("search")) search(client, message, args, type);

}

//function for searching songs
async function search(client, message, args, type){
    try {
        const search2 = args.join(" ");
        let res;
        try {
            // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
            res = await client.manager.search({query: search2, source: type.split(":")[1]}, message.author);
            // Check the load type as this command is not that advanced for basics
            if (res.loadType === "LOAD_FAILED") throw res.exception;
            else if (res.loadType === "PLAYLIST_LOADED") throw {
                message: "Playlists are not supported with this command. Use   ?playlist  "
            };
        } catch (e) {
            console.log(String(e.stack).red)
           return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`There was an error while searching:`).setDescription(`\`\`\`${e.message}\`\`\``));
        }


        let max = 10,
            collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
        if (res.tracks.length < max) max = res.tracks.length;
        track = res.tracks[0]

        const results = res.tracks
            .slice(0, max)
            .map((track, index) => `**${++index})** [\`${String(track.title).substr(0, 60)}\`](${track.uri}) - ${format(track.duration)}`)
            .join('\n');
        let searchembed = new Discord.MessageEmbed()
            .setTitle(`Search result for: 🔎 **\`${search2}`.substr(0, 256-3) + "`**")
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
            selfDeafen: config.settings.selfDeaf,
        });
        player.set("message", message);
        player.set("playerauthor", message.author.id);
        if(!res.tracks[0])return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`There was an error while searching!`).setDescription(`Please retry!`));
        if (player.state !== "CONNECTED") {
            // Connect to the voice channel and add the track to the queue
            try{player.connect();}catch{}
            player.queue.add(track);
            player.play();
            if(isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
        } else {
            player.queue.add(track);
            let embed = new Discord.MessageEmbed()
                .setTitle(`Added to Queue 🩸 **\`${track.title}`.substr(0, 256-3) + "`**")
                .setURL(track.uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
                .setThumbnail(track.displayThumbnail(1))
                .addField("Duration: ", `\`${track.isStream ? "LIVE STREAM" : format(track.duration)}\``, true)
                .addField("Song By: ", `\`${track.author}\``, true)
                .addField("Queue length: ", `\`${player.queue.length} Songs\``, true)
                .setFooter(`Requested by: ${track.requester.tag}`, track.requester.displayAvatarURL({dynamic: true}))
            if(isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
            return message.channel.send(embed).then(msg => msg.delete({timeout: 4000}).catch(e => console.log(String(e.stack).yellow)));
        }

    } catch (e) {
        console.log(String(e.stack).red)
        message.channel.send(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle(String(":x: Found nothing for: **`" + search2).substr(0, 256-3) + "`**"))
    }
}

//function for playing playlists
async function playlist(client, message, args, type){
     try {
        const search = args.join(" ");
        let res;
        try {
            // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
            res = await client.manager.search(search, message.author);
            // Check the load type as this command is not that advanced for basics
            if (res.loadType === "LOAD_FAILED") throw res.exception;
            else if (res.loadType === "SEARCH_RESULT") throw {
                message: "Searches are not supported with this command. Use   ?play   or   ?search  "
            };
        } catch (e) {
            console.log(String(e.stack).red)
           return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`There was an error while searching:`).setDescription(`\`\`\`${e.message}\`\`\``));
        }

    // Create the player
    const player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: config.settings.selfDeaf,
    });
    player.set("message", message);
    player.set("playerauthor", message.author.id);
    if(!res.tracks[0])return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`There was an error while searching!`).setDescription(`Please retry!`));
    // Connect to the voice channel and add the track to the queue
    if (player.state !== "CONNECTED") {
        try{player.connect();}catch{}
        player.queue.add(res.tracks);
        let nembed = new Discord.MessageEmbed()
            .setTitle(`Added Playlist 🩸 **\`${res.playlist.name}`.substr(0, 256-3) + "`**")
            .setURL(res.playlist.uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
            .setThumbnail(res.tracks[0].displayThumbnail(1))
            .addField("Duration: ", `\`${format(res.playlist.duration)}\``, true)
            .addField("Queue length: ", `\`${player.queue.length} Songs\``, true)
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({
                dynamic: true
            }))
        message.channel.send(nembed).then(msg => msg.delete({
            timeout: 4000
        }).catch(e => console.log(String(e.stack).yellow)));
        player.play();
        if(isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
    } else {
        player.queue.add(res.tracks);
        let embed = new Discord.MessageEmbed()
            .setTitle(`Added Playlist 🩸 **\`${res.playlist.name}`.substr(0, 256-3) + "`**")
            .setURL(res.playlist.uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
            .setThumbnail(res.tracks[0].displayThumbnail(1))
            .addField("Duration: ", `\`${format(res.playlist.duration)}\``, true)
            .addField("Queue length: ", `\`${player.queue.length} Songs\``, true)
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({
                dynamic: true
            }))
        if(isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
        return message.channel.send(embed).then(msg => msg.delete({
            timeout: 4000
        }).catch(e => console.log(String(e.stack).yellow)));
    }

} catch (e) {
    console.log(String(e.stack).red)
    message.channel.send(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle(String(":x: Found nothing for: **`" + search).substr(0, 256-3) + "`**"))
}
}

//function for playling song
async function song(client, message, args, type){
     try {
        const search = args.join(" ");
    let res;
    try {
        // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
        if(type.split(":")[1] === "youtube" || type.split(":")[1] === "soundcloud")
        res = await client.manager.search({query: search, source: type.split(":")[1]}, message.author);
        else{
        res = await client.manager.search(search, message.author);}
        // Check the load type as this command is not that advanced for basics
        if (res.loadType === "LOAD_FAILED") throw res.exception;
        else if (res.loadType === "PLAYLIST_LOADED") throw {
            message: "Playlists are not supported with this command. Use   ?playlist  "
        };
    } catch (e) {
        console.log(String(e.stack).red)
        return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`There was an error while searching:`).setDescription(`\`\`\`${e.message}\`\`\``));
    }
    // Create the player
    const player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: config.settings.selfDeaf,
    });
    player.set("message", message);
    player.set("playerauthor", message.author.id);
    if(!res.tracks[0])return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`There was an error while searching!`).setDescription(`Please retry!`));
    // Connect to the voice channel and add the track to the queue
    if (player.state !== "CONNECTED") {
        try{player.connect();}catch{}
        player.queue.add(res.tracks[0]);
        player.play();
        if(isrequestchannel(client, message)) edit_request_message_queue_info(client, player);
      } else {
        player.queue.add(res.tracks[0]);
        let embed = new Discord.MessageEmbed()
            .setTitle(`Added to Queue 🩸 **\`${res.tracks[0].title}`.substr(0, 256-3) + "`**")
            .setURL(res.tracks[0].uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
            .setThumbnail(res.tracks[0].displayThumbnail(1))
            .addField("Duration: ", `\`${res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration)}\``, true)
            .addField("Song By: ", `\`${res.tracks[0].author}\``, true)
            .addField("Queue length: ", `\`${player.queue.length} Songs\``, true)
            .setFooter(`Requested by: ${res.tracks[0].requester.tag}`, res.tracks[0].requester.displayAvatarURL({
                dynamic: true
            }))
            console.log(isrequestchannel(client, message))
        if(isrequestchannel(client, message)) edit_request_message_queue_info(client, player);

        return message.channel.send(embed).then(msg => msg.delete({ timeout: 4000  }).catch(e => console.log(String(e.stack).yellow)));
    }
} catch (e) {
    console.log(String(e.stack).red)
    message.channel.send(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle(String(":x: Found nothing for: **`" + search).substr(0, 256-3) + "`**"))
}

}
