const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { format } = require("../../handlers/functions");
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
      .setAuthor(`Queue for ${message.guild.name}`, message.guild.iconURL({dynamic:true}))
      .setColor(ee.color);
      //set the Song per Page Limit
      const multiple = 15;
      //define the current page
      const page = args.length && Number(args[0]) ? Number(args[0]) : 1;
      //get the end of the page
      const end = page * multiple;
      //get the start of the page
      const start = end - multiple;
      //get the right tracks of the current tracks
      const tracks = player.queue.slice(start, end);
      //if there is something playing rn, then add it to the embed
      if (player.queue.current) embed.addField("**0) CURRENT TRACK**", `[${player.queue.current.title.substr(0, 35)}](${player.queue.current.uri}) - \`${player.queue.current.isStream ? "LIVE STREAM" : format(player.queue.current.duration)}\` - request by: **${player.queue.current.requester.tag}**`);
      //if there are no other tracks, information
      if (!tracks.length) embed.setDescription(`❌ No tracks in ${page > 1 ? `page ${page}` : "the queue"}`);
      //otherwise add a description with each song
      else embed.setDescription(tracks.map((track, i) => `**${start + ++i})** [${track.title.substr(0, 35)}](${track.uri}) - \`${track.isStream ? "LIVE STREAM" : format(track.duration)}\` - **requested by: ${track.requester.tag}**`).join("\n"));
      //define the maximum amount of embed pages
      embed.setFooter(`Page ${page > Math.ceil(player.queue.length / multiple) ? Math.ceil(player.queue.length / multiple) : page} of ${Math.ceil(player.queue.length / multiple)} | Type \`${prefix}queue <Number>\``, ee.footericon);
      //safe the description on a temp. variable
      let k = embed.description
      //loop for the length
      for (let i = 0; i < k.length; i += 2048)
        //send an embed for each embed which is too big
        message.channel.send(embed.setDescription(k.substr(i,  i + 2048)))
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
