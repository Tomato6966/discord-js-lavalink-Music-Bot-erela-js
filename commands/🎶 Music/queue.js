const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
    name: "queue",
    category: "🎶 Music",
    aliases: ["qu", "que", "queu"],
    description: "Shows the Queue",
    usage: "queue",
    run: async(client, message, args) => {
      const { channel } = message.member.voice;
      if (!channel) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
      
      const player = message.client.manager.get(message.guild.id);
      if (!player) return message.reply("there is no player for this guild.");
  
      const queue = player.queue;
      const embed = new MessageEmbed()
        .setAuthor(`Queue for ${message.guild.name}`);
  
      // change for the amount of tracks per page
      const multiple = 20;
      const page = args.length && Number(args[0]) ? Number(args[0]) : 1;
  
      const end = page * multiple;
      const start = end - multiple;
  
      const tracks = queue.slice(start, end);
  
      if (queue.current) embed.addField("Current", `[${queue.current.title}](${queue.current.uri})`);
  
      if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
      else embed.setDescription(tracks.map((track, i) => `**${start + (++i)})** [${track.title.substr(0, 60)}](${track.uri}) - \`${track.isStream ? "LIVE STREAM" : format(track.duration)}\``).join("\n"));
      embed.setColor(ee.color)
      const maxPages = Math.ceil(queue.length / multiple);
  
      embed.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages} | Type ?queue <Number>` );
      
      return message.reply(embed);
  }
}
function format(millis){
  var h=Math.floor(millis/360000),m=Math.floor(millis/60000),s=((millis%60000)/1000).toFixed(0);
  if(h<1) return(m<10?'0':'')+m+":"+(s<10?'0':'')+s;
  else return(h<10?'0':'')+h+":"+(m<10?'0':'')+m+":"+(s<10?'0':'')+s;
  }
  