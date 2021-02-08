const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const {format} = require("duratiform");
const createBar = require("string-progressbar");
module.exports = {
    name: "seek",
    category: "🎶 Music",
    aliases: ["vol"],
    description: "Changes the position(seek) of the Song",
    usage: "seek <Duration in Seconds>",
    run: async(client, message, args) => {
      const { channel } = message.member.voice;
      const player = client.manager.players.get(message.guild.id);
      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));  
      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      if(Number(args[0]) <= 0 || Number(args[0]) >= player.queue.current.duration/1000) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`You may set the volume \`1\` - \`${player.queue.current.duration}\``));
      player.seek(Number(args[0])*1000);
      const embed = new MessageEmbed()
      .setTitle(`✅ Seeked song to: ${format(Number(args[0])*1000, '(h:h:)(m:mm:)(s:ss)')}`)
      .addField("Progressbar: ", "**[" + createBar((player.queue.current.duration == 0 ? player.position : player.queue.current.duration), player.position, 25, "▬", "🟢")[0] + "]**\n**" + new Date(player.position).toISOString().substr(11, 8) + " / " + (player.queue.current.duration == 0 ? " ◉ LIVE" : new Date(player.queue.current.duration).toISOString().substr(11, 8))+ "**")
      .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      return message.channel.send(embed);
    }
};