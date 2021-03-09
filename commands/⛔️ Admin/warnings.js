const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `warnings`,
    category: `⛔️ Admin`,
    aliases: [`warns`, `warnlist`, `warn-list`],
    description: `Shows the warnings of a User`,
    usage: `warnings @User`,
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      let warnmember = message.mentions.members.first() || message.guild.members.cache.get(args[0] ? args[0] : ``);
      if (!warnmember)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | Please add a Member you want to see the warnings of!`)
          .setDescription(`Useage: \`${prefix}warn @User [Reason]\``)
        );


      try {
        client.userProfiles.ensure(warnmember.user.id, {
            id: message.author.id,
            guild: message.guild.id,
            totalActions: 0,
            warnings: [],
            kicks: []
        });
        const warnIDs = client.userProfiles.get(warnmember.user.id, 'warnings');
        const warnData = warnIDs.map(id => client.modActions.get(id));
        if(!warnIDs || !warnData || !warnIDs.length)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} Error | User has no Warnings`)
          );

        let warnings = warnData
        let warnembed = new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${warnIDs.length} Warnings of: ${warnmember.user.tag}`)
        let string = ``;
        for(let i = 0; i < warnings.length; i++)
        {
        string +=
`================================
**Warn Id:** \`${i}\`
**Warned at:** \`${warnings[i].when}\`
**Warned by:** \`${message.guild.members.cache.get(warnings[i].moderator) ? message.guild.members.cache.get(warnings[i].moderator).user.tag :  warnings[i].moderator}\`
**Reason:** \`${warnings[i].reason.length > 50 ? warnings[i].reason.substr(0, 50) + ` ...` : warnings[i].reason}\`
`
        }
        warnembed.setDescription(string)
        let k = warnembed.description
        for (let i = 0; i < k.length; i += 2048){
          message.channel.send(warnembed.setDescription(k.substr(i,  i + 2048)))}

      } catch (e) {
          console.log(String(e.stack).red);
          return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
  						.setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
              .setDescription(`\`\`\`${e.message}\`\`\``)
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
