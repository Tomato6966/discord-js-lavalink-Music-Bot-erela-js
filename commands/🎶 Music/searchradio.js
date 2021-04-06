const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const radios = require(`../../botconfig/radiostations.json`);
const playermanager = require(`../../handlers/playermanager`);
const RadioBrowser = require('radio-browser')
module.exports = {
  name: `searchradio`,
  category: `🎶 Music`,
  aliases: [`searchr`],
  description: `Searches for a Radio station`,
  usage: `searchradio `,
  parameters: {"type":"music", "activeplayer": false, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //if no args send all stations
      if (!args[0]) return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} Error | What should be the search Type`)
        .setDescription(`Useage: \`${prefix}searchradio <TYPE> <Seach Query>\`\nValid Types: \`country\`, \`city\`, \`name\`, \`genre\`\nExample: \`${prefix}searchradio tag jazz\`\nExample: \`${prefix}searchradio state Austria\``)
      );
      if (!args[1]) return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} Error | What should I search for?`)
        .setDescription(`Useage: \`${prefix}searchradio <TYPE> <Seach Query>\`\nValid Types: \`country\`, \`city\`, \`name\`, \`genre\`\nExample: \`${prefix}searchradio tag jazz\`\nExample: \`${prefix}searchradio state Austria\``)
      );

      let filter = false;
      switch (args[0].toLowerCase()) {
        case "tag":
        case "genre": {
          filter = {
            limit: 60, // list max 5 items
            by: 'tag', // search in tag
            searchterm: args.slice(1).join(" ") // term in tag
          }
        }
        break;
      case "name": {
        filter = {
          limit: 60, // list max 5 items
          by: 'name', // search in tag
          searchterm: args.slice(1).join(" ") // term in tag
        }
      }
      break;
      case "city": {
        filter = {
          limit: 60, // list max 5 items
          by: 'state', // search in tag
          searchterm: args.slice(1).join(" ") // term in tag
        }
      }
      break;
      case "country": {
        filter = {
          limit: 60, // list max 5 items
          by: 'country', // search in tag
          searchterm: args.slice(1).join(" ") // term in tag
        }
      }
      break;
      default:
        filter = false;
        break;
      }
      if (!filter) return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} Error | What should be the search Type`)
        .setDescription(`Useage: \`${prefix}searchradio <TYPE> <Seach Query>\`\nValid Types: \`country\`, \`city\`, \`name\`, \`genre\`\nExample: \`${prefix}searchradio tag jazz\`\nExample: \`${prefix}searchradio state Austria\``)
      );

      RadioBrowser.getStations(filter)
        .then(async data => {
          let string = "";
          let counter = 0;
          let array = [];

          for (const track of data) {
            string += `**${++counter})** [\`${String(track.name).substr(0, 15).split("[").join("{").split("]").join("}")}\`](${track.url})\n`
            if (counter % 10 === 0) {
              array.push(string);
              string = "";
            }
          }

          let embed = new MessageEmbed()
            .setTitle(`Search result for: 🔎 **\`${filter.searchterm}`.substr(0, 256 - 3) + "`**")
            .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
            .setFooter(`Search-Request by: ${message.author.tag}`, message.author.displayAvatarURL({
              dynamic: true
            }))

          for (const item of array) embed.addField("\u200b", item, true)

          message.channel.send(embed)

          await message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle("Pick your Radio with the `INDEX Number`")
          )

          try {
            collected = await message.channel.awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 30e3,
              errors: ['time']
            });
          } catch (e) {
            if (!player.queue.current) player.destroy();
            return message.channel.send(new MessageEmbed()
              .setTitle("❌ Error | You didn't provide a selection")
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
            );
          }
          const first = collected.first().content;
          if (first.toLowerCase() === 'end') {
            if (player && !player.queue.current) player.destroy();
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle('❌ Error | Cancelled selection.')
            );
          }
          const index = Number(first) - 1;
          if (isNaN(index))
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`❌ Error | The number you provided is not a Number within (1-${counter}).`)
            );
          if (index < 0 || index > counter - 1)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`❌ Error | The number you provided too small or too big (1-${counter}).`)
            );

          playermanager(client, message, Array(data[index].url), `song:radio`);

        })
        .catch(e => {
          console.log(String(e.stack).bgRed)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.message}\`\`\``)
          );
        })
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
