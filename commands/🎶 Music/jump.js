const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
    name: "jump",
    category: "🎶 Music",
    aliases: ["skipto"],
    description: "Skips to a specific Track",
    usage: "skipto <Trackindex>",
    run: async(client, message, args, cmduser, text, prefix) => {
      const { channel } = message.member.voice;
      if (!channel) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
      const player = client.manager.players.get(message.guild.id);
      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));  
      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      if(!args[0]) return message.reply("Please include a track Usage: `removetrack <Trackindex>` e.g: `removetrack 3`")
      if(isNaN(args[0])) return message.reply("It has to be a queue Number")
      let trackn = Number(args[0])
      if(trackn > player.queue.size) return message.reply("That song is not in the queue, sorry")
      player.queue.remove(0,trackn-1);
      player.stop()
      const embed = new MessageEmbed().setTitle(`⏭ Skipped: \`${trackn}\` Songs`).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      return message.channel.send(embed);
    }
};