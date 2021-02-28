const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
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
        .addField(`\u200b`, `⏪ Rewind 20 seconds\n⏩ Forward 20 seconds\n⏯ Pause/Resume\n⏹ Stop Track\n⏮ Play previous\n`,true)
        .addField(`\u200b`, `⏭ Skip / Next\n🔃 Replay Track\n🔉 Volume -10 %\n🔊 Volume +10 %\n🔇 Toggle Volume Mute`,true)
        .addField(`\u200b`, `🔁 Change repeat mode\n♾ Toggle Autoplay\n🔀 Shuffle the queue\n📑 Show the Queue\n🩸 Shows Current Track`,true)
      );
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
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
