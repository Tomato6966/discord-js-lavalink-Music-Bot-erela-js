
const { Manager } = require("erela.js"),
  { MessageEmbed } = require("discord.js"),
  ms = require("ms"),
  Discord = require("discord.js")
  Spotify = require("erela.js-spotify"),
  Deezer  = require("erela.js-deezer"),

  config = require("../botconfig/config.json"),
  emoji = require("../botconfig/emojis.json"),
  ee = require("../botconfig/embed.json"),

  { createBar, delay, format, databasing, playANewTrack, isrequestchannel, edit_request_message_track_info, getRandomInt, autoplay, findEmoji } = require("../handlers/functions"),
  playermanager = require("../handlers/playermanager"),

  clientID = config.spotify.clientID,
  clientSecret = config.spotify.clientSecret,

  hasmap = new Map();
module.exports = (client) => {

    try {
      if(!clientID || !clientSecret){
        client.manager = new Manager({
            nodes: config.clientsettings.nodes,
            plugins: [
              new Deezer()
            ],
            send(id, payload) {
                const guild = client.guilds.cache.get(id);
                if (guild) guild.shard.send(payload);
            },
        });
      }
      else{
        client.manager = new Manager({
            nodes: config.clientsettings.nodes,
            plugins: [
              new Spotify({
                  clientID, //get a clientid from there: https://developer.spotify.com/dashboard
                  clientSecret
              }),
              new Deezer()
            ],
            send(id, payload) {
                const guild = client.guilds.cache.get(id);
                if (guild) guild.shard.send(payload);
            },
        });
      }
        client.manager
            .on("nodeConnect", (node) => {
                try{
                  const stringlength = 69;
                  console.log("\n")
                  console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
                  console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
                  console.log(`     ┃ `.bold.brightGreen + `Node connected: `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length-`Node connected: `.length)+ "┃".bold.brightGreen)
                  console.log(`     ┃ `.bold.brightGreen + ` { ${node.options.identifier} } `.bold.brightGreen+ " ".repeat(-1+stringlength-` ┃ `.length-` { ${node.options.identifier} } `.length)+ "┃".bold.brightGreen)
                  console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
                  console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
                }catch{ /* */ }
            })
            .on("nodeCreate", (node) => {
              try{
                const stringlength = 69;
                console.log("\n")
                console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
                console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
                console.log(`     ┃ `.bold.brightGreen + `Node created: `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length-`Node created: `.length)+ "┃".bold.brightGreen)
                console.log(`     ┃ `.bold.brightGreen + ` { ${node.options.identifier} } `.bold.brightGreen+ " ".repeat(-1+stringlength-` ┃ `.length-` { ${node.options.identifier} } `.length)+ "┃".bold.brightGreen)
                console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
                console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
              }catch{ /* */ }
            })
            .on("nodeReconnect", (node) => {
              try{
                const stringlength = 69;
                console.log("\n")
                console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightYellow)
                console.log(`     ┃ `.bold.brightYellow + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightYellow)
                console.log(`     ┃ `.bold.brightYellow + `Node reconnected: `.bold.brightYellow + " ".repeat(-1+stringlength-` ┃ `.length-`Node reconnected: `.length)+ "┃".bold.brightYellow)
                console.log(`     ┃ `.bold.brightYellow + ` { ${node.options.identifier} } `.bold.brightYellow+ " ".repeat(-1+stringlength-` ┃ `.length-` { ${node.options.identifier} } `.length)+ "┃".bold.brightYellow)
                console.log(`     ┃ `.bold.brightYellow + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightYellow)
                console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightYellow)
              }catch{ /* */ }
            })
            .on("nodeDisconnect", (node) => {
              try{
                const stringlength = 69;
                console.log("\n")
                console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightMagenta)
                console.log(`     ┃ `.bold.brightMagenta + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightMagenta)
                console.log(`     ┃ `.bold.brightMagenta + `Node reconnected: `.bold.brightMagenta + " ".repeat(-1+stringlength-` ┃ `.length-`Node reconnected: `.length)+ "┃".bold.brightMagenta)
                console.log(`     ┃ `.bold.brightMagenta + ` { ${node.options.identifier} } `.bold.brightMagenta+ " ".repeat(-1+stringlength-` ┃ `.length-` { ${node.options.identifier} } `.length)+ "┃".bold.brightMagenta)
                console.log(`     ┃ `.bold.brightMagenta + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightMagenta)
                console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightMagenta)

              }catch{ /* */ }
            })
            .on("nodeError", (node, error) => {
              try{
                const stringlength = 69;
                console.log("\n")
                console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightRed)
                console.log(`     ┃ `.bold.brightRed + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightRed)
                console.log(`     ┃ `.bold.brightRed + `Node reconnected: `.bold.brightRed + " ".repeat(-1+stringlength-` ┃ `.length-`Node reconnected: `.length)+ "┃".bold.brightRed)
                console.log(`     ┃ `.bold.brightRed + ` { ${node.options.identifier} } `.bold.brightRed+ " ".repeat(-1+stringlength-` ┃ `.length-` { ${node.options.identifier} } `.length)+ "┃".bold.brightRed)
                console.log(`     ┃ `.bold.brightRed + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightRed)
                console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightRed)
              }catch{ /* */ }
            })
            .on("playerCreate", async (player) => {
                setTimeout(async () => {
                    player.setVolume(50);
                    player.set("autoplay", false);
                    player.set(`afk-${player.guild}`, false)
                    player.set(`afk-${player.get("playerauthor")}`, false)
                    player.setEQ(client.eqs.music);
                    databasing(client, player.guild, player.get("playerauthor"));
                    let embed = new MessageEmbed()
                    try{embed.setTitle(`${emoji.msg.SUCCESS} Joined ${emoji.msg.reduce_volume}${client.channels.cache.get(player.voiceChannel).name}`)}catch{}
                        try{embed.setDescription(`>>> And bound to: #${client.channels.cache.get(player.textChannel).name}\n${emoji.msg.pruning} Pruning ${client.settings.get(message.guild.id, `pruning`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}`)}catch{}
                        try{embed.addField(`**｜${emoji.msg.raise_volume} Volume**`, `> ${player.volume}%`, true)}catch{}
                        try{embed.addField(`**｜${emoji.msg.raise_volume} Equalizer: **`, `> ${emoji.msg.playing} Music`, true)}catch{}
                        try{embed.addField(`**｜${emoji.msg.repeat_mode} ${player.queueRepeat ? "Queue Loop: " : "Song Loop: "}**`, `> ${player.queueRepeat ? `${emoji.msg.enabled} Enabled` : player.trackRepeat ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}`, true)}catch{}
                        try{embed.addField(`**｜${emoji.msg.leave_on_empty} Leave on Empty Channel: **`, `> ${config.settings.leaveOnEmpty_Channel.enabled ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}`, true)}catch{}
                        try{embed.addField(`**｜${emoji.msg.time} Leave on Empty Queue: **`, `> ${config.settings.LeaveOnEmpty_Queue.enabled ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}`, true)}catch{}
                        try{embed.addField(`**｜${emoji.msg.autoplay_mode} Autoplay**`, `> ${player.get(`autoplay`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}`, true)}catch{}
                        try{embed.addField(`**｜${emoji.msg.premium} Premium GUILD**`, `> ${client.premium.get(player.guild).enabled ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}`, true)}catch{}
                        try{embed.addField(`**｜${emoji.msg.premium} Premium USER**`, `> ${client.premium.get(player.get(`playerauthor`)).enabled ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}`, true)}catch{}
                        try{embed.addField(`**｜${emoji.msg.premium} 24/7 AFK Setup**`, `>>> **PLAYER:** ${player.get(`afk-${player.get(`layerauthor`)}`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}\n**GUILD:** ${player.get(`afk-${player.guild}`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}`, true)}catch{}
                        try{embed.setColor(ee.color)}catch{}
                        try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                        if(isrequestchannel(client, player.get("message"))) return;
                        client.channels.cache.get(player.textChannel).send(embed).then(msg => {
                        try{
                         msg.delete({timeout: 10000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        }catch{ /* */ }
                      });
                }, 100);
            })
            .on("playerMove", (player, oldChannel, newChannel) => {
                if (!newChannel) {
                  try {let embed = new MessageEmbed()}catch{}
                  try{embed.setTitle(`${emoji.msg.ERROR} Queue has ended.`)}catch{}
                  try{embed.setDescription(`I left the Channel:${client.channels.cache.get(player.voiceChannel).name}`)}catch{}
                  try{embed.setColor(ee.wrongcolor)}catch{}
                  try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                  client.channels.cache.get(player.textChannel).send(embed).then(msg => {
                    try{
                     msg.delete({timeout: 7500}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                    }catch{ /* */ }
                  });
                  try {
                      client.channels.cache.get(player.textChannel).messages.fetch(player.get("playermessage")).then(msg => {
                      try{
                       msg.delete({timeout: 2500}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                      }catch{ /* */ }
                    });
                  } catch (e) {
                      console.log(String(e.stack).yellow);
                  }
                  player.destroy();
                } else {
                  player.voiceChannel = newChannel;
                  if (player.paused) return;
                  setTimeout(() => {
                      player.pause(true);
                      setTimeout(() => player.pause(false), client.ws.ping * 2);
                  }, client.ws.ping * 2);
                }
            })
            .on("trackStart", async (player, track) => {
              try{
                //votes for skip --> 0
                player.set("votes", "0");
                //set the vote of every user to FALSE so if they voteskip it will vote skip and not remove voteskip if they have voted before bruh
                for(const userid of client.guilds.cache.get(player.guild).members.cache.map(member => member.user.id))
                  player.set(`vote-${userid}`, false);
                //set the previous track just have idk where its used ^-^
                player.set("previoustrack", track);
                //increasing the stats of the BOT
                client.stats.inc(player.guild, "songs");
                client.stats.inc("global", "songs");
                //wait 500 ms
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(2);
                    }, 500);
                });
                // playANewTrack(client,player,track);
                let embed = new MessageEmbed()
                try{embed.setTitle(`Playing ${emoji.msg.playing} **${track.title}**`)}catch{}
                try{embed.setURL(track.uri)}catch{}
                try{embed.setColor(ee.color)}catch{}
                try{embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg`)}catch{}
                try{embed.addField(`${emoji.msg.time} Duration: `, `${track.isStream ? `LIVE STREAM` : format(track.duration)}`, true)}catch{}
                try{embed.addField(`${emoji.msg.song_by} Song By: `, `${track.author}`, true)}catch{}
                try{embed.addField(`${emoji.msg.repeat_mode} Queue length: `, `${player.queue.length} Songs`, true)}catch{}
                try{embed.setFooter(`Requested by: ${track.requester.tag}`, track.requester.displayAvatarURL({dynamic: true}));}catch{}
                if(isrequestchannel(client, player.get(`message`))) return edit_request_message_track_info(client, player, track);
                //if pruning is enabled --> send the msg
                if(client.settings.get(player.guild, `pruning`))
                  client.channels.cache.get(player.textChannel).send(embed).then(msg => {
                  //try to delete the old playingsongmsg informational track if not available / get able --> catch and dont crash
                  try{
                    if(player.get(`playingsongmsg`) && msg.id !== player.get(`playingsongmsg`).id)
                     player.get(`playingsongmsg`).delete().catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey));
                   }catch{ /* */ }
                  //set the old message information to a variable
                  player.set(`playingsongmsg`, msg)
                  //react with all emojis
                  let failed = false;
                  try{
                    const emojisarray = [
                      String(emoji.react.rewind),
                      String(emoji.react.forward),
                      String(emoji.react.pause_resume),
                      String(emoji.react.stop),
                      String(emoji.react.previous_track),
                      String(emoji.react.skip_track),
                      String(emoji.react.replay_track),
                      String(emoji.react.reduce_volume),
                      String(emoji.react.raise_volume),
                      String(emoji.react.toggle_mute),
                      String(emoji.react.repeat_mode),
                      String(emoji.react.autoplay_mode),
                      String(emoji.react.shuffle),
                      String(emoji.react.show_queue),
                      String(emoji.react.show_current_track),
                    ]
                    for(const newemoji of emojisarray)
                    client.shard.broadcastEval(`(${findEmoji}).call(this, '${newemoji}')`)
              			.then(emojiArray => {
              				const foundEmoji = emojiArray.find(emoji => emoji);
              				if (!foundEmoji) return console.log('I could not find such an emoji.');

              				return client.api.guilds(foundEmoji.guild).get()
              					.then(raw => {
              						const guild = new Discord.Guild(client, raw);
              						const theemoji = new Discord.GuildEmoji(client, foundEmoji, guild);
                          msg.react(theemoji).catch(e => failed = true);
             					});
              			});

                	}catch (e){
                 	msg.channel.send(new MessageEmbed()
                   .setColor(ee.wrongcolor)
                   .setTitle(` ERROR | An Error Occurred`)
                   .setDescription(`\`\`\`${e.message}\`\`\`\n Make sure that i have permissions to add (custom) REACTIONS`)
                   )
                 }
                 if(failed)
                   msg.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`${emoji.msg.ERROR} ERROR | Couldn't add Reaction`)
                    .setDescription(`Make sure that I have permissions to add (custom) REACTIONS`)
                    )
                  //create the collector
                  var collector = msg.createReactionCollector((reaction, user) => user.id !== client.user.id, {
                    time: track.duration > 0 ? track.duration : 600000
                  });

                  collector.on(`collect`, async (reaction, user) => {
                    try{
                      if(user.bot) return;
                      //get the message object out of the reaction
                      const { message } = reaction;
                      //get the database information
                      let db = client.setups.get(message.guild.id)
                      //removing the reaction of the User
                      try{ reaction.users.remove(user.id).catch(e=>console.log(String(e.stack).yellow)); }catch { /* */ }
                      //get the member who makes the reaction
                      const member = message.guild.members.cache.get(user.id);
                      //getting the Voice Channel Data of the Message Member
                      const { channel } = member.voice;
                      //if not in a Voice Channel return!
                      if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(`${emoji.msg.ERROR} ERROR | You need to join a voice channel.`));
                      //get the lavalink erela.js player information
                      let player = client.manager.players.get(message.guild.id);
                      //if there is a player and the user is not in the same channel as the Bot return information message
                      if (player && channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(`${emoji.msg.ERROR} ERROR | I am already playing somewhere else!`).setDescription(`You can listen to me in: ${message.guild.channels.cache.get(player.VoiceChannel).name}`));
                      //switch case for every single reaction emoji someone
                      let reactionemoji = reaction.emoji.id || reaction.emoji.name;
                      switch(reactionemoji){
                      case String(emoji.react.rewind):
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
                          .setTitle(`${emoji.msg.rewind} Rewinded the song for: 20 Seconds, to: ${format(Number(player.position))}`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(msg => {
                        try{
                         msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        }catch{ /* */ }
                      });
                      break;
                      case String(emoji.react.forward):
                        //gets the forward time
                        let forward = Number(player.position) + 20*1000;
                        //if the forward is too big set it 1 second less
                        if (Number(forward) >= player.queue.current.duration) { forward = player.queue.current.duration- 1000; }
                        //seek to the amount of time after the forwards
                        player.seek(Number(forward));
                        //send an information message
                        message.channel.send(new MessageEmbed()
                          .setTitle(`${emoji.msg.forward} Forwarded the Song for: 20 Seconds, to: ${format(Number(player.position))}`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(msg => {
                        try{
                         msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        }catch{ /* */ }
                      });
                      break;
                      case String(emoji.react.pause_resume):
                        //pause the player / resume it
                        player.pause(player.playing);
                        //send information message
                        message.channel.send(new MessageEmbed()
                            .setTitle(`${player.playing ? `${emoji.msg.resume} Resumed` : `${emoji.msg.pause} Paused`} the Player.`)
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                          ).then(msg => {
                          try{
                           msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                          }catch{ /* */ }
                        });
                      break;

                      //////////////////////////////////////

                      case String(emoji.react.stop):
                        //leave and stop the music
                        player.destroy();
                        //send information message
                        message.channel.send(new MessageEmbed()
                          .setTitle(`${emoji.msg.stop} Stopped and left your channel`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(msg => {
                        try{
                         msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        }catch{ /* */ }
                      });
                      break;
                      case String(emoji.react.previous_track):
                        //if there is no previous track
                        if(!player.queue.previous || player.queue.previous === null)
                          return message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setTitle(`${emoji.msg.ERROR} Error | There is no previous song yet!`)
                          ).then(msg => {
                          try{
                           msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                          }catch{ /* */ }
                        });
                        message.channel.send(new MessageEmbed()
                          .setTitle(`${emoji.msg.previous_track} Playing Previous Track`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(msg => {
                        try{
                         msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        }catch{ /* */ }
                      });
                        //define the type
                        let type = "skiptrack:youtube";
                        //if the previous was from soundcloud, then use type soundcloud
                        if(player.queue.previous.uri.includes("soundcloud")) type = "skiptrack:soundcloud"
                        //plays it
                        playermanager(client, message, Array(player.queue.previous.uri), type);
                      break;
                      case String(emoji.react.skip_track):
                        //Check if there is a Dj Setup
                        if(client.settings.get(message.guild.id, `djroles`).toString()!==""){

                          let channelmembersize = channel.members.size;
                          let voteamount = 0;
                          if(channelmembersize <= 3) voteamount = 1;
                          voteamount = Math.ceil(channelmembersize / 3);

                          if(!player.get(`vote-${user.id}`)) {
                            player.set(`vote-${user.id}`, true);
                            player.set("votes", String(Number(player.get("votes")) + 1));
                            if(voteamount <= Number(player.get("votes"))){
                              message.channel.send(new MessageEmbed()
                                .setColor(ee.color)
                                .setFooter(ee.footertext, ee.footericon)
                                .setTitle(`${emoji.msg.SUCCESS} Success | Added your Vote!`)
                                .setDescription(`There are now: ${player.get("votes")} of ${voteamount} needed Votes\n\n> Amount reached! Skipping ${emoji.msg.skip_track}`)
                              );
                              if (player.queue.size == 0) {
                                  player.destroy();
                              }
                              else{
                                player.stop();
                              }
                            }
                            else{
                              return message.channel.send(new MessageEmbed()
                                .setColor(ee.color)
                                .setFooter(ee.footertext, ee.footericon)
                                .setTitle(`${emoji.msg.SUCCESS} Success | Added your Vote!`)
                                .setDescription(`There are now: ${player.get("votes")} of ${voteamount} needed Votes`)
                              );
                            }
                          }
                          else {
                            player.set(`vote-${user.id}`, false)
                            player.set("votes", String(Number(player.get("votes")) - 1));
                            return message.channel.send(new MessageEmbed()
                              .setColor(ee.color)
                              .setFooter(ee.footertext, ee.footericon)
                              .setTitle(`${emoji.msg.SUCCESS} Success | Removed your Vote!`)
                              .setDescription(`There are now: ${player.get("votes")} of ${voteamount} needed Votes`)
                            );
                          }
                        }
                        else{
                          //if ther is nothing more to skip then stop music and leave the Channel
                          if (player.queue.size == 0) {
                            //if its on autoplay mode, then do autoplay before leaving...
                            if(player.get("autoplay")) return autoplay(client, player, "skip");
                            //stop playing
                            player.destroy();
                            //send success message
                            return message.channel.send(new MessageEmbed()
                              .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.stop} Stopped and left your Channel`)
                              .setColor(ee.color)
                              .setFooter(ee.footertext, ee.footericon)
                            );
                          }
                          //skip the track
                          player.stop();
                          //send success message
                          return message.channel.send(new MessageEmbed()
                            .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.skip_track} Skipped to the next Song`)
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                          );
                        }
                      break;

                      //////////////////////////////////////

                      case String(emoji.react.replay_track):
                        //seek to 0
                        player.seek(0);
                        //send an information message
                        message.channel.send(new MessageEmbed()
                          .setTitle(`${emoji.msg.replay_track} Replaying Current Track`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(msg => {
                        try{
                         msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        }catch{ /* */ }
                      });
                      break;
                      case String(emoji.react.reduce_volume):
                        //get the volume
                        let volumedown = player.volume - 10;
                        //if its too small set it to 0
                        if(volumedown < 0) volumedown = 0;
                        //set the palyer volume to the volume
                        player.setVolume(volumedown);
                        //send an informational message
                        message.channel.send(new MessageEmbed()
                          .setTitle(`${emoji.msg.reduce_volume} Volume set to: **${player.volume} %**`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(msg => {
                        try{
                         msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        }catch{ /* */ }
                      });
                      break;
                      case String(emoji.react.raise_volume):
                        //get the volume
                        let volumeup = player.volume + 10;
                        //if its too small set it to 0
                        if(volumeup > 150) volumeup = 0;
                        //set the palyer volume to the volume
                        player.setVolume(volumeup);
                        //send an informational message
                        message.channel.send(new MessageEmbed()
                          .setTitle(`${emoji.msg.raise_volume} Volume set to: **${player.volume} %**`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(msg => {
                        try{
                         msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        }catch{ /* */ }
                      });
                      break;

                      //////////////////////////////////////

                      case String(emoji.react.toggle_mute):
                        //get the volume
                        let volumemute = player.volume === 0 ? 50 : 0;
                        //set the palyer volume to the volume
                        player.setVolume(volumemute);
                        //send an informational message
                        message.channel.send(new MessageEmbed()
                          .setTitle(`${player.volume === 0 ? `${emoji.msg.toggle_mute} Muted the Player` : `${emoji.msg.reduce_volume} Unmuted the Player`}`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(msg => {
                        try{
                         msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        }catch{ /* */ }
                      });
                      break;
                      case String(emoji.react.repeat_mode):
                        //if both repeat modes are off
                        if(!player.trackRepeat && !hasmap.get(message.guild.id)){
                            hasmap.set(message.guild.id, 1)
                            //and queue repeat mode to off
                            player.setQueueRepeat(!player.queueRepeat);
                            //set track repeat mode to on
                            player.setTrackRepeat(!player.trackRepeat);
                            //Send an informational message
                            message.channel.send(new MessageEmbed()
                              .setTitle(`${emoji.msg.repeat_mode} Track Loop is now ${player.trackRepeat ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}.`)
                              .setDescription(`And Queue Loop is now ${player.queueRepeat ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}.`)
                              .setColor(ee.color)
                              .setFooter(ee.footertext, ee.footericon)
                            ).then(msg => {
                            try{
                             msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                            }catch{ /* */ }
                          });
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
                            .setTitle(`${emoji.msg.repeat_mode} Queue Loop is now ${player.queueRepeat ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}.`)
                            .setDescription(`And Track Loop is now ${player.trackRepeat ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}.`)
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                          ).then(msg => {
                          try{
                           msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                          }catch{ /* */ }
                        });
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
                            .setTitle(`${emoji.msg.repeat_mode} Queue Loop is now ${player.queueRepeat ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}.`)
                            .setDescription(`And Track Loop is now ${player.trackRepeat ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`}.`)
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                          ).then(msg => {
                          try{
                           msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                          }catch{ /* */ }
                        });
                        }
                      break;
                      case String(emoji.react.autoplay_mode):
                        //toggle autoplay
                        player.set("autoplay", !player.get("autoplay"))
                        //Send Success Message
                        message.channel.send(new MessageEmbed()
                          .setTitle(`${emoji.msg.SUCCESS} Success | ${player.get("autoplay") ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`} Autoplay`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(msg => {
                        try{
                         msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        }catch{ /* */ }
                      });
                      break;

                      //////////////////////////////////////

                      case String(emoji.react.shuffle):
                        //shuffle the Queue
                        player.queue.shuffle();
                        //send informational message
                        message.channel.send(new MessageEmbed()
                          .setTitle(`${emoji.msg.shuffle} The queue is now shuffled.`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(msg => {
                        try{
                         msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        }catch{ /* */ }
                      });
                      break;
                      case String(emoji.react.show_queue):
                        //define the Embed
                        const embed = new MessageEmbed()
                        .setAuthor(`Queue for ${message.guild.name}  -  [ ${player.queue.length} Tracks ]`, message.guild.iconURL({dynamic:true}))
                        .setColor(ee.color);
                        //if there is something playing rn, then add it to the embed
                        if (player.queue.current) embed.addField("**0) CURRENT TRACK**", `[${player.queue.current.title.substr(0, 35)}](${player.queue.current.uri}) - ${player.queue.current.isStream ? "LIVE STREAM" : format(player.queue.current.duration).split(" | ")[0]} - request by: **${player.queue.current.requester.tag}**`);
                        //get the right tracks of the current tracks
                        const tracks = player.queue;
                        //if there are no other tracks, information
                        if (!tracks.length)
                          return message.channel.send(embed.setDescription(`${emoji.msg.ERROR} No tracks in the queue`)).then(msg => {
                          try{
                           msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                          }catch{ /* */ }
                        });
                        //if not too big send queue in channel
                        if(tracks.length < 15)
                          return message.channel.send(embed.setDescription(tracks.map((track, i) => `**${++i})** [${track.title.substr(0, 35)}](${track.uri}) - ${track.isStream ? "LIVE STREAM" : format(track.duration).split(" | ")[0]} - **requested by: ${track.requester.tag}**`).join("\n"))).then(msg => {
                          try{
                           msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                          }catch{ /* */ }
                        })
                        //get an array of quelist where 15 tracks is one index in the array
                        let quelist = [];
                        for(let i = 0; i < tracks.length; i+=15){
                          let songs = tracks.slice(i, i+15);
                          quelist.push(songs.map((track, index) => `**${i + ++index})** [${track.title.split("[").join("{").split("]").join("}").substr(0, 35)}](${track.uri}) - ${track.isStream ? "LIVE STREAM" : format(track.duration).split(" | ")[0]} - **requested by: ${track.requester.tag}**`).join("\n"))
                        }
                        let limit = quelist.length <= 5 ? quelist.length : 5
                        for(let i = 0; i < limit; i++){
                          await user.send(embed.setDescription(String(quelist[i]).substr(0, 2048)));
                        }
                        user.send(new MessageEmbed()
                          .setDescription(`${emoji.msg.SUCCESS} Sent from <#${message.channel.id}>${quelist.length <= 5 ? "" : "\nNote: Send 5 Embeds, but there would be more..."}`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        )
                        message.channel.send(new MessageEmbed()
                          .setTitle(`${emoji.msg.SUCCESS} Check your direct messages to see the Queue`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(msg => {
                        try{
                         msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        }catch{ /* */ }
                      });

                      break;
                      case String(emoji.react.show_current_track):
                      //Send Now playing Message
                      return message.channel.send(new MessageEmbed()
                          .setAuthor("Current song playing:", user.displayAvatarURL({ dynamic: true }))
                          .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/hqdefault.jpg`)
                          .setURL(player.queue.current.uri)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                          .setTitle(`${player.playing ? emoji.msg.resume : emoji.msg.pause} **${player.queue.current.title}**`)
                          .addField(`${emoji.msg.time} Duration: `, "`" + format(player.queue.current.duration) + "`", true)
                          .addField(`${emoji.msg.song_by} Song By: `, "`" + player.queue.current.author + "`", true)
                          .addField(`${emoji.msg.repeat_mode} Queue length: `, `${player.queue.length} Songs`, true)
                          .addField(`${emoji.msg.time} Progress: `, createBar(player))
                          .setFooter(`Requested by: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({ dynamic: true }))
                        ).then(msg => {
                        try{
                         msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                        }catch{ /* */ }
                      });
                      break;
                    }
                  }catch (e){ console.log(e) /* */ }
                  });
                })
              }catch (e){console.log(String(e.stack).yellow) /* */}
          })
            .on("trackStuck", (player, track, payload) => {
                let embed = new MessageEmbed()
                try{embed.setTitle(`${emoji.msg.ERROR} Track got stuck!`)}catch{}
                try{embed.setDescription(`${emoji.msg.skip_track} I skipped the track: [${track.title}](${track.uri})`)}catch{}
                try{embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg`)}catch{}
                try{embed.setColor(ee.wrongcolor)}catch{}
                try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                client.channels.cache
                    .get(player.textChannel)
                    .send(embed).then(msg => {
                    try{
                     msg.delete({timeout: 7500}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                    }catch{ /* */ }
                  });
                player.stop();
            })
            .on("trackError", (player, track, payload) => {
                let embed = new MessageEmbed()
                try{embed.setTitle(`${emoji.msg.ERROR} Track got errored!`)}catch{}
                try{embed.setDescription(`${emoji.msg.skip_track} I skipped the track: **${track.title}**`)}catch{}
                try{embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg`)}catch{}
                try{embed.setColor(ee.wrongcolor)}catch{}
                try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                player.stop();
                client.channels.cache
                    .get(player.textChannel)
                    .send(embed).then(msg => {
                    try{
                     msg.delete({timeout: 7500}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                    }catch{ /* */ }
                  });

            })
            .on("queueEnd", async (player) => {
              // "uncomment" to enable trackEnd also for one song long Queus
              // client.manager.emit("trackEnd", player, track)
              databasing(client, player.guild, player.get("playerauthor"));
              if(player.get("autoplay")) return autoplay(client, player);
              //DELET TIME OUT
              if (config.settings.LeaveOnEmpty_Queue.enabled) {
                setTimeout(() => {
                    try {
                      player = client.manager.players.get(player.guild);
                        if (player.queue.size === 0) {
                            let embed = new MessageEmbed()
                            try{embed.setTitle(`${emoji.msg.ERROR} Queue has ended.`)}catch{}
                            try{embed.setDescription(`I left the Channel: ${client.channels.cache.get(player.voiceChannel).name} because the Queue was empty for: ${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}`)}catch{}
                            try{embed.setColor(ee.wrongcolor)}catch{}
                            try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                            //if        player afk                              or      guild afk     is enbaled return and not destroy the PLAYER
                            if(player.get(`afk-${player.get("playerauthor")}`) || player.get(`afk-${player.guild}`))
                              return client.channels.cache.get(player.textChannel).send(embed.setDescription(`I will not Leave the Channel, cause afk is ✔️ Enabled`)).then(msg => {
                              try{
                               msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                              }catch{ /* */ }
                            });
                            //send information message
                            client.channels.cache.get(player.textChannel).send(embed).then(msg => {
                            try{
                             msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                            }catch{ /* */ }
                          });

                            try {
                              client.channels.cache
                                  .get(player.textChannel)
                                  .messages.fetch(player.get("playermessage")).then(msg => {
                                  try{
                                   msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                                  }catch{ /* */ }
                                });
                            } catch (e) {
                                console.log(String(e.stack).yellow);
                            }
                            player.destroy();
                        }
                    } catch (e) {
                        console.log(String(e.stack).yellow);
                    }
                }, config.settings.LeaveOnEmpty_Queue.time_delay);
              }
            });
        client.once("ready", () => {
            client.manager.init(client.user.id);
        });
        client.on("raw", (d) => client.manager.updateVoiceState(d));
        /**
          * @INFO - THis event handles the LEAVE ON EMPTY Thing
          * With premium
        */
        //Log if a Channel gets deleted, and the Bot was in, then delete the player if the player exists!
        client.on("channelDelete", channel => {
          try{
            if(channel.type === "voice"){
              if(channel.members.has(client.user.id)){
                let player = client.manager.players.get(channel.guild.id);
                if (!player) return;
                if(channel.id === player.voiceChannel){
                  //destroy
                  player.destroy();
                }
              }
            }
          }catch{ }
        })
        //If the Bot gets Remove from the Guild and there is still a player, remove it ;)
        client.on("guildRemove", guild => {
          try{
              let player = client.manager.players.get(guild.id);
              if (!player) return;
              if(guild.id == player.guild){
                //destroy
                player.destroy();
              }
          }catch{ /* */ }
        })
        client.on("voiceStateUpdate", (oldState, newState) => {
          // LEFT V12
          if (oldState.channelID && !newState.channelID) {
            //if bot left
            try{
              if(oldState.member.user.id === client.user.id){
                let player = client.manager.players.get(oldState.guild.id);
                if (!player) return;
                  //destroy
                  player.destroy();
              }
            }catch{}
          }
          let player = client.manager.players.get(newState.guild.id);
          if (!player) return;
          databasing(client, player.guild, player.get("playerauthor"));
          if (config.settings.leaveOnEmpty_Channel.enabled && oldState && oldState.channel) {
              player = client.manager.players.get(oldState.guild.id);
              //if not connect return player.destroy()
              if(!oldState.guild.me.voice.channel) return player.destroy();
              //wait some time...
              if (player && oldState.guild.channels.cache.get(player.voiceChannel).members.size === 1) {
                  setTimeout(() => {
                      try {
                          player = client.manager.players.get(oldState.guild.id);
                          //if not connect return player.destroy()
                          if(!oldState.guild.me.voice.channel && player) return player.destroy();
                          //wait some time...
                          if (player && oldState.guild.channels.cache.get(player.voiceChannel).members.size === 1) {
                              let embed = new MessageEmbed()
                                  .setTitle(`${emoji.msg.ERROR} Queue has ended | Channel Empty`)
                                  .setDescription(`I left the Channel: ${client.channels.cache.get(player.voiceChannel).name} because the Channel was empty for: ${ms(config.settings.leaveOnEmpty_Channel.time_delay, { long: true })}`)
                                  .setColor(ee.wrongcolor)
                                  .setFooter(ee.footertext, ee.footericon);
                              //if        player afk                              or      guild afk     is enbaled return and not destroy the PLAYER
                              if(player.get(`afk-${player.get("playerauthor")}`) || player.get(`afk-${player.guild}`))
                                return client.channels.cache.get(player.textChannel).send(embed.setDescription(`I will not Leave the Channel, cause afk is ✔️ Enabled`)).then(msg => {
                                try{
                                 msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                                }catch{ /* */ }
                              });
                              client.channels.cache.get(player.textChannel).send(embed).then(msg => {
                              try{
                               msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                              }catch{ /* */ }
                            });
                              try {
                                  client.channels.cache
                                      .get(player.textChannel)
                                      .messages.fetch(player.get("playermessage")).then(msg => {
                                      try{
                                       msg.delete({timeout: 4000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
                                      }catch{ /* */ }
                                    });
                              } catch (e) {
                                  console.log(String(e.stack).yellow);
                              }
                              player.destroy();
                          }
                      } catch (e) {
                          console.log(String(e.stack).yellow);
                      }
                  }, config.settings.leaveOnEmpty_Channel.time_delay);
              }
          }
        });

    }catch (e){
      console.log(String(e.stack).bgRed)
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
