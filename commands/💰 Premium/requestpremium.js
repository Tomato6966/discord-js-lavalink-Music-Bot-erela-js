
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
const { databasing } = require("../../handlers/functions");
module.exports = {
  name: "requestpremium",
	aliases: ["rp"],
    category: "💰 Premium",
    description: "Request Premium for a Guild/User",
    usage: "premiumlist [users/guilds]",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      message.channel.send("Do u want to request Premium for a Guild or for yourself?\n\nreact with :one: for **guild**\nreact with :two: for **yourself**").then(msg=>{
        msg.react("1️⃣");
        msg.react("2️⃣");
        const filter = (reaction, user) => {
          return (reaction.emoji.name === '1️⃣'||reaction.emoji.name === '2️⃣') && user.id === message.author.id;
        };
        msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
          .then(async collected => {
            if(collected.first().emoji.name === "1️⃣"){
              msg.channel.send("Enter the GuildID now!").then(msg=>{
                msg.channel.awaitMessages(m=>m.author.id === message.author.id, { max: 1, time: 60000, errors: ['time'] })
                .then(async collected => {
                  try{
                    let id = collected.first().content;
                    let guild = client.guilds.cache.get(id);
                    if(!guild) return message.channel.send("sorry i cant find that guild please make sure i am in there! or DM: `Tomato#6966`");
                    databasing(client, id)
                    if(client.premium.get(id, "enabled")) return message.channel.send("This Server is alreayd a Premium Member!")
                     for(let i = 0; i < config.ownerIDS.length; i++){
                      try{
                        let owner = await client.users.fetch(config.ownerIDS[i]);
                        owner.send(`**${message.author.tag}**, request GUILD PREMIUM for: ${guild.name}: \`${id}\`\n\n> \`\`\`?tp guild ${id}\`\`\``)
                      }catch(e){
                        console.log(String(e.stack).red)
                      }
                    }
                    message.channel.send(`${emoji.msg.SUCCESS} Successfully applied as a Premium GUILD for: \`` + guild.name + "`\nPlease wait..")
                  }catch (e){
                    console.log(String(e.stack).red)
                    return message.channel.send("sorry i cant find that guild please make sure i am in there! or DM: `Tomato#6966`");
                  }
                }).catch(e=>{
                  console.log(String(e.stack).red)
                  return message.channel.send("Your time ran out, CANCELLED!")
                  })
              }).catch(e=>{
                console.log(String(e.stack).red)
                return message.channel.send("Your time ran out, CANCELLED!")
                })

            }
            if(collected.first().emoji.name === "2️⃣"){
                  try{
                    let id = message.author.id;
                    let user = await client.users.fetch(id);
                    if(!user) return message.channel.send("sorry i cant find you make sure I am in a guild with you! or DM: `Tomato#6966`");
                    databasing(client, "", id)
                    if(client.premium.get(id, "enabled")) return message.channel.send("You are already a Premium Member!")
                    for(let i = 0; i<config.ownerIDS.length;i++){
                      try{
                        let owner = await client.users.fetch(config.ownerIDS[i]);
                        owner.send(`**${message.author.tag}**, request USER PREMIUM: \`${id}\`\n\n> \`\`\`?tp user ${id}\`\`\``)
                      }catch(e){
                        console.log(String(e.stack).red)
                      }
                    }
                    message.channel.send(`${emoji.msg.SUCCESS} Successfully applied as a Premium USER!\nPlease wait..`)
                  }catch (e){
                    console.log(String(e.stack).red)
                    return message.channel.send("sorry i cant find you make sure I am in a guild with you! or DM: `Tomato#6966`");
                  }
            }
          }).catch(e=>{
            console.log(String(e.stack).red)
            return message.channel.send("Your time ran out, CANCELLED!")
            })
        })
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
