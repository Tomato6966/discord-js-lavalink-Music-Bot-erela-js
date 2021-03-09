const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `warn`,
    category: `⛔️ Admin`,
    aliases: [``],
    cooldown: 0.5,
    description: `Warns a Member with a Reason`,
    usage: `warn @User [Reason]`,
    memberpermissions: [`KICK_MEMBERS`],
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      let warnmember = message.mentions.members.first() || message.guild.members.cache.get(args[0] ? args[0] : ``);
      if (!warnmember)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | Please add a Member you want to warn!`)
          .setDescription(`Useage: \`${prefix}warn @User [Reason]\``)
        );

      let reason = args.slice(1).join(` `);
      if (!reason) {
          reason = `NO REASON`;
      }

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
        const newActionId = client.modActions.autonum;
        client.modActions.set(newActionId, {
            user: warnmember.user.id,
            guild: message.guild.id,
            type: 'warning',
            moderator: message.author.id,
            reason: reason,
            when: new Date().toLocaleString(`de`),
            oldhighesrole: warnmember.roles ? warnmember.roles.highest : `Had No Roles`,
            oldthumburl: warnmember.user.displayAvatarURL({dynamic:true})
        });
        // Push the action to the user's warnings
        client.userProfiles.push(warnmember.user.id, newActionId, 'warnings');
        client.userProfiles.inc(warnmember.user.id, 'totalActions');
        const warnIDs = client.userProfiles.get(warnmember.user.id, 'warnings');
        warnmember.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setAuthor(`You've got warned by: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
          .setDescription(`**You now have: ${warnIDs.length} Warnings**\n\nReason:\n> ${reason}`)).catch(e=>console.log(e.message))

        return message.channel.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setAuthor(`${emoji.msg.SUCCESS} Success | Warned ${warnmember.user.tag}`, warnmember.user.displayAvatarURL({dynamic:true}))
          .setDescription(`**He now has: ${warnIDs.length} Warnings**\n\nReason:\n> ${reason}`.substr(0, 2048))
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
