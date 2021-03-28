const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `equalizer`,
  category: `👀 Filter`,
  aliases: [`eq`],
  description: `Changes the Equalizer`,
  usage: `bassboost <music/bassboost/earrape>`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      let level = `none`;
      if (!args.length || (!client.eqs[args[0].toLowerCase()] && args[0].toLowerCase() != `none`))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} ERROR | Equalizer level must be one of the following`)
          .setDescription(`Valid Equalizers:\n\`music\`, \`pop\`, \`electronic\`, \`classical\`, \`rock\`, \`full\`, \`gaming\`, \`bassboost\`, \`earrape\`\n\nUsage: \`${prefix}equalizer <Level>\`\n\nExample: \`${prefix}equalizer music\``)
        );
      level = args[0].toLowerCase();
      switch (level) {
        case `music`:
          player.setEQ(client.eqs.music);
          break;
        case `pop`:
          player.setEQ(client.eqs.pop);
          break;
        case `electronic`:
        case `electro`:
        case `techno`:
          player.setEQ(client.eqs.electronic);
          break;
        case `classical`:
        case `classic`:
        case `acustics`:
          player.setEQ(client.eqs.classical);
          break;
        case `rock`:
        case `metal`:
          player.setEQ(client.eqs.rock);
          break;
        case `full`:
        case `ful`:
          player.setEQ(client.eqs.full);
          break;
        case `gaming`:
        case `game`:
        case `gam`:
          player.setEQ(client.eqs.gaming);
          break;
        case `music`:
          player.setEQ(client.eqs.music);
          break;
        case `bassboost`:
          player.setEQ(client.eqs.bassboost);
          break;
        case `earrape`:
          player.setVolume(player.volume + 50);
          player.setEQ(client.eqs.earrape);
          break;
      }
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Success | Set Equalizer to \`${level}\``)
        .setDescription(`Note: *It might take up to 5 seconds until you hear the new Equalizer*`)
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
