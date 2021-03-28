const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `loopqueue`,
  category: `🎶 Music`,
  aliases: [`repeatqueue`, `lq`, `rq`, `loopqu`, `repeatqu`],
  description: `Repeats the Queue`,
  usage: `loopqueue`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      //define the Embed
      const embed = new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.repeat_mode} Changed Queue loop to: ${player.queueRepeat ? `${emoji.msg.disabled} disabled` : `${emoji.msg.enabled} active`}`)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
      //If trackrepeat was active add informational message + disable it
      if (player.trackRepeat) {
        embed.setDescription(`And **Song** Repeat got **${emoji.msg.disabled} disabled**`);
        player.setTrackRepeat(false);
      }
      //change Queue Mode
      player.setQueueRepeat(!player.queueRepeat);
      //Send Success Message
      return message.channel.send(embed);
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
