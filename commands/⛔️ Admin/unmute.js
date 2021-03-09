const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const ms = require(`ms`);
const {MessageEmbed} =require(`discord.js`)
module.exports = {
    name: `unmute`,
    category: `⛔️ Admin`,
    aliases: [``],
    cooldown: 4,
    usage: `unmute @User`,
    description: `Unmutes a User!`,
    memberpermissions: [`KICK_MEMBERS`],
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      let member = message.mentions.members.first();
      if (!member)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | please ping a USER!`)
            .setDescription(` Usage: \`${prefix}unmute @User\`\n\nExample: \`${prefix}unmute @User\``)
        );
      args.shift();
      if (member.roles.highest.position >= message.member.roles.highest.position)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | I cannot mute this Member, because he is higher/Equal to your Rang Position!`)
        );

      let allguildroles = message.guild.roles.cache.array();
      let mutedrole = false;
      for (let i = 0; i < allguildroles.length; i++) {
          if (allguildroles[i].name.toLowerCase().includes(`muted`)) {
              mutedrole = allguildroles[i];
              break;
          }
      }
      if (!mutedrole) {
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | You never muted someone, there is no muted role yet!`)
        );
      }
      if (mutedrole.position > message.guild.me.roles.highest.position) {
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | I cannot access the Role, because it's above me!`)
        );
      }
      try {
          member.roles.remove(mutedrole);
      } catch (e) {
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | please add a TIME!`)
            .setDescription(` Usage: \`${prefix}mute @User <Time+Format(e.g: 10m)> [REASON]\`\n\nExample: \`${prefix}mute @User 10m He is doing bad stuff!\``)
        );
      }
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Success | \`${member.user.tag}\` got **UNMUTED**`)
      );
      member.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Success | \`${message.author.tag}\` unmited`)
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
