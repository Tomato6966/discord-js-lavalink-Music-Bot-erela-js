var {
  Manager
} = require("erela.js"), {
    MessageEmbed,
    MessageButton,
    MessageActionRow
  } = require("discord.js"),
  ms = require("ms"),

  config = require(`${process.cwd()}/botconfig/config.json`),
  emoji = require(`${process.cwd()}/botconfig/emojis.json`),
  ee = require(`${process.cwd()}/botconfig/embed.json`),

  {
    databasing,
  } = require(`${process.cwd()}/handlers/functions`);
module.exports = (client) => {

  client.once("ready", () => {
    client.manager.init(client.user.id);
  });

  client.on("raw", (d) => client.manager.updateVoiceState(d));

  //Log if a Channel gets deleted, and the Bot was in, then delete the player if the player exists!
  client.on("channelDelete", async channel => {
    try {
      if (channel.type === "GUILD_VOICE") {
        if (channel.members.has(client.user.id)) {
          var player = client.manager.players.get(channel.guild.id);
          if (!player) return;
          if (channel.id === player.voiceChannel) {
            //destroy
            player.destroy();
          }
        }
      }
    } catch {}
  })
  //If the Bot gets Remove from the Guild and there is still a player, remove it ;)
  client.on("guildRemove", async guild => {
    try {
      var player = client.manager.players.get(guild.id);
      if (!player) return;
      if (guild.id == player.guild) {
        //destroy
        player.destroy();
      }
    } catch {
      /* */
    }
  })
  //auto set Speaker in Stage Channel
  client.on("voiceStateUpdate", async (oldState, newState) => {
    if (newState.channelId && newState.channel.type == "GUILD_STAGE_VOICE" && newState.guild.me.voice.suppress) {
      try {
        await newState.guild.me.voice.setSuppressed(false);
      } catch (e) {
        console.log(e.stack ? String(e.stack).grey : String(e).grey)
      }
    }
  })
  //Auto Leave Channel on EMPTY OR EVERYONE IS DEAFED!
  client.on("voiceStateUpdate", async (oS, nS) => {
    if (oS.channelId && (!nS.channelId || nS.channelId)) {
      var player = client.manager.players.get(nS.guild.id);
      if (player && oS.channelId == player.voiceChannel) {
        if ((!oS.streaming && nS.streaming) || (oS.streaming && !nS.streaming) ||
          (!oS.serverMute && nS.serverMute && (!nS.serverDeaf && !nS.selfDeaf)) || (oS.serverMute && !nS.serverMute && (!nS.serverDeaf && !nS.selfDeaf)) ||
          (!oS.selfMute && nS.selfMute && (!nS.serverDeaf && !nS.selfDeaf)) || (oS.selfMute && !nS.selfMute && (!nS.serverDeaf && !nS.selfDeaf)) ||
          (!oS.selfVideo && nS.selfVideo) || (oS.selfVideo && !nS.selfVideo)) 
        return //not the right voicestate
        //if player exist, but not connected or channel got empty (for no bots)
        if (config.settings.leaveOnEmpty_Channel.enabled && player && (!oS.channel.members || oS.channel.members.size == 0 || oS.channel.members.filter(mem => !mem.user.bot && !mem.voice.deaf && !mem.voice.selfDeaf).size < 1)) {
        setTimeout(async () => {
              try {
                let vc = nS.guild.channels.cache.get(player.voiceChannel);
                if(vc) vc = await vc.fetch();
                if(!vc) vc = await nS.guild.channels.fetch(player.voiceChannel).catch(()=>{}) || false;
                if(!vc) return player.destroy();
                if(!vc.members || vc.members.size == 0 || vc.members.filter(mem => !mem.user.bot && !mem.voice.deaf && !mem.voice.selfDeaf).size < 1) {
                  player.destroy();
                } else {
                  console.log(vc.members.size)
                }
              } catch (e) { console.log(e) }
            }, config.settings.leaveOnEmpty_Channel.time_delay || 30000)
        }
      }
    }
  });
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */