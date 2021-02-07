const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const {format} = require("duratiform")
const levels = {
  minimum: 0.1,
  low: 0.25,
  medium: 0.5,
  high: 0.75,
  earrape: 1,
};
module.exports = {
    name: "bassboost",
    category: "👀 Filter",
    aliases: ["bb"],
    description: "Changes the Bass gain",
    usage: "bassboost <minimum/low/medium/high/earrape>",
    run: async(client, message, args) => {
      const { channel } = message.member.voice;
      const player = client.manager.players.get(message.guild.id);
      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));  
      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      
      let level = "none";
       
      if (!args.length || (!levels[args[0].toLowerCase()] && args[0].toLowerCase() != "none") ) return message.reply("Bass boost level must be one of the following: `minimum`, `low`, `medium`, `high`, `earrape`");
      level = args[0].toLowerCase();
      player.setEQ(Array(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] }))));

      const embed = new MessageEmbed()
      .setTitle(`:white_check_mark: Set the bass boost to \`${level}\`.`)
      .setColor(ee.color)
      return message.reply(embed);
    }
};