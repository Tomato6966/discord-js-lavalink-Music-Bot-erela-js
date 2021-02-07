const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const {format} = require("duratiform")
const { stripIndents } = require('common-tags');
const createBar = require("string-progressbar");
module.exports = {
    name: "nowplaying",
    category: "music",
    aliases: ["np", "current"],
    description: "Shows information about the current Song",
    usage: "nowplaying",
    run: async(client, message, args) => {
      const { channel } = message.member.voice;
      const player = client.manager.players.get(message.guild.id);
      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));  
      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      if(!player.queue.current) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("No song is currently playing in this guild."));  
      const { title, author, uri } = player.queue.current;
        const embed = new MessageEmbed()
        .setAuthor("Current song playing:", message.author.displayAvatarURL({dynamic: true}))
        .setThumbnail(player.queue.current.displayThumbnail())
        .setURL(uri)
        .setColor(ee.color)
        .setTitle(stripIndents`${player.playing ? "▶" : "⏸"} **${title}**`)
        .addField("Duration: " , "`" +  format(player.queue.current.duration, '(h:h:)(m:mm:)(s:ss)') + "`", true)
        .addField("Song By: ", "`" + author + "`", true)
        .addField("Queue length: ", `\`${player.queue.length} Songs\``, true)
       // .addField("Progressbar: ", "**[" + createBar((ms == 0 ? seek : ms), seek, 25, "▬", "🟢")[0] + "]**\n**" + new Date(seek * 1000).toISOString().substr(11, 8) + " / " + (ms == 0 ? " ◉ LIVE" : new Date(ms * 1000).toISOString().substr(11, 8))+ "**")
        .setFooter(`Requested by: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({dynamic: true}))
      return message.channel.send(embed);
    }
};