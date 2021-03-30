const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  format,
  delay,
  swap_pages,
  swap_pages2
} = require(`../../handlers/functions`);
module.exports = {
  name: `queue`,
  category: `🎶 Music`,
  aliases: [`qu`, `que`, `queu`, `list`],
  description: `Shows the Queue`,
  usage: `queue`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //get the right tracks of the current tracks
      const tracks = player.queue;
      //if there are no other tracks, information
      if (!tracks.length)
        return message.channel.send(new MessageEmbed()
          .setAuthor(`Queue for ${message.guild.name}  -  [ ${player.queue.length} Tracks ]`, message.guild.iconURL({
            dynamic: true
          }))
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.color).addField(`**0) CURRENT TRACK**`, `**${player.queue.current.title.substr(0, 60)}** - \`${player.queue.current.isStream ? `LIVE STREAM` : format(player.queue.current.duration).split(` | `)[0]}\`\n*request by: ${player.queue.current.requester.tag}*`)
          .setDescription(`${emoji.msg.ERROR} No tracks in the queue`)
        ).then(msg => {
          try {
            msg.delete({
              timeout: 5000
            }).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
          } catch {
            /* */ }
        })
      //if not too big send queue in channel
      if (tracks.length < 15)
        return message.channel.send(new MessageEmbed()
          .setAuthor(`Queue for ${message.guild.name}  -  [ ${player.queue.length} Tracks ]`, message.guild.iconURL({
            dynamic: true
          }))
          .setFooter(ee.footertext, ee.footericon)
          .addField(`**0) CURRENT TRACK**`, `**${player.queue.current.title.substr(0, 60)}** - \`${player.queue.current.isStream ? `LIVE STREAM` : format(player.queue.current.duration).split(` | `)[0]}\`\n*request by: ${player.queue.current.requester.tag}*`)
          .setColor(ee.color).setDescription(tracks.map((track, i) => `**${++i})** **${track.title.substr(0, 60)}** - \`${track.isStream ? `LIVE STREAM` : format(track.duration).split(` | `)[0]}\`\n*requested by: ${track.requester.tag}*`).join(`\n`))
        ).then(msg => {
          try {
            msg.delete({
              timeout: 5000
            }).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
          } catch {
            /* */ }
        })
      //get an array of quelist where 15 tracks is one index in the array
      let quelist = [];
      for (let i = 0; i < tracks.length; i += 15) {
        let songs = tracks.slice(i, i + 15);
        quelist.push(songs.map((track, index) => `**${i + ++index})** **${track.title.substr(0, 60)}** - \`${track.isStream ? `LIVE STREAM` : format(track.duration).split(` | `)[0]}\`\n*requested by: ${track.requester.tag}*`).join(`\n`))
      }
      let limit = quelist.length <= 5 ? quelist.length : 5
      let embeds = []
      for (let i = 0; i < limit; i++) {
        let desc = String(quelist[i]).substr(0, 2048)
        await embeds.push(new MessageEmbed()
          .setAuthor(`Queue for ${message.guild.name}  -  [ ${player.queue.length} Tracks ]`, message.guild.iconURL({
            dynamic: true
          }))
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.color)
          .addField(`**0) CURRENT TRACK**`, `**${player.queue.current.title.substr(0, 60)}** - \`${player.queue.current.isStream ? `LIVE STREAM` : format(player.queue.current.duration).split(` | `)[0]}\`\n*request by: ${player.queue.current.requester.tag}*`)
          .setDescription(desc));
      }
      //return susccess message
      return swap_pages2(client, message, embeds)
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
