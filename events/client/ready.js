//here the event starts
let config = require(`${process.cwd()}/botconfig/config.json`)
const settings = require(`${process.cwd()}/botconfig/settings.json`);
const Discord = require("discord.js")
const moment = require("moment")
module.exports = client => {
  //SETTING ALL GUILD DATA FOR THE DJ ONLY COMMANDS for the DEFAULT
  //client.guilds.cache.forEach(guild=>client.settings.set(guild.id, ["autoplay", "clearqueue", "forward", "loop", "jump", "loopqueue", "loopsong", "move", "pause", "resume", "removetrack", "removedupe", "restart", "rewind", "seek", "shuffle", "skip", "stop", "volume"], "djonlycmds"))
  try {
    client.logger(`Discord Bot is now online and ready to be used!`)

    client.logger(
      `Bot User: `.brightBlue + `${client.user.tag}`.blue + `\n` +
      `Guild(s): `.brightBlue + `${client.guilds.cache.size} Servers`.blue + `\n` +
      `Watching: `.brightBlue + `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Members`.blue + `\n` +
      `Prefix: `.brightBlue + `${config.prefix}`.blue + `\n` +
      `Commands: `.brightBlue + `${client.commands.size}`.blue + `\n` +
      `Discord.js: `.brightBlue + `v${Discord.version}`.blue + `\n` +
      `Node.js: `.brightBlue + `${process.version}`.blue + `\n` +
      `Plattform: `.brightBlue + `${process.platform} ${process.arch}`.blue + `\n` +
      `Memory: `.brightBlue + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`.blue
    );

    change_status(client);
    //loop through the status per each 10 minutes
    setInterval(() => {
      change_status(client);
    }, 90 * 1000);

  } catch (e) {
    console.log(String(e.stack).grey.bgRed)
  }
}
var state = false;

function change_status(client) {
  config = require(`${process.cwd()}/botconfig/config.json`)
  if (!state) {
    client.user.setActivity(`${config.status.text}`
      .replace("{prefix}", config.prefix)
      .replace("{guildcount}", client.guilds.cache.size)
      .replace("{membercount}", client.guilds.cache.reduce((a, b) => a + b.memberCount, 0))
      .replace("{created}", moment(client.user.createdTimestamp).format("DD/MM/YYYY"))
      .replace("{createdime}", moment(client.user.createdTimestamp).format("HH:mm:ss"))
      .replace("{name}", client.user.username)
      .replace("{tag}", client.user.tag)
      .replace("{commands}", client.commands.size)
      .replace("{usedcommands}", client.stats.get("global", "commands"))
      .replace("{songsplayed}", client.stats.get("global", "songs")), {
        type: config.status.type,
        url: config.status.url
      });
    client.logger("Set the first Status Text")
  } else {
    client.user.setActivity(`${config.status.text2}`
      .replace("{prefix}", config.prefix)
      .replace("{guildcount}", client.guilds.cache.size)
      .replace("{membercount}", client.guilds.cache.reduce((a, b) => a + b.memberCount, 0))
      .replace("{created}", moment(client.user.createdTimestamp).format("DD/MM/YYYY"))
      .replace("{createdime}", moment(client.user.createdTimestamp).format("HH:mm:ss"))
      .replace("{name}", client.user.username)
      .replace("{tag}", client.user.tag)
      .replace("{commands}", client.commands.size)
      .replace("{usedcommands}", client.stats.get("global", "commands"))
      .replace("{songsplayed}", client.stats.get("global", "songs")), {
        type: config.status.type,
        url: config.status.url
      });
    state = !state;
    client.logger("Set the Second Status Text")
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
