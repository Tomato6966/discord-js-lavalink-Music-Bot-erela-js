const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);const {
  format,
  delay,
  isrequestchannel,
  edit_request_message_track_info,
  arrayMove
} = require("../../handlers/functions")
module.exports = {
  name: `stop`,
  category: `🎶 Music`,
  aliases: [`leave`, "dis", "disconnect", "votestop", "voteleave", "votedis", "votedisconnect", "vstop", "vleave", "vdis", "vdisconnect"],
  description: `Stops current track and leaves the channel`,
  usage: `stop`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //if there is no current track error
      if (!player){
        if(message.guild.me.voice.channel) {
          message.guild.me.voice.channel.leave()
            return message.channel.send(new MessageEmbed()
              .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.stop} Stopped and left your Channel`)
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
            );
        }
        else {
          return message.channel.send(new MessageEmbed()
            .setFooter(ee.footertext, ee.footericon)
            .setColor(ee.wrongcolor)
            .setTitle(`${emoji.msg.ERROR} Error | No song is currently playing in this guild.`)
          );
        }
        return
      }
      
      if (player.queue && !player.queue.current) {
        if(message.guild.me.voice.channel) {
          message.guild.me.voice.channel.leave()
          player.destroy()
            return message.channel.send(new MessageEmbed()
              .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.stop} Stopped and left your Channel`)
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
            );
        }
        else {
          return message.channel.send(new MessageEmbed()
            .setFooter(ee.footertext, ee.footericon)
            .setColor(ee.wrongcolor)
            .setTitle(`${emoji.msg.ERROR} Error | No song is currently playing in this guild.`)
          );
        }
        return
      }
        
      setTimeout(()=>{
        try{
          message.guild.me.voice.channel.leave().catch(e=>console.log("PREVENTED BUG"))
        }catch{ }
        try{
          player.destroy()
        }catch{ }
      }, 4000)

      var irc = await isrequestchannel(client, player.textChannel, player.guild);
      if(irc) {
        edit_request_message_track_info(client, player, player.queue.current, "destroy");
        return;
      }
      //stop playing
      player.destroy();
      //send success message
      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.stop} Stopped and left your Channel`)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
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
