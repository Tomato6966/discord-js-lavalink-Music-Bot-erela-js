const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "addbotchat",
    aliases: ["addbotchannel"],
    category: "⚙️ Settings",
    description: "Let's you enable a bot only chat where the community is allowed to use commands",
    usage: "addbotchat <#chat>",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
    try{
      //get the channel from the Ping
      let channel = message.mentions.channels.first();
      //if no channel pinged return error
      if (!channel)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle("❌ Error | Please add a Channel via ping, for example: #channel!")
      );
      //try to find it, just incase user pings channel from different server
      try {
          message.guild.channels.cache.get(channel.id)
      } catch {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Error | It seems that the Channel does not exist in this Server!")
        );
      }
      //if its already in the database return error
      if(client.settings.get(message.guild.id,`botchannel`).includes(channel.id))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Error | This Channel is alerady in the List!")
        );
      //push it into the database
      client.settings.push(message.guild.id, channel.id, `botchannel`);
      //these lines create the string of the Bot Channels
      let leftb = "";
      if(client.settings.get(message.guild.id, `botchannel`).join("") ==="") leftb = "no Channels, aka all Channels are Bot Channels"
      else
      for(let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++){
        leftb += "<#" +client.settings.get(message.guild.id, `botchannel`)[i] + "> | "
      }
      //send informational message
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`✅ Success | Added the Bot-Chat \`${channel.name}\``)
        .setDescription(`All Bot Chats:\n> ${leftb.substr(0, leftb.length - 3)}`)
      );
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
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
