const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const {format} = require("duratiform")
module.exports = {
    name: "volume",
    category: "music",
    aliases: ["vol"],
    description: "Changes the Volume",
    usage: "volume <0-150>",
    run: async(client, message, args) => {
      const { channel } = message.member.voice;
      const player = client.manager.players.get(message.guild.id);
      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));  
      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      if(Number(args) <= 0 || Number(args) > 150) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You may set the volume `1` - `150`"));
      player.setVolume(Number(args));
      const embed = new MessageEmbed()
      .setTitle(`🔊 Volume set to: **${player.volume}%**`)
      .setColor(ee.color)
      return message.channel.send(embed);
    }
};