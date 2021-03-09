const config = require(`../../botconfig/config.json`);
const ms = require(`ms`);
const ee = require(`../../botconfig/embed.json`)
const emoji = require(`../../botconfig/emojis.json`);
const {MessageEmbed} =require(`discord.js`)
module.exports = {
    name: `mute`,
    category: `⛔️ Admin`,
    aliases: [``],
    cooldown: 4,
    usage: `mute @User <Time+Format(e.g: 10m)> [REASON]`,
    description: `Mutes a User for a specific Time!`,
    memberpermissions: [`KICK_MEMBERS`],
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      let member = message.mentions.members.first();
      if (!member)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | please ping a USER!`)
            .setDescription(` Usage: \`${prefix}mute @User <Time+Format(e.g: 10m)> [REASON]\`\n\nExample: \`${prefix}mute @User 10m He is doing bad stuff!\``)
        );
      args.shift();
      if (member.roles.highest.position >= message.member.roles.highest.position)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | I cannot mute this Member, because he is higher/Equal to your Rang Position!`)
        );

      let time = args[0];
      if (!time)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | please add a TIME!`)
            .setDescription(` Usage: \`${prefix}mute @User <Time+Format(e.g: 10m)> [REASON]\`\n\nExample: \`${prefix}mute @User 10m He is doing bad stuff!\``)
        );

      args.shift();
      let reason = args.join(` `);
      let allguildroles = message.guild.roles.cache.array();
      let mutedrole = false;
      for (let i = 0; i < allguildroles.length; i++) {
          if (allguildroles[i].name.toLowerCase().includes(`muted`)) {
              mutedrole = allguildroles[i];
              break;
          }
      }
      if (!mutedrole) {
          let highestrolepos = message.guild.me.roles.highest.position;
          mutedrole = await message.guild.roles.create({ data: { name: `muted`, color: `#222222`, hoist: true, position: Number(highestrolepos) - 1 }, reason: `This role got created, to mute Members!` }).catch((e) => {
              console.log(String(e.stack).red);
              message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle(`${emoji.msg.ERROR} ERROR | I COULD NOT CREATE A ROLE, sorry`)
              );
          });
      }
      if (mutedrole.position > message.guild.me.roles.highest.position)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | I cannot access the Role, because it's above me`)
        );

      let mutetime;
      try {
          mutetime = ms(time);
      } catch (e) {
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | please add a TIME!`)
            .setDescription(` Usage: \`${prefix}mute @User <Time+Format(e.g: 10m)> [REASON]\`\n\nExample: \`${prefix}mute @User 10m He is doing bad stuff!\``)
        );
      }

      if (!mutetime || mutetime === undefined)   return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | please add a TIME!`)
            .setDescription(` Usage: \`${prefix}mute @User <Time+Format(e.g: 10m)> [REASON]\`\n\nExample: \`${prefix}mute @User 10m He is doing bad stuff!\``)
        );
      await message.guild.channels.cache.forEach((ch) => {
          try {
              ch.updateOverwrite(mutedrole, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false, SPEAK: false });
          } catch (e) {
              console.log(String(e.stack).red);
          }
      });
      try {
        member.roles.add(mutedrole);
      } catch (e) {
        message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.message}\`\`\``)
        );
      }

      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Success | \`${member.user.tag}\` got **MUTED** for \`${ms(mutetime, { long: true })}\``)
        .setDescription(`Reason:\n> ${reason ? `${reason.substr(0, 1800)}` : `NO REASON`}`)
      );
      member.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Success | \`${message.author.tag}\` muted you for \`${ms(mutetime, { long: true })}\``)
        .setDescription(`Reason:\n> ${reason ? `${reason.substr(0, 1800)}` : `NO REASON`}`)
      );
      setTimeout(() => {
          try {
            message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.SUCCESS} Success | \`${member.user.tag}\` got **UNMUTED** after\`${ms(mutetime, { long: true })}\``)
              .setDescription(`Reason:\n> ${reason ? `${reason.substr(0, 1800)}` : `NO REASON`}`)
            );
            member.roles.remove(mutedrole);
          } catch (e) {
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.message}\`\`\``)
            );
          }
      }, mutetime);
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
