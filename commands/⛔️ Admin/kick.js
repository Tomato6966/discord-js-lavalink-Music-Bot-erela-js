const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
      name: `kick`,
      category: `⛔️ Admin`,
      aliases: [``],
      description: `Kicks a Member from a Guild`,
      usage: `kick @User [Reason]`,
      memberpermissions: [`KICK_MEMBERS`],
      run: async (client, message, args, cmduser, text, prefix) => {
      try{
        let kickmember = message.mentions.members.first() || message.guild.members.cache.get(args[0] ? args[0] : ``);
        if (!kickmember)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} Error | Please add a Member you want to kick!`)
            .setDescription(`Useage: \`${prefix}kick @User [Reason]\``)
          );

        let reason = args.slice(1).join(` `);
        if (!reason) {
            reason = `NO REASON`;
        }

        const memberPosition = kickmember.roles.highest.position;
        const moderationPosition = message.member.roles.highest.position;
        if (moderationPosition <= memberPosition)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} Error | I cannot kick someone, who is above/equal you`)
          );

        if (!kickmember.kickable)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} Error | The Member is not kickable, sorry!`)
          );

        try {
            kickmember.kick({reason: reason}).then(() => {
              return message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.SUCCESS} Success | Kicked ${kickmember.user.tag}`)
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
