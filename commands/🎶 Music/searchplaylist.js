const Discord = require(`discord.js`)
const {
    MessageEmbed
} = require(`discord.js`)
const config = require(`../../botconfig/config.json`)
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const playermanager = require(`../../handlers/playermanager`)
const { createBar, format} = require(`../../handlers/functions`);
module.exports = {
    name: `searchplaylist`,
    category: `🎶 Music`,
    aliases: [`searchpl`],
    description: `Searches a playlist from youtube`,
    usage: `searchplaylist <Name / URL>`,
    run: async (client, message, args, cmduser, text, prefix) => {
      try{
        /*const {
            channel
        } = message.member.voice;
        if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`You need to join a voice channel.`));

        if (!args.length) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`you need to give me a URL or a search term.`));

        const search = args.join(` `);
        let res;
        try {
            // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
            res = await client.manager.search(search, message.author);
            // Check the load type as this command is not that advanced for basics
            if (res.loadType === `LOAD_FAILED`) throw res.exception;
        } catch (e) {
        console.log(String(e.stack).red)
           return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`There was an error while searching:`).setDescription(`\`\`\`${e.message}\`\`\``));
        }
        try {

            let max = 10,
                collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
            if (res.tracks.length < max) max = res.tracks.length;
            console.log(res.playlist)
            const results = res.playlist
                .slice(0, max)
                .map((playlist, index) => `**${++index})** [\`${String(playlist.title).substr(0, 60)}\`](${playlist.uri}) - ${format(playlist.duration)}`)
                .join('\n');
            let searchembed = new Discord.MessageEmbed()
                .setTitle(`Search result for: 🔎 **${search}**.`)
                .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
                .setDescription(results)
                .setFooter(`Search-Request by: ${message.author.tag}`, message.author.displayAvatarURL({
                    dynamic: true
                }))
            message.channel.send(searchembed)
            await message.channel.send(new Discord.MessageEmbed().setColor(ee.color).setTitle(`Pick your Song with the `INDEX Number``))
            try {
                collected = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 30e3,
                    errors: ['time']
                });
            } catch (e) {
                if (!player.queue.current) player.destroy();
                return message.channel.send(`you didn't provide a selection.`);
            }
            const first = collected.first().content;
            if (first.toLowerCase() === 'end') {
                if (!player.queue.current) player.destroy();
                return message.channel.send(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle('${emoji.msg.ERROR} Cancelled selection.'));
            }
            const index = Number(first) - 1;
            if (index < 0 || index > max - 1) return message.channel.send(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle(`${emoji.msg.ERROR}The number you provided too small or too big (1-${max}).`));
            // Create the player
            const player = client.manager.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id,
                selfDeafen: true,
            });


            if (player.state !== `CONNECTED`) {
                // Connect to the voice channel and add the track to the queue
                player.connect();

                player.queue.add(res.tracks);
                player.play()
            } else {
                player.queue.add(res.tracks);
            }
            let embed = new Discord.MessageEmbed()
            try{embed.setTitle(`Added Playlist 🩸 **\`${res.playlist.name}\`**`)}catch{}
            try{embed.setURL(res.playlist.uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)}catch{}
            try{ embed.setThumbnail(res.tracks[0].displayThumbnail(1))}catch{}
            try{embed.addField(`Duration: `, `\`${format(res.playlist.duration)}\``, true)}catch{}
            try{embed.addField(`Queue length: `, `\`${player.queue.length} Songs\``, true)}catch{}
            try{embed.setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({
                dynamic: true
            }))}catch{}
        return message.channel.send(embed)
        } catch (e) {
            console.log(String(e.stack).red)
            message.channel.send(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle(`${emoji.msg.ERROR} Found nothing for: ` + search))
        }*/
        message.channel.send(`THIS CMD IS NOT FINISHED YET!`)
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.message}\`\`\``)
        );
    }
  }
};
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
