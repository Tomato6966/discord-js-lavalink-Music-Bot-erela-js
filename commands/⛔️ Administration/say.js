const config = require("../../botconfig/config.json");
module.exports = {
    name: "say",
    category: "⛔️ Administration",
    aliases: ["say", "sayit"],
    cooldown: 4,
    usage: "say <Text>",
    description: "Resends the message",
    memberpermissions: ["MANAGE_GUILD"],
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      if (!text)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | please add a Text!`)
            .setDescription(` Usage: \`${prefix}say <TEXT>\`\n\nExample: \`${prefix}say Hello World! Check out: https://milrato.eu\``)
        );
      message.channel.send(text);
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
};
