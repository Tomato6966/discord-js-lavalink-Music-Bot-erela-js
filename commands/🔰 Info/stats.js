const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "stats",
    category: "🔰 Info",
    aliases: ["musicstats"],
    cooldown: 10,
    usage: "stats",
    description: "Shows music Stats, like amount of Commands and played Songs etc.",
    run: async (client, message, args, user, text, prefix) => {
        let global = client.stats.get("global");
        let guild = client.stats.get(message.guild.id);
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
        }catch (e){
          console.log(String(e.stack).red)
        }
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
        }catch (e){
          console.log(String(e.stack).red)
        }
      } 
        const embed = new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        .addField("⚙️ GLOBAL Commands used:", `>>> \`${global.commands} Commands\` used\nin **all** Servers`,true)
        .addField("🎵 GLOBAL Songs played:", `>>> \`${global.songs} Songs\` played in\n**all** Servers`,true)
        .addField("📰 GLOBAL Setups created:", `>>> \`${global.setups} Setups\` created in\n**all** Servers`,true)
        .addField("\u200b", "\u200b")
        .addField("⚙️ SERVER Commands used:", `>>> \`${guild.commands} Commands\` used in\n**this** Server`,true)
        .addField("🎵 SERVER Songs played:", `>>> \`${guild.songs} Songs\` played in\n**this** Server`,true)
        .addField("📰 GLOBAL Premium list:", `>>> \`${guilds.length} Guilds\`\n\`${users.length} Users\`\n having Premium`,true)
        .setImage("https://cdn.discordapp.com/attachments/754700756170440774/812443980293603329/lavamusic.gif")
        message.channel.send(embed.setTitle(`💿 The Stats of ${client.user.username}`));
    },
};
