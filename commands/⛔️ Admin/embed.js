const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
      name: `embed`,
      category: `⛔️ Admin`,
      aliases: [``],
      description: `Resends the message as an embed`,
      useage: `embed <Title> + <Description>`,
      memberpermissions: [`MANAGE_GUILD`],
      run: async (client, message, args, cmduser, text, prefix) => {
      try{
        const argsneu = message.content.slice(5 + prefix.length).split(`+`);
        if (!argsneu)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} Error | Wrong Command Usage, please add arguments!`)
            .setDescription(`Useage: \`${prefix}embed <Title> + <Description>\``)
          );

        const Title = argsneu[0];
        if (Title.length > 256)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} Error | Title is only allowed to be \`256\` Letters Long!`)
            .setDescription(`Useage: \`${prefix}embed <Title> + <Description>\``)
          );

        const Description = argsneu.slice(1).join(` `);
        if (Description.length > 2048)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} Error | Description is only allowed to be \`2048\` Letters Long!`)
            .setDescription(`Useage: \`${prefix}embed <Title> + <Description>\``)
          );

        const embed = new MessageEmbed()
          .setColor(ee.color)
          .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setTimestamp();
          try { embed.setTitle(Title); } catch { /* */ }
          try { embed.setDescription(Description); } catch { /* */ }
        message.channel.send(embed).catch((e) => console.log(String(e.stack).red));
        message.delete().catch((e) => console.log(String(e.stack).red));
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
