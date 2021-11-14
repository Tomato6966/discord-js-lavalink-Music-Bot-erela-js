const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const playermanager = require(`${process.cwd()}/handlers/playermanager`);
module.exports = {
  name: `playskip`,
  category: `🎶 Music`,
  aliases: [`ps`],
  description: `Plays a song instantly from youtube, which means skips current track and plays next song`,
  usage: `playskip <Song / URL>`,
  parameters: {
    "type": "music",
    "activeplayer": false,
    "check_dj": true,
    "previoussong": false
  },
  type: "song",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //if no args return error
    if (!args[0])
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["music"]["playskip"]["variable1"]))
        ]
      });

    if (args.join("").includes("soundcloud")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Searching for your Request on ${emoji.msg.soundcloud} Soundcloud & then ${emoji.msg.skip_track} Skipping to it!`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      playermanager(client, message, args, `skiptrack:soundcloud`);
    } else if (args.join("").includes("spotify")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Searching for your Request on ${emoji.msg.spotify} Spotify & then ${emoji.msg.skip_track} Skipping to it!`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      playermanager(client, message, args, `skiptrack:raw`);
    } else if (args.join("").includes("apple")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Searching for your Request on ${emoji.msg.apple} Apple-Music & then ${emoji.msg.skip_track} Skipping to it!`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      playermanager(client, message, args, `skiptrack:raw`);
    } else {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Searching for your Request on ${emoji.msg.youtube} Youtube & then ${emoji.msg.skip_track} Skipping to it!`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      //play from YOUTUBE
      playermanager(client, message, args, `skiptrack:youtube`);
    }
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
