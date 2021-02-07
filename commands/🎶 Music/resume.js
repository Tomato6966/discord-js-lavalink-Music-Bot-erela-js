const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const {format} = require("duratiform")
module.exports = {
    name: "resume",
    category: "🎶 Music",
    aliases: ["break"],
    description: "Resumes the Current paused Song",
    usage: "resume",
    run: async(client, message, args) => {
      const { channel } = message.member.voice;
      const player = client.manager.players.get(message.guild.id);
      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));  
      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      if(player.playing) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("The song is already resumed!").setDescription("You can pause it with: `pause`"));  
      player.pause(false);
        const embed = new MessageEmbed()
        .setTitle(`${player.playing ? "▶️ Resumed" : "⏸ Paused"} the Player.`)
        .setColor(ee.color)
      return message.channel.send(embed);
    }
};