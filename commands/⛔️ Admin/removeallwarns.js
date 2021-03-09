const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `removeallwarns`,
    category: `⛔️ Admin`,
    aliases: [`removeallwarn`, `removeallwarnings`],
    description: `Removes all Warns from a Member`,
    usage: `removeallwarns @User`,
    memberpermissions: [`KICK_MEMBERS`],
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      let warnmember = message.mentions.members.first() || message.guild.members.cache.get(args[0] ? args[0] : ``);
      if (!warnmember)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | Please add a Member you want to unwarn!`)
          .setDescription(`Useage: \`${prefix}unwarn @User <WARN_ID>\``)
        );

      const memberPosition = warnmember.roles.highest.position;
      const moderationPosition = message.member.roles.highest.position;

      if (moderationPosition <= memberPosition)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | I cannot warn someone, who is above/equal you`)
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
        if(!warnIDs)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} Error | User has no Warnings`)
          );

        client.userProfiles.set(warnmember.user.id, [], 'warnings')


        warnmember.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setAuthor(`${message.author.tag} removed all ${warnIDs.length} Warnings from you!`,message.author.displayAvatarURL({dynamic:true}))


        ).catch(e=>console.log(e.message))

        message.channel.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.SUCCESS} Success | Removed all ${warnIDs.length} Warnings from ${warnmember.user.tag}`)
        );

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
