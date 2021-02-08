const { Manager } = require("erela.js");
const {MessageEmbed} = require("discord.js")
const {format} = require("duratiform");
const ee = require("../botconfig/embed.json")
module.exports = (client) => {
client.defaultEQ = [
  { band: 0, gain: 0.15 },
  { band: 1, gain: 0.05 }, 
  { band: 2, gain: 0.025 }, 
  { band: 3, gain: 0 }, 
  { band: 4, gain: 0 }, 
  { band: 5, gain: -0.025 }, 
  { band: 6, gain: -0.05 },
  { band: 7, gain: -0.0175 }, 
  { band: 8, gain: 0 }, 
  { band: 9, gain: 0 }, 
  { band: 10, gain: 0.025 }, 
  { band: 11, gain: 0.05 }, 
  { band: 12, gain: 0.15 },
  { band: 13, gain: 0.25 }, 
  { band: 14, gain: 0.25 }
]
client.bassboost = {
  none: client.defaultEQ,
  low: [
    { band: 0, gain: 0.125 },
    { band: 1, gain: 0.25 }, 
    { band: 2, gain: -0.25 }, 
    { band: 3, gain: -0.125 }, 
    { band: 4, gain: 0 }, 
    { band: 5, gain: -0.025 }, 
    { band: 6, gain: -0.05 },
    { band: 7, gain: -0.0175 }, 
    { band: 8, gain: 0 }, 
    { band: 9, gain: 0 }, 
    { band: 10, gain: 0.025 }, 
    { band: 11, gain: 0.05 }, 
    { band: 12, gain: 0.15 },
    { band: 13, gain: 0.25 }, 
    { band: 14, gain: 0.25 }
  ],
  medium: [
    { band: 0, gain: 0.25 },
    { band: 1, gain: 0.5 }, 
    { band: 2, gain: -0.5 }, 
    { band: 3, gain: -0.25 }, 
    { band: 4, gain: 0 }, 
    { band: 5, gain: -0.025 }, 
    { band: 6, gain: -0.05 },
    { band: 7, gain: -0.0175 }, 
    { band: 8, gain: 0 }, 
    { band: 9, gain: 0 }, 
    { band: 10, gain: 0.025 }, 
    { band: 11, gain: 0.05 }, 
    { band: 12, gain: 0.15 },
    { band: 13, gain: 0.25 }, 
    { band: 14, gain: 0.25 }
  ],
  high: [
    { band: 0, gain: 0.375 },
    { band: 1, gain: 0.75 }, 
    { band: 2, gain: -0.75 }, 
    { band: 3, gain: -0.375 }, 
    { band: 4, gain: 0 }, 
    { band: 5, gain: -0.025 }, 
    { band: 6, gain: -0.05 },
    { band: 7, gain: -0.0175 }, 
    { band: 8, gain: 0 }, 
    { band: 9, gain: 0 }, 
    { band: 10, gain: 0.025 }, 
    { band: 11, gain: 0.05 }, 
    { band: 12, gain: 0.15 },
    { band: 13, gain: 0.25 }, 
    { band: 14, gain: 0.25 }
  ],
  earrape: [
    { band: 0, gain: 0.5 },
    { band: 1, gain: 1 }, 
    { band: 2, gain: -1 }, 
    { band: 3, gain: -0.5 }, 
    { band: 4, gain: 0 }, 
    { band: 5, gain: -0.025 }, 
    { band: 6, gain: -0.05 },
    { band: 7, gain: -0.0175 }, 
    { band: 8, gain: 0 }, 
    { band: 9, gain: 0 }, 
    { band: 10, gain: 0.025 }, 
    { band: 11, gain: 0.05 }, 
    { band: 12, gain: 0.15 },
    { band: 13, gain: 0.25 }, 
    { band: 14, gain: 0.25 }
  ]
}
client.eqs = {
  music: client.defaultEQ,
  bassboost: client.bassboost.medium,
  earrape: client.bassboost.earrape,
}
  client.manager = new Manager({
    
    nodes: [
     {
        host: "localhost",
        port: 2333,
        password: "youshallnotpass", 
      },
    ],

    send(id, payload) {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    },
  })
    .on("nodeConnect", node => {
      console.log(`Node ${node.options.identifier} connected`)
    })
    .on("nodeCreate", node => {
      console.log(`Node ${node.options.identifier} created`)
    })
    .on("nodeReconnect", node => {
      console.log(`Node ${node.options.identifier} reconnected`)
    })
    .on("nodeDisconnect", node => {
      console.log(`Node ${node.options.identifier} disconnected`)
    })
    .on("nodeError", (node, error) => {
      console.log(`Node ${node.options.identifier} had an error: ${error.message}`)
    })
    .on("playerCreate", (player) => {
      player.setVolume(50)
      player.setEQ(client.eqs.music)
      let embed = new MessageEmbed()
      .setTitle(`:thumbsup: Joined \`${client.channels.cache.get(player.voiceChannel).name}\``)
      .setDescription(`And bound to: \`${client.channels.cache.get(player.textChannel).name}\`\n`)
      .addField("🔊 Volume", `\`${player.volume} %\``,true)
      .addField("\u200b", `\u200b`,true)
      .addField("🎚 Equalizer: ", `\`🎵 Music\``,true)
      
      .addField("🔂 Queue Loop: ", `${player.queueRepeat ? `✔️ Enabled` : `❌ Disabled` }`,true)
      .addField("\u200b", `\u200b`,true)
      .addField("🔁 Song Loop: ", `${player.trackRepeat ? `✔️ Enabled` : `❌ Disabled`}`,true)
      
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)


      client.channels.cache
        .get(player.textChannel)
        .send(embed);
    })
    .on("trackStart", (player, track) => {
        let embed = new MessageEmbed()
        .setTitle("Playing :notes: " + track.title)
        .setURL(track.uri).setColor(ee.color)
        .setThumbnail(track.displayThumbnail())
        .addField("Duration: ", `\`${track.isStream ? "LIVE STREAM" : format(track.duration, '(h:h:)(m:mm:)(s:ss)')}\``, true)
        .addField("Song By: ", `\`${track.author}\``, true)
        .addField("Queue length: ", `\`${player.queue.length} Songs\``, true)
        .setFooter(`Requested by: ${track.requester.tag}`, track.requester.displayAvatarURL({dynamic: true}))
      client.channels.cache
        .get(player.textChannel)
        .send(embed);
    })
    .on("queueEnd", (player) => {
      let embed = new MessageEmbed()
      .setTitle(":x: Queue has ended.")
      .setDescription(`I left the Channel: \`${client.channels.cache.get(player.voiceChannel).name}\``)
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      client.channels.cache
        .get(player.textChannel)
        .send(embed);
      player.destroy();
    });
  
  client.once("ready", () => {
    client.manager.init(client.user.id);
  });
  
    client.on("raw", (d) => client.manager.updateVoiceState(d));
  
}