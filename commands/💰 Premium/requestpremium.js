
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const { databasing } = require("../../handlers/functions");
module.exports = {
  name: "requestpremium",
	aliases: ["rp"],
    category: "💰 Premium",
    description: "Request Premium for a Guild/User",
    usage: "premiumlist [users/guilds]",
    run: async (client, message, args, cmduser, text, prefix) => {
    message.channel.send("Do u want to request Premium for a Guild or for yourself?\n\nreact with :one: for **guild**\nreact with :two: for **yourself**").then(msg=>
      {
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
                    if(!guild) return message.reply("sorry i cant find that guild please make sure i am in there! or DM: `Tomato#6966`");
                    databasing(client, id)
                    if(client.premium.get(id, "enabled")) return message.reply("This Server is alreayd a Premium Member!")
                    let tomato = await client.users.fetch("442355791412854784");
                    tomato.send(`**${message.author.tag}**, request GUILD PREMIUM for: ${guild.name}: \`${id}\`\n\n> \`\`\`?tp guild ${id}\`\`\``)
                    message.reply("✅ Successfully applied as a Premium GUILD for: `" + guild.name + "`\nPlease wait..")
                  }catch (e){
                    console.log(String(e.stack).red)
                    return message.reply("sorry i cant find that guild please make sure i am in there! or DM: `Tomato#6966`");
                  }
                }).catch(e=>{
                  console.log(String(e.stack).red)
                  return message.reply("Your time ran out, CANCELLED!")
                  })
              }).catch(e=>{
                console.log(String(e.stack).red)
                return message.reply("Your time ran out, CANCELLED!")
                })
              
            }
            if(collected.first().emoji.name === "2️⃣"){
                  try{
                    let id = message.author.id;
                    let user = await client.users.fetch(id);
                    if(!user) return message.reply("sorry i cant find you make sure I am in a guild with you! or DM: `Tomato#6966`");
                    databasing(client, "", id)
                    if(client.premium.get(id, "enabled")) return message.reply("You are already a Premium Member!")
                    let tomato = await client.users.fetch("442355791412854784");
                    tomato.send(`**${message.author.tag}**, request USER PREMIUM: \`${id}\`\n\n> \`\`\`?tp user ${id}\`\`\``)
                    message.reply("✅ Successfully applied as a Premium USER!\nPlease wait..")
                  }catch (e){
                    console.log(String(e.stack).red)
                    return message.reply("sorry i cant find you make sure I am in a guild with you! or DM: `Tomato#6966`");
                  }
            }
          }).catch(e=>{
            console.log(String(e.stack).red)
            return message.reply("Your time ran out, CANCELLED!")
            })
        })
    }

};
