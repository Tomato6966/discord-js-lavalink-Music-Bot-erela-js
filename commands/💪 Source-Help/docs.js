//Here the command starts
const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
   //definition
	name: "docs", //the name of the command 
	category: "💪 Source-Help", //the category this will be listed at, for the help cmd
	aliases: ["docs"], //every parameter can be an alias
	cooldown: 5, //this will set it to a 2 second cooldown
	usage: "docs", //this is for the help command for EACH cmd
  	description: "Shows information about docs", //the description of the command

	//running the command with the parameters: client, message, args, user, text, prefix
  run: async (client, message, args, user, text, prefix) => {
        //creating a temporary message
        const embed = new MessageEmbed()
        .setTitle(`This Bot is made by \`Tomato#6966\` and **this** is the Source Code link to this Bot`)
        .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        .setDescription(`WOAH THERE ARE DOCS!?!!?
        [\`CLICK HERE\`](https://discord.js.org/#/docs/main/stable/general/welcome)
        Yes, discord.js has docs that can be used when creating a bot with it.
        If you need some pointers for using the docs watch a video by one of our Lower Management Members
        
        https://www.youtube.com/watch?v=CvcDpm4PsnI`)
        message.channel.send(embed); 
    }
}
