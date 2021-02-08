//Here the command starts
const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
   //definition
	name: "invite", //the name of the command 
	category: "🔰 Info", //the category this will be listed at, for the help cmd
	aliases: ["add"], //every parameter can be an alias
	cooldown: 2, //this will set it to a 2 second cooldown
	usage: "invite", //this is for the help command for EACH cmd
  	description: "Gives you an Invite link for this Bot", //the description of the command

	//running the command with the parameters: client, message, args, user, text, prefix
  run: async (client, message, args, user, text, prefix) => {
        //creating a temporary message
        const embed = new MessageEmbed()
        .setColor(ee.color)
        .setTitle(":heart: Thanks for inviting me!").setFooter(ee.footertext, ee.footericon)
        .setURL("https://discord.com/api/oauth2/authorize?client_id=742672021422342165&permissions=8&scope=bot")
        .setDescription("[Click here](https://discord.com/api/oauth2/authorize?client_id=742672021422342165&permissions=8&scope=bot)")
        message.channel.send(embed)
      }
}
