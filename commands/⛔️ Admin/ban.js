const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `ban`,
    category: `⛔️ Admin`,
    aliases: [`banhammer`],
    description: `Bans a Member from a Guild`,
    usage: `ban @User [0-7 Days, 0 == Infinite] [Reason]`,
    memberpermissions: [`BAN_MEMBERS`],
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      let kickmember = message.mentions.members.first() || message.guild.members.cache.get(args[0] ? args[0] : ``);
      if (!kickmember)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | Please add a Member you want to kick!`)
          .setDescription(`Useage: \`${prefix}ban @User [Reason]\``)
        );

      let days = args[1];
      if(Number(days) >= 7) days = 7;
      if(Number(days) <= 0) days = 0;

      let reason = args.slice(2).join(` `);
      if (!reason) {
          reason = `NO REASON`;
      }

      const memberPosition = kickmember.roles.highest.rawPosition;
      const moderationPosition = message.member.roles.highest.rawPosition;

      if (moderationPosition <= memberPosition)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | I cannot ban someone, who is above/equal you`)
        );

      if (!kickmember.bannable)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | The Member is not bannable, sorry!`)
        );

      try {
          kickmember.ban({days: days, reason: reason}).then(() => {
            return message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.SUCCESS} Success | Banned ${kickmember.user.tag} for ${days === 0 ? `Infinite Days` : `${days} Days`}`)
              .setDescription(`Reason:\n> ${reason}`)
            );
          });
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
