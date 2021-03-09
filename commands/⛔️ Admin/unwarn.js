const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `unwarn`,
    category: `⛔️ Admin`,
    aliases: [`removewarn`, `warnremove`],
    description: `Removes a Warn from a Member with the ID`,
    usage: `removewarn @User <WARN_ID>`,
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

      if (!args[1])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | Please add the Warning you want to remove from him`)
          .setDescription(`See his warns: \`${prefix}unwarn @User <WARN_ID>\``)
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
        if(Number(args[1]) >= warnIDs.length || Number(args[1]) < 0 )
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} Error | Value out of range`)
            .setDescription(`Usage: \`${prefix}unwarn @User <WARN_ID>\` Highest ID: ${warnIDs.length - 1}`)
          );

        const warnData = warnIDs.map(id => client.modActions.get(id));
        let warning = warnData[parseInt(args[1])]
        let warned_by = message.guild.members.cache.get(warning.moderator) ? message.guild.members.cache.get(warning.moderator).user.tag :  warning.moderator;
        let warned_at = warning.when;
        let warned_in = client.guilds.cache.get(warning.guild) ? client.guilds.cache.get(warning.guild).name : warning.guild;

        warnmember.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${message.author.tag} removed a warn from you!`)
          .addField(`Warned by:`, `\`${warned_by}\``, true)
          .addField(`Warned at:`, `\`${warned_at}\``, true)
          .addField(`Warned in:`, `\`${warned_in}\``, true)
          .addField(`Warn Reason:`, `\`${warning.reason.length > 900 ? warning.reason.substr(0, 900) + ` ...` : warning.reason}\``, true)

        ).catch(e=>console.log(e.message))

        message.channel.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.SUCCESS} Success | Removed the Warn from ${warnmember.user.tag}`)
          .addField(`Warned by:`, `\`${warned_by}\``, true)
          .addField(`Warned at:`, `\`${warned_at}\``, true)
          .addField(`Warned in:`, `\`${warned_in}\``, true)
          .addField(`Warn Reason:`, `\`${warning.reason.length > 900 ? warning.reason.substr(0, 900) + ` ...` : warning.reason}\``, true)
        );
        client.userProfiles.remove(warnmember.user.id, warnIDs[parseInt(args[1])], 'warnings')
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
