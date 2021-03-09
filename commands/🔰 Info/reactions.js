const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: "reactions",
    category: "🔰 Info",
    aliases: ["reacts"],
    cooldown: 5,
    usage: "reactions",
    description: "Gives you Information, which reaction dues what",
    run: async (client, message, args, user, text, prefix) => {
    try{
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle("🩸 My Reactions when playing a Track does those Things")
        .setFooter(ee.footertext, ee.footericon)
        .addField(`\u200b`, `${emoji.msg.rewind} Rewind 20 seconds\n${emoji.msg.forward} Forward 20 seconds\n${emoji.msg.pause_resume} Pause/Resume\n${emoji.msg.stop} Stop Track\n${emoji.msg.previous_track} Play previous\n`,true)
        .addField(`\u200b`, `${emoji.msg.skip_track} Skip / Next\n${emoji.msg.replay_track} Replay Track\n${emoji.msg.reduce_volume} Volume -10 %\n${emoji.msg.raise_volume} Volume +10 %\n${emoji.msg.toggle_mute} Toggle Volume Mute`,true)
        .addField(`\u200b`, `${emoji.msg.repeat_mode} Change repeat mode\n${emoji.msg.autoplay_mode} Toggle Autoplay\n${emoji.msg.shuffle} Shuffle the queue\n${emoji.msg.show_queue} Show the Queue\n${emoji.msg.show_current_track} Shows Current Track`,true)
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
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
