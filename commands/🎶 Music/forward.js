const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const { createBar, format} = require("../../handlers/functions");
module.exports = {
    name: "forward",
    category: "🎶 Music",
    aliases: ["seekforwards" ,"fwd"],
    description: "Seeks a specific amount of Seconds forwards",
    usage: "forward <Duration in Seconds>",
    run: async(client, message, args, cmduser, text, prefix) => {
      const { channel } = message.member.voice;
      if (!channel) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
      const player = client.manager.players.get(message.guild.id);
      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));  
      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      let seektime =  Number(player.position) + Number(args[0])*1000;
      if(Number(args[0]) <= 0 ) seektime = 0;
      if (Number(seektime) >= player.queue.current.duration) { seektime = player.queue.current.duration- 1; }
      if(!seektime) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`You may set the volume \`1\` - \`${(player.queue.current.duration - Number(player.position))/1000}\``));
      player.seek(Number(seektime));
      const embed = new MessageEmbed().setTitle(`⏩ Forwarded the song for: \`${args[0]} Seconds\`, to: ${format(Number(player.position))}`).addField("Progress: ", createBar((player.queue.current.duration == 0 ? player.position : player.queue.current.duration), player.position, 25, "▬", config.settings.progressbar_emoji) + "\n**" + new Date(player.position).toISOString().substr(11, 8) + " / " + (player.queue.current.duration == 0 ? " ◉ LIVE" : new Date(player.queue.current.duration).toISOString().substr(11, 8))+ "**").setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      return message.channel.send(embed);
    }
};

