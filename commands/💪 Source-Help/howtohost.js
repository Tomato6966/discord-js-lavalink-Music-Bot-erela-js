//Here the command starts
const {
	MessageEmbed
} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
	name: "howtohost", //the name of the command
	category: "💪 Source-Help", //the category this will be listed at, for the help cmd
	aliases: ["hth", "howto"], //every parameter can be an alias
	cooldown: 5, //this will set it to a 2 second cooldown
	usage: "howtohost", //this is for the help command for EACH cmd
	description: "Explaination on how to host this Bot", //the description of the command
	run: async (client, message, args, user, text, prefix) => {
		message.channel.send(new MessageEmbed()
			.setTitle(`Installation | How to use the Bot`)
			.setURL("https://www.npmjs.com/package/erela.js")
			.setColor(ee.color).setFooter(ee.footertext, ee.footericon)
			.setDescription(`

**1.** Install [node.js v12+](https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode) or higher

**2.** Download [the source code](https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js/) and unzip it    |    or git clone it

**3.** Install all of the packages with **\`npm install\`**     |  the important packages are   **\`npm install discord.js erela.js\`**

**4** Fill in the parameters, RIGHT in \`./botconfig/config.json\`!

**5.** [Download Lavalink](https://cdn.discordapp.com/attachments/798196676405755905/827174915714711572/Lavalink.jar) and download Java 15 (Java 13 recommended)

**5.1**Open a Terminal and Run the Lavalink file with: **\`java -jar Lavalink.jar\`**

**MAKE SURE THAT THERE IS THE \`application.yml\` FILE OTHERWISE IT WILL NOT WORK!

**6.**Open a new Terminal and start the bot with **\`node index.js\`**`)
		);
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
