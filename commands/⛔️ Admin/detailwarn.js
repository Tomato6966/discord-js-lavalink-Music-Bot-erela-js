const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `detailwarn`,
    category: `⛔️ Admin`,
    aliases: [`warninfo`,`snipe`,`infowarn`,`infowarning`,`detailwarning`,`warninginfo`],
    description: `Shows details about one warn Command of a Member`,
    usage: `warn @User [Reason]`,
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
          let warned_by = message.guild.members.cache.get(warning.moderator) ? `${message.guild.members.cache.get(warning.moderator).user.tag} (${warning.moderator})` :  warning.moderator;
          let warned_in = client.guilds.cache.get(warning.guild) ? `${client.guilds.cache.get(warning.guild).name} (${warning.guild})` : warning.guild;

          message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setAuthor(`Warn from ${warnmember.user.tag}`,warnmember.user.displayAvatarURL({dynamic:true}))
            .setDescription(`**Reason:**\n\`\`\`${warning.reason.length > 2030 ? warning.reason.substr(0, 2030) + ` ...` : warning.reason}\`\`\``)
            .addField(`Warn:`, `\`${parseInt(args[1]) + 1}\` out of **${warnIDs.length} Warns**`, true)
            .addField(`Warned by:`, `\`${warned_by}\``, true)
            .addField(`Warned at:`, `\`${warning.when}\``, true)
            .addField(`Warned in:`, `\`${warned_in}\``, true)
            .addField(`Old Thumbnail URL`, `[\`Click here\`](${warning.oldthumburl})`, true)
            .addField(`Old Highest Role:`, `${message.guild.roles.cache.get(warning.oldhighesrole.id) ? `<@&`+message.guild.roles.cache.get(warning.oldhighesrole.id)+`>` : `\`${warning.oldhighesrole.name} (${warning.oldhighesrole.id})\``}`, true)
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
