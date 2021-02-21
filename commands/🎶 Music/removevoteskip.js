const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "removevoteskip",
    category: "🎶 Music",
    aliases: ["rvs", "rs", "removeskip", "removevs"],
    description: "Removes your Vote of the VoteSkip!",
    usage: "removevoteskip",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));
        if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
        //Check if there is a Dj Setup
        if(client.settings.get(message.guild.id, `djroles`).toString()!==""){
          let channelmembersize = channel.members.size;
          let voteamount = 0;
          if(channelmembersize <= 3) voteamount = 1;

          voteamount = Math.ceil(channelmembersize / 3);

            if(player.get(`vote-${message.author.id}`)) {
              player.set(`vote-${message.author.id}`, false)
              player.set("votes", String(Number(player.get("votes")) - 1));
                return message.channel.send(new MessageEmbed()
                  .setColor(ee.color)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle(`✅ Success | Removed your Vote!`)
                  .setDescription(`There are now: \`${player.get("votes")}\` of \`${voteamount}\` needed Votes`)
                );
            }
            else {
                return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle(`❌ ERROR | You havn't voted yet!!`)
                  .setDescription(`There are: \`${player.get("votes")}\` of \`${voteamount}\` needed Votes`)
                );
              }
          }
          else{
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`❌ ERROR | Cannot remove your Vote!`)
              .setDescription(`Because ther is no DJ-Role Setup created yet, create it by typing \`${prefix}adddj @DJ-Setup\``)
            );}
    },
};
