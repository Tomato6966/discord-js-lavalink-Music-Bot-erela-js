
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
      //call databasing just to be sure!
      databasing(client, message.guild.id, message.author.id)
      //get the database information for the GUILD
      let gpremium = client.premium.get(message.guild.id);
      //get the database information for the USER
      let ppremium = client.premium.get(message.author.id);
      //these few lines create the Stringarray of each OWNER USER of the config.json
      let ownerstringarray = "";
      for(let i = 0; i<config.ownerIDS.length; i++){
        try{
          let user = await client.users.fetch(config.ownerIDS[i]);
          ownerstringarray += `\`${user.tag}\` /`
        }catch{ }
      }
      //save the string
      ownerstringarray = ownerstringarray.substr(0, ownerstringarray.length-2);
      //if no enabled premiums, return
      if(!gpremium.enabled && !ppremium.enabled)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Error | No Premium Commands Available")
          .setDescription(`Dm to get premium:\n ${ownerstringarray}`.substr(0, 2040))
        )
      //if no args --> return with information
      if(!args[0]){
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Error | Invalid Input method")
          .setDescription(`Usage: \`${prefix}afk [guild/user]\``)
          .addField("💰 Player Premium", `${ppremium ? (ppremium.enabled ? `\`✔️ Enabled\`` : `\`❌ Disabled\`\nDm to enable:\n> ${ownerstringarray.substr(0, ownerstringarray.length - 1)}`.substr(0, 1020)) : `\`❌ Disabled\``}`, true)
          .addField("💰 Guild Premium", `${gpremium ? (gpremium.enabled ? `\`✔️ Enabled\`` : `\`❌ Disabled\`\nDm to enable:\n> ${ownerstringarray.substr(0, ownerstringarray.length - 1)}`.substr(0, 1020)) : `\`❌ Disabled\``}`, true)
        )
      }
      //if args 0 is guild
      if(args[0].toLowerCase() === "guild") {
        //if guild premium is not enabled return error
        if(!gpremium.enabled)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle("❌ Error | No Premium Commands Available for this Guild")
            .setDescription(`Dm to get premium:\n ${ownerstringarray}`.substr(0, 2040))
          );
        //toggle the database state
        client.premium.set(message.guild.id, !gpremium.twentyfourseven , "twentyfourseven")
        //return information message
        return message.channel.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`💰 Successfully ${ client.premium.get(message.guild.id).twentyfourseven ? `✅ Enabled` : `❌ Disabled`} 24/7`)
          .setDescription(`For the Guild: \`${message.guild.name}\``)
        );
      }
      //if the args 0 is user
      else if(args[0].toLowerCase() === "user") {
        //if user premium is not enbaled return error
        if(!ppremium.enabled)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle("❌ Error | No Premium Commands Available for you")
            .setDescription(`Dm to get premium:\n ${ownerstringarray}`.substr(0, 2040))
          );
        //toggle the database state
        client.premium.set(message.author.id, !ppremium.twentyfourseven ,"twentyfourseven")
        //return information message
        return message.channel.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`💰 Successfully ${client.premium.get(message.author.id).twentyfourseven ? `✅ Enabled` : `❌ Disabled`} 24/7`)
          .setDescription(`For the Player: \`${message.author.tag}\``)
        );
      }
      //else return information message
      else
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Error | Invalid Input method")
          .setDescription(`Usage: \`${prefix}afk [guild/user]\``)
        )
    }
};
