
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
const { databasing } = require("../../handlers/functions");
module.exports = {
  name: "premiumlist",
	aliases: ["premiums"],
    category: "💰 Premium",
    description: "Shows all active premium Members",
    usage: "premiumlist [users/guilds]",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      //[{"g":args[1]}, {"g":args[1]}, {"g":args[1]}]
      let premiums = client.premium.get("premiumlist", "list");
      let guilds = [];
      let users = [];

      for(let i = 0; i< premiums.length; i++){
        try{
          if(Object.keys(premiums[i])[0] === "g")
          {
            let guild = client.guilds.cache.get(Object.values(premiums[i])[0])
            if(!guild){
              client.premium.get("premiumlist", (value)=>value.g === Object.values(premiums[i])[0], "list");
              continue;
            }
            guilds.push(guild.name)
          }

        }catch { }
      }
      for(let i = 0; i< premiums.length; i++){
        try{
          if(Object.keys(premiums[i])[0] === "u")
          {
            let user = await client.users.fetch(Object.values(premiums[i])[0]);
            if(!user){
              client.premium.get("premiumlist", (value)=>value.u === Object.values(premiums[i])[0], "list");
              continue;
            }
            users.push(user.tag)
          }

        }catch { }
      }
      if(!args[0]){
        let guildembed = new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        .setTitle("All Guilds with premium access")
        .setDescription("`"+guilds.join("`, `")+"`")
        for(let i = 0; i<guildembed.description.length; i+= 2048){
          message.channel.send(guildembed.setDescription(("`"+guilds.join("`, `")+"`").substring(i, i + 2048)))
        }
        let userembed = new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        .setTitle("All Users with premium access")
        .setDescription("`"+users.join("`, `")+"`")
        for(let i = 0; i<userembed.description.length; i+= 2048){
          message.channel.send(userembed.setDescription(("`"+users.join("`, `")+"`").substring(i, i + 2048)))
        }
      }
      else if(args[0].toLowerCase() === "u"||args[0].toLowerCase() === "user"||args[0].toLowerCase() === "users")
      {
        let userembed = new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        .setTitle("All Users with premium access")
        .setDescription("`"+users.join("`, `")+"`")
        for(let i = 0; i<userembed.description.length; i+= 2048){
          message.channel.send(userembed.setDescription(("`"+users.join("`, `")+"`").substring(i, i + 2048)))
        }
      }
      else if(args[0].toLowerCase() === "g"||args[0].toLowerCase() === "guild"||args[0].toLowerCase() === "guilds")
      {
        let guildembed = new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        .setTitle("All Guilds with premium access")
        .setDescription("`"+guilds.join("`, `")+"`")
        for(let i = 0; i<guildembed.description.length; i+= 2048){
          message.channel.send(guildembed.setDescription(("`"+guilds.join("`, `")+"`").substring(i, i + 2048)))
        }
      }
      else {
        return message.channel.send("Unknown Format Usage! either use `none` / `all` to see **Guilds** && **Users** with permissions, or too see each one: `guilds` / `users`. Usage: `?premiumlist [users/guilds]`")
      }
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR}  ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.message}\`\`\``)
        );
    }
  }
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
