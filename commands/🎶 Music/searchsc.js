const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const playermanager = require("../../handlers/playermanager");
module.exports = {
    name: "searchsc",
    category: "🎶 Music",
    aliases: ["searchsoundcloud", "scsearch", "soundcloudsearch"],
    description: "Searches a song from soundcloud",
    usage: "search <Song / URL>",
    run: async (client, message, args, cmduser, text, prefix) => {
      //get the channel instance
          const { channel } = message.member.voice;
          //if not in a voice Channel return error
          if (!channel)
              return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle("❌ Error | You need to join a voice channel.")
              );
          //if no args return error
          if (!args.length)
              return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle("❌ Error | You need to give me a URL or a search term.")
              );
          //get the player instance
          const player = client.manager.players.get(message.guild.id);
          //f not in the same channel --> return
          if(player && channel.id !== player.voiceChannel)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle("❌ Error | You need to be in my voice channel to use this command!")
              .setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
            );
          if (!args.length)
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle("you need to give me a URL or a search term.")
            );
        playermanager(client, message, args, "search:soundcloud");
    },
};
