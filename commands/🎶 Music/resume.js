const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { createBar, format } = require(`../../handlers/functions`);
module.exports = {
    name: `resume`,
    category: `🎶 Music`,
    aliases: [`r`],
    description: `Resumes the Current paused Song`,
    usage: `resume`,
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      //get the channel instance from the Member
      const { channel } = message.member.voice;
      //if the member is not in a channel, return
      if (!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | You need to join a voice channel.`)
        );
      //get the player instance
      const player = client.manager.players.get(message.guild.id);
      //if no player available return error | aka not playing anything
      if (!player)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | There is nothing playing`)
        );
      //if not in the same channel as the player, return Error
      if (channel.id !== player.voiceChannel)
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Error | You need to be in my voice channel to use this command!`)
          .setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
        );
      //if its playing then return error
      if (player.playing)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | The song is already resumed!`)
          .setDescription(`You can pause it with: \`${prefix}pause\``)
        );
      //pause the player
      player.pause(false);
      //send success message
      return message.channel.send(new MessageEmbed()
          .setTitle(`${emoji.msg.SUCCESS} Success | ${player.playing ? `${emoji.msg.resume} Resumed` : `${emoji.msg.pause} Paused`} the Player.`)
          .addField(`${emoji.msg.time} Progress: `, createBar(player))
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        );
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
