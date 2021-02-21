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
        if (!config.ownerIDS.includes(message.author.id)) return message.channel.send("You are not allowed to run this command! Only the Owner is allowed to run this Cmd");
        try{
            if(!args[0]) message.channel.send(new MessageEmbed().setFooter(ee.footertext,ee.footericon).setColor(ee.wrongcolor).setTitle("❌ ERROR Wrong Command Usage | Include a Status Type").setDescription(`Try this: \`${prefix}\`status <Type> <TEXT>`))
            if(!args[1]) message.channel.send(new MessageEmbed().setFooter(ee.footertext,ee.footericon).setColor(ee.wrongcolor).setTitle("❌ ERROR Wrong Command Usage | Include a Status Text").setDescription(`Try this: \`${prefix}\`status <Type> <TEXT>`))

            let status = config
            status.status.text = args.slice(1).join(" ").substr(0, 50);
            status.status.type = args[0].toUpperCase();
            client.user.setActivity(args.slice(1).join(" ").substr(0, 50), {type: args[0].toUpperCase(), url: config.status.url})
            fs.writeFile("./botconfig/config.json", JSON.stringify(status, null, 3), (e) => {
                if (e) {
                  console.log(String(e.stack).red);
                  return message.channel.send(new MessageEmbed().setFooter(ee.footertext,ee.footericon).setColor(ee.wrongcolor).setTitle("❌ ERROR Writing the File").setDescription(`\`\`\`${e.stack}\`\`\``))
                }
                return message.channel.send(new MessageEmbed().setFooter(ee.footertext,ee.footericon).setColor(ee.color).setTitle("✅ Successfully set the new Status"))
              });
        }catch(e){
            console.log(String(e.stack).red);
            message.channel.send(new MessageEmbed().setFooter(ee.footertext,ee.footericon).setColor(ee.wrongcolor).setTitle("❌ ERROR Something went wrong running this Command").setDescription(`\`\`\`${e.stack}\`\`\``))
        }
    },
};
