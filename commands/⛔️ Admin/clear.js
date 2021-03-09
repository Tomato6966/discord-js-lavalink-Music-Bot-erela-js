const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {delay} = require(`../../handlers/functions`);
module.exports = {
    name: `purge`,
    aliases: [`clear`],
    category: `⛔️ Admin`,
    description: `Deletes messages in a text channel or specified number of messages in a text channel.`,
    usage: `purge <Amount of messages>`,
    memberpermissions: [`MANAGE_MESSAGES`],
    run: async (client, message, args) => {
      try{
         clearamount = Number(args[0]);
          if(clearamount >= 1 && clearamount<= 100){
              message.channel.bulkDelete(clearamount);
          }
          else{
              let limit = clearamount > 1000 ? 1000 : clearamount;
              for(let i = 100; i <= limit; i += 100){
                  try{
                      await message.channel.bulkDelete(i);
                  }catch{}
                  await delay(1500);
              }
          }
          message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.SUCCESS} ${clearamount} messages successfully deleted!`)
          ).then(msg => msg.delete({ timeout: 5000 }));
        } catch (e) {
             console.log(String(e.stack).red);
             return message.channel.send(new MessageEmbed()
                 .setColor(ee.wrongcolor)
                 .setFooter(ee.footertext, ee.footericon)
                 .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
                 .setDescription(`\`\`\`${e.message}\`\`\``)
             );
         }
    }
}
