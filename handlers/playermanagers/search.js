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

//function for searching songs
async function search(client, message, args, type) {
  var search = args.join(" ");
  try {
    var res;
    var player = client.manager.players.get(message.guild.id);
    if(!player)
      player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: config.settings.selfDeaf,
      });
    let state = player.state;
    if (state !== "CONNECTED") { 
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.connect();
      player.stop();
    }
    try {
      // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
      res = await client.manager.search({
        query: search,
        source: type.split(":")[1]
      }, message.author);
      // Check the load type as this command is not that advanced for basics
      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "PLAYLIST_LOADED") throw {
        message: "Playlists are not supported with this command. Use   ?playlist  "
      };
    } catch (e) {
      console.log(String(e.stack).red)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ Error | There was an error while searching:`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }


    var max = 10,
      collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
    if (res.tracks.length < max) max = res.tracks.length;
    track = res.tracks[0]

    var results = res.tracks
      .slice(0, max)
      .map((track, index) => `**${++index})** [\`${String(track.title).substr(0, 60).split("[").join("{").split("]").join("}")}\`](${track.uri}) - \`${format(track.duration).split(" | ")[0]}\``)
      .join('\n');

    message.channel.send(new MessageEmbed()
      .setTitle(`Search result for: 🔎 **\`${search}`.substr(0, 256 - 3) + "`**")
      .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      .setDescription(results)
      .setFooter(`Search-Request by: ${track.requester.tag}`, track.requester.displayAvatarURL({
        dynamic: true
      }))
    )

    await message.channel.send(new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle("Pick your Song with the `INDEX Number`")
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
        .setTitle(String("❌ Error | Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
        .setDescription(`Please retry!`)
      );
    if (player.state !== "CONNECTED") {
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.connect();
      //add track
      player.queue.add(track);
      //set the variables
      //play track
      player.play();
      player.pause(false);
      //if its inside a request channel edit the msg
      var irc = await isrequestchannel(client, player.textChannel, player.guild);
      if (irc) {
        edit_request_message_track_info(client, player, player.queue.current);
        edit_request_message_queue_info(client, player);
      }
    } 
    else if(!player.queue || !player.queue.current){
      //add track
      player.queue.add(track);
      //play track
      player.play();
      player.pause(false);
      //if its inside a request channel edit the msg
      var irc = await isrequestchannel(client, player.textChannel, player.guild);
      if (irc) {
        edit_request_message_track_info(client, player, player.queue.current);
        edit_request_message_queue_info(client, player);
      }
    }
    else {
      player.queue.add(track);
      //if its inside a request channel edit the msg
      var irc = await isrequestchannel(client, player.textChannel, player.guild);
      if (irc) {
        edit_request_message_queue_info(client, player);
      }
      var embed3 = new MessageEmbed()
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
      return message.channel.send(embed3).then(msg => {
          if(msg) msg.delete({
            timeout: 4000
          }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
      });
    }

  } catch (e) {
    console.log(String(e.stack).red)
    message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(String("❌ Error | Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
    )
  }
}

module.exports = search;
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
