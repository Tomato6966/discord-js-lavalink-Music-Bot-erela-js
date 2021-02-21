const {
    Manager
} = require("erela.js");
const {
    MessageEmbed
} = require("discord.js");
const ms = require("ms");
const ee = require("../botconfig/embed.json");
const Spotify = require("erela.js-spotify");
const config = require("../botconfig/config.json");
const {
    createBar,
    format,
    databasing,
    playANewTrack,
    isrequestchannel,
    edit_request_message_track_info
} = require("../handlers/functions");
const clientID = config.spotify.clientID;
const clientSecret = config.spotify.clientSecret;
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
                console.log(`Node ${node.options.identifier} connected`.green);
            })
            .on("nodeCreate", (node) => {
                console.log(`Node ${node.options.identifier} created`.bgGreen.black);
            })
            .on("nodeReconnect", (node) => {
                console.log(`Node ${node.options.identifier} reconnected`.bold.green);
            })
            .on("nodeDisconnect", (node) => {
                console.log(`Node ${node.options.identifier} disconnected`.yellow);
            })
            .on("nodeError", (node, error) => {
                console.log(`Node ${node.options.identifier} had an error: ${error.message}`);
            })
            .on("playerCreate", async (player) => {
                setTimeout(async () => {
                    player.setVolume(50);
                    player.setEQ(client.eqs.music);
                    databasing(client, player.guild, player.get("playerauthor"));
                    let gpremium = client.premium.get(player.guild);
                    let ppremium = client.premium.get(player.get("playerauthor"));
                    let ownerstringarray = "";
                    for (let i = 0; i < config.ownerIDS.length; i++) {
                        try {
                            let user = await client.users.fetch(config.ownerIDS[i]);
                            ownerstringarray += `\`${user.tag}\`/`;
                        } catch {}
                    }
                    let embed = new MessageEmbed()
                    try{embed.setTitle(`:thumbsup: Joined \`🔈${client.channels.cache.get(player.voiceChannel).name}\``)}catch{}
                        try{embed.setDescription(`And bound to: \`#${client.channels.cache.get(player.textChannel).name}\`\n`)}catch{}
                        try{embed.addField("🔊 Volume", `\`${player.volume}%\``, true)}catch{}
                        try{embed.addField("🎚 Equalizer: ", `\`🎵 Music\``, true)}catch{}
                        try{embed.addField(`${player.queueRepeat ? "🔂 Queue Loop: " : "🔁 Song Loop: "}`, `\`${player.queueRepeat ? `\`✔️ Enabled\`` : player.trackRepeat ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}\``, true)}catch{}
                        try{embed.addField("🗣️ Leave on Empty Channel: ", `${config.settings.leaveOnEmpty_Channel.enabled ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}`, true)}catch{}
                        try{embed.addField("⌛ Leave on Empty Queue: ", `${config.settings.LeaveOnEmpty_Queue.enabled ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}`, true)}catch{}
                        try{embed.addField("\u200b", "\u200b")}catch{}
                        try{embed.addField("💰 Player Premium", `${ppremium ? (ppremium.enabled ? `\`✔️ Enabled\`` : `\`❌ Disabled\`\nDm to enable:\n> ${ownerstringarray.substr(0, ownerstringarray.length - 1)}`.substr(0, 1020)) : `\`❌ Disabled\``}`, true)}catch{}
                        try{embed.addField("💰 Guild Premium", `${gpremium ? (gpremium.enabled ? `\`✔️ Enabled\`` : `\`❌ Disabled\`\nDm to enable:\n> ${ownerstringarray.substr(0, ownerstringarray.length - 1)}`.substr(0, 1020)) : `\`❌ Disabled\``}`, true)}catch{}
                        try{embed.setColor(ee.color)}catch{}
                        try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                    if ((ppremium && ppremium.enabled) || (gpremium && gpremium.enabled))
                        try{embed.addField("💰 PREMIUM **24/7 Music**:",`${gpremium.twentyfourseven  ? `\`✔️ Enabled\``  : ppremium.twentyfourseven ? `\`✔️ Enabled\`\nTo disable type:\`?afk\``: `\`❌ Disabled\`\nTo enable type: \`?afk\``}`,true);}catch{}
                    if(isrequestchannel(client, player.get("message"))) return;
                    client.channels.cache
                        .get(player.textChannel)
                        .send(embed)
                        .then((msg) => player.set("PlayerQueueMessage", msg.id));
                }, 100);
            })
            .on("playerMove", (player, oldChannel, newChannel) => {
                if (!newChannel) {
                    try {
                        let embed = new MessageEmbed()}catch{}
                        try{embed.setTitle("❌ Queue has ended.")}catch{}
                        try{embed.setDescription(`I left the Channel:\`${client.channels.cache.get(player.voiceChannel).name}\``)}catch{}
                        try{embed.setColor(ee.wrongcolor)}catch{}
                        try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                        client.channels.cache
                            .get(player.textChannel)
                            .send(embed)
                    try {
                        client.channels.cache
                            .get(player.textChannel)
                            .messages.fetch(player.get("playermessage"))
                            .then((msg) => msg ? msg.delete() : console.log("ZzzZ"));
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
                player.set("votes", "0");
                client.stats.inc(player.guild, "songs");
                client.stats.inc("global", "songs");
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
                try{embed.addField("Duration: ", `\`${track.isStream ? "LIVE STREAM" : format(track.duration)}\``, true)}catch{}
                try{embed.addField("Song By: ", `\`${track.author}\``, true)}catch{}
                try{embed.addField("Queue length: ", `\`${player.queue.length} Songs\``, true)}catch{}
                try{embed.setFooter(`Requested by: ${track.requester.tag}`, track.requester.displayAvatarURL({dynamic: true}));}catch{}
                if(isrequestchannel(client, player.get("message"))) return edit_request_message_track_info(client, player, track);
                client.channels.cache.get(player.textChannel).send(embed).then(msg =>{
                  msg.react("⏪") //rewind 20 seconds
                  msg.react("⏯") //pause / resume
                  msg.react("⏹") //stop playing music
                  msg.react("⏩") //forward 20 seconds
                  msg.react("⏭") //skip track / stop playing
                  msg.react("🔉")  //reduce volume by 10%
                  msg.react("🔊")  //raise volume by 10%
                  msg.react("🔁") //change repeat mode --> track --> Queue --> none
                  msg.react("🔀") //shuffle the Queue

                  var collector = msg.createReactionCollector((reaction, user) => user.id !== client.user.id, {
                    time: track.duration > 0 ? track.duration : 600000
                  });

                  collector.on("collect", (reaction, user) => {
                    //get the message object out of the reaction
                    const { message } = reaction;
                    //get the database information
                    let db = client.setups.get(message.guild.id)
                    //removing the reaction of the User
                    reaction.users.remove(user.id).catch(e=>console.log(String(e.stack).yellow));
                    //get the member who makes the reaction
                    const member = message.guild.members.cache.get(user.id);
                    //getting the Voice Channel Data of the Message Member
                    const { channel } = member.voice;
                    //if not in a Voice Channel return!
                    if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("❌ ERROR | You need to join a voice channel."));
                    //get the lavalink erela.js player information
                    const player = client.manager.players.get(message.guild.id);
                    //if there is a player and the user is not in the same channel as the Bot return information message
                    if (player && channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("❌ ERROR | I am already playing somewhere else!").setDescription(`You can listen to me in: \`${message.guild.channels.cache.get(player.VoiceChannel).name}\``));
                    //switch case for every single reaction emoji someone
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

                  });

                  collector.on("end", () => {
                    msg.reactions.removeAll().catch(console.error);
                  });
                })
            })
            .on("trackStuck", (player, track, payload) => {
                let embed = new MessageEmbed()
                try{embed.setTitle("❌ Track got stuck!")}catch{}
                try{embed.setDescription(`I skipped the track:[${track.title}](${track.uri})`)}catch{}
                try{embed.setThumbnail(track.displayThumbnail(1))}catch{}
                try{embed.setColor(ee.wrongcolor)}catch{}
                try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                client.channels.cache
                    .get(player.textChannel)
                    .send(embed)
                player.stop();
            })
            .on("trackError", (player, track, payload) => {
                let embed = new MessageEmbed()
                try{embed.setTitle("❌ Track got errored!")}catch{}
                try{embed.setDescription(`I skipped the track:[${track.title}](${track.uri})`)}catch{}
                try{embed.setThumbnail(track.displayThumbnail(1))}catch{}
                try{embed.setColor(ee.wrongcolor)}catch{}
                try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                client.channels.cache
                    .get(player.textChannel)
                    .send(embed)
                player.stop();
            })
            .on("queueEnd", (player) => {
                databasing(client, player.guild, player.get("playerauthor"));
                let gpremium = client.premium.get(player.guild);
                let ppremium = client.premium.get(player.get("playerauthor"));
                if ((ppremium && ppremium.enabled && ppremium.twentyfourseven) || (gpremium && gpremium.enabled && gpremium.twentyfourseven)) {
                    let embed = new MessageEmbed()
                    try{embed.setTitle("❌ Queue has ended.")}catch{}
                        try{embed.setDescription(`I will not leave the Channel:\`${client.channels.cache.get(player.voiceChannel).name}\`because\`AFK-MODE\`is active!`)}catch{}
                        try{embed.setColor(ee.wrongcolor)}catch{}
                        try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                    return client.channels.cache
                        .get(player.textChannel)
                        .send(embed)
                }
                if (config.settings.LeaveOnEmpty_Queue.enabled) {
                    setTimeout(() => {
                        try {
                            if (player.queue.size === 0) {
                                let embed = new MessageEmbed()
                                try{embed.setTitle("❌ Queue has ended.")}catch{}
                                try{embed.setDescription(`I left the Channel: \`${client.channels.cache.get(player.voiceChannel).name}\` because the Queue was empty for: \`${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}\``)}catch{}
                                try{embed.setColor(ee.wrongcolor)}catch{}
                                    try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                                client.channels.cache
                                    .get(player.textChannel)
                                    .send(embed)
                                try {
                                    client.channels.cache
                                        .get(player.textChannel)
                                        .messages.fetch(player.get("playermessage"))
                                        .then((msg) => msg ? msg.delete() : console.log("ZzzZ"));
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
        client.on("voiceStateUpdate", (oldState, newState) => {
            const player = client.manager.players.get(newState.guild.id);
            if (!player) return;
            databasing(client, player.guild, player.get("playerauthor"));
            let gpremium = client.premium.get(player.guild);
            let ppremium = client.premium.get(player.get("playerauthor"));
            if (gpremium && gpremium.enabled && gpremium.twentyfourseven) return;
            if (ppremium && ppremium.enabled && ppremium.twentyfourseven) return;
            if (config.settings.leaveOnEmpty_Channel.enabled && oldState && oldState.channel) {
                const player = client.manager.players.get(oldState.guild.id);
                if (player && oldState.guild.channels.cache.get(player.voiceChannel).members.size === 1) {
                    setTimeout(() => {
                        try {
                            if (player && oldState.guild.channels.cache.get(player.voiceChannel).members.size === 1) {
                                let embed = new MessageEmbed()
                                    .setTitle("❌ Queue has ended.")
                                    .setDescription(`I left the Channel: \`${client.channels.cache.get(player.voiceChannel).name}\` because the Channel was empty for: \`${ms(config.settings.leaveOnEmpty_Channel.time_delay, { long: true })}\``)
                                    .setColor(ee.wrongcolor)
                                    .setFooter(ee.footertext, ee.footericon);
                                client.channels.cache.get(player.textChannel).send(embed);
                                try {
                                    client.channels.cache
                                        .get(player.textChannel)
                                        .messages.fetch(player.get("playermessage"))
                                        .then((msg) => msg ? msg.delete() : console.log("ZzzZ"));
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
    } catch (e) {
        console.log(String(e.stack).red)
    }
};
