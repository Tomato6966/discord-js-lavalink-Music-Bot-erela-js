const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
const {findEmoji} = require("../../handlers/functions")
const Discord = require("discord.js");
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
            try{
            //set the maximumbitrate limit
            let maxbitrate = 96000;
            //get the boosts amount
            let boosts = message.guild.premiumSubscriptionCount;
            //change the bitrate limit regarding too boost level from https://support.discord.com/hc/de/articles/360028038352-Server-Boosting-
            if(boosts >= 2) maxbitrate = 128000;
            if(boosts >= 15) maxbitrate = 256000;
            if(boosts >= 30) maxbitrate = 384000;

             message.guild.channels.create(`🎧｜Music`, {
              type: 'voice', //voice Channel
              bitrate: maxbitrate, //set the bitrate to the maximum possible
              userLimit: 10, //set the limit for voice users
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
                    type: 'text', // text channel
                    rateLimitPerUser: 6, //set chat delay
                    topic: `To request a Track, simply Type the **SONG NAME** into the Channel or the **URL** and the Bot will play it! Make sure that you are in the **right** Voice Channel (🎧｜Music)!\n\nhttps://lava.milrato.eu by: Tomato#6966`,
                    parent: channel1.id,
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
                      .addField(`Reactions`, `${emoji.msg.rewind} Rewind 20 seconds\n${emoji.msg.forward} Forward 20 seconds\n${emoji.msg.pause_resume} Pause/Resume\n${emoji.msg.stop} Stop Track\n${emoji.msg.previous_track} Play previous\n`,true)
                      .addField(`\u200b`, `${emoji.msg.skip_track} Skip / Next\n${emoji.msg.replay_track} Replay Track\n${emoji.msg.reduce_volume} Volume -10 %\n${emoji.msg.raise_volume} Volume +10 %\n${emoji.msg.toggle_mute} Toggle Volume Mute`,true)
                      .addField(`\u200b`, `${emoji.msg.repeat_mode} Change repeat mode\n${emoji.msg.autoplay_mode} Toggle Autoplay\n${emoji.msg.shuffle} Shuffle the queue\n${emoji.msg.show_queue} Show the Queue\n${emoji.msg.show_current_track} Shows Current Track`,true)
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
                              try{
                                const emojisarray = [
                                  String(emoji.react.rewind),
                                  String(emoji.react.forward),
                                  String(emoji.react.pause_resume),
                                  String(emoji.react.stop),
                                  String(emoji.react.previous_track),
                                  String(emoji.react.skip_track),
                                  String(emoji.react.replay_track),
                                  String(emoji.react.reduce_volume),
                                  String(emoji.react.raise_volume),
                                  String(emoji.react.toggle_mute),
                                  String(emoji.react.repeat_mode),
                                  String(emoji.react.autoplay_mode),
                                  String(emoji.react.shuffle),
                                  String(emoji.react.show_queue),
                                  String(emoji.react.show_current_track),
                                ]
                                for(const theemoji of emojisarray)
                                client.shard.broadcastEval(`(${findEmoji}).call(this, '${theemoji}')`)
                          			.then(emojiArray => {
                          				const foundEmoji = emojiArray.find(emoji => emoji);
                          				if (!foundEmoji) return console.log('I could not find such an emoji.');

                          				return client.api.guilds(foundEmoji.guild).get()
                          					.then(raw => {
                          						const guild = new Discord.Guild(client, raw);
                          						const theemoji = new Discord.GuildEmoji(client, foundEmoji, guild);
                                      msg.react(theemoji).catch(e => failed = true);
                         					});
                          			});

                            	}catch (e){
                                console.log(e.stack)
                               	msg.channel.send(new MessageEmbed()
                                 .setColor(ee.wrongcolor)
                                 .setTitle(` ERROR | An Error Occurred`)
                                 .setDescription(`\`\`\`${e.message}\`\`\`\n Make sure that i have permissions to add (custom) REACTIONS`)
                                 )
                               }
                              //create the collector
                              //save all other datas in the database
                              client.setups.set(message.guild.id, msg.id,"message_track_info");
                              client.setups.set(message.guild.id, channel3.id,"textchannel");
                              client.setups.set(message.guild.id, channel2.id,"voicechannel");
                              client.setups.set(message.guild.id, channel1.id,"category");
                              client.stats.inc("global", "setups");
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
                      .setTitle(`${emoji.msg.ERROR} Error | Something went Wrong`)
                      .setDescription(String("```" + e.stack + "```").substr(0, 2048))
                    );
                }
            })
          }catch (e){
              //log them
              console.log(String(e.stack).red)
              //send information
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} Error | Something went Wrong`)
                .setDescription(String("```"+e.stack+"```").substr(0, 2048))
              );
          }
          })
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
    						.setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} Error | Something went Wrong`)
                .setDescription(`\`\`\`${e.message}\`\`\``)
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
