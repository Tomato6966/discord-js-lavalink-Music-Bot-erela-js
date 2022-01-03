const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  format,
  swap_pages2
} = require(`${process.cwd()}/handlers/functions`);
module.exports = {
  name: `queue`,
  category: `🎶 Music`,
  aliases: [`qu`, `que`, `queu`, `list`],
  description: `Shows the Queue`,
  usage: `queue`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  type: "queue",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //get the right tracks of the current tracks
    const tracks = player.queue;
    //if there are no other tracks, information
    if (!tracks.length)
      return message.reply({
        embeds: [new MessageEmbed()
          .setAuthor(client.getFooter(`Queue for ${message.guild.name}  -  [ ${player.queue.length} Tracks ]`, message.guild.iconURL({
            dynamic: true
          })))
          .setColor(es.color).addField(eval(client.la[ls]["cmds"]["music"]["queue"]["variablex_1"]), eval(client.la[ls]["cmds"]["music"]["queue"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["music"]["queue"]["variable2"]))
        ]
      }).then(msg => {
        setTimeout(() => {
          try {
            msg.delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
          } catch {}
        }, 5000)
      })
    //if not too big send queue in channel
    if (tracks.length < 15)
      return message.reply({
        embeds: [new MessageEmbed()
          .setAuthor(client.getFooter(`Queue for ${message.guild.name}  -  [ ${player.queue.length} Tracks ]`, message.guild.iconURL({
            dynamic: true
          })))
          .addField(`**\` 0. \` __CURRENT TRACK__**`, `**${player.queue.current.uri ? `[${player.queue.current.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]")}](${player.queue.current.uri})`: player.queue.current.title}** - \`${player.queue.current.isStream ? `LIVE STREAM` : format(player.queue.current.duration).split(` | `)[0]}\`\n> *Requested by: __${player.queue.current.requester.tag}__*`)
          .setColor(es.color).setDescription(tracks.map((track, index) => `**\` ${++index}. \`${trac.uri ? `[${track.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]")}](${track.uri})` : track.title}** - \`${track.isStream ? `LIVE STREAM` : format(track.duration).split(` | `)[0]}\`\n> *Requested by: __${track.requester.tag}__*`).join(`\n`))
        ]
      }).then(msg => {
        setTimeout(() => {
          try {
            msg.delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
          } catch {}
        }, 5000)
      })
    //get an array of quelist where 15 tracks is one index in the array
    let quelist = [];
    var maxTracks = 10; //tracks / Queue Page
    for (let i = 0; i < tracks.length; i += maxTracks) {
      let songs = tracks.slice(i, i + maxTracks);
      quelist.push(songs.map((track, index) => `**\` ${i + ++index}. \`${trac.uri ? `[${track.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]")}](${track.uri})` : track.title}** - \`${track.isStream ? `LIVE STREAM` : format(track.duration).split(` | `)[0]}\`\n> *Requested by: __${track.requester.tag}__*`).join(`\n`))
    }
    let limit = quelist.length
    let embeds = []
    for (let i = 0; i < limit; i++) {
      let desc = String(quelist[i]).substr(0, 2048)
      await embeds.push(new MessageEmbed()
        .setAuthor(client.getFooter(`Queue for ${message.guild.name}  -  [ ${player.queue.length} Tracks ]`, message.guild.iconURL({
          dynamic: true
        })))
        .addField(`**\` N. \` *${player.queue.length > maxTracks ? player.queue.length - maxTracks : player.queue.length} other Tracks ...***`, `\u200b`)
        .setColor(es.color)
        .addField(`**\` 0. \` __CURRENT TRACK__**`, `**${player.queue.current.uri ? `[${player.queue.current.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]")}](${player.queue.current.uri})`: player.queue.current.title}** - \`${player.queue.current.isStream ? `LIVE STREAM` : format(player.queue.current.duration).split(` | `)[0]}\`\n> *Requested by: __${player.queue.current.requester.tag}__*`)
        .setDescription(desc));
    }
    //return susccess message
    return swap_pages2(client, message, embeds)
  }
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
