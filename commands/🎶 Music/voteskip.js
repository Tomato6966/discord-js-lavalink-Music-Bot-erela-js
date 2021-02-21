const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "voteskip",
    category: "🎶 Music",
    aliases: ["skip", "vs", "s"],
    description: "Skips the track, but if there is a DJ Setup u will have to vote first!",
    usage: "voteskip",
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

              if(!player.get(`vote-${message.author.id}`)) {
                player.set(`vote-${message.author.id}`, true);
                player.set("votes", String(Number(player.get("votes")) + 1));
                if(voteamount <= Number(player.get("votes"))){
                  message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`✅ Success | Added your Vote!`)
                    .setDescription(`There are now: \`${player.get("votes")}\` of \`${voteamount}\` needed Votes\n\n> Amount reached! Skipping ⏭`)
                  );
                  if (player.queue.size == 0) {
                      player.destroy();
                  }
                  else{
                    player.stop();
                  }
                }
                else{
                  return message.channel.send(new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`✅ Success | Added your Vote!`)
                    .setDescription(`There are now: \`${player.get("votes")}\` of \`${voteamount}\` needed Votes`)
                  );
                }
              }
              else {
                return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle(`❌ ERROR | You have already Voted!!`)
                  .setDescription(`There are: \`${player.get("votes")}\` of \`${voteamount}\` needed Votes`)
                );
            }

          }
          else{
            if (player.queue.size == 0) {
              message.channel.send(new MessageEmbed().setTitle("⏹ Stopped and left your channel").setDescription(`Because there is no DJ - SETUP Add a dj by typing: \`${prefix}adddj @ROLE\``).setColor(ee.color).setFooter(ee.footertext, ee.footericon));
              player.destroy();
            }
            player.stop();
            return message.channel.send(new MessageEmbed().setTitle("⏭ Skipped to the next song").setDescription(`Because there is no DJ - SETUP Add a dj by typing: \`${prefix}adddj @ROLE\``).setColor(ee.color).setFooter(ee.footertext, ee.footericon));
          }
    },
};
