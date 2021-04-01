const { MessageEmbed } = require(`discord.js`);
const playermanager = require(`../../handlers/playermanager`);
module.exports = {
    name: `join`,
    category: `🎶 Music`,
    aliases: [`summon`],
    description: `Summons the bot to the voice channel you are in`,
    usage: `summon`,
    parameters: {"type":"music", "activeplayer": false, "previoussong": false},
    run: async (client, message, args, cmduser, text, prefix, player) => {
      const botchannel = message.guild.me.voice.channel;
      //get the player
      var player = client.manager.players.get(message.guild.id);
      //if already connected somewhere
      if(player || botchannel) return message.channel.send(`**:x: I am already connected somewhere**`);
      player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: false,
      });
      if (player.state !== "CONNECTED") { 
        player.connect();
        player.stop();
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
