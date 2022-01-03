const {
  MessageEmbed,
  Permissions
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
const settings = require(`${process.cwd()}/botconfig/settings.json`);
const moment = require("moment");
const {
  databasing
} = require(`${process.cwd()}/handlers/functions`);
module.exports = client => {

  client.logger = (data) => {
    if (!settings[`debug-logs`]) return;
    let logstring = `${String(`L`+`a`+`v`+`a`+`-`+`M`+`u`+`s`+`i`+`c`+ ` Logs`).brightGreen}${` | `.grey}${`${moment().format("ddd DD-MM-YYYY HH:mm:ss.SSSS")}`.cyan}${` [::] `.magenta}`
    if (typeof data == "string") {
      console.log(logstring, data.split("\n").map(d => `${d}`.green).join(`\n${logstring} `))
    } else if (typeof data == "object") {
      console.log(logstring, JSON.stringify(data, null, 3).green)
    } else if (typeof data == "boolean") {
      console.log(logstring, String(data).cyan)
    } else {
      console.log(logstring, data)
    }
  };

  client.updateMusicSystem = async (player, leave = false) => {
    if (client.musicsettings.get(player.guild, "channel") && client.musicsettings.get(player.guild, "channel").length > 5) {
      client.logger("Update Music System called and executed")
      let messageId = client.musicsettings.get(player.guild, "message");
      //try to get the guild
      let guild = client.guilds.cache.get(player.guild);
      if (!guild) return client.logger("Music System - Guild not found!")
      //try to get the channel
      let channel = guild.channels.cache.get(client.musicsettings.get(player.guild, "channel"));
      if (!channel) channel = await guild.channels.fetch(client.musicsettings.get(player.guild, "channel")).catch(() => {}) || false
      if (!channel) return client.logger("Music System - Channel not found!")
      if (!channel.permissionsFor(channel.guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) return client.logger("Music System - Missing Permissions")
      //try to get the channel
      let message = channel.messages.cache.get(messageId);
      if (!message) message = await channel.messages.fetch(messageId).catch(() => {}) || false;
      if (!message) return client.logger("Music System - Message not found!")
      //edit the message so that it's right!
      var data = require(`${process.cwd()}/handlers/erela_events/musicsystem`).generateQueueEmbed(client, player.guild, leave)
      message.edit(data).catch((e) => {
        console.log(e)
      })
    }
  };

  client.editLastPruningMessage = async (player, footertext = "\n⛔️ SONG ENDED!") => {
    client.logger("Editing the Last Message System called and executed")
    let guild = client.guilds.cache.get(player.guild);
    if (!guild) return client.logger("Editing the Last Message - Guild not found!")
    //try to get the channel
    let channel = guild.channels.cache.get(player.textChannel);
    if (!channel) channel = await guild.channels.fetch(player.textChannel).catch(() => {}) || false;
    if (!channel) return client.logger("Editing the Last Message - Channel not found")
    if (!channel.permissionsFor(channel.guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) return client.logger("Editing the Last Message - Missing Permissions")
    //try to get the message
    let message = channel.messages.cache.get(player.get("currentmsg"));
    if (!message) message = await channel.messages.fetch(player.get("currentmsg")).catch(() => {}) || false;
    if (!message) return client.logger("Editing the Last Message - Message not found!")
    if (!message.embeds || !message.embeds[0]) return client.logger("Editing the Last Message - Embeds got removed!")
    //get the embed + change it
    var embed = message.embeds[0];
    embed.author.iconURL = "https://cdn.discordapp.com/attachments/883978730261860383/883978741892649000/847032838998196234.png"
    embed.footer.text += footertext;
    //Edit the message
    message.edit({
      embeds: [embed],
      components: []
    }).catch(() => {})
    //if the messages before the last song played message, should get deleted
    if (settings.deleteMessagesBeforeTheLastSongPlayedMessages) {
      if (!player.get("beforemessage")) {
        //first time setting the before message, there is no before message yet, that's why return
        return player.set("beforemessage", message.id);
      }
      //get the actual beforemessage
      let beforemessage = channel.messages.cache.get(player.get("beforemessage"))
      if (!beforemessage) message = await channel.messages.fetch(player.get("beforemessage")).catch(() => {}) || false;
      if (!beforemessage) return client.logger("Editing the Last Message - Before - Message not found!")
      //if not able to 
      if (!beforemessage) return client.logger("Editing the Last Message - Before - Message already deleted");
      if (!beforemessage.deletable) return client.logger("Editing the Last Message - Before - Message not delete able");
      //delete the message
      beforemessage.delete().catch(() => {})
      //set the new before message
      player.set("beforemessage", message.id);
    }
  }

  client.getFooter = (es, stringurl = null) => {
    //allow inputs: ({footericon, footerurl}) and (footericon, footerurl);
    let embedData = { };
    if(typeof es !== "object") embedData = { footertext: es, footericon: stringurl };
    else embedData = es;

    let text = embedData.footertext;
    let iconURL = embedData.footericon;
    if(!text || text.length < 1) text = `${client.user.username} | By: Tomato#6966`;
    if(!iconURL || iconURL.length < 1) iconURL = `${client.user.displayAvatarURL()}`;
    
    //Change the lengths
    iconURL = iconURL.trim();
    text = text.trim().substring(0, 2048);
    
    //verify the iconURL
    if(!iconURL.startsWith("https://") && !iconURL.startsWith("http://")) iconURL = client.user.displayAvatarURL();
    if(![".png", ".jpg", ".wpeg", ".webm", ".gif"].some(d => iconURL.toLowerCase().endsWith(d))) iconURL = client.user.displayAvatarURL();
    //return the footerobject
    return { text, iconURL }
  }

  client.getAuthor = (authorname = null, authoricon = null, authorurl = null) => {
    //allow inputs: ({footericon, footerurl}) and (footericon, footerurl);
    let name = authorname;
    let iconURL = authoricon;
    let url = authorurl;

    if(!name || name.length < 1) name = `${client.user.username} | By: Tomato#6966`;
    if(!iconURL || iconURL.length < 1) iconURL = `${client.user.displayAvatarURL()}`;
    if(!url || url.length < 1) url = `https://discord.gg/milrato`;

    //Change the lengths
    iconURL = iconURL.trim();
    name = name.trim().substring(0, 2048);
    
    //verify the iconURL
    if(!url.startsWith("https://") && !url.startsWith("http://")) url = `https://discord.gg/milrato`;
    if(!iconURL.startsWith("https://") && !iconURL.startsWith("http://")) iconURL = client.user.displayAvatarURL();
    if(![".png", ".jpg", ".wpeg", ".webm", ".gif"].some(d => iconURL.toLowerCase().endsWith(d))) iconURL = client.user.displayAvatarURL();
    //return the footerobject
    return { name, iconURL, url }
  }
  
  process.on('unhandledRejection', (reason, p) => {
    console.log('\n\n\n\n\n=== unhandled Rejection ==='.toUpperCase().yellow.dim);
    console.log('Reason: ', reason.stack ? String(reason.stack).gray : String(reason).gray);
    console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });
  process.on("uncaughtException", (err, origin) => {
    console.log('\n\n\n\n\n\n=== uncaught Exception ==='.toUpperCase().yellow.dim);
    console.log('Exception: ', err.stack ? err.stack : err)
    console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  })
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('=== uncaught Exception Monitor ==='.toUpperCase().yellow.dim);
  });
  process.on('multipleResolves', (type, promise, reason) => {
    /*
      console.log('\n\n\n\n\n=== multiple Resolves ==='.toUpperCase().yellow.dim);
      console.log(type, promise, reason);
      console.log('=== multiple Resolves ===\n\n\n\n\n'.toUpperCase().yellow.dim);
    */
  });

}
