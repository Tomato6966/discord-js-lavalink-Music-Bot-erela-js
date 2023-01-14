var {
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  Permissions
} = require(`discord.js`),
  ms = require(`ms`),

  config = require(`${process.cwd()}/botconfig/config.json`),
  settings = require(`${process.cwd()}/botconfig/settings.json`),
  emoji = require(`${process.cwd()}/botconfig/emojis.json`),
  ee = require(`${process.cwd()}/botconfig/embed.json`), {
    TrackUtils
  } = require(`erela.js`), {
    createBar,
    format,
    check_if_dj,
    databasing,
    autoplay,
    delay
  } = require(`${process.cwd()}/handlers/functions`),
  playermanager = require(`${process.cwd()}/handlers/playermanager`),

  playercreated = new Map(),
  collector = false,
  mi,
  playerintervals = new Map(),
  playerintervals_autoresume = new Map();
module.exports = (client) => {
  /**
   * AUTO-RESUME-FUNCTION
   */
  const autoconnect = async () => {
    await delay(500);
    let guilds = client.autoresume.keyArray();
    if (!guilds || guilds.length == 0) return;
    for (const gId of guilds) {
      try {
        let guild = client.guilds.cache.get(gId);
        if (!guild) {
          client.autoresume.delete(gId);
          client.logger(`Autoresume`.brightCyan + ` - Bot got Kicked out of the Guild`)
          continue;
        }
        var data = client.autoresume.get(gId);
        if(!data) continue;

        let voiceChannel = guild.channels.cache.get(data.voiceChannel);
        if (!voiceChannel) voiceChannel = await guild.channels.fetch(data.voiceChannel).catch(() => {}) || false;
        if (!voiceChannel || !voiceChannel.members || voiceChannel.members.filter(m => !m.user.bot && !m.voice.deaf && !m.voice.selfDeaf).size < 1) {
          client.autoresume.delete(gId);
          client.logger(`Autoresume`.brightCyan + ` - Voice Channel is either Empty / no Listeners / got deleted`)
          continue;
        }

        let textChannel = guild.channels.cache.get(data.textChannel);
        if (!textChannel) textChannel = await guild.channels.fetch(data.textChannel).catch(() => {}) || false;
        if (!textChannel) {
          client.autoresume.delete(gId);
          client.logger(`Autoresume`.brightCyan + ` - Text Channel got deleted`)
          continue;
        }

        let player = await client.manager.create({
          guild: data.guild,
          voiceChannel: data.voiceChannel,
          textChannel: data.textChannel,
          selfDeafen: true,
        })
        player.set("autoresume", true);
        if (player && player.node && !player.node.connected) await player.node.connect();
        await player.connect();
        if (data.current && data.current.identifier) {
          const buildTrack = async (data) => {
            return data.track && data.identifier ? TrackUtils.build({
                track: data.track,
                info: {
                  title: data.title || null,
                  identifier: data.identifier,
                  author: data.author || null,
                  length: data.length || data.duration || null,
                  isSeekable: !!data.isStream,
                  isStream: !!data.isStream,
                  uri: data.uri || null,
                  thumbnail: data.thumbnail || null,
                }
              }, data.requester ? client.users.cache.get(data.requester) || await client.users.fetch(data.requester).catch(() => {}) || null : null) :
              TrackUtils.buildUnresolved({
                title: data.title || '',
                author: data.author || '',
                duration: data.duration || 0
              }, data.requester ? client.users.cache.get(data.requester) || await client.users.fetch(data.requester).catch(() => {}) || null : null)
          }
          player.queue.add(await buildTrack(data.current));
          player.set("playerauthor", data.current.requester);
          player.play();
          if (data.queue.length)
            for (let track of data.queue) player.queue.add(await buildTrack(track))
        } else if (data.queue && data.queue.length) {
          const track = await buildTrack(data.queue.shift());
          player.queue.add(track)
          player.play()
          if (data.queue.length)
            for (let track of data.queue) player.queue.add(await buildTrack(track))
        } else {
          player.destroy();
          client.logger(`Autoresume`.brightCyan + ` - Destroyed the player, because there are no tracks available`);
          continue;
        }
        client.logger(`Autoresume`.brightCyan + ` - Added ${player.queue.length} Tracks on the QUEUE and started playing ${player.queue.current.title} in ${guild.name}`);


        //ADJUST THE QUEUE SETTINGS
        player.set("pitchvalue", data.pitchvalue)
        await player.setVolume(data.volume)
        if (data.queueRepeat) {
          player.setQueueRepeat(data.queueRepeat);
        }
        if (data.trackRepeat) {
          player.setTrackRepeat(data.trackRepeat);
        }
        if (!data.playing) {
          player.pause(true);
        }
        await player.seek(data.position);
        switch (data.eq) {
          case `🎵 Music`:
            player.set("eq", "🎵 Music");
            await player.setEQ(client.eqs.music);
            break;
          case `🎙 Pop`:
            player.set("eq", "🎙 Pop");
            await player.setEQ(client.eqs.pop);
            break;
          case `💾 Electronic`:
            player.set("eq", "💾 Electronic");
            await player.setEQ(client.eqs.electronic);
            break;
          case `📜 Classical`:
            player.set("eq", "📜 Classical");
            await player.setEQ(client.eqs.classical);
            break;
          case `🎚 Metal`:
            player.set("eq", "🎚 Metal");
            await player.setEQ(client.eqs.rock);
            break;
          case `📀 Full`:
            player.set("eq", "📀 Full");
            await player.setEQ(client.eqs.full);
            break;
          case `💿 Light`:
            player.set("eq", "💿 Light");
            await player.setEQ(client.eqs.light);
            break;
          case `🕹 Gaming`:
            player.set("eq", "🕹 Gaming");
            await player.setEQ(client.eqs.gaming);
            break;
          case `🎛 Bassboost`:
            player.set("eq", "🎛 Bassboost");
            await player.setEQ(client.eqs.bassboost);
            break;
          case `🔈 Earrape`:
            player.set("eq", "🔈 Earrape");
            await player.setVolume(player.volume + 50);
            await player.setEQ(client.eqs.earrape);
            break;
        }

        switch (data.filter) {
          case "💯 Vibrato": {
            require("../../commands/👀 Filter/vibrato").run(client, {
              guild: {
                id: player.guild
              }
            }, [], null, null, null, player)
          }
          break;
        case "💢 Vibrate": {
          require("../../commands/👀 Filter/vibrate").run(client, {
            guild: {
              id: player.guild
            }
          }, [], null, null, null, player)
        }
        break;
        case "🏮 Tremolo": {
          require("../../commands/👀 Filter/tremolo").run(client, {
            guild: {
              id: player.guild
            }
          }, [], null, null, null, player)
        }
        break;
        case "⏱ Speed": {
          require("../../commands/👀 Filter/speed").run(client, {
            guild: {
              id: player.guild
            }
          }, [player.get("filtervalue")], null, null, null, player)
        }
        break;
        case "⏱ Slowmode": {
          require("../../commands/👀 Filter/slowmo").run(client, {
            guild: {
              id: player.guild
            }
          }, [], null, null, null, player)
        }
        break;
        case "📉 Rate": {
          require("../../commands/👀 Filter/rate").run(client, {
            guild: {
              id: player.guild
            }
          }, [player.get("filtervalue")], null, null, null, player)
        }
        break;
        case "📈 Pitch": {
          require("../../commands/👀 Filter/pitch").run(client, {
            guild: {
              id: player.guild
            }
          }, [player.get("filtervalue")], null, null, null, player)
        }
        break;
        case "👻 Nightcore": {
          require("../../commands/👀 Filter/nightcore").run(client, {
            guild: {
              id: player.guild
            }
          }, [], null, null, null, player)
        }
        break;
        case "👾 Darth Vader": {
          require("../../commands/👀 Filter/darthvader").run(client, {
            guild: {
              id: player.guild
            }
          }, [], null, null, null, player)
        }
        break;
        case "🐿️ Chipmunk": {
          require("../../commands/👀 Filter/chipmunk").run(client, {
            guild: {
              id: player.guild
            }
          }, [], null, null, null, player)
        }
        break;
        case "👺 China": {
          require("../../commands/👀 Filter/china").run(client, {
            guild: {
              id: player.guild
            }
          }, [], null, null, null, player)
        }
        break;
        case "🎚 Low Bass": {
          require("../../commands/👀 Filter/bassboost").run(client, {
            guild: {
              id: player.guild
            }
          }, ["low"], null, null, null, player)
        }
        break;
        case "🎚 Medium Bass": {
          require("../../commands/👀 Filter/bassboost").run(client, {
            guild: {
              id: player.guild
            }
          }, ["medium"], null, null, null, player)
        }
        break;
        case "🎚 High Bass": {
          require("../../commands/👀 Filter/bassboost").run(client, {
            guild: {
              id: player.guild
            }
          }, ["high"], null, null, null, player)
        }
        break;
        case "🎚 Earrape Bass": {
          require("../../commands/👀 Filter/bassboost").run(client, {
            guild: {
              id: player.guild
            }
          }, ["earrape"], null, null, null, player)
        }
        break;
        case "🔊 8D": {
          require("../../commands/👀 Filter/3d").run(client, {
            guild: {
              id: player.guild
            }
          }, [], null, null, null, player)
        }
        break;
        }
        client.autoresume.delete(player.guild)
        client.logger("changed autoresume track to queue adjustments + deleted the database entry")
        if (data.playing) {
          setTimeout(() => {
            player.pause(true);
            setTimeout(() => player.pause(false), client.ws.ping * 2);
          }, client.ws.ping * 2)

        }
        await delay(settings["auto-resume-delay"] || 1000)
      } catch (e) {
        console.log(e)
      }
    }
  }
  /**
   * PLAYER / MANAGER EVENTS
   */
  let started = false;
  client.manager
    .on(`nodeConnect`, (node) => {
      if (!started) {
        started = true;
        setTimeout(() => autoconnect(), 2 * client.ws.ping)
      }
      setTimeout(() => {
        started = false;
      }, 5000)
    })
    .on(`playerCreate`, async (player) => {
      playercreated.set(player.guild, true)
      //for checking the relevant messages
      var interval = setInterval(async () => {
        if (client.musicsettings.get(player.guild, `channel`) && client.musicsettings.get(player.guild, `channel`).length > 5) {
          client.logger(`Music System - Relevant Checker - Checkingfor unrelevant Messages`)
          let messageId = client.musicsettings.get(player.guild, `message`);
          //try to get the guild
          let guild = client.guilds.cache.get(player.guild);
          if (!guild) return client.logger(`Music System - Relevant Checker - Guild not found!`)
          //try to get the channel
          let channel = guild.channels.cache.get(client.musicsettings.get(player.guild, `channel`));
          if (!channel) channel = await guild.channels.fetch(client.musicsettings.get(player.guild, `channel`)).catch(() => {}) || false
          if (!channel) return client.logger(`Music System - Relevant Checker - Channel not found!`)
          if (!channel.permissionsFor(channel.guild.me).has(Permissions.FLAGS.MANAGE_MESSAGES)) return client.logger(`Music System - Relevant Checker - Missing Permissions`)
          //try to get the channel
          let messages = await channel.messages.fetch();
          if (messages.filter(m => m.id != messageId).size > 0) {
            channel.bulkDelete(messages.filter(m => m.id != messageId)).catch(() => {})
              .then(messages => client.logger(`Music System - Relevant Checker - Bulk deleted ${messages.size} messages`))
          } else {
            client.logger(`Music System - Relevant Checker - No Relevant Messages`)
          }
        }
      }, 60000);
      playerintervals.set(player.guild, interval);
      /**
       * AUTO-RESUME-DATABASING
       */
      var autoresumeinterval = setInterval(async () => {
        var pl = client.manager.players.get(player.guild);
        if (client.settings.get(pl.guild, `autoresume`)) {
          let filter = pl.get(`filter`)
          let filtervalue = pl.get(`filtervalue`)
          let autoplay = pl.get(`autoplay`)
          let eq = pl.get(`eq`)
          const makeTrack = track => {
            return {
              track: track.track,
              title: track.title || null,
              identifier: track.identifier,
              author: track.author || null,
              length: track.duration || null,
              isSeekable: !!track.isStream,
              isStream: !!track.isStream,
              uri: track.uri || null,
              thumbnail: track.thumbnail || null,
              requester: track.requester.id,
            }
          }
          client.autoresume.ensure(pl.guild, {
            guild: null,
            voiceChannel: null,
            textChannel: null,
            queue: null,
            current: null,
            volume: null,
            queueRepeat: null,
            trackRepeat: null,
            playing: null,
            position: null,
            eq: null,
            filter: null,
            filtervalue: null,
            autoplay: null,
          });
          var data = client.autoresume.get(pl.guild);
          if (data.guild != pl.guild) client.autoresume.set(pl.guild, pl.guild, `guild`)
          if (data.voiceChannel != pl.voiceChannel) client.autoresume.set(pl.guild, pl.voiceChannel, `voiceChannel`)
          if (data.textChannel != pl.textChannel) client.autoresume.set(pl.guild, pl.textChannel, `textChannel`)

          if (pl.queue && pl.queue.current && (!data.current || data.current.identifier != pl.queue.current.identifier)) client.autoresume.set(pl.guild, makeTrack(pl.queue.current), `current`)
          if (data.volume != pl.volume) client.autoresume.set(pl.guild, pl.volume, `volume`)
          if (data.queueRepeat != pl.queueRepeat) client.autoresume.set(pl.guild, pl.queueRepeat, `queueRepeat`)
          if (data.trackRepeat != pl.trackRepeat) client.autoresume.set(pl.guild, pl.trackRepeat, `trackRepeat`)
          if (data.playing != pl.playing) client.autoresume.set(pl.guild, pl.playing, `playing`)
          if (data.position != pl.position) client.autoresume.set(pl.guild, pl.position, `position`)
          if (data.eq != eq) client.autoresume.set(pl.guild, eq, `eq`)
          if (data.filter != filter) client.autoresume.set(pl.guild, filter, `filter`)
          if (data.filtervalue != filtervalue) client.autoresume.set(pl.guild, filtervalue, `filtervalue`)
          if (data.autoplay != autoplay) client.autoresume.set(pl.guild, autoplay, `autoplay`)
          if (pl.queue && !arraysEqual(data.queue, [...pl.queue])) client.autoresume.set(pl.guild, [...pl.queue].map(track => makeTrack(track)), `queue`)

          function arraysEqual(a, b) {
            if (a === b) return true;
            if (a == null || b == null) return false;
            if (a.length !== b.length) return false;

            for (var i = 0; i < a.length; ++i) {
              if (a[i] !== b[i]) return false;
            }
            return true;
          }
        }
      }, settings["auto-resume-save-cooldown"] || 5000);
      playerintervals_autoresume.set(player.guild, autoresumeinterval);
    })
    .on(`playerMove`, async (player, oldChannel, newChannel) => {
      if (!newChannel) {
        await player.destroy();
      } else {
        player.set('moved', true)
        player.setVoiceChannel(newChannel);
        if (player.paused) return;
        setTimeout(() => {
          player.pause(true);
          setTimeout(() => player.pause(false), client.ws.ping * 2);
        }, client.ws.ping * 2);
      }
    })
    .on(`playerDestroy`, async (player) => {
      //clear the interval for the music system
      clearInterval(playerintervals.get(player.guild))
      playerintervals.delete(player.guild);
      //clear the interval for the autoresume system
      clearInterval(playerintervals_autoresume.get(player.guild))
      if (client.autoresume.has(player.guild)) client.autoresume.delete(player.guild);
      playerintervals_autoresume.delete(player.guild);
      //if the song ends, edit message(s)
      if (player.textChannel && player.guild) {
        //update the last Played Song Message
        client.editLastPruningMessage(player, `\n⛔️ SONG & QUEUE ENDED! | Player got DESTROYED (stopped)!`)
        //Update the Music System Message - Embed
        client.updateMusicSystem(player, true);

      }

    })
    .on(`trackStart`, async (player, track) => {
      try {
        try {
          client.stats.inc(`global`, `songs`)
        } catch (e) {}
        let edited = false;
        let guild = client.guilds.cache.get(player.guild);
        if (!guild) return;
        const es = client.settings.get(guild.id, "embed")
        const ls = client.settings.get(guild.id, "language")
  
        let channel = guild.channels.cache.get(player.textChannel);
        if (!channel) channel = await guild.channels.fetch(player.textChannel);

        if (playercreated.has(player.guild)) {
          player.set(`eq`, player.get("eq") || `💣 None`);
          player.set(`filter`, player.get("eq") || `🧨 None`);
          player.set(`autoplay`, player.get("autoplay") || client.settings.get(player.guild, `defaultap`));
          player.set(`afk`, false)
          if (player.get("autoresume")) {
            player.set("autoresume", false)
          } else {
            await player.setVolume(client.settings.get(player.guild, `defaultvolume`))
            if (client.settings.get(player.guild, `defaulteq`)) {
              await player.setEQ(client.eqs.music);
            }
          }


          databasing(client, player.guild, player.get(`playerauthor`));
          playercreated.delete(player.guild); // delete the playercreated state from the thing
          client.logger(`Player Created in ${guild ? guild.name : player.guild} | Set the - Guild Default Data`);
          /*client.logger({
            Default_volume: client.settings.get(player.guild, `defaultvolume`),
            Default_Equalizer: client.settings.get(player.guild, `defaulteq`),
            Default_Autoplay: client.settings.get(player.guild, `defaultap`),
            Pruning_Song_Messages: client.settings.get(player.guild, `pruning`) 
          });*/
          if (!player.get("autoresume") && channel && channel.permissionsFor(guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) {
            channel.send({
              embeds: [
                new MessageEmbed().setColor(es.color)
                .setDescription(`> 👍 **Joined** <#${player.voiceChannel}>\n\n> 📃 **And bound to** <#${player.textChannel}>`)
                .setTimestamp()
                .setFooter(client.getFooter(es))
              ]
            })
          }
        }

        //Update the Music System Message - Embed
        client.updateMusicSystem(player);
        if (client.musicsettings.get(player.guild, `channel`) == player.textChannel) {
          return client.logger(`No PRUNING-Message sent, because Player-TextChannel == Music System Text Channel`)
        }
        if (player.textChannel && player.get(`previoustrack`)) {
          if (!collector.ended) {
            try {
              collector.stop();
            } catch (e) {
              //console.log(e.stack ? String(e.stack).grey : String(e).grey)
            }
          }
          //update the last Played Song Message
          client.editLastPruningMessage(player, `\n⛔️ SONG ENDED!`)
        }
        //votes for skip --> 0
        player.set(`votes`, `0`);
        //set the vote of every user to FALSE so if they voteskip it will vote skip and not remove voteskip if they have voted before bruh
        for (var userid of guild.members.cache.map(member => member.user.id))
          player.set(`vote-${userid}`, false);
        //set the previous track just have it is used for the autoplay function!
        player.set(`previoustrack`, track);
        //if that's disabled return
        if (!client.settings.get(player.guild, `pruning`)) {
          return client.logger(`Pruning Disabled - Not Sending a Message`);
        }
        // playANewTrack(client,player,track);
        let playdata = generateQueueEmbed(client, player, track)
        //Send message with buttons
        if (channel && channel.permissionsFor(guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) {
          let swapmsg = await channel.send(playdata).then(msg => {
            player.set(`currentmsg`, msg.id);
            return msg;
          })
          //create a collector for the thinggy
          var defaulttime = 1 * 60 * 60 * 1000; //set a default time (1 hour in this case)
          collector = swapmsg.createMessageComponentCollector({
            filter: (i) => i.isButton() && i.user && i.message.author.id == client.user.id,
            time: track.duration > 0 ? track.duration < Number.MAX_VALUE ? track.duration : defaulttime : defaulttime
          }); //collector for 5 seconds
          //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
          collector.on('collect', async i => {
            let {
              member
            } = i;
            const {
              channel
            } = member.voice
            const player = client.manager.players.get(i.guild.id);
            if (!player)
              return i.reply({
                content: `❌ Nothing Playing yet`,
                ephemeral: true
              })

            if (!channel)
              return i.reply({
                content: `❌ **Please join a Voice Channel first!**`,
                ephemeral: true
              })
            if (channel.id !== player.voiceChannel)
              return i.reply({
                content: `❌ **Please join __my__ Voice Channel first! <#${player.voiceChannel}>**`,
                ephemeral: true
              })

            if (i.customId != `10` && check_if_dj(client, i.member, player.queue.current)) {
              return i.reply({
                embeds: [new MessageEmbed()
                  .setColor(es.wrongcolor)
                  .setFooter(client.getFooter(es))
                  .setTitle(`❌ **You are not a DJ and not the Song Requester!**`)
                  .setDescription(`**DJ-ROLES:**\n${check_if_dj(client, i.member, player.queue.current)}`)
                ],
                ephemeral: true
              });
            }


            //skip
            if (i.customId == `1`) {
              //if ther is nothing more to skip then stop music and leave the Channel
              if (player.queue.size == 0) {
                //if its on autoplay mode, then do autoplay before leaving...
                if (player.get(`autoplay`)) return autoplay(client, player, `skip`);
                i.reply({
                  embeds: [new MessageEmbed()
                    .setColor(es.color)
                    .setTimestamp()
                    .setTitle(`⏹ **Stopped playing and left the Channel**`)
                    .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                      dynamic: true
                    })))
                  ]
                })
                edited = true;
                player.destroy()
                return
              }
              //skip the track
              player.stop();
              return i.reply({
                embeds: [new MessageEmbed()
                  .setColor(es.color)
                  .setTimestamp()
                  .setTitle(`⏭ **Skipped to the next Song!**`)
                  .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                    dynamic: true
                  })))
                ]
              })
            }



            //stop
            if (i.customId == `2`) {
              //Stop the player
              i.reply({
                embeds: [new MessageEmbed()
                  .setColor(es.color)
                  .setTimestamp()
                  .setTitle(`⏹ **Stopped playing and left the Channel**`)
                  .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                    dynamic: true
                  })))
                ]
              })
              edited = true;
              player.destroy()
            }



            //pause/resume
            if (i.customId == `3`) {
              if (!player.playing) {
                player.pause(false);
                i.reply({
                  embeds: [new MessageEmbed()
                    .setColor(es.color)
                    .setTimestamp()
                    .setTitle(`▶️ **Resumed!**`)
                    .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                      dynamic: true
                    })))
                  ]
                })
              } else {
                //pause the player
                player.pause(true);

                i.reply({
                  embeds: [new MessageEmbed()
                    .setColor(es.color)
                    .setTimestamp()
                    .setTitle(`⏸ **Paused!**`)
                    .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                      dynamic: true
                    })))
                  ]
                })
              }
              var data = generateQueueEmbed(client, player, track)
              swapmsg.edit(data).catch((e) => {
                //console.log(e.stack ? String(e.stack).grey : String(e).grey)
              })
            }



            //autoplay
            if (i.customId == `4`) {
              //pause the player
              player.set(`autoplay`, !player.get(`autoplay`))
              var data = generateQueueEmbed(client, player, track)
              swapmsg.edit(data).catch((e) => {
                //console.log(e.stack ? String(e.stack).grey : String(e).grey)
              })
              i.reply({
                embeds: [new MessageEmbed()
                  .setColor(es.color)
                  .setTimestamp()
                  .setTitle(`${player.get(`autoplay`) ? `<a:yes:833101995723194437> **Enabled Autoplay**`: `❌ **Disabled Autoplay**`}`)
                  .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                    dynamic: true
                  })))
                ]
              })
            }


            //Shuffle
            if (i.customId == `5`) {
              //set into the player instance an old Queue, before the shuffle...
              player.set(`beforeshuffle`, player.queue.map(track => track));
              //shuffle the Queue
              player.queue.shuffle();
              //Send Success Message
              i.reply({
                embeds: [new MessageEmbed()
                  .setColor(es.color)
                  .setTimestamp()
                  .setTitle(`🔀 **Shuffled ${player.queue.length} Songs!**`)
                  .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                    dynamic: true
                  })))
                ]
              })
            }


            //Songloop
            if (i.customId == `6`) {
              //if there is active queue loop, disable it + add embed information
              if (player.queueRepeat) {
                player.setQueueRepeat(false);
              }
              //set track repeat to revers of old track repeat
              player.setTrackRepeat(!player.trackRepeat);
              i.reply({
                embeds: [new MessageEmbed()
                  .setColor(es.color)
                  .setTimestamp()
                  .setTitle(`${player.trackRepeat ? `<a:yes:833101995723194437> **Enabled Song Loop**`: `❌ **Disabled Song Loop**`}`)
                  .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                    dynamic: true
                  })))
                ]
              })
              var data = generateQueueEmbed(client, player, track)
              swapmsg.edit(data).catch((e) => {
                //console.log(e.stack ? String(e.stack).grey : String(e).grey)
              })
            }


            //QueueLoop
            if (i.customId == `7`) {
              //if there is active queue loop, disable it + add embed information
              if (player.trackRepeat) {
                player.setTrackRepeat(false);
              }
              //set track repeat to revers of old track repeat
              player.setQueueRepeat(!player.queueRepeat);
              i.reply({
                embeds: [new MessageEmbed()
                  .setColor(es.color)
                  .setTimestamp()
                  .setTitle(`${player.queueRepeat ? `<a:yes:833101995723194437> **Enabled Queue Loop**`: `❌ **Disabled Queue Loop**`}`)
                  .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                    dynamic: true
                  })))
                ]
              })
              var data = generateQueueEmbed(client, player, track)
              swapmsg.edit(data).catch((e) => {
                //console.log(e.stack ? String(e.stack).grey : String(e).grey)
              })
            }


            //Forward
            if (i.customId == `8`) {
              //get the seektime variable of the user input
              let seektime = Number(player.position) + 10 * 1000;
              //if the userinput is smaller then 0, then set the seektime to just the player.position
              if (10 <= 0) seektime = Number(player.position);
              //if the seektime is too big, then set it 1 sec earlier
              if (Number(seektime) >= player.queue.current.duration) seektime = player.queue.current.duration - 1000;
              //seek to the new Seek position
              player.seek(Number(seektime));
              collector.resetTimer({
                time: (player.queue.current.duration - player.position) * 1000
              })
              i.reply({
                embeds: [new MessageEmbed()
                  .setColor(es.color)
                  .setTimestamp()
                  .setTitle(`⏩ **Forwarded the song for \`10 Seconds\`!**`)
                  .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                    dynamic: true
                  })))
                ]
              })
            }


            //Rewind
            if (i.customId == `9`) {
              let seektime = player.position - 10 * 1000;
              if (seektime >= player.queue.current.duration - player.position || seektime < 0) {
                seektime = 0;
              }
              //seek to the new Seek position
              player.seek(Number(seektime));
              collector.resetTimer({
                time: (player.queue.current.duration - player.position) * 1000
              })
              i.reply({
                embeds: [new MessageEmbed()
                  .setColor(es.color)
                  .setTimestamp()
                  .setTitle(`⏪ **Rewinded the song for \`10 Seconds\`!**`)
                  .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                    dynamic: true
                  })))
                ]
              })
            }
          });
        }

      } catch (e) {
        console.log(String(e.stack).grey.yellow) /* */
      }
    })
    .on(`trackStuck`, async (player, track, payload) => {
      await player.stop();
      if (player.textChannel) {
        //update the last Played Song Message
        client.editLastPruningMessage(player, `\n⚠️⚠️⚠️ SONG STUCKED ⚠️⚠️!`)
        //Update the Music System Message - Embed
        client.updateMusicSystem(player);

      }
    })
    .on(`trackError`, async (player, track, payload) => {
      await player.stop();
      if (player.textChannel) {
        //update the last Played Song Message
        client.editLastPruningMessage(player, `\n⚠️⚠️⚠️ SONG CRASHED ⚠️⚠️!`)
        //Update the Music System Message - Embed
        client.updateMusicSystem(player);
      }
    })
    .on(`queueEnd`, async (player) => {
      //en-sure the database data
      databasing(client, player.guild, player.get(`playerauthor`));
      //if autoplay is enabled, then continue with the autoplay function
      if (player.get(`autoplay`)) return autoplay(client, player);
      try {
        //update the player
        player = client.manager.players.get(player.guild);

        if (!player.queue || !player.queue.current) {
          //Update the Music System Message - Embed
          client.updateMusicSystem(player, true);

          //if afk is enbaled return and not destroy the PLAYER
          if (player.get(`afk`)) {
            return client.logger(`Queue went empty in ${client.guilds.cache.get(player.guild) ? client.guilds.cache.get(player.guild).name : player.guild}, not leaving, because AFK is enabled!`)
          }
          if (settings.LeaveOnEmpty_Queue.enabled && player) {
            setTimeout(async () => {
              try {
                let pl = client.manager.players.get(player.guild);
                if (!pl.queue || !pl.queue.current) {
                  await pl.destroy();
                  return client.logger(`Queue destroyed because it went Empty`)
                }
              } catch (e) {
                console.log(e)
              }
            }, settings.LeaveOnEmpty_Queue.time_delay)
          }
        }
      } catch (e) {
        console.log(String(e.stack).grey.yellow);
      }
    });

};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */


function generateQueueEmbed(client, player, track) {
  const es = player.guild ? client.settings.get(player.guild, "embed") : ee;
  var embed = new MessageEmbed().setColor(es.color)
  embed.setAuthor(client.getAuthor(`${track.title}`, `https://images-ext-1.discordapp.net/external/DkPCBVBHBDJC8xHHCF2G7-rJXnTwj_qs78udThL8Cy0/%3Fv%3D1/https/cdn.discordapp.com/emojis/859459305152708630.gif`, track.uri))
  embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
  embed.setFooter(client.getFooter(`Requested by: ${track.requester.tag}`, track.requester.displayAvatarURL({
    dynamic: true
  })));
  let skip = new MessageButton().setStyle('PRIMARY').setCustomId('1').setEmoji(`⏭`).setLabel(`Skip`)
  let stop = new MessageButton().setStyle('DANGER').setCustomId('2').setEmoji(`🏠`).setLabel(`Stop`)
  let pause = new MessageButton().setStyle('SECONDARY').setCustomId('3').setEmoji('⏸').setLabel(`Pause`)
  let autoplay = new MessageButton().setStyle('SUCCESS').setCustomId('4').setEmoji('🔁').setLabel(`Autoplay`)
  let shuffle = new MessageButton().setStyle('PRIMARY').setCustomId('5').setEmoji('🔀').setLabel(`Shuffle`)
  if (!player.playing) {
    pause = pause.setStyle('SUCCESS').setEmoji('▶️').setLabel(`Resume`)
  }
  if (player.get(`autoplay`)) {
    autoplay = autoplay.setStyle('SECONDARY')
  }
  let songloop = new MessageButton().setStyle('SUCCESS').setCustomId('6').setEmoji(`🔁`).setLabel(`Song`)
  let queueloop = new MessageButton().setStyle('SUCCESS').setCustomId('7').setEmoji(`🔂`).setLabel(`Queue`)
  let forward = new MessageButton().setStyle('PRIMARY').setCustomId('8').setEmoji('⏩').setLabel(`+10 Sec`)
  let rewind = new MessageButton().setStyle('PRIMARY').setCustomId('9').setEmoji('⏪').setLabel(`-10 Sec`)
  let lyrics = new MessageButton().setStyle('PRIMARY').setCustomId('10').setEmoji('📝').setLabel(`Lyrics`).setDisabled();
  if (!player.queueRepeat && !player.trackRepeat) {
    songloop = songloop.setStyle('SUCCESS')
    queueloop = queueloop.setStyle('SUCCESS')
  }
  if (player.trackRepeat) {
    songloop = songloop.setStyle('SECONDARY')
    queueloop = queueloop.setStyle('SUCCESS')
  }
  if (player.queueRepeat) {
    songloop = songloop.setStyle('SUCCESS')
    queueloop = queueloop.setStyle('SECONDARY')
  }
  const row = new MessageActionRow().addComponents([skip, stop, pause, autoplay, shuffle]);
  const row2 = new MessageActionRow().addComponents([songloop, queueloop, forward, rewind, lyrics]);
  return {
    embeds: [embed],
    components: [row, row2]
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
