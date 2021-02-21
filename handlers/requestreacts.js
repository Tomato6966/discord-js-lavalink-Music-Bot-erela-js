const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const config = require("../botconfig/config.json")
const ee = require("../botconfig/embed.json")
const {format,databasing,escapeRegex} = require("../handlers/functions")
const playermanager = require("../handlers/playermanager");
let hasmap = new Map();
module.exports = async (client, message) => {
  client.on("messageReactionAdd",async (reaction, user)=>{
    if (reaction.message.channel.partial) await reaction.message.channel.fetch();
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    //get the message object out of the reaction
    const { message } = reaction;
    //get the database information
    let db = client.setups.get(message.guild.id)
    //if its not in the setup channel return
    if(message.channel != db.textchannel) return;
    //removing the reaction of the User
    reaction.users.remove(user.id).catch(e=>console.log(String(e.stack).yellow));
    //get the member who makes the reaction
    const member = message.guild.members.cache.get(user.id);
    //getting the Voice Channel Data of the Message Member
    const { channel } = member.voice;
    //if not in a Voice Channel return!
    if (!channel)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle("❌ ERROR | You need to join a voice channel.")
      );
    //get the lavalink erela.js player information
    const player = client.manager.players.get(message.guild.id);
    //if there is a player and the user is not in the same channel as the Bot return information message
    if (player && channel.id !== player.voiceChannel)
    return message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle("❌ ERROR | I am already playing somewhere else!")
      .setDescription(`You can listen to me in: \`${message.guild.channels.cache.get(player.VoiceChannel).name}\``)
    );
    //if the user is not in the channel as in the db voice channel return error
    if (channel.id !== db.voicechannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(`You need to be in the: \`${message.guild.channels.cache.get(db.voicechannel).name}\` VoiceChannel`));
    //switch case for every single reaction emoji someone makes
    switch(reaction.emoji.name){
      /**
        * @REACTION_INFO ⏪
        * Rewind the Current Music of 20 Seconds
      */
      case "⏪":
        //get the rewind
        let rewind = player.position - 20 * 1000;
        //if the rewind is too big or too small set it to 0
        if (rewind >= player.queue.current.duration - player.position || rewind < 0) {
            rewind = 0;
        }
        //seek to the position after the rewind
        player.seek(Number(rewind));
        //send an information message
        message.channel.send(new MessageEmbed()
          .setTitle(`⏪ Rewinded the song for: \`20 Seconds\`, to: ${format(Number(player.position))}`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        );
      break;
      /**
        * @REACTION_INFO ⏯
        * Pause or Resume the Current Music!
      */
      case "⏯":
        //pause the player / resume it
        player.pause(player.playing);
        //send information message
        message.channel.send(new MessageEmbed()
            .setTitle(`${player.playing ? "▶️ Resumed" : "⏸ Paused"} the Player.`)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          );
      break;
      /**
        * @REACTION_INFO ⏹
        * Stop the music and leave the channel!
      */
      case "⏹":
        //leave and stop the music
        player.destroy();
        //send information message
        message.channel.send(new MessageEmbed()
          .setTitle("⏹ Stopped and left your channel")
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        );
      break;
      /**
        * @REACTION_INFO ⏩
        * Forwards the music for 20 Seconds
      */
      case "⏩":
        //gets the forward time
        let forward = Number(player.position) + 20*1000;
        //if the forward is too big set it 1 second less
        if (Number(forward) >= player.queue.current.duration) { forward = player.queue.current.duration- 1000; }
        //seek to the amount of time after the forwards
        player.seek(Number(forward));
        //send an information message
        message.channel.send(new MessageEmbed()
          .setTitle(`⏩ Forwarded the Song for: \`20 Seconds\`, to: ${format(Number(player.position))}`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        );
      break;
      case "⏭": //skip track / stop playing
        //if there is no Queue
        if (player.queue.size == 0) {
          //stop the music and leave the channel
          player.destroy();
          //send informational message
          message.channel.send(new MessageEmbed()
            .setTitle("⏹ Stopped and left your channel")
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          );
        }
        //skip the track
        player.stop();
        //send an informational message
        message.channel.send(new MessageEmbed()
          .setTitle("⏭ Skipped to the next song")
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        );
      break;
      case "🔉": //reduce volume by 10%
        //get the volume
        let volumedown = player.volume - 10;
        //if its too small set it to 0
        if(volumedown < 0) volumedown = 0;
        //set the palyer volume to the volume
        player.setVolume(volumedown);
        //send an informational message
        message.channel.send(new MessageEmbed()
          .setTitle(`🔊 Volume set to: **\`${player.volume} %\`**`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        );
      break;
      case "🔊": //raise volume by 10%
        //get the volume
        let volumeup = player.volume + 10;
        //if its too small set it to 0
        if(volumeup > 150) volumeup = 0;
        //set the palyer volume to the volume
        player.setVolume(volumeup);
        //send an informational message
        message.channel.send(new MessageEmbed()
          .setTitle(`🔊 Volume set to: **\`${player.volume} %\`**`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        );
      break;
      case "🔁": //change repeat mode --> track --> Queue --> none
        //if both repeat modes are off
        if(!player.trackRepeat && !hasmap.get(message.guild.id)){
            hasmap.set(message.guild.id, 1)
            //and queue repeat mode to off
            player.setQueueRepeat(!player.queueRepeat);
            //set track repeat mode to on
            player.setTrackRepeat(!player.trackRepeat);
            //Send an informational message
            message.channel.send(new MessageEmbed()
              .setTitle(`🔀 Track Loop is now ${player.trackRepeat ? "active" : "disabled"}.`)
              .setDescription(`And Queue Loop is now ${player.queueRepeat ? "active" : "disabled"}.`)
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
            );
        }
        //if track repeat mode is on and queue repeat mode off
        else if(player.trackRepeat && hasmap.get(message.guild.id) === 1){
          hasmap.set(message.guild.id, 2)
          //set track repeat mode off
          player.setTrackRepeat(!player.trackRepeat);
          //set queue repeat mode on
          player.setQueueRepeat(!player.queueRepeat);
          //send informational message
          message.channel.send(new MessageEmbed()
            .setTitle(`🔀 Queue Loop is now ${player.queueRepeat ? "active" : "disabled"}.`)
            .setDescription(`And Track Loop is now ${player.trackRepeat ? "active" : "disabled"}.`)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          );
        }
        //otherwise like queue on and track should be off...
        else{
            hasmap.delete(message.guild.id)
          //set track repeat mode off
          player.setTrackRepeat(false);
          //set queue repeat mode off
          player.setQueueRepeat(false);
          //send informational message
          message.channel.send(new MessageEmbed()
            .setTitle(`🔀 Queue Loop is now ${player.queueRepeat ? "active" : "disabled"}.`)
            .setDescription(`And Track Loop is now ${player.trackRepeat ? "active" : "disabled"}.`)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          );
        }
      break;
      case "🔀": //shuffle the Queue
        //shuffle the Queue
        player.queue.shuffle();
        //send informational message
        message.channel.send(new MessageEmbed()
          .setTitle("🔀 The queue is now shuffled.")
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        );
      break;
    }

  })
}
