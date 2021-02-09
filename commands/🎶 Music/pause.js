const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
    name: "pause",
    category: "🎶 Music",
    aliases: ["break"],
    description: "Pauses the Current Song",
    usage: "pause",
    run: async(client, message, args) => {
      const { channel } = message.member.voice;
      if (!channel) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
      
      const player = client.manager.players.get(message.guild.id);
      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));  
      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      if(!player.playing) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("The song is already paused!").setDescription("You can resume it with: `resume`"));  
      player.pause(true);
        const embed = new MessageEmbed()
        .setTitle(`${player.playing ? "▶️ Resumed" : "⏸ Paused"} the Player.`)
        .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      return message.channel.send(embed);
    }
};