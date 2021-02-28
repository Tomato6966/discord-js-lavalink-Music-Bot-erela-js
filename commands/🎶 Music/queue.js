const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { format, delay } = require("../../handlers/functions");
module.exports = {
    name: "queue",
    category: "🎶 Music",
    aliases: ["qu", "que", "queu", "list"],
    description: "Shows the Queue",
    usage: "queue",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      //get the channel instance from the Member
      const { channel } = message.member.voice;
      //if the member is not in a channel, return
      if (!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username, ee.footericon)
          .setTitle("❌ Error | You need to join a voice channel.")
        );
      //get the player instance
      const player = client.manager.players.get(message.guild.id);
      //if no player available return error | aka not playing anything
      if (!player)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username, ee.footericon)
          .setTitle("❌ Error | There is nothing playing")
        );
      //if not in the same channel as the player, return Error
      if (channel.id !== player.voiceChannel)
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle("❌ Error | You need to be in my voice channel to use this command!")
          .setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
        );
        //define the Embed
        const embed = new MessageEmbed()
        .setAuthor(`Queue for ${message.guild.name}  -  [ ${player.queue.length} Tracks ]`, message.guild.iconURL({dynamic:true}))
        .setColor(ee.color);
        //if there is something playing rn, then add it to the embed
        if (player.queue.current) embed.addField("**0) CURRENT TRACK**", `[${player.queue.current.title.substr(0, 35)}](${player.queue.current.uri}) - \`${player.queue.current.isStream ? "LIVE STREAM" : format(player.queue.current.duration).split(" | ")[0]}\` - request by: **${player.queue.current.requester.tag}**`);
        //get the right tracks of the current tracks
        const tracks = player.queue;
        //if there are no other tracks, information
        if (!tracks.length)
          return message.channel.send(embed.setDescription(`❌ No tracks in ${page > 1 ? `page ${page}` : "the queue"}`)).then(async msg => {
            try{
              await delay(5000)
              if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
            }catch{ /* */ }
          })
        //if not too big send queue in channel
        if(tracks.length < 15)
          return message.channel.send(embed.setDescription(tracks.map((track, i) => `**${++i})** [${track.title.substr(0, 35)}](${track.uri}) - \`${track.isStream ? "LIVE STREAM" : format(track.duration).split(" | ")[0]}\` - **requested by: ${track.requester.tag}**`).join("\n"))).then(async msg => {
            try{
              await delay(5000)
              if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
            }catch{ /* */ }
          })
        //get an array of quelist where 15 tracks is one index in the array
        let quelist = [];
        for(let i = 0; i < tracks.length; i+=15){
          let songs = tracks.slice(i, i+15);
          quelist.push(songs.map((track, index) => `**${i + ++index})** [${track.title.split("[").join("{").split("]").join("}").substr(0, 35)}](${track.uri}) - \`${track.isStream ? "LIVE STREAM" : format(track.duration).split(" | ")[0]}\` - **requested by: ${track.requester.tag}**`).join("\n"))
        }
        let limit = quelist.length <= 5 ? quelist.length : 5
        for(let i = 0; i < limit; i++){
          await message.author.send(embed.setDescription(String(quelist[i]).substr(0, 2048)));
        }
        message.author.send(new MessageEmbed()
          .setDescription(`✅ Sent from <#${message.channel.id}>${quelist.length <= 5 ? "" : "\nNote: Send 5 Embeds, but there would be more..."}`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        )
        message.channel.send(new MessageEmbed()
          .setTitle(`✅ Check your \`direct messages\` to see the Queue`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        ).then(async msg => {
          try{
            await delay(4000)
            if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
          }catch{ /* */ }
        })

    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
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
