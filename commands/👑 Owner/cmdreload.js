const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `cmdreload`,
    category: `👑 Owner`,
    aliases: [``],
    description: `Reloads a command`,
    usage: `cmdreload <CMD>`,
    run: async (client, message, args, cmduser, text, prefix) => {
      if (!config.ownerIDS.includes(message.author.id))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username, ee.footericon)
          .setTitle(`${emoji.msg.ERROR}  Error | You are not allowed to run this command! Only the Owner is allowed to run this Cmd`)
        );
        try {
            let reload = false;
            for (let i = 0; i < client.categories.length; i += 1) {
                let dir = client.categories[i];
                try{
                    if(!args[0])
                      return message.channel.send(new MessageEmbed()
                        .setColor(ee.wrongcolor)
            						.setFooter(ee.footertext, ee.footericon)
                        .setTitle(`${emoji.msg.ERROR}  ERROR | Please include an argument`)
                      );
                      delete require.cache[require.resolve(`../../commands/${dir}/${args[0]}.js`)] // usage !reload <name>
                      client.commands.delete(args[0])
                      const pull = require(`../../commands/${dir}/${args[0]}.js`)
                      client.commands.set(args[0], pull)
                      reload = true;
                }catch{ }
            }
            if(reload)
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.SUCCESS}  SUCCESS | Reloaded \`${args[0]}\``)
              );
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR}  ERROR | Could not reload: \`${args[0]}\``)
              );
          } catch (e) {
              console.log(String(e.stack).bgRed)
              return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
      						.setFooter(ee.footertext, ee.footericon)
                  .setTitle(`${emoji.msg.ERROR}  ERROR | An error occurred`)
                  .setDescription(`\`\`\`${e.message}\`\`\``)
              );
          }
    },
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
