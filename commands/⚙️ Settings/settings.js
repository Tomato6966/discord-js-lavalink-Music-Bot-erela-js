const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "settings",
    category: "⚙️ Settings",
    aliases: ["musicsettings"],
    cooldown: 10,
    usage: "settings",
    description: "Shows you the current settings, like Premium, which commands are on DJ ONLY, the DJ ROLES and BOT CHANNELS ....",
    run: async (client, message, args, cmduser, text, prefix) => {
      //these lines creates the string for all botchannels
      let leftb = "";
      if(client.settings.get(message.guild.id, `botchannel`).join("") ==="") leftb = "no Channels, aka all Channels are Bot Channels"
      else
      for(let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++){
        leftb += "<#" +client.settings.get(message.guild.id, `botchannel`)[i] + "> | "
      }
      //these lines creates a string with all djroles
      let leftd = "";
      if(client.settings.get(message.guild.id, `djroles`).join("") === "") leftd = "no Dj Roles, aka All Users are Djs"
      else
      for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
        leftd += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
      }
      //these lines creates a string with all dj-only-cmds
      let leftdj = "";
      if(client.settings.get(message.guild.id, `djonlycmds`).sort(function(a, b){if(a < b) { return -1; }if(a > b) { return 1; }return 0;}).join("") === "") leftdj = "no DJonlyCommands"
      else
      for(let i = 0; i < client.settings.get(message.guild.id, `djonlycmds`).length; i++){
        leftdj += "`" + client.settings.get(message.guild.id, `djonlycmds`)[i] + "` | "
      }


      let gpremium = client.premium.get(message.guild.id);
      let ownerstringarray = "";
      for(let i = 0; i<config.ownerIDS.length; i++){
        try{
        let user = await client.users.fetch(config.ownerIDS[i]);
        ownerstringarray += `\`${user.tag}\` /`
      }catch{}
      }

      ownerstringarray = ownerstringarray.substr(0, ownerstringarray.length-2);

      let db = client.setups.get(message.guild.id)

      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext,ee.footericon)
        .setThumbnail(message.guild.iconURL({dynamic:true}))
        .addField("🤖 Bot Channels", leftb.substr(0, leftb.length - 3).substr(0, 1024), true)
        .addField("🎧 DJ Roles", leftd.substr(0, leftb.length - 3).substr(0, 1024), true)
        .addField("💰 Guild Premium", `${gpremium ? (gpremium.enabled ? `\`✔️ Enabled\`` : `\`❌ Disabled\`\nDm to enable:\n> ${ownerstringarray.substr(0, ownerstringarray.length - 1)}`.substr(0, 1020)) : `\`❌ Disabled\``}`, true)
        .addField("⚙️ Setup", `VoiceChannel: \`${db.voicechannel != 0 ? message.guild.channels.cache.get(db.voicechannel).name  : "❌ Disabled"}\`\nTextChannel: \`${db.textchannel != 0 ? message.guild.channels.cache.get(db.textchannel).name  : "❌ Disabled"}\``, true)
        .addField("🎧 DJ-Only-Commands", leftdj.substr(0, leftdj.length - 3).substr(0, 1024), true)
      )
    },
};
