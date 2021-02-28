const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const playermanager = require("../../handlers/playermanager");
const { createBar } = require("../../handlers/functions");
module.exports = {
    name: "queuestatus",
    category: "🎶 Music",
    aliases: ["qs", "status", "queuestats", "qus"],
    description: "Shows the current Queuestatus",
    usage: "queuestatus",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      //get the channel instance
      const { channel } = message.member.voice;
      //if not in a voice Channel return error
      if (!channel)
          return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle("❌ Error | You need to join a voice channel.")
          );
      //get the player instance
      const player = client.manager.players.get(message.guild.id);
      //if no player available return error | aka not playing anything
      if (!player)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username, ee.footericon)
          .setTitle("❌ Error | There is nothing playing")
        );
      //if not in the same channel --> return
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Error | You need to be in my voice channel to use this command!")
          .setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
        );
        //toggle autoplay
        let embed = new MessageEmbed()
        try{embed.setTitle(`Connected to:  \`🔈${client.channels.cache.get(player.voiceChannel).name}\``)}catch{}
        try{embed.setDescription(`And bound to: \`#${client.channels.cache.get(player.textChannel).name}\`   **▬**   Queue length: \`${player.queue.length} Songs\``)}catch{}
        try{embed.addField("🔊 Volume", `\`${player.volume}%\``, true)}catch{}
        try{embed.addField("🎚 Equalizer: ", `\`🎵 Music\``, true)}catch{}
        try{embed.addField(`${player.queueRepeat ? "🔂 Queue Loop: " : "🔁 Song Loop: "}`, `\`${player.queueRepeat ? `\`✔️ Enabled\`` : player.trackRepeat ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}\``, true)}catch{}
        try{embed.addField("🗣️ Leave on Empty Channel: ", `${config.settings.leaveOnEmpty_Channel.enabled ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}`, true)}catch{}
        try{embed.addField("⌛ Leave on Empty Queue: ", `${config.settings.LeaveOnEmpty_Queue.enabled ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}`, true)}catch{}
        try{embed.addField("💿 Autoplay", `${player.get("autoplay") ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}`, true)}catch{}
        try{embed.addField("💰 Premium GUILD", `${client.premium.get(player.guild).enabled ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}`, true)}catch{}
        try{embed.addField("💰 Premium USER", `${client.premium.get(player.get("playerauthor")).enabled ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}`, true)}catch{}
        try{embed.addField("💰 24/7 AFK Setup", `PLAYER: ${player.get(`afk-${player.get("playerauthor")}`) ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}\nGUILD: ${player.get(`afk-${player.guild}`) ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}`, true)}catch{}
        try{embed.setColor(ee.color)}catch{}
        try{embed.setFooter(ee.footertext, ee.footericon);}catch{}
        try{embed.addField("📀 Current Track: ", `${player.playing ? "▶" : "⏸"} [**${player.queue.current.title}**](${player.queue.current.uri})`)}catch{}
        try{embed.addField("⏳ Progress: ", createBar(player))}catch{}
        message.channel.send(embed);
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
