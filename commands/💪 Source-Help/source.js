//Here the command starts
const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
   //definition
	name: "source", //the name of the command 
	category: "💪 Source-Help", //the category this will be listed at, for the help cmd
	aliases: ["sourcecode"], //every parameter can be an alias
	cooldown: 2, //this will set it to a 2 second cooldown
	usage: "sourcecode", //this is for the help command for EACH cmd
  	description: "Shows you the Github and Source Code Information about this Bot", //the description of the command

	//running the command with the parameters: client, message, args, user, text, prefix
  run: async (client, message, args, user, text, prefix) => {
        //creating a temporary message
        const embed = new MessageEmbed()
        .setTitle(`This Bot is made by \`Tomato#6966\` and **this** is the Source Code link to this Bot`)
        .setURL("https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js/commit/768f6fbe3314340043cbc341fcc70700b8dc1bdb")
        .addField("Discord.js: ", "[\`v12.5.1\`](https://discord.js.org)", true)
        .addField("Erela.js: ", "[\`v2.3.2\`](https://solaris.codes/projects/erelajs/)", true)
        .addField("Node.js: ", "[\`v15.3.4\`](https://nodejs.org/en/)", true)
        .addField("Lavalink: ", "[\`v3.3.2.3\`](https://github.com/Frederikam/Lavalink/releases/tag/3.3.2.3)" )
        .addField("Source Code. ", "Don't just use the source for yourself,... please [invite](https://discord.com/api/oauth2/authorize?client_id=742672021422342165&permissions=8&scope=bot) me too![\`Click here\`](https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js/commit/768f6fbe3314340043cbc341fcc70700b8dc1bdb)")
        .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        message.channel.send(embed); 
    }
}
