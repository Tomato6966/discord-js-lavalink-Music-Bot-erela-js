const Discord = require(`discord.js`);
const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const songoftheday = require(`../../botconfig/songoftheday.json`);
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
    name: `playsongoftheday`,
    category: `🎶 Music`,
    aliases: [`psongoftheday`],
    description: `Plays the Song of the Day`,
    usage: `playsongoftheday`,
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      //get the channel instance
      const { channel } = message.member.voice;
      //if not in a voice Channel return error
      if (!channel)
          return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | You need to join a voice channel.`)
          );
      //get the player instance
      const player = client.manager.players.get(message.guild.id);
      //f not in the same channel --> return
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | You need to be in my voice channel to use this command!`)
          .setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
        );
      //play the SONG from YOUTUBE
      playermanager(client, message, Array(songoftheday.track.url), `song:youtube`);
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.message}\`\`\``)
        );
    }
  }
};
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
