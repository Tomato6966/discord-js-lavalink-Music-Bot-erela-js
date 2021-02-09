const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
    name: "bassboost",
    category: "👀 Filter",
    aliases: ["bb"],
    description: "Changes the Bass gain",
    usage: "bassboost <none/low/medium/high>",
    run: async(client, message, args) => {
      const { channel } = message.member.voice;
      const player = client.manager.players.get(message.guild.id);
      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));  
      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      
      let level = "none";
       
      if (!args.length || (!client.bassboost[args[0].toLowerCase()] && args[0].toLowerCase() != "none") ) return message.reply("Bass boost level must be one of the following: `none`, `low`, `medium`, `high`, `earrape`");
      level = args[0].toLowerCase();
      switch(level){
        case "none":
            player.setEQ(client.bassboost.none)
          break;
          case "low":
            player.setEQ(client.bassboost.low)
          break;
          case "medium":
            player.setEQ(client.bassboost.medium)
          break;
          case "high":
            player.setEQ(client.bassboost.high)
          case "earrape":
            player.setEQ(client.bassboost.high)
          break;
      }
      const embed = new MessageEmbed()
      .setTitle(`:white_check_mark: Set the bass boost to \`${level}\`.`)
      .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      return message.reply(embed);
    }
};