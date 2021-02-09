const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
    name: "slowmode",
    category: "⛔️ Administration",
    aliases: ["slow"],
    description: "Changes the slowmode of the channel",
    usage: "slowmode <Amount>",
    run: async(client, message, args) => {
        //Allowed user:
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You are not allowed to run this command!");
       
        try {
            if (!isNaN(args[0]) || parseInt(args[0]) < 0) {
                let embed = new MessageEmbed()
              .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
                  .setDescription(`✅ Slowmode successfully set to ${args[0]}!`)
                  
              message.reply(embed)
              message.channel.setRateLimitPerUser(args[0])
          } else {
              let embed2 = new MessageEmbed()
              .setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon)
                .setDescription(`Thats not an number!`)
                  
              message.reply(embed2)
          }
        }
        catch (error) {
            console.log(String(error.stack).red);
            return message.reply('there was an error setting the Slowmode.');
        }
    }
};