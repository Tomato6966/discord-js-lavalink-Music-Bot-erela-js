var {
    MessageEmbed
  } = require("discord.js")
  var ee = require("../../botconfig/embed.json")
  var config = require("../../botconfig/config.json")
  var {
    format,
    isrequestchannel,
    delay,
    edit_request_message_queue_info,
    edit_request_message_track_info,
    arrayMove
  } = require("../functions")

//function for playling song
async function similar(client, message, args, type) {
    try {
      //get a playlist out of it
      var mixURL = args.join(" ");
      //get the player instance
      var player = client.manager.players.get(message.guild.id);
      //search for similar tracks
      var res = await client.manager.search(mixURL, message.author);
      //if nothing is found, send error message, plus if there  is a delay for the empty QUEUE send error message TOO
      if (!res || res.loadType === 'LOAD_FAILED' || res.loadType !== 'PLAYLIST_LOADED') {
        return client.channels.cache.get(player.textChannel).send(new MessageEmbed()
          .setTitle("❌ Error | Found nothing related for the latest Song")
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
        );
      }
      //if its just adding do this
      if (type.split(":")[1] === "add") {
        //add the track
        player.queue.add(res.tracks[0]);
        //if its in a request channel edit it
        var irc = await isrequestchannel(client, player.textChannel, player.guild);
        if (irc) {
          edit_request_message_queue_info(client, player);
        }
        //send information message
        var embed2 = new MessageEmbed()
          .setTitle(`Added to Queue 🩸 **\`${res.tracks[0].title}`.substr(0, 256 - 3) + "`**")
          .setURL(res.tracks[0].uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
          .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
          .addField("⌛ Duration: ", `\`${res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration)}\``, true)
          .addField("💯 Song By: ", `\`${res.tracks[0].author}\``, true)
          .addField("🔂 Queue length: ", `\`${player.queue.length} Songs\``, true)
          .setFooter(`Requested by: ${res.tracks[0].requester.tag}`, res.tracks[0].requester.displayAvatarURL({
            dynamic: true
          }))
  
        return message.channel.send(embed2).then(msg => {
          if (msg) msg.delete({
            timeout: 4000
          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
        });
      }
      //if its seach similar
      if (type.split(":")[1] === "search") {
        var max = 15,
          collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
        if (res.tracks.length < max) max = res.tracks.length;
        track = res.tracks[0]
  
        var results = res.tracks
          .slice(0, max)
          .map((track, index) => `**${++index})** [\`${String(track.title).substr(0, 60).split("[").join("{").split("]").join("}")}\`](${track.uri}) - \`${format(track.duration).split(" | ")[0]}\``)
          .join('\n');
        var searchembed = new MessageEmbed()
          .setTitle(`Search result for: 🔎 **\`${player.queue.current.title}`.substr(0, 256 - 3) + "`**")
          .setColor(ee.color)
          .setDescription(results)
          .setFooter(`Search-Request by: ${track.requester.tag}`, track.requester.displayAvatarURL({
            dynamic: true
          }))
        message.channel.send(searchembed)
        await message.channel.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("👍 Pick your Song with the `INDEX Number`")
        )
        try {
          collected = await message.channel.awaitMessages(filter, {
            max: 1,
            time: 30e3,
            errors: ['time']
          });
        } catch (e) {
          if (!player.queue.current) player.destroy();
          return message.channel.send(new MessageEmbed()
            .setTitle("❌ Error | You didn't provide a selection")
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
          );
        }
        var first = collected.first().content;
        if (first.toLowerCase() === 'end') {
          if (!player.queue.current) player.destroy();
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle('❌ Error | Cancelled selection.')
          );
        }
        var index = Number(first) - 1;
        if (index < 0 || index > max - 1)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ Error | The number you provided too small or too big (1-${max}).`)
          );
        track = res.tracks[index];
        if (!res.tracks[0])
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(String("❌ Error | Found nothing for: **`" + player.queue.current.title).substr(0, 256 - 3) + "`**")
            .setDescription(`Please retry!`)
          );
        if (player.state !== "CONNECTED") {
          //set the variables
          player.set("message", message);
          player.set("playerauthor", message.author.id);
          // Connect to the voice channel and add the track to the queue
  
          player.connect();
          player.queue.add(track);
          player.play();
      player.pause(false);
  
          var irc = await isrequestchannel(client, player.textChannel, player.guild);
          if (irc) {
            edit_request_message_track_info(client, player, player.queue.current);
            edit_request_message_queue_info(client, player);
          }
        } else {
          player.queue.add(track);
          var embed = new MessageEmbed()
            .setTitle(`Added to Queue 🩸 **\`${track.title}`.substr(0, 256 - 3) + "`**")
            .setURL(track.uri)
            .setColor(ee.color)
            .setThumbnail(track.displayThumbnail(1))
            .addField("⌛ Duration: ", `\`${track.isStream ? "LIVE STREAM" : format(track.duration)}\``, true)
            .addField("💯 Song By: ", `\`${track.author}\``, true)
            .addField("🔂 Queue length: ", `\`${player.queue.length} Songs\``, true)
            .setFooter(`Requested by: ${track.requester.tag}`, track.requester.displayAvatarURL({
              dynamic: true
            }))
  
          var irc = await isrequestchannel(client, player.textChannel, player.guild);
          if (irc) {
            edit_request_message_queue_info(client, player);
          }
          return message.channel.send(embed).then(msg => {
              if(msg) msg.delete({
                timeout: 4000
              }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
          });
        }
      }
    } catch (e) {
      console.log(String(e.stack).red)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(String("❌ Error | Found nothing for: **`" + player.queue.current.title).substr(0, 256 - 3) + "`**")
      )
    }
}

module.exports = similar;
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
