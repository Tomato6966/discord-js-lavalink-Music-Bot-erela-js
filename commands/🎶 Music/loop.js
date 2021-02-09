const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
    name: "loop",
    category: "🎶 Music",
    aliases: ["repeat", "l"],
    description: "Repeats the current song",
    usage: "loopsong",
    run: async(client, message, args) => {
      const { channel } = message.member.voice;
      if (!channel) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
      
      const player = client.manager.players.get(message.guild.id);
      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));  
      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      if(!args[0]) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("Please add your method!").setDescription("`loop song` / `loop queue`"));
      if(args[0].toLowerCase() === "song" || args[0].toLowerCase() === "track"){
        const embed = new MessageEmbed()
        .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        if(player.queueRepeat) {
          embed.setDescription(`And **Queue** Repeat got **disabled**`)
          player.setQueueRepeat(false);
        }
        player.setTrackRepeat(!player.trackRepeat);
        return message.channel.send(embed.setTitle(`🔀 Track Loop is now ${player.trackRepeat ? "active" : "disabled"}.`));
      }
      else if(args[0].toLowerCase() === "queue"){
        const embed = new MessageEmbed()
        .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
  
        if(player.trackRepeat) {
          embed.setDescription(`And **Song** Repeat got **disabled**`)
          player.setTrackRepeat(false);
        }
        player.setQueueRepeat(!player.queueRepeat);
        
        return message.channel.send(embed.setTitle(`🔀 Queue Loop is now ${player.queueRepeat ? "active" : "disabled"}.`));
      }
      else{
        return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("Please add your method!").setDescription("`loop song` / `loop queue`"));
      }
      
    }
};