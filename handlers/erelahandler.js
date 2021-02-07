const { Manager } = require("erela.js");
const {MessageEmbed} = require("discord.js")
const {format} = require("duratiform")
module.exports = (client) => {
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
    .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
    .on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
    .on("trackStart", (player, track) => {
        let embed = new MessageEmbed()
        .setTitle("Playing :notes: " + track.title)
        .setURL(track.uri).setColor("GREEN")
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
      client.channels.cache
        .get(player.textChannel)
        .send(":x: Queue has ended.");
  
      player.destroy();
    });
  
  client.once("ready", () => {
    client.manager.init(client.user.id);
  });
  
    client.on("raw", (d) => client.manager.updateVoiceState(d));
  
}