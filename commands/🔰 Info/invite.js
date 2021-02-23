const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "invite",
    category: "🔰 Info",
    aliases: ["add"],
    cooldown: 5,
    usage: "invite",
    description: "Gives you an Invite link for this Bot",
    run: async (client, message, args, user, text, prefix) => {
    try{
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle(":heart: Thanks for inviting me!")
        .setFooter(ee.footertext, ee.footericon)
        .setURL("https://discord.com/api/oauth2/authorize?client_id=742672021422342165&permissions=8&scope=bot")
        .setDescription("[Click here](https://discord.com/api/oauth2/authorize?client_id=742672021422342165&permissions=8&scope=bot)")
      );
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}
