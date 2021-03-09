//Here the command starts
const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
		name: "hosting", //the name of the command
		category: "💪 Source-Help", //the category this will be listed at, for the help cmd
		aliases: ["host", "hosts"], //every parameter can be an alias
		cooldown: 5, //this will set it to a 2 second cooldown
		usage: "hosting", //this is for the help command for EACH cmd
		description: "Shows recommendations for hosting", //the description of the command
		run: async (client, message, args, user, text, prefix) => {
		try{
      message.channel.send(new MessageEmbed()
      .setTitle(`Where should you host your Bot?`)
      .setURL("https://www.npmjs.com/package/erela.js")
      .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      .setDescription(`*Suggestions of good hosting companies:*

			**Our Sponsor & Recommended & Cheap:**
			> Main: [BITTMAX.de](https://bittmax.de)
			>   Code: \`x10\` to get 5% of **forever**
			**Our 2nd Sponsor & Recommended (especially for game hosting):**
			> Main: [Mc-host24.de](https://mc-host24.de/user/affiliate/3121)

			**Other Hosting:**
			> https://www.openshift.com/
			> https://www.ovh.com/us/vps/
			> https://m.do.co/
			> https://www.linode.com/
			> https://www.vultr.com/
			> https://amazonlightsail.com/
			> https://www.time4vps.eu/
			> http://virmach.com/

			**Why no free hosting?**
			> Because that makes your Bot slow, and unrelieable and most of the time it doesnt work right...`)
			);
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
