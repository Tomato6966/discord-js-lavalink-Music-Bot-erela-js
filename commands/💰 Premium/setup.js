const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "setup",
    category: "💰 Premium",
    aliases: ["musicsetup"],
    cooldown: 10,
    usage: "setup",
    description: "Creates an unique Music Setup for Requesting Songs",
    run: async (client, message, args, cmduser, text, prefix) => {
        let musiccmds = [];
        const commands = (category) => {
            return client.commands.filter((cmd) => cmd.category.toLowerCase().includes("music")).map((cmd) => `\`${cmd.name}\``);
        };
        for (let i = 0; i < client.categories.length; i += 1) {
            if (client.categories[i].toLowerCase().includes("music")) {
                musiccmds = commands(client.categories[i]);
            }
        }
        console.log(commands)
        message.delete({ timeout: 350 }).catch((e) => console.log(String(e.stack).red));
        let gpremium = client.premium.get(message.guild.id);
        let ppremium = client.premium.get(message.author.id);
        let ownerstringarray = "";
        for(let i = 0; i<config.ownerIDS.length; i++){
            try{
            let user = await client.users.fetch(config.ownerIDS[i]);
            ownerstringarray += `\`${user.tag}\` /`
        }catch{}
        }
        ownerstringarray = ownerstringarray.substr(0, ownerstringarray.length-2);
        if(!gpremium.enabled && !ppremium.enabled) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle(":x: Error | No Premium Commands Available").setDescription(`Dm to get premium:\n ${ownerstringarray}`.substr(0, 2040)))

        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setTitle("You are not allowed to run this command!"));

       let oldsetup = client.setups.get(message.guild.id);
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
                    ],
                  })
                  .then(async (channel3) => {
                    let embed1 = new MessageEmbed()
                    .setColor(ee.color)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle("Lava Music | Request | Guide")
                    .setDescription(`Enter the song name or URL to play a song\n\nYou can also type \`${prefix}command <Parameters>\``)
                    .addField(`Commands`, musiccmds.join(", "))
                    .addField(`Reactions`, `⏪ Rewind 10 seconds
                    ⏯ Pause/Resume
                    ⏹ Stop`,true)
                    .addField(`\u200b`, `⏩ Forward 10 seconds
                    ⏭ Skip/Next
                    🔉 Volume -10 %`,true)
                    .addField(`\u200b`, `🔊 Volume +10 %
                    🔁 Change repeat mode
                    🔀 Shuffle the queue`,true)
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
                    .setImage("https://media.discordapp.net/attachments/754700756170440774/812443980293603329/lavamusic.gif")
                    channel3.send(new MessageEmbed().setColor(ee.color)).then(msg=>{
                        msg.edit(embed1)
                        client.setups.set(message.guild.id, msg.id,"message_cmd_info");

                        channel3.send(new MessageEmbed().setColor(ee.color)).then(msg=>{
                            msg.edit(embed2)
                            client.setups.set(message.guild.id, msg.id,"message_queue_info");

                            channel3.send(new MessageEmbed().setColor(ee.color)).then(msg => {
                                msg.react("⏪") //rewind 20 seconds
                                msg.react("⏯") //pause / resume
                                msg.react("⏹") //stop playing music
                                msg.react("⏩") //forward 20 seconds
                                msg.react("⏭") //skip track / stop playing
                                msg.react("🔉")  //reduce volume by 10%
                                msg.react("🔊")  //raise volume by 10%
                                msg.react("🔁") //change repeat mode --> track --> Queue --> none
                                msg.react("🔀") //shuffle the Queue
                                msg.edit(embed3)
                                client.setups.set(message.guild.id, msg.id,"message_track_info");
                                client.setups.set(message.guild.id, channel3.id,"textchannel");
                                client.setups.set(message.guild.id, channel2.id,"voicechannel");
                                client.setups.set(message.guild.id, channel1.id,"category");
                            });
                        })

                    })


                  })
                }catch (e){

                    console.log(String(e.stack).red)
                    message.reply("SOMETHING WENT WRONG! ")
                }
            })
          })
    },
};
