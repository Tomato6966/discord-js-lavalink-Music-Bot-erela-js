const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
    name: "nowplaying",
    category: "🎶 Music",
    aliases: ["np", "current"],
    description: "Shows information about the current Song",
    usage: "nowplaying",
    run: async(client, message, args) => {
      const { channel } = message.member.voice;
      if (!channel) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
      
      const player = client.manager.players.get(message.guild.id);
      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));  
      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      if(!player.queue.current) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("No song is currently playing in this guild."));  
      const { title, author, uri } = player.queue.current;
        const embed = new MessageEmbed()
        .setAuthor("Current song playing:", message.author.displayAvatarURL({dynamic: true}))
        .setThumbnail(player.queue.current.displayThumbnail(1))
        .setURL(uri)
        .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        .setTitle(`${player.playing ? "▶" : "⏸"} **${title}**`)
        .addField("Duration: " , "`" +  format(player.queue.current.duration) + "`", true)
        .addField("Song By: ", "`" + author + "`", true)
        .addField("Queue length: ", `\`${player.queue.length} Songs\``, true)
        .addField("Progress: ", "**[" + createBar((player.queue.current.duration == 0 ? player.position : player.queue.current.duration), player.position, 25, "▬", "🔶")[0] + "]**\n**" + new Date(player.position).toISOString().substr(11, 8) + " / " + (player.queue.current.duration == 0 ? " ◉ LIVE" : new Date(player.queue.current.duration).toISOString().substr(11, 8))+ "**")
        .setFooter(`Requested by: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({dynamic: true}))
      return message.channel.send(embed);
    }
};
const createBar = (total, current, size = 25, line = '▬', slider = '🔶') => current > total ? [line.repeat(size * 2), (current / total) * 100] : [line.repeat(Math.round(size * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total))), current / total];
function format(millis){
  var h=Math.floor(millis/360000),m=Math.floor(millis/60000),s=((millis%60000)/1000).toFixed(0);
  if(h<1) return(m<10?'0':'')+m*":"+(s<10?'0':'')+s;
  else return(h<10?'0':'')+h+":"+(m<10?'0':'')+m+":"+(s<10?'0':'')+s;
  }
  