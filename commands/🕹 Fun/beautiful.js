const Canvas = require('canvas');
const { MessageEmbed } = require('discord.js');
const Discord = require(`discord.js`);

const canvacord = require("canvacord");

const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
  name: "beautiful",
	aliases: ["beautiful"],
    category: "🕹 Fun",
    description: "IMAGE CMD",
    usage: "beautiful",
    run: async (client, message, args) => {
        let tempmsg = await message.channel.send(new MessageEmbed().setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon) .setAuthor("Loading...", "https://cdn.discordapp.com/emojis/769935094285860894.gif"))
        let user = message.mentions.users.first() || message.author;
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.beautiful(avatar);
        let attachment = await new Discord.MessageAttachment(image, "beautiful.png");
        let fastembed2 = new Discord.MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon) 
        .setImage("attachment://beautiful.png")
        .attachFiles(attachment)
        await message.channel.send(fastembed2).catch(e=>console.log(String(e.stack).red));
        await tempmsg.delete();//affect
    }
}