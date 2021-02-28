const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "setup",
    category: "⚙️ Settings",
    aliases: ["musicsetup"],
    cooldown: 10,
    usage: "setup",
    description: "Creates an unique Music Setup for Requesting Songs!",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, cmduser, text, prefix) => {
      try{
        let musiccmds = [];
        const commands = (category) => {
            return client.commands.filter((cmd) => cmd.category.toLowerCase().includes("music")).map((cmd) => `\`${cmd.name}\``);
        };
        for (let i = 0; i < client.categories.length; i += 1) {
            if (client.categories[i].toLowerCase().includes("music")) {
                musiccmds = commands(client.categories[i]);
            }
        }
         //get the old setup
         let oldsetup = client.setups.get(message.guild.id);
         //try to delete every single entry if there is a setup
         if(oldsetup.textchannel != "0") {
             try{
              message.guild.channels.cache.get(oldsetup.textchannel).delete()
             }catch{}
             try{
              message.guild.channels.cache.get(oldsetup.voicechannel).delete()
             }catch{}
             try{
              message.guild.channels.cache.get(oldsetup.category).delete()
             }catch{}
         }
         //create a new Cateogry
        message.guild.channels.create("Lava Music - Requests", {
            type: 'category',
            permissionOverwrites: [
              {
                id: message.guild.id,
                allow: ['VIEW_CHANNEL'],
              },
            ],
          })
          .then((channel1) => {
             message.guild.channels.create(`🎧｜Music`, {
              type: 'voice',
              parent: channel1.id, //ADMINISTRATOR
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  allow: ['VIEW_CHANNEL', "CONNECT"],
                },
              ],
            })
            .then((channel2) => {
                try{
                message.guild.channels.create(`🎵｜requests`, {
                    type: 'text',
                    parent: channel1.id, //ADMINISTRATOR
                    permissionOverwrites: [
                      {
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL', "SEND_MESSAGES", "ADD_REACTIONS"],
                      },
                      { //giving the Bot himself permissions
                        id: client.user.id,
                        allow: ["MANAGE_MESSAGES", "MANAGE_CHANNELS", "ADD_REACTIONS", "SEND_MESSAGES", "MANAGE_ROLES"]
                      }
                    ],
                  })
                  .then(async (channel3) => {
                    let embed1 = new MessageEmbed()
                      .setColor(ee.color)
                      .setFooter(ee.footertext, ee.footericon)
                      .setTitle("Lava Music | Request | Guide")
                      .setDescription(`Enter the song name or URL to play a song\n\nYou can also type \`${prefix}command <Parameters>\``)
                      .addField(`Commands`, musiccmds.join(", "))
                      .addField(`Reactions`, `⏪ Rewind 20 seconds\n⏩ Forward 20 seconds\n⏯ Pause/Resume\n⏹ Stop Track\n⏮ Play previous\n`,true)
                      .addField(`\u200b`, `⏭ Skip / Next\n🔃 Replay Track\n🔉 Volume -10 %\n🔊 Volume +10 %\n🔇 Toggle Volume Mute`,true)
                      .addField(`\u200b`, `🔁 Change repeat mode\n♾ Toggle Autoplay\n🔀 Shuffle the queue\n📑 Show the Queue\n🩸 Shows Current Track`,true)
                    let embed2 = new MessageEmbed()
                      .setColor(ee.color)
                      .setFooter(ee.footertext, ee.footericon)
                      .setTitle("Lava Music | Music Queue")
                      .setDescription(`Empty\nJoin a voice channel and queue songs by name or url in here.`)
                    let embed3 = new MessageEmbed()
                      .setColor(ee.color)
                      .setFooter(ee.footertext, ee.footericon)
                      .setTitle("Lava Music | Currently no song is playing!")
                      .setDescription(`Join a voice channel and enter a song name or url to play.\n[Invite Lava Music](https://lava.milrato.eu) • [Support Server](https://discord.com/invite/wvCp7q88G3)`)
                      .setImage("https://cdn.discordapp.com/attachments/754700756170440774/812443980293603329/lavamusic.gif")
                      //send a temp message
                    channel3.send(new MessageEmbed().setColor(ee.color)).then(msg => {
                        //react with embed 1
                        msg.edit(embed1)
                        //save it in the database
                        client.setups.set(message.guild.id, msg.id,"message_cmd_info");
                        //send another message
                        channel3.send(new MessageEmbed().setColor(ee.color)).then(msg=>{
                            //edit the message again
                            msg.edit(embed2)
                            //save it in the database
                            client.setups.set(message.guild.id, msg.id,"message_queue_info");
                            //send an message again
                            channel3.send(new MessageEmbed().setColor(ee.color)).then(msg => {
                                //edit the message
                                msg.edit(embed3)
                                //react with all reactions
                                msg.react("⏪") //rewind 20 seconds
                                msg.react("⏩") //forward 20 seconds
                                msg.react("⏯") //pause / resume

                                msg.react("⏹") //stop playing music
                                msg.react("⏮") //skip back  track / (play previous)
                                msg.react("⏭") //skip track / stop playing

                                msg.react("🔃") //replay track
                                msg.react("🔉")  //reduce volume by 10%
                                msg.react("🔊")  //raise volume by 10%

                                msg.react("🔇")  //toggle mute
                                msg.react("🔁") //change repeat mode --> track --> Queue --> none
                                msg.react("♾")  //toggle autoplay mode

                                msg.react("🔀") //shuffle the Queue
                                msg.react("📑") //shows the Queue
                                msg.react("🩸") //shows the current Track
                                //create the collector
                                //save all other datas in the database
                                client.setups.set(message.guild.id, msg.id,"message_track_info");
                                client.setups.set(message.guild.id, channel3.id,"textchannel");
                                client.setups.set(message.guild.id, channel2.id,"voicechannel");
                                client.setups.set(message.guild.id, channel1.id,"category");
                            });
                        })
                    })
                  })
                  //catch all errors
                }catch (e){
                    //log them
                    console.log(String(e.stack).red)
                    //send information
                    return message.channel.send(new MessageEmbed()
                      .setColor(ee.wrongcolor)
                      .setFooter(ee.footertext, ee.footericon)
                      .setTitle("❌ Error | Something went Wrong")
                      .setDescription(String("```"+e.stack+"```").substr(0, 2048))
                    );
                                  }
            })
          })
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
    						.setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.stack}\`\`\``)
            );
        }
    },
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
