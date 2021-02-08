const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const {format} = require("duratiform")
module.exports = {
    name: "cleareq",
    category: "👀 Filter",
    aliases: ["ceq", "reseteq", "clearequalizer", "resetequalizer", "restoreequalizer", "req"],
    description: "Clears the Equalizer",
    usage: "clearEQ",
    run: async(client, message, args) => {
      const { channel } = message.member.voice;
      const player = client.manager.players.get(message.guild.id);
      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));  
      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      player.setEQ(client.eqs.music)
      const embed = new MessageEmbed()
      .setTitle("✅ Resetted the Equalizer")
      .addField("🎚 Equalizer: ", `\`🎵 Music | Equalizer\``)
      .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      return message.channel.send(embed);
    }
};