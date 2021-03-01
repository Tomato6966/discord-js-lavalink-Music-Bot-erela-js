
const { Manager } = require("erela.js");
const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const ee = require("../botconfig/embed.json");
const Spotify = require("erela.js-spotify");
const config = require("../botconfig/config.json");
const { createBar, delay, format, databasing, playANewTrack, isrequestchannel, edit_request_message_track_info, getRandomInt, autoplay } = require("../handlers/functions");
const clientID = config.spotify.clientID;
const clientSecret = config.spotify.clientSecret;
let playermanager = require("../handlers/playermanager");
let hasmap = new Map();
module.exports = (client) => {
    try {
        client.manager = new Manager({
            nodes: config.clientsettings.nodes,
            plugins: [new Spotify({
                clientID,
                clientSecret
            })],
            send(id, payload) {
                const guild = client.guilds.cache.get(id);
                if (guild) guild.shard.send(payload);
            },
        });
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
                    try{embed.setTitle(`:thumbsup: Joined \`🔈${client.channels.cache.get(player.voiceChannel).name}\``)}catch{}
                        try{embed.setDescription(`And bound to: \`#${client.channels.cache.get(player.textChannel).name}\`\n💬 Pruning \`${client.settings.get(message.guild.id, `pruning`) ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}`)}catch{}
                        try{embed.addField("🔊 Volume", `\`${player.volume}%\``, true)}catch{}
                        try{embed.addField("🎚 Equalizer: ", `\`🎵 Music\``, true)}catch{}
                        try{embed.addField(`${player.queueRepeat ? "🔂 Queue Loop: " : "🔁 Song Loop: "}`, `\`${player.queueRepeat ? `\`✔️ Enabled\`` : player.trackRepeat ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}\``, true)}catch{}
                        try{embed.addField("🗣️ Leave on Empty Channel: ", `${config.settings.leaveOnEmpty_Channel.enabled ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}`, true)}catch{}
                        try{embed.addField("⌛ Leave on Empty Queue: ", `${config.settings.LeaveOnEmpty_Queue.enabled ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}`, true)}catch{}
                        try{embed.addField("💿 Autoplay", `${player.get("autoplay") ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}`, true)}catch{}
                        try{embed.addField("💰 Premium GUILD", `${client.premium.get(player.guild).enabled ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}`, true)}catch{}
                        try{embed.addField("💰 Premium USER", `${client.premium.get(player.get("playerauthor")).enabled ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}`, true)}catch{}
                        try{embed.addField("💰 24/7 AFK Setup", `PLAYER: ${player.get(`afk-${player.get("playerauthor")}`) ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}\nGUILD: ${player.get(`afk-${player.guild}`) ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}`, true)}catch{}
                        try{embed.setColor(ee.color)}catch{}
                        try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                        if(isrequestchannel(client, player.get("message"))) return;
                        client.channels.cache.get(player.textChannel).send(embed).then(async msg => {
                          try{
                            await delay(10000)
                            if(msg && client.channels.cache.get(player.textChannel).messages.cache.get(msg.id)) msg.delete();
                          }catch{ /* */ }
                        });
                }, 100);
            })
            .on("playerMove", (player, oldChannel, newChannel) => {
                if (!newChannel) {
                  try {let embed = new MessageEmbed()}catch{}
                  try{embed.setTitle("❌ Queue has ended.")}catch{}
                  try{embed.setDescription(`I left the Channel:\`${client.channels.cache.get(player.voiceChannel).name}\``)}catch{}
                  try{embed.setColor(ee.wrongcolor)}catch{}
                  try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                  client.channels.cache.get(player.textChannel).send(embed).then(async msg => {
                    try{
                      await delay(7000)
                      if(msg && client.channels.cache.get(player.textChannel).messages.cache.get(msg.id)) msg.delete();
                    }catch{ /* */ }
                  });;
                  try {
                      client.channels.cache.get(player.textChannel).messages.fetch(player.get("playermessage")).then(async msg => {
                        try{
                          await delay(2500)
                          if(msg && client.channels.cache.get(player.textChannel).messages.cache.get(msg.id)) msg.delete();
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
                try{embed.setTitle("Playing :notes: **`" + track.title + "`**")}catch{}
                try{embed.setURL(track.uri)}catch{}
                try{embed.setColor(ee.color)}catch{}
                try{embed.setThumbnail(track.displayThumbnail(1))}catch{}
                try{embed.addField("⌛ Duration: ", `\`${track.isStream ? "LIVE STREAM" : format(track.duration)}\``, true)}catch{}
                try{embed.addField("💯 Song By: ", `\`${track.author}\``, true)}catch{}
                try{embed.addField("🔂 Queue length: ", `\`${player.queue.length} Songs\``, true)}catch{}
                try{embed.setFooter(`Requested by: ${track.requester.tag}`, track.requester.displayAvatarURL({dynamic: true}));}catch{}
                if(isrequestchannel(client, player.get("message"))) return edit_request_message_track_info(client, player, track);
                //if pruning is enabled --> send the msg
                if(client.settings.get(player.guild, "pruning"))
                  client.channels.cache.get(player.textChannel).send(embed).then(msg =>{
                  //try to delete the old playingsongmsg informational track if not available / get able --> catch and dont crash
                  try{ player.get("playingsongmsg").delete(); }catch{ /* */ }
                  //set the old message information to a variable
                  player.set("playingsongmsg", msg)
                  //react with all emojis
                  msg.react("⏪") //rewind 20 seconds
                  msg.react("⏩") //forward 20 seconds
                  msg.react("⏯") //pause / resume

                  msg.react("⏹") //stop playing music
                  msg.react("⏮") //skip back  track / (play previous)
                  msg.react("⏭") //skip track / stop playing

                  msg.react("🔃") //replay track
                  msg.react("🔉")  //reduce volume by 10%
                  msg.react("🔊")  //raise volume by 10%

                  msg.react("🔇")  //toggle mute
                  msg.react("🔁") //change repeat mode --> track --> Queue --> none
                  msg.react("♾")  //toggle autoplay mode

                  msg.react("🔀") //shuffle the Queue
                  msg.react("📑") //shows the Queue
                  msg.react("🩸") //shows the current Track
                  //create the collector
                  var collector = msg.createReactionCollector((reaction, user) => user.id !== client.user.id, {
                    time: track.duration > 0 ? track.duration : 600000
                  });

                  collector.on("collect", async (reaction, user) => {
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
                      if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("❌ ERROR | You need to join a voice channel."));
                      //get the lavalink erela.js player information
                      let player = client.manager.players.get(message.guild.id);
                      //if there is a player and the user is not in the same channel as the Bot return information message
                      if (player && channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("❌ ERROR | I am already playing somewhere else!").setDescription(`You can listen to me in: \`${message.guild.channels.cache.get(player.VoiceChannel).name}\``));
                      //switch case for every single reaction emoji someone
                      switch(reaction.emoji.name){
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
                        ).then(async msg => {
                          try{
                            await delay(4000)
                            if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                          }catch{ /* */ }
                        });
                      break;
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
                        ).then(async msg => {
                          try{
                            await delay(4000)
                            if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                          }catch{ /* */ }
                        });
                      break;
                      case "⏯":
                        //pause the player / resume it
                        player.pause(player.playing);
                        //send information message
                        message.channel.send(new MessageEmbed()
                            .setTitle(`${player.playing ? "▶️ Resumed" : "⏸ Paused"} the Player.`)
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                          ).then(async msg => {
                            try{
                              await delay(4000)
                              if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                            }catch{ /* */ }
                          });
                      break;

                      //////////////////////////////////////

                      case "⏹":
                        //leave and stop the music
                        player.destroy();
                        //send information message
                        message.channel.send(new MessageEmbed()
                          .setTitle("⏹ Stopped and left your channel")
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(async msg => {
                          try{
                            await delay(4000)
                            if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                          }catch{ /* */ }
                        });
                      break;
                      case "⏮":
                        //if there is no previous track
                        if(!player.queue.previous || player.queue.previous === null)
                          return message.channel.send(new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setFooter(ee.footertext, ee.footericon)
                            .setTitle("❌ Error | There is no previous song yet!")
                          ).then(async msg => {
                            try{
                              await delay(4000)
                              if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                            }catch{ /* */ }
                          });
                        message.channel.send(new MessageEmbed()
                          .setTitle("⏮ Playing Previous Track")
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(async msg => {
                          try{
                            await delay(4000)
                            if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                          }catch{ /* */ }
                        })
                        //define the type
                        let type = "skiptrack:youtube";
                        //if the previous was from soundcloud, then use type soundcloud
                        if(player.queue.previous.uri.includes("soundcloud")) type = "skiptrack:soundcloud"
                        //plays it
                        playermanager(client, message, Array(player.queue.previous.uri), type);
                      break;
                      case "⏭":
                        //if there is no Queue
                        if (player.queue.size == 0) {
                          //if its on autoplay mode, then do autoplay before leaving...
                          if(player.get("autoplay")) return autoplay(client, player, "skip");
                          //stop the music and leave the channel
                          player.destroy();
                          //send informational message
                          message.channel.send(new MessageEmbed()
                            .setTitle("⏹ Stopped and left your channel")
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                          ).then(async msg => {
                            try{
                              await delay(4000)
                              if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                            }catch{ /* */ }
                          });
                        }
                        //skip the track
                        player.stop();
                        //send an informational message
                        message.channel.send(new MessageEmbed()
                          .setTitle("⏭ Skipped to the next song")
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(async msg => {
                          try{
                            await delay(4000)
                            if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                          }catch{ /* */ }
                        });
                      break;

                      //////////////////////////////////////

                      case "🔃":
                        //seek to 0
                        player.seek(0);
                        //send an information message
                        message.channel.send(new MessageEmbed()
                          .setTitle(`🔃 Replaying Current Track`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(async msg => {
                          try{
                            await delay(4000)
                            if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                          }catch{ /* */ }
                        });
                      break;
                      case "🔉":
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
                        ).then(async msg => {
                          try{
                            await delay(4000)
                            if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                          }catch{ /* */ }
                        });
                      break;
                      case "🔊":
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
                        ).then(async msg => {
                          try{
                            await delay(4000)
                            if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                          }catch{ /* */ }
                        });
                      break;

                      //////////////////////////////////////

                      case "🔇":
                        //get the volume
                        let volumemute = player.volume === 0 ? 50 : 0;
                        //set the palyer volume to the volume
                        player.setVolume(volumemute);
                        //send an informational message
                        message.channel.send(new MessageEmbed()
                          .setTitle(`${player.volume === 0 ? `🔇 Muted the Player` : `🔉 Unmuted the Player`}`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(async msg => {
                          try{
                            await delay(4000)
                            if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                          }catch{ /* */ }
                        });
                      break;
                      case "🔁":
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
                            ).then(async msg => {
                              try{
                                await delay(4000)
                                if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
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
                            .setTitle(`🔀 Queue Loop is now ${player.queueRepeat ? "active" : "disabled"}.`)
                            .setDescription(`And Track Loop is now ${player.trackRepeat ? "active" : "disabled"}.`)
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                          ).then(async msg => {
                            try{
                              await delay(4000)
                              if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
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
                            .setTitle(`🔀 Queue Loop is now ${player.queueRepeat ? "active" : "disabled"}.`)
                            .setDescription(`And Track Loop is now ${player.trackRepeat ? "active" : "disabled"}.`)
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                          ).then(async msg => {
                            try{
                              await delay(4000)
                              if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                            }catch{ /* */ }
                          });
                        }
                      break;
                      case "♾":
                        //toggle autoplay
                        player.set("autoplay", !player.get("autoplay"))
                        //Send Success Message
                        message.channel.send(new MessageEmbed()
                          .setTitle(`✅ Success | ${player.get("autoplay") ? `\`✔️ Enabled\`` : `\`❌ Disabled\``} Autoplay`)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(async msg => {
                          try{
                            await delay(4000)
                            if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                          }catch{ /* */ }
                        });
                      break;

                      //////////////////////////////////////

                      case "🔀":
                        //shuffle the Queue
                        player.queue.shuffle();
                        //send informational message
                        message.channel.send(new MessageEmbed()
                          .setTitle("🔀 The queue is now shuffled.")
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                        ).then(async msg => {
                          try{
                            await delay(4000)
                            if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                          }catch{ /* */ }
                        });
                      break;
                      case "📑":
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
                          return message.channel.send(embed.setDescription(`❌ No tracks in the queue`)).then(async msg => {
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
                          await user.send(embed.setDescription(String(quelist[i]).substr(0, 2048)));
                        }
                        user.send(new MessageEmbed()
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

                      break;
                      case "🩸":
                      //Send Now playing Message
                      return message.channel.send(new MessageEmbed()
                          .setAuthor("Current song playing:", message.author.displayAvatarURL({ dynamic: true }))
                          .setThumbnail(player.queue.current.displayThumbnail(1))
                          .setURL(player.queue.current.uri)
                          .setColor(ee.color)
                          .setFooter(ee.footertext, ee.footericon)
                          .setTitle(`${player.playing ? "▶" : "⏸"} **${player.queue.current.title}**`)
                          .addField("⌛️ Duration: ", "`" + format(player.queue.current.duration) + "`", true)
                          .addField("💯 Song By: ", "`" + player.queue.current.author + "`", true)
                          .addField("🔂 Queue length: ", `\`${player.queue.length} Songs\``, true)
                          .addField("⏳ Progress: ", createBar(player))
                          .setFooter(`Requested by: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({ dynamic: true }))
                        ).then(async msg => {
                          try{
                            await delay(5000)
                            if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                          }catch{ /* */ }
                        })
                      break;
                    }
                  }catch (e){ console.log(e) /* */ }
                  });
                })
              }catch (e){console.log(String(e.stack).yellow) /* */}
          })
            .on("trackStuck", (player, track, payload) => {
                let embed = new MessageEmbed()
                try{embed.setTitle("❌ Track got stuck!")}catch{}
                try{embed.setDescription(`I skipped the track: [${track.title}](${track.uri})`)}catch{}
                try{embed.setThumbnail(track.displayThumbnail(1))}catch{}
                try{embed.setColor(ee.wrongcolor)}catch{}
                try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                client.channels.cache
                    .get(player.textChannel)
                    .send(embed).then(async msg => {
                      try{
                        await delay(7500)
                        if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                      }catch{ /* */ }
                    });
                player.stop();
            })
            .on("trackError", (player, track, payload) => {
                let embed = new MessageEmbed()
                try{embed.setTitle("❌ Track got errored!")}catch{}
                try{embed.setDescription(`I skipped the track: [${track.title}](${track.uri})`)}catch{}
                try{embed.setThumbnail(track.displayThumbnail(1))}catch{}
                try{embed.setColor(ee.wrongcolor)}catch{}
                try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                client.channels.cache
                    .get(player.textChannel)
                    .send(embed).then(async msg => {
                      try{
                        await delay(7500)
                        if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                      }catch{ /* */ }
                    });
                player.stop();
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
                            try{embed.setTitle("❌ Queue has ended.")}catch{}
                            try{embed.setDescription(`I left the Channel: \`${client.channels.cache.get(player.voiceChannel).name}\` because the Queue was empty for: \`${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}\``)}catch{}
                            try{embed.setColor(ee.wrongcolor)}catch{}
                            try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                            //if        player afk                              or      guild afk     is enbaled return and not destroy the PLAYER
                            if(player.get(`afk-${player.get("playerauthor")}`) || player.get(`afk-${player.guild}`))
                              return client.channels.cache.get(player.textChannel).send(embed.setDescription(`I will not Leave the Channel, cause \`afk\` is \`✔️ Enabled\``)).then(async msg => {
                                try{
                                  await delay(7500)
                                  if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                                }catch{ /* */ }
                              });
                            //send information message
                            client.channels.cache.get(player.textChannel).send(embed).then(async msg => {
                              try{
                                await delay(7500)
                                if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                              }catch{ /* */ }
                            });

                            try {
                              client.channels.cache
                                  .get(player.textChannel)
                                  .messages.fetch(player.get("playermessage")).then(async msg => {
                                    try{
                                      await delay(7500)
                                      if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
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
            if(channel.members.has(client.user.id)){
              let player = client.manager.players.get(channel.guild.id);
              if (!player) return;
              //destroy
              player.destroy();
            }
          }catch{ }
        })
        //If the Bot gets Remove from the Guild and there is still a player, remove it ;)
        client.on("guildRemove", guild => {
          try{
              let player = client.manager.players.get(guild.id);
              if (!player) return;
              //destroy
              player.destroy();
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
                          if(!oldState.guild.me.voice.channel) return player.destroy();
                          //wait some time...
                          if (player && oldState.guild.channels.cache.get(player.voiceChannel).members.size === 1) {
                              let embed = new MessageEmbed()
                                  .setTitle("❌ Queue has ended | Channel Empty")
                                  .setDescription(`I left the Channel: \`${client.channels.cache.get(player.voiceChannel).name}\` because the Channel was empty for: \`${ms(config.settings.leaveOnEmpty_Channel.time_delay, { long: true })}\``)
                                  .setColor(ee.wrongcolor)
                                  .setFooter(ee.footertext, ee.footericon);
                              //if        player afk                              or      guild afk     is enbaled return and not destroy the PLAYER
                              if(player.get(`afk-${player.get("playerauthor")}`) || player.get(`afk-${player.guild}`))
                                return client.channels.cache.get(player.textChannel).send(embed.setDescription(`I will not Leave the Channel, cause \`afk\` is \`✔️ Enabled\``)).then(async msg => {
                                  try{
                                    await delay(7500)
                                    if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                                  }catch{ /* */ }
                                });
                              client.channels.cache.get(player.textChannel).send(embed).then(async msg => {
                                try{
                                  await delay(7500)
                                  if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                                }catch{ /* */ }
                              });
                              try {
                                  client.channels.cache
                                      .get(player.textChannel)
                                      .messages.fetch(player.get("playermessage")).then(async msg => {
                                        try{
                                          await delay(7500)
                                          if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
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
