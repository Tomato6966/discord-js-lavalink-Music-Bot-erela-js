
const {
  MessageEmbed
} = require("discord.js")
const config = require("../botconfig/config.json")
const ee = require("../botconfig/embed.json")
const {
  format,
  delay,
  isrequestchannel,
  edit_request_message_queue_info,
  edit_request_message_track_info,
  arrayMove
} = require("../handlers/functions")
module.exports = async (client, message, args, type) => {
  let method = type.includes(":") ? type.split(":") : Array(type)
  if (!message.guild) return;
  //just visual for the console
  try {
    let guildstring = ` - ${message.guild ? message.guild.name : "Unknown Guild Name"} `.substr(0, 22)
    let userstring = ` - ${message.author.tag} `.substr(0, 22)

    const stringlength = 69;
    console.log("\n")
    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + `NEW SONG REQUEST: `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length - `NEW SONG REQUEST: `.length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + ` - ${args.join(" ")}`.substr(0, 60).bold.cyan + " ".repeat(-1 + stringlength - ` ┃ `.length - ` - ${args.join(" ")}`.substr(0, 60).length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + `REQUESTED BY: `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length - `REQUESTED BY: `.length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + userstring.bold.cyan + "━".repeat(stringlength / 3 - userstring.length).bold.brightRed + "━━>".bold.brightRed + ` ${message.author.id}`.bold.cyan + " ".repeat(-1 + stringlength - ` ┃ `.length - userstring.length - "━━>".length - ` ${message.author.id}`.length - "━".repeat(stringlength / 3 - userstring.length).length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + `REQUESTED IN: `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length - `REQUESTED IN: `.length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + guildstring.bold.cyan + "━".repeat(stringlength / 3 - guildstring.length).bold.brightRed + "━━>".bold.brightRed + ` ${message.guild.id}`.bold.cyan + " ".repeat(-1 + stringlength - ` ┃ `.length - guildstring.length - "━━>".length - ` ${message.guild.id}`.length - "━".repeat(stringlength / 3 - guildstring.length).length) + "┃".bold.brightRed)
    console.log(`     ┃ `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightRed)
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightRed)
    console.log("\n")
  } catch (e) {
    console.log(e) /* */
  }

  let {
    channel
  } = message.member.voice;
  const permissions = channel.permissionsFor(client.user);

  if (!permissions.has("CONNECT"))
    return message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle("❌ Error | I need permissions to join your channel")
    );
  if (!permissions.has("SPEAK"))
    return message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle("❌ Error | I need permissions to speak in your channel")
    );

  if (method[0] === "song")
    require("./playermanagers/song")(client, message, args, type); 
  else if (method[0] === "request")
    require("./playermanagers/request")(client, message, args, type);  
  else if (method[0] === "playlist")
    require("./playermanagers/playlist")(client, message, args, type);
  else if (method[0] === "similar")
    require("./playermanagers/similar")(client, message, args, type);
  else if (method[0] === "search")
    require("./playermanagers/search")(client, message, args, type);
  else if (method[0] === "skiptrack")
  require("./playermanagers/skiptrack")(client, message, args, type); 
  else
    return message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle("❌ Error | No valid search Term? ... Please Contact: `Tomato#6966`")
    );
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
