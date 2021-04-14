const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  autoplay, isrequestchannel, edit_request_message_track_info
} = require(`../../handlers/functions`);
module.exports = {
  name: `voteskip`,
  category: `🎶 Music`,
  aliases: [`skip`, `vs`, `s`],
  description: `Skips the track, but if there is a DJ Setup u will have to vote first!`,
  usage: `voteskip`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //Check if there is a Dj Setup
      if (client.settings.get(message.guild.id, `djroles`).toString() !== ``) {

        let channelmembersize = channel.members.size;
        let voteamount = 0;
        if (channelmembersize <= 3) voteamount = 1;
        voteamount = Math.ceil(channelmembersize / 3);

        if (!player.get(`vote-${message.author.id}`)) {
          player.set(`vote-${message.author.id}`, true);
          player.set(`votes`, String(Number(player.get(`votes`)) + 1));
          if (voteamount <= Number(player.get(`votes`))) {
            message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.SUCCESS} Success | Added your Vote!`)
              .setDescription(`There are now: \`${player.get(`votes`)}\` of \`${voteamount}\` needed Votes\n\n> Amount reached! Skipping ⏭`)
            );
            if (player.queue.size == 0) {
              var irc = await isrequestchannel(client, player.textChannel, player.guild);
              if(irc) {
                return edit_request_message_track_info(client, player, player.queue.current, "destroy");
              }
               //stop playing
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
                player.destroy()
                return message.channel.send(new MessageEmbed()
                  .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.stop} Stopped and left your Channel`)
                  .setColor(ee.color)
                  .setFooter(ee.footertext, ee.footericon)
                );
              }
            } else {
              player.stop();
            }
          } else {
            return message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.SUCCESS} Success | Added your Vote!`)
              .setDescription(`There are now: \`${player.get(`votes`)}\` of \`${voteamount}\` needed Votes`)
            );
          }
        } else {
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | You have already Voted!!`)
            .setDescription(`There are: \`${player.get(`votes`)}\` of \`${voteamount}\` needed Votes`)
          );
        }
      } else {
        //if ther is nothing more to skip then stop music and leave the Channel
        if (player.queue.size == 0) {
          //if its on autoplay mode, then do autoplay before leaving...
          if (player.get(`autoplay`)) return autoplay(client, player, `skip`);
          var irc = await isrequestchannel(client, player.textChannel, player.guild);
          if(irc) {
            return edit_request_message_track_info(client, player, player.queue.current, "destroy");
          }
          //stop playing
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
            player.destroy()
            return message.channel.send(new MessageEmbed()
              .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.stop} Stopped and left your Channel`)
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
            );
          }
          return
        }
        //skip the track
        player.stop();
        //send success message
        return message.channel.send(new MessageEmbed()
          .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.skip_track} Skipped to the next Song`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        );
      }
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
