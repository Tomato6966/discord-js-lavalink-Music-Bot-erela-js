const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const {format} = require("duratiform")
module.exports = {
    name: "skip",
    category: "🎶 Music",
    aliases: ["s"],
    description: "Skips the current song",
    usage: "skip",
    run: async(client, message, args) => {
      const { channel } = message.member.voice;
      const player = client.manager.players.get(message.guild.id);
      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));  
      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      if( player.queue.size == 0) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is no song i could skip to.").setDescription("You can end the Queue with: `stop`"));  
      player.stop();
      const embed = new MessageEmbed()
      .setTitle("⏭ Skipped to the next song")
      .setColor(ee.color)
      return message.channel.send(embed);
    }
};