
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const { databasing } = require("../../handlers/functions");
module.exports = {
  name: "afk",
	aliases: ["twentyfourseven", "noleave", "unlimitedtime"],
    category: "💰 Premium",
    description: "Disables leaving channel for The Server / Player | Toggle",
    usage: "afk [guild/user]",
    run: async (client, message, args, cmduser, text, prefix) => {
      databasing(client, message.guild.id, message.author.id)
      let gpremium = client.premium.get(message.guild.id);
      let ppremium = client.premium.get(message.author.id);
      let ownerstringarray = "";
      for(let i = 0; i<config.ownerIDS.length; i++){
        try{
        let user = await client.users.fetch(config.ownerIDS[i]);
        ownerstringarray += `\`${user.tag}\` /`
      }catch{}
      }
      ownerstringarray = ownerstringarray.substr(0, ownerstringarray.length-2);
      if(!gpremium.enabled && !ppremium.enabled) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(":x: Error | No Premium Commands Available").setDescription(`Dm to get premium:\n ${ownerstringarray}`.substr(0, 2040)))

      if(gpremium.enabled) {
        client.premium.set(message.guild.id, !gpremium.twentyfourseven ,"twentyfourseven")
        return message.reply(new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle(`✅ Successfully ${gpremium.twentyfourseven ? `✔️ Enabled` : `❌ Disabled`} 24/7`).setDescription(`For the Guild: \`${message.guild.name}\``))
      }
      if(ppremium.enabled) {
        client.premium.set(message.author.id, !ppremium.twentyfourseven ,"twentyfourseven")
        return message.reply(new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle(`✅ Successfully ${gpremium.twentyfourseven ? `✔️ Enabled` : `❌ Disabled`} 24/7`).setDescription(`For the Player: \`${message.author.tag}\``))
      }
    }

};
