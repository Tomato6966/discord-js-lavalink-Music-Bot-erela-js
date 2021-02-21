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

      if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));

      const player = client.manager.players.get(message.guild.id);

      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));

      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      if (!args[0]) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`You may rewind for \`1\`-\`${player.queue.current.duration}\``));
      let seektime = Number(player.position) + Number(args[0])*1000;
      if(Number(args[0]) <= 0 ) seektime = 0;
      if (Number(seektime) >= player.queue.current.duration) { seektime = player.queue.current.duration- 1000; }

      player.seek(Number(seektime));

      return message.channel.send(new MessageEmbed()
        .setTitle(`⏩ Forwarded the Song for: \`${args[0]} Seconds\`, to: ${format(Number(player.position))}`)
        .addField("⏳ Progress: ", createBar(player))
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
      );
    }
};
