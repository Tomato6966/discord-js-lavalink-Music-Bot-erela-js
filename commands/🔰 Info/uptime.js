//Here the command starts
const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
    //definition
     name: "uptime", //the name of the command 
     category: "🔰 Info", //the category this will be listed at, for the help cmd
     aliases: [""], //every parameter can be an alias or empty for no aliases
     cooldown: 10, //this will set it to a 10 second cooldown
     usage: "uptime", //this is for the help command for EACH cmd
     description: "Returns the duration on how long the Bot is online", //the description of the command
 
     //running the command with the parameters: client, message, args, user, text, prefix
   run: async (client, message, args, user, text, prefix) => {
    // a sub function to get the time    
    function duration(ms) { 
            const sec = Math.floor(ms / 1000 % 60).toString();
            const min = Math.floor(ms / (60*1000) % 60).toString();
            const hrs = Math.floor(ms / (60*60*1000) % 60).toString();
            const days = Math.floor(ms / (24*60*60*1000) % 60).toString();
            return `\`${days} Days\`, \`${hrs} Hours\`, \`${min} Minutes\`, \`${sec} Seconds\``
        }
        const embed = new MessageEmbed()
        .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        message.reply(embed.setTitle(`:white_check_mark: **${client.user.username}** is since ${duration(client.uptime)} online`)); //sending the uptime
    }
}