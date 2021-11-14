//The Module
const {
  Permissions
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`)
const settings = require(`${process.cwd()}/botconfig/settings.json`);
module.exports = async (client, oS, nS) => {
  /**
   * auto set Speaker in Stage Channel
   */
  if (nS.channelId && nS.channel.type == "GUILD_STAGE_VOICE" && nS.guild.me.voice.suppress) {
    if (nS.guild.me.permissions.has(Permissions.FLAGS.SPEAK) || (nS.channel && nS.channel.permissionsFor(nS.guild.me).has(Permissions.FLAGS.SPEAK))) {
      nS.guild.me.voice.setSuppressed(false).catch(() => {});
    }
  }

  /**
   * Auto Leave Channel on EMPTY OR EVERYONE IS DEAFED!
   */
  if (oS.channelId && (!nS.channelId || nS.channelId)) {
    var player = client.manager.players.get(nS.guild.id);
    if (player && oS.channelId == player.voiceChannel) {
      //as long as it's the right voice State
      if (!((!oS.streaming && nS.streaming) || (oS.streaming && !nS.streaming) || (!oS.serverMute && nS.serverMute && (!nS.serverDeaf && !nS.selfDeaf)) || (oS.serverMute && !nS.serverMute && (!nS.serverDeaf && !nS.selfDeaf)) || (!oS.selfMute && nS.selfMute && (!nS.serverDeaf && !nS.selfDeaf)) || (oS.selfMute && !nS.selfMute && (!nS.serverDeaf && !nS.selfDeaf)) || (!oS.selfVideo && nS.selfVideo) || (oS.selfVideo && !nS.selfVideo))) {
        //if player exist, but not connected or channel got empty (for no bots)
        if (settings.leaveOnEmpty_Channel.enabled && player && (!oS.channel.members || oS.channel.members.size == 0 || oS.channel.members.filter(mem => !mem.user.bot && !mem.voice.deaf && !mem.voice.selfDeaf).size < 1)) {
          setTimeout(async () => {
            try {
              let vc = nS.guild.channels.cache.get(player.voiceChannel);
              if (vc) vc = await vc.fetch();
              if (!vc) vc = await nS.guild.channels.fetch(player.voiceChannel).catch(() => {}) || false;
              if (!vc) return player.destroy();
              if (!vc.members || vc.members.size == 0 || vc.members.filter(mem => !mem.user.bot && !mem.voice.deaf && !mem.voice.selfDeaf).size < 1) {
                player.destroy();
                client.logger(`Destroyed the Player in ${nS.guild && nS.guild.name ? nS.guild.name : player.guild}, because the Channel got no listeners`)
              } else {
                // Channel not empty anymore
              }
            } catch (e) {
              console.log(e)
            }
          }, settings.leaveOnEmpty_Channel.time_delay || 30000)
        }
      }
    }
  }

  /**
   * ALWAYS SERVER DEAF THE BOT WHEN JOING
   */
  if (nS.id === client.user.id && nS.channelId != oS.channelId && !nS.guild.me.voice.deaf) {
    if (nS.guild.me.permissions.has(Permissions.FLAGS.DEAFEN_MEMBERS) || (nS.channel && nS.channel.permissionsFor(nS.guild.me).has(Permissions.FLAGS.DEAFEN_MEMBERS))) {
      nS.setDeaf(true).catch(() => {});
    }
  }

  /**
   * ANTI UNDEAF THE BOT 
   */
  if (nS.id === client.user.id && oS.serverDeaf === true && nS.serverDeaf === false) {
    if (nS.guild.me.permissions.has(Permissions.FLAGS.DEAFEN_MEMBERS) || (nS.channel && nS.channel.permissionsFor(nS.guild.me).has(Permissions.FLAGS.DEAFEN_MEMBERS))) {
      nS.setDeaf(true).catch(() => {});
    }
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
