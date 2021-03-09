const Discord = require(`discord.js`);
const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const songoftheday = require(`../../botconfig/songoftheday.json`);
const { format } = require(`../../handlers/functions`);
const fs = require(`fs`)
module.exports = {
    name: `setsongoftheday`,
    category: `👑 Owner`,
    aliases: [`setsongoftheday`],
    description: `Sets the Song of the Day!`,
    usage: `setsongoftheday`,
    run: async (client, message, args, cmduser, text, prefix) => {
      if (!config.ownerIDS.includes(message.author.id))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username, ee.footericon)
          .setTitle(`${emoji.msg.ERROR}  Error | You are not allowed to run this command! Only the Owner is allowed to run this Cmd`)
        );
      try{
        if(!args[0])
          return message.channel.send(new MessageEmbed()
            .setFooter(ee.footertext,ee.footericon)
            .setColor(ee.wrongcolor)
            .setTitle(`${emoji.msg.ERROR}  ERROR Wrong Command Usage | Include a Track URl`).setDescription(`Try this: \`${prefix}setsongoftheday <Track_URL> <message>\`\n\nExample: \`${prefix}setsongoftheday https://www.youtube.com/watch?v=HCjNJDNzw8Y Today It's a masterpeace which gives you happyness and old feelings.\``)
          )

        if(!args[0].toLowerCase().includes(`http`))
          return message.channel.send(new MessageEmbed()
            .setFooter(ee.footertext,ee.footericon)
            .setColor(ee.wrongcolor)
            .setTitle(`${emoji.msg.ERROR}  ERROR Wrong Command Usage | Include a Track URl | **A URL**`).setDescription(`Try this: \`${prefix}setsongoftheday <Track_URL> <message>\`\n\nExample: \`${prefix}setsongoftheday https://www.youtube.com/watch?v=HCjNJDNzw8Y Today It's a masterpeace which gives you happyness and old feelings.\``)
          )

        if(!args[1])
          return message.channel.send(new MessageEmbed()
            .setFooter(ee.footertext,ee.footericon)
            .setColor(ee.wrongcolor)
            .setTitle(`${emoji.msg.ERROR}  ERROR Wrong Command Usage | Include a Message`).setDescription(`Try this: \`${prefix}setsongoftheday <Track_URL> <message>\`\n\nExample: \`${prefix}setsongoftheday https://www.youtube.com/watch?v=HCjNJDNzw8Y Today It's a masterpeace which gives you happyness and old feelings.\``)
          )

          let res;
          try {
              res = await client.manager.search(args[0], message.author);
              // Check the load type as this command is not that advanced for basics
              if (res.loadType === `LOAD_FAILED`) throw res.exception;
              else if (res.loadType === `PLAYLIST_LOADED`) throw {
                  message: `Playlists are not supported with this command. Use   ?playlist  `
              };
          } catch (e) {
              console.log(String(e.stack).red)
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR}  Error | There was an error while searching: ${args[0]}`)
                .setDescription(`\`\`\`${e.message}\`\`\``)
              );
          }
          if(!res.tracks[0])
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR}  Error | Found nothing for: **\`${String(args[0]).substr(0, 256-3)}\`**`)
              .setDescription(`Please retry!`)
            );
              let track = res.tracks[0];

              let ss = songoftheday
              ss.track.url = track.uri;
              ss.track.title = track.title;
              ss.track.duration = format(track.duration);
              ss.track.thumbnail = track.displayThumbnail(1);
              ss.message = args.slice(1).join(` `);
              fs.writeFile(`./botconfig/songoftheday.json`, JSON.stringify(ss, null, 3), (e) => {
                  if (e) {
                    console.log(String(e.stack).red);
                    return message.channel.send(new MessageEmbed().setFooter(ee.footertext,ee.footericon).setColor(ee.wrongcolor).setTitle(`${emoji.msg.ERROR}  ERROR Writing the File`).setDescription(`\`\`\`${e.message}\`\`\``))
                  }
                  let songoftheday2 = require(`../../botconfig/songoftheday.json`)
                  message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext,ee.footericon)
                    .setThumbnail(songoftheday2.track.thumbnail)
                    .setAuthor(`Today's new Song of the Day`, message.author.displayAvatarURL({dynamic: true}))
                    .setTitle(songoftheday2.track.title)
                    .setURL(songoftheday2.track.url)
                    .setDescription(`**Duration:**\n\`${songoftheday2.track.duration}\`\n\n${songoftheday2.message}\n\nCheck out Today's Song of the Day by typing \`${prefix}playsongoftheday\``)
                  )
                  return message.channel.send(new MessageEmbed().setFooter(ee.footertext,ee.footericon).setColor(ee.color).setTitle(`${emoji.msg.SUCCESS}  Successfully set the new Track of the Day`))
                });

      //play the SONG from YOUTUBE
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR}  ERROR | An error occurred`)
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
