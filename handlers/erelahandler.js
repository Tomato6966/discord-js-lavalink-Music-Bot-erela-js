const { Manager } = require("erela.js");
const {MessageEmbed} = require("discord.js")

const ee = require("../botconfig/embed.json")
const Spotify  = require("erela.js-spotify");
const config = require("../botconfig/config.json")
const clientID = config.spotify.clientID;
const clientSecret = config.spotify.clientSecret; 
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
    nodes: config.clientsettings.nodes,

    plugins: [
       // Initiate the plugin and pass the two required options.
       new Spotify({
         clientID,
         clientSecret
       })
     ],

    send(id, payload) {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    },
  })
    .on("nodeConnect", node => {
      console.log(`Node ${node.options.identifier} connected`.green)
    })
    .on("nodeCreate", node => {
      console.log(`Node ${node.options.identifier} created`.bgGreen.black)
    })
    .on("nodeReconnect", node => {
      console.log(`Node ${node.options.identifier} reconnected`.bold.green)
    })
    .on("nodeDisconnect", node => {
      console.log(`Node ${node.options.identifier} disconnected`.red)
    })
    .on("nodeError", (node, error) => {
      console.log(`Node ${node.options.identifier} had an error: ${error.message}`)
    })
    .on("playerCreate", (player) => {
      player.setVolume(50)
      //player.setEQ(client.eqs.music)
      let embed = new MessageEmbed()
      .setTitle(`:thumbsup: Joined \`🔈${client.channels.cache.get(player.voiceChannel).name}\``)
      .setDescription(`And bound to: \`#${client.channels.cache.get(player.textChannel).name}\`\n`)
      
      .addField("🔊 Volume", `\`${player.volume} %\``,true)
      .addField("\u200b", `\u200b`,true)
      .addField("🎚 Equalizer: ", `\`❌ Nothing\``,true)
      
      .addField("🔂 Queue Loop: ", `\`${player.queueRepeat ? `✔️ Enabled` : `❌ Disabled` }\``,true)
      .addField("\u200b", `\u200b`,true)
      .addField("🔁 Song Loop: ", `\`${player.trackRepeat ? `✔️ Enabled` : `❌ Disabled`}\``,true)
      
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)


      client.channels.cache
        .get(player.textChannel)
        .send(embed);
    })
    .on("trackStart", (player, track) => {
        let embed = new MessageEmbed()
        .setTitle("Started Playing :notes: **`" + track.title + "`**")
        .setURL(track.uri).setColor(ee.color)
        .setThumbnail(track.displayThumbnail())
        .addField("Duration: ", `\`${track.isStream ? "LIVE STREAM" : format(track.duration)}\``, true)
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
    })
    .on("playerMove", async (player, oldChannel, newChannel) => {
      if(!newChannel) {
        try{
          let embed = new MessageEmbed()
          .setTitle(":x: Queue has ended.")
          .setDescription(`I left the Channel: \`${client.channels.cache.get(player.voiceChannel).name}\``)
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          client.channels.cache
          .get(player.textChannel)
          .send(embed);
        }catch{}
        player.destroy();
      }
      else{
        player.voiceChannel = newChannel;
      try{ player.pause(true) } catch (e){ console.log(e) }
      await setTimeout(() => { console.log("SLEEP") }, 500);
      try{ player.pause(false)} catch (e){ console.log(e) }
      }
    });
  client.once("ready", () => {
    client.manager.init(client.user.id);
  });
  
    client.on("raw", (d) => client.manager.updateVoiceState(d));
  
}
function format(millis){
  var h=Math.floor(millis/360000),m=Math.floor(millis/60000),s=((millis%60000)/1000).toFixed(0);
  if(h<1) return(m<10?'0':'')+m+":"+(s<10?'0':'')+s;
  else return(h<10?'0':'')+h+":"+(m<10?'0':'')+m+":"+(s<10?'0':'')+s;
  }
  