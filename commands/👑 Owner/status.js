const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const fs = require("fs");
module.exports = {
    name: "status",
    category: "👑 Owner",
    aliases: ["setstatus"],
    cooldown: 15,
    description: "Changes the Bot Status",
    usage: "status <Type> <TEXT>",
    run: async (client, message, args, cmduser, text, prefix) => {
        if (!config.ownerIDS.includes(message.author.id)) return message.reply("You are not allowed to run this command! Only the Owner is allowed to run this Cmd");
        try{
            if(!args[0]) message.reply(new MessageEmbed().setFooter(ee.footertext,ee.footericon).setColor(ee.wrongcolor).setTitle(":x: ERROR Wrong Command Usage | Include a Status Type").setDescription(`Try this: \`${prefix}\`status <Type> <TEXT>`))
            if(!args[1]) message.reply(new MessageEmbed().setFooter(ee.footertext,ee.footericon).setColor(ee.wrongcolor).setTitle(":x: ERROR Wrong Command Usage | Include a Status Text").setDescription(`Try this: \`${prefix}\`status <Type> <TEXT>`))
            client.user.setActivity(args[1].substr(0, 50), {type: args[0].toUpperCase(), url: config.status.url})
            console.log(JSON.stringify(config, null, 3))
            /*fs.writeFile("./botconfig/config.json", JSON.stringify(config, null, 2), (err) => {
                if (e) {
                  console.log(String(e.stack).red);
                  message.reply(new MessageEmbed().setFooter(ee.footertext,ee.footericon).setColor(ee.wrongcolor).setTitle(":x: ERROR Writing the File").setDescription(`\`\`\`${e.stack}\`\`\``))
                }
          
                return message.channel
                  .send(
                    i18n.__("pruning.result", {
                      loop: config.PRUNING ? i18n.__("common.enabled") : i18n.__("common.disabled")
                    })
                  )
                  .catch(console.error);
              });*/
            return message.reply(new MessageEmbed().setFooter(ee.footertext,ee.footericon).setColor(ee.color).setTitle("✅ Successfully set the new Status"))
        }catch(e){
            console.log(String(e.stack).red);
            message.reply(new MessageEmbed().setFooter(ee.footertext,ee.footericon).setColor(ee.wrongcolor).setTitle(":x: ERROR Something went wrong running this Command").setDescription(`\`\`\`${e.stack}\`\`\``))
        }
    },
};
