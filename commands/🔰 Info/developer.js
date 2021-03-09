const {MessageEmbed} =require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
		name: "developer",
		category: "🔰 Info",
	  aliases: ["dev", "tomato"],
	  description: "Shows Information about the Developer",
	  useage: "developer",
	  run: async (client, message, args) => {
		try{
			message.channel.send(new MessageEmbed()
			.setColor(ee.color)
			.setFooter(ee.footertext + " | Sponsor: Bittmax.de | Code  'x10'  == -5%", ee.footericon)
		  .setTimestamp()
		  .setThumbnail("https://cdn.discordapp.com/avatars/442355791412854784/17ccf170d62e5e0040660d003b075528.webp")
		  .setTitle("Tomato#6966 | Dev of 3 Orgs | Developer of 200+ BOTS")
		  .setURL("https://musicium.eu")
		  .setDescription(`
			> Hello I am **Tomato** <@442355791412854784> *(\`Tomato#6966\`)*, and i made more then 200 different Discord Bots: [My Bot List](https://bots.musicium.eu)

			> I am very proud for all of my verified and not verified Discord Bots, but the Bot I am the most proud of is: [**Musicium** | \`Ultimate Music experience\`](https://musicium.eu) <@769642999227351070>

			> I made this Bot, and you can get a free Bot too! Just go to: [My Service](https://milrato)

			> I am also a **Website** Developer and **Plugin** dev. I made **Modules** like a **SPEECH Module** [SEE IT](https://cdn.discordapp.com/attachments/778714123785076768/801606374105546782/2021-01-21_01-15-50.mp4)

			> Yeah i hope you like my stuff :v: <3`)
		).catch(error => console.log(error));
		} catch (e) {
				console.log(String(e.stack).bgRed)
				return message.channel.send(new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
						.setDescription(`\`\`\`${e.message}\`\`\``)
				);
		}
	}
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
