const Discord = require("discord.js");
const moment = require("moment");
let os = require("os");
let cpuStat = require("cpu-stat");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "botinfo",
    aliases: ["info"],
    category: "🔰 Info",
    description: "Sends detailed info about the client",
    usage: "botinfo",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      cpuStat.usagePercent(function (e, percent, seconds) {
          if (e) {
              return console.log(String(e.stack).red);
          }
          const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
          let connectedchannelsamount = 0;
          let guilds = client.guilds.cache.map((guild) => guild);
          for (let i = 0; i < guilds.length; i++) {
              if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
          }
          const botinfo = new Discord.MessageEmbed()
              .setAuthor(client.user.username, client.user.displayAvatarURL())
              .setTitle("__**Stats:**__")
              .setColor(ee.color)
              .addField("⏳ Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, true)
              .addField("⌚️ Uptime ", `\`${duration}\``, true)
              .addField("\u200b", `\u200b`, true)
              .addField("📁 Users", `\`${client.users.cache.size}\``, true)
              .addField("📁 Servers", `\`${client.guilds.cache.size}\``, true)
              .addField("\u200b", `\u200b`, true)
              .addField("📁 Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "voice").size}\``, true)
              .addField("📁 Connected Channels", `\`${connectedchannelsamount}\``, true)
              .addField("\u200b", `\u200b`, true)
              .addField("👾 Discord.js", `\`v${Discord.version}\``, true)
              .addField("🤖 Node", `\`${process.version}\``, true)
              .addField("\u200b", `\u200b`, true)
              .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
              .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``, true)
              .addField("🤖 Arch", `\`${os.arch()}\``, true)
              .addField("\u200b", `\u200b`, true)
              .addField("💻 Platform", `\`\`${os.platform()}\`\``, true)
              .addField("API Latency", `\`${client.ws.ping}ms\``, true)
              .setFooter("Coded by:    Tomato#6966");
          message.channel.send(botinfo);
      });
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  },
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
