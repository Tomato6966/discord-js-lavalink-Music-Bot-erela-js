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
                        try{embed.addField(
                            "💰 PREMIUM **24/7 Music**:",
                            `${
                            gpremium.twentyfourseven
                                ? `\`✔️ Enabled\``
                                : ppremium.twentyfourseven
                                ? `\`✔️ Enabled\`\nTo disable type:\`?24/7\``
                                : `\`❌ Disabled\`${gpremium.enabled || ppremium.enabled ? "\nTo disable type: `?24/7`" : "\nTo enable type: `?24/7`"}`
                        }`,
                            true
                        );}catch{}
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
                        try{embed.setTitle(":x: Queue has ended.")}catch{}
                        try{embed.setDescription(`I left the Channel:\`${client.channels.cache.get(player.voiceChannel).name}\``)}catch{}
                        try{embed.setColor(ee.wrongcolor)}catch{}
                        try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                        client.channels.cache
                            .get(player.textChannel)
                            .send(embed)
                            .then((msg) => msg.delete({timeout: 5000}).catch(e=>console.log(String(e.stack).yellow)));
                    try {
                        client.channels.cache
                            .get(player.textChannel)
                            .messages.fetch(player.get("playermessage"))
                            .then((msg) =>msg.delete());
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
                client.channels.cache.get(player.textChannel).send(embed)
            })
            .on("trackStuck", (player, track, payload) => {
                let embed = new MessageEmbed()
                try{embed.setTitle(":x: Track got stuck!")}catch{}
                try{embed.setDescription(`I skipped the track:[${track.title}](${track.uri})`)}catch{}
                try{embed.setThumbnail(track.displayThumbnail(1))}catch{}
                try{embed.setColor(ee.wrongcolor)}catch{}
                try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                client.channels.cache
                    .get(player.textChannel)
                    .send(embed)
                    .then((msg) => msg.delete({
                        timeout: 5000
                    }).catch(e=>console.log(String(e.stack).yellow)));
                player.stop();
            })
            .on("trackError", (player, track, payload) => {
                let embed = new MessageEmbed()
                try{embed.setTitle(":x: Track got errored!")}catch{}
                try{embed.setDescription(`I skipped the track:[${track.title}](${track.uri})`)}catch{}
                try{embed.setThumbnail(track.displayThumbnail(1))}catch{}
                try{embed.setColor(ee.wrongcolor)}catch{}
                try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                client.channels.cache
                    .get(player.textChannel)
                    .send(embed)
                    .then((msg) => msg.delete({
                        timeout: 5000
                    }).catch(e=>console.log(String(e.stack).yellow)));
                player.stop();
            })
            .on("queueEnd", (player) => {
                databasing(client, player.guild, player.get("playerauthor"));
                let gpremium = client.premium.get(player.guild);
                let ppremium = client.premium.get(player.get("playerauthor"));
                if ((ppremium && ppremium.enabled && ppremium.twentyfourseven) || (gpremium && gpremium.enabled && gpremium.twentyfourseven)) {
                    let embed = new MessageEmbed()
                    try{embed.setTitle(":x: Queue has ended.")}catch{}
                        try{embed.setDescription(`I will not leave the Channel:\`${client.channels.cache.get(player.voiceChannel).name}\`because\`AFK-MODE\`is active!`)}catch{}
                        try{embed.setColor(ee.wrongcolor)}catch{}
                        try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                    return client.channels.cache
                        .get(player.textChannel)
                        .send(embed)
                        .then((msg) => msg.delete({
                            timeout: 5000
                        }).catch(e=>console.log(String(e.stack).yellow)));
                }
                if (config.settings.LeaveOnEmpty_Queue.enabled) {
                    setTimeout(() => {
                        try {
                            if (player.queue.size === 0) {
                                let embed = new MessageEmbed()
                                try{embed.setTitle(":x: Queue has ended.")}catch{}
                                try{embed.setDescription(`I left the Channel: \`${client.channels.cache.get(player.voiceChannel).name}\` because the Queue was empty for: \`${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}\``)}catch{}
                                try{embed.setColor(ee.wrongcolor)}catch{}
                                    try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
                                client.channels.cache
                                    .get(player.textChannel)
                                    .send(embed)
                                    .then((msg) => msg.delete({
                                        timeout: 5000
                                    }).catch(e=>console.log(String(e.stack).yellow)));
                                try {
                                    client.channels.cache
                                        .get(player.textChannel)
                                        .messages.fetch(player.get("playermessage"))
                                        .then((msg) => msg ?msg.delete() : console.log("ZzzZ"));
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
                                    .setTitle(":x: Queue has ended.")
                                    .setDescription(`I left the Channel: \`${client.channels.cache.get(player.voiceChannel).name}\` because the Channel was empty for: \`${ms(config.settings.leaveOnEmpty_Channel.time_delay, { long: true })}\``)
                                    .setColor(ee.wrongcolor)
                                    .setFooter(ee.footertext, ee.footericon);
                                client.channels.cache.get(player.textChannel).send(embed);
                                try {
                                    client.channels.cache
                                        .get(player.textChannel)
                                        .messages.fetch(player.get("playermessage"))
                                        .then((msg) =>msg.delete());
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
