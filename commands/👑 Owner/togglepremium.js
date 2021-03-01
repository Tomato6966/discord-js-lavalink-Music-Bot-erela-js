const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { databasing } = require("../../handlers/functions");
module.exports = {
    name: "togglepremium",
    category: "👑 Owner",
    aliases: ["tp"],
    description: "Toggles premium Mode of a User / Guild",
    usage: "togglepremium <user/guild> <Userid/Guildid>",
    run: async (client, message, args, cmduser, text, prefix) => {
        if (!config.ownerIDS.includes(message.author.id))
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(client.user.username, ee.footericon)
            .setTitle("❌ Error | You are not allowed to run this command! Only the Owner is allowed to run this Cmd")
          );

        if (!args[0]) return message.channel.send("Please add the **type**! Useage: `togglepremium <user/guild> <Userid/Guildid>`");
        if (!args[1]) return message.channel.send("Please add a **ID**! Useage: `togglepremium <user/guild> <Userid/Guildid>`");
        if (args[1].length !== 18) return message.channel.send("Please add a **valid ID**! Useage: `togglepremium <user/guild> <Userid/Guildid>`");
        databasing(client, args[1], args[1]);
        try {
            if (args[0].toLowerCase() === "user") {
                client.premium.set(args[1], !client.premium.get(args[1], "enabled"), "enabled");
                try {
                    if (client.premium.get(args[1], "enabled")) client.premium.push("premiumlist", { u: args[1] }, "list");
                    if (!client.premium.get(args[1], "enabled")) client.premium.remove("premiumlist", (value) => value.u === args[1], "list");
                } catch (e) {
                    console.log(String(e.stack).red);
                }
                let user = await client.users.fetch(args[1]);
                if (!user) {
                    try {
                        client.premium.remove("premiumlist", (value) => value.u === args[1], "list");
                        client.premium.set(args[1], false, "enabled");
                        return message.channel.send("I cant reach out to that user, sorry!!");
                    } catch {
                        return message.channel.send("I cant reach out to that user, sorry!");
                    }
                }
                message.channel.send(`✅**${user.tag}**is now ${client.premium.get(args[1], "enabled") ? "" : "**not**"}allowed to use the Premium Commands!`);
                user.send(`${client.premium.get(args[1], "enabled") ? "✅You are now allowed and able to use Premium Commands" : "❌ You are not allowed to use premium Commands anymore"}`);
            }
            if (args[0].toLowerCase() === "guild") {
                client.premium.set(args[1], !client.premium.get(args[1], "enabled"), "enabled");
                try {
                    if (client.premium.get(args[1], "enabled")) client.premium.push("premiumlist", { g: args[1] }, "list");
                    if (!client.premium.get(args[1], "enabled")) client.premium.remove("premiumlist", (value) => value.g === args[1], "list");
                } catch (e) {
                    console.log(String(e.stack).red);
                }
                let guild = client.guilds.cache.get(args[1], "enabled");
                if (!guild) {
                    try {
                        client.premium.remove("premiumlist", (value) => value.g === args[1], "list");
                        client.premium.set(args[1], false, "enabled");
                        return message.channel.send("I cant reach out to that guild, sorry!!");
                    } catch {
                        return message.channel.send("I cant reach out to that guild, sorry!");
                    }
                }
                guild.owner.send(
                    `${client.premium.get(args[1], "enabled") ? `✅Your Guild\`${guild.name}\`is now allowed and able to use Premium Commands` : `❌Your Guild\`${guild.name}\`is not allowed and able to use Premium Commands anymore`}`
                );
                let channel = guild.channels.cache.find((channel) => channel.type === "text" && channel.permissionsFor(guild.me).has("SEND_MESSAGES"));
                message.channel.send(`✅**${guild.name}**is now ${client.premium.get(args[1], "enabled") ? "" : "**not**"}allowed to use the Premium Commands!`);
                channel.send(`${client.premium.get(args[1], "enabled") ? "✅This Guild is now allowed and able to use Premium Commands" : "❌ This Guild is not allowed and able to use Premium Commands anymore"}`);
            }
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
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
