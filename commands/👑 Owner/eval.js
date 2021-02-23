const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { inspect } = require("util");
module.exports = {
    name: "eval",
    category: "👑 Owner",
    aliases: ["evaluate"],
    description: "eval Command",
    usage: "eval <CODE>",
    run: async (client, message, args, cmduser, text, prefix) => {
        if (!config.ownerIDS.includes(message.author.id)) return message.channel.send("You are not allowed to run this command! Only the Owner is allowed to run this Cmd");
        let evaled;
        try {
            if (args.join(" ").includes("token")) return console.log("ERROR NO TOKEN GRABBING ;)".red);
            evaled = await eval(args.join(" "));
            if (evaled.toString().includes(client.token)) return console.log("ERROR NO TOKEN GRABBING ;)".red);
            let string = inspect(evaled);
            for(let i = 0; i < string.length; i += 1990)
            message.channel.send("```" + string.substr(i, i + 1990) + "```");
          } catch (e) {
              console.log(String(e.stack).bgRed)
              return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
      						.setFooter(ee.footertext, ee.footericon)
                  .setTitle(`❌ ERROR | An error occurred`)
                  .setDescription(`\`\`\`${e.stack}\`\`\``)
              );
          }
    },
};
