const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { format, delay, swap_pages, swap_pages2, shuffle } = require(`../../handlers/functions`);
module.exports = {
    name: `savedqueue`,
    category: `⚜️ Custom Queue(s)`,
    aliases: [`savequeue`, `customqueue`, `savedqueue`],
    description: `Saves the Current Queue onto a Name`,
    usage: `savedqueue <Type> <Name> [Options]\`
**Types**: \`create\`, \`addcurrenttrack\`, \`addcurrentqueue\`, \`removetrack\`, \`removedupes\`, \`showall\`, \`showdetails\`, \`createsave\`, \`delete\`, \`play\`, \`shuffle\`
**Name**: \`Can be anything with maximum of 10 Letters\`
**Options**: \`pick the track which you want to remove`,

    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      let Type = args[0];
      let Name = args[1];
      let Options = args.slice(2).join(` `);
      if(!Type)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a TYPE`)
          .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name> [Options]\`\nAvailable Types:\n\`create\`, \`addcurrenttrack\`, \`addcurrentqueue\`, \`removetrack\`, \`removedupes\`, \`showall\`, \`createsave\`, \`delete\`, \`showdetails\`, \`play\`, \`shuffle\``)
        );
      switch (Type.toLowerCase()) {
        case `create`: {
          if(!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );
          //if the queue does not exist yet, error
          if(client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue already exists!`)
              .setDescription(`Delete it: \`${prefix}savedqueue delete ${Name}\`\nShow its content: \`${prefix}savedqueue showdetails ${Name}`)
            );
          client.queuesaves.set(message.author.id, { "TEMPLATEQUEUEINFORMATION" : [`queue`, `sadasd`]},`${Name}`)
          //return susccess message
          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Created ${Name}`)
            .setDescription(`Add the current **Queue** onto it: \`${prefix}savedqueue addcurrentqueue ${Name}\`\nAdd the current **Track** onto it: \`${prefix}savedqueue addcurrenttrack ${Name}\``)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          )
        }
        break;
        case `addcurrenttrack`: {
          if(!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );
          //if the queue does not exist yet, error
          if(!client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue does not exists yet!`)
              .setDescription(`Create it with: \`${prefix}savedqueue create ${Name}\``)
            );
          //get the player instance
          const player = client.manager.players.get(message.guild.id);
          //if no player available return error | aka not playing anything
          if (!player)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | There is nothing playing`)
            );
          //get the current track
          const track = player.queue.current;
          //if there are no other tracks, information
          if (!track)
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | There is nothing playing!`)
            );
          let oldtracks = client.queuesaves.get(message.author.id, `${Name}`);
          if(!Array.isArray(oldtracks)) oldtracks = [];
          //add the track
          oldtracks.push({"title": track.title, "url": track.uri})
          //save it in the db
          client.queuesaves.set(message.author.id, oldtracks, `${Name}`);
          //return susccess message
          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Added ${track.title} onto the Queue \`${Name}\``.substr(0, 256))
            .setDescription(`There are now: \`${client.queuesaves.get(message.author.id, `${Name}`).length} Tracks\`\n\nPlay it with: \`${prefix}savedqueue play ${Name}\``)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon))
        }
        break;
        case `addcurrentqueue`: {
          if(!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );
          //if the queue does not exist yet, error
          if(!client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue does not exists yet!`)
              .setDescription(`Create it with: \`${prefix}savedqueue create ${Name}\``)
            );
          //get the player instance
          const player = client.manager.players.get(message.guild.id);
          //if no player available return error | aka not playing anything
          if (!player)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | There is nothing playing`)
            );
          //get all tracks
          const tracks = player.queue;
          //if there are no other tracks, information
          if (!tracks.length)
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | The Queue is Empty!`)
            );
          //get the old tracks from the Name
          let oldtracks = client.queuesaves.get(message.author.id, `${Name}`);
          if(!Array.isArray(oldtracks)) oldtracks = [];
          const newtracks = [];

          for(const track of tracks)
            newtracks.push({"title": track.title, "url": track.uri});

          if(player.queue.current) newtracks.push({"title": player.queue.current.title, "url": player.queue.current.uri});
          //define the new customqueue by adding the newtracks to the old tracks
          let newqueue = oldtracks.concat(newtracks)
          //save the newcustomqueue into the db
          client.queuesaves.set(message.author.id, newqueue, `${Name}`);
          //return susccess message
          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Added ${tracks.length} Tracks onto the Queue \`${Name}\``)
            .setDescription(`There are now: \`${newqueue.length} Tracks\`\n\nPlay it with: \`${prefix}savedqueue play ${Name}\``)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          )
        }
        break;
        case `removetrack`: case `removesong`: {
          if(!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue removetrack <Name> [Options]\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );
          if(!Options)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered an Option (the Track you want to remove (ID OF IT))`)
              .setDescription(`See all your Tracks: \`${prefix}savedqueue showdetails ${Name}\`Usage: \`${prefix}savedqueue removetrack ${Name} <Song number>\``)
            );
          //if the queue already exists, then errors
          if(!client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue is not existing!`)
              .setDescription(`Create it with: \`${prefix}savedqueue create ${Name}\``)
            );
          let tracks = client.queuesaves.get(message.author.id, `${Name}`);
          if(Number(Options) >= tracks.length || Number(Options) < 0)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | Your provided Option is out of Range (\`0\` - \`${tracks.length-1}\`)`)
              .setDescription(`See all your Tracks: \`${prefix}savedqueue showdetails ${Name}\`Usage: \`${prefix}savedqueue removetrack ${Name} <Song number>\``)
            )
          let deletetrack = tracks[Number(Options)];
          //delete it
          delete tracks[Number(Options)]
          //remove empty spaces
          tracks = tracks.filter(function(entry) { return /\S/.test(entry); });
          //save it on the db again
          client.queuesaves.set(message.author.id, tracks, `${Name}`)
          //return susccess message
          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Deleted ${deletetrack.title} of the Queue \`${Name}\``.substr(0, 256))
            .setDescription(`There are now: \`${client.queuesaves.get(message.author.id, `${Name}`).length} Tracks\`\n\nPlay it with: \`${prefix}savedqueue play ${Name}\``)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          );
        }
        break;
        case `shuffle`: case `mix`: {
          if(!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );
          //if the queue already exists, then errors
          if(!client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue is not existing!`)
              .setDescription(`Create it with: \`${prefix}savedqueue create ${Name}\``)
            );
          let oldtracks = client.queuesaves.get(message.author.id, `${Name}`);
          if(!Array.isArray(oldtracks) )
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue ${Name} is Empty!`)
              .setDescription(`Add the current **Queue** onto it: \`${prefix}savedqueue addcurrentqueue ${Name}\`\nAdd the current **Track** onto it: \`${prefix}savedqueue addcurrenttrack ${Name}\``)
            );
          const newtracks = shuffle(oldtracks);
          //save it in the db
          client.queuesaves.set(message.author.id, newtracks, `${Name}`);
          //return susccess message
          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Shuffled ${newtracks.length} Tracks of the Queue \`${Name}\``.substr(0, 256))
            .setDescription(`There are now: \`${client.queuesaves.get(message.author.id, `${Name}`).length} Tracks\`\n\nPlay it with: \`${prefix}savedqueue play ${Name}\``)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon))
        }
        break;
        case `removedupes`: case `removeduplicates`: {
          if(!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );
          //if the queue already exists, then errors
          if(!client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue is not existing!`)
              .setDescription(`Create it with: \`${prefix}savedqueue create ${Name}\``)
            );
          let oldtracks = client.queuesaves.get(message.author.id, `${Name}`);
          if(!Array.isArray(oldtracks) )
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue ${Name} is Empty!`)
              .setDescription(`Add the current **Queue** onto it: \`${prefix}savedqueue addcurrentqueue ${Name}\`\nAdd the current **Track** onto it: \`${prefix}savedqueue addcurrenttrack ${Name}\``)
            );
          //make a new array of each single song which is not a dupe
          let counter = 0;
          const newtracks = [];
          for (let i = 0; i < oldtracks.length; i++) {
            let exists = false;
            for (j = 0; j < newtracks.length; j++) {
              if (oldtracks[i].url === newtracks[j].url) {
                exists = true;
                counter++;
                break;
              }
            }
            if (!exists) {
              newtracks.push(oldtracks[i]);
            }
          }
          //save it in the db
          client.queuesaves.set(message.author.id, newtracks, `${Name}`);
          //return susccess message
          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Removed ${counter} Tracks from the Queue \`${Name}\``.substr(0, 256))
            .setDescription(`There are now: \`${client.queuesaves.get(message.author.id, `${Name}`).length} Tracks\`\n\nPlay it with: \`${prefix}savedqueue play ${Name}\``)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon))
        }
        break;
        case `showall`: case `listall`: case `show`: case `queue`: case `list`: {
          let queues = client.queuesaves.get(message.author.id);
          if(Object.size(queues) <= 1)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You don't have any Queues saved yet`)
              .setDescription(`Create one with: \`${prefix}savedqueue create <SavedQueueName>\``)
            );
          let description = ``;
          for(const item in queues){
            if(item === `TEMPLATEQUEUEINFORMATION`) continue;
            description += `**❯ ${item}** | \`${queues[item].length} Tracks\`\n`}
          //return susccess message
          return swap_pages(client, message, description, `Your Saved Queues`)
        }
        break;
        case `createsave`: case `cs`: case `save`: {
          if(!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );
          if(client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue already exists!`)
              .setDescription(`Delete it: \`${prefix}savedqueue delete ${Name}\`\nShow its content: \`${prefix}savedqueue showdetails ${Name}`)
            );
          //get the player instance
          const player = client.manager.players.get(message.guild.id);
          //if no player available return error | aka not playing anything
          if (!player)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | There is nothing playing`)
            );
          //get all tracks
          const tracks = player.queue;
          //if there are no other tracks, information
          if (!tracks.length)
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | The Queue is Empty!`)
            );
          //get the old tracks from the Name
          let oldtracks = client.queuesaves.get(message.author.id, `${Name}`);
          if(!Array.isArray(oldtracks)) oldtracks = [];
          const newtracks = [];

          if(player.queue.current){ newtracks.push({"title": player.queue.current.title, "url": player.queue.current.uri});}
          for(const track of tracks)
            newtracks.push({"title": track.title, "url": track.uri});
          //define the new customqueue by adding the newtracks to the old tracks
          let newqueue = oldtracks.concat(newtracks)
          //save the newcustomqueue into the db
          client.queuesaves.set(message.author.id, newqueue, `${Name}`);
          //return susccess message
          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Created ${Name} and Added ${tracks.length} Tracks to it`)
            .setDescription(`Play it with: \`${prefix}savedqueue play ${Name}\`\nAdd the current **Queue** onto it: \`${prefix}savedqueue addcurrentqueue ${Name}\`\nAdd the current **Track** onto it: \`${prefix}savedqueue addcurrenttrack ${Name}\``)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          )
        }
        break;
        case `delete`: case `remove`: case `del`: {
          if(!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );
          //if the queue does not exist yet, error
          if(!client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue does not exists yet!`)
              .setDescription(`Create it with: \`${prefix}savedqueue create ${Name}\``)
            );
          //delete it
          client.queuesaves.delete(message.author.id, `${Name}`);
          //return susccess message
          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Deleted the Queue \`${Name}\``)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          )
        }
        break;
        case `play`: case `load`: case `p`: case `add`: case `paly`: {
          if(!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );
          //get the channel instance from the Member
          const { channel } = message.member.voice;
          //if the member is not in a channel, return
          if (!channel)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | You need to join a voice channel.`)
            );
            //get the player instance
            let player = client.manager.players.get(message.guild.id);
            let playercreate = false;
            if(!player){
                player = client.manager.create({
                  guild: message.guild.id,
                  voiceChannel: message.member.voice.channel.id,
                  textChannel: message.channel.id,
                  selfDeafen: config.settings.selfDeaf,
              });
              player.connect();
              player.set("message", message);
              player.set("playerauthor", message.author.id);
              playercreate = true;
            }
          //if not in the same channel as the player, return Error
          if (player && channel.id !== player.voiceChannel)
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | You need to be in my voice channel to use this command!`)
              .setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
            );
          //if the queue does not exist yet, error
          if(!client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue does not exists Yet!`)
              .setDescription(`Create it with: \`${prefix}savedqueue create ${Name}\``)
            );
          //now add every track of the tracks
          let tempmsg = await message.channel.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setAuthor(`Attempting to Load ${client.queuesaves.get(message.author.id, `${Name}`).length} Tracks`, "https://cdn.discordapp.com/emojis/763781458417549352.gif")
          .setDescription(`It might take around about \`${Math.ceil(client.queuesaves.get(message.author.id, `${Name}`).length / 2)} Seconds\``))
          for(const track of client.queuesaves.get(message.author.id, `${Name}`))
          {
            let res;
            try {
                // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
                if(track.url.toLowerCase().includes(`youtu`))
                res = await client.manager.search({query: track.url, source: `youtube`}, message.author);
                else if(track.url.toLowerCase().includes(`soundcloud`))
                res = await client.manager.search({query: track.url, source: `soundcloud`}, message.author);
                else {
                  res = await client.manager.search(track.url, message.author);
                }
                // Check the load type as this command is not that advanced for basics
                if (res.loadType === `LOAD_FAILED`) continue;
                else if (res.loadType === `PLAYLIST_LOADED`) continue;
            } catch (e) {
                console.log(String(e.stack).red)
                continue;
            }
            if(!res.tracks[0]) continue;

            player.queue.add(res.tracks[0]);
          }

          //return susccess message
          message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Success | Loaded ${client.queuesaves.get(message.author.id, `${Name}`).length} Tracks onto the current Queue`)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          )
          tempmsg.delete();
          if(playercreate) player.play();

        }
        break;
        case `showdetails`: case `showdetail`: case `details`:{
          if(!Name)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a Saved-Queue-Name`)
              .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
            );
          if (Name.length > 10)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(client.user.username, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Error | Your Saved-Queue-Name is too long!`)
              .setDescription(`Maximum Length is \`10\``)
            );
          //if the queue already exists, then errors
          if(!client.queuesaves.get(message.author.id, `${Name}`))
            return message.channel.send(new MessageEmbed()
              .setFooter(ee.footertext, ee.footericon)
              .setColor(ee.wrongcolor)
              .setTitle(`${emoji.msg.ERROR} Error | Your Queue is not existing!`)
              .setDescription(`Create it with: \`${prefix}savedqueue create ${Name}\``)
            );
          //get all tracks
          const tracks = client.queuesaves.get(message.author.id, `${Name}`);
          //return susccess message
          let array = [];
          tracks.map((track, index) => array.push(`**${index})** [${track.title.split(`]`).join(`}`).split(`[`).join(`{`).substr(0, 60)}](${track.url})`)).join(`\n`)
          return swap_pages(client, message, array, `Detailed Information about: \`${Name}\` [${tracks.length} Tracks]`)
        }
        break;
        default:
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | You didn't entered a **valid** TYPE`)
            .setDescription(`Usage: \`${prefix}savedqueue <Type> <Name>\`\nValid Types:\n\`create\`, \`addcurrenttrack\`, \`addcurrentqueue\`, \`removetrack\`, \`removedupes\`, \`showall\`, \`createsave\`, \`delete\`, \`showdetails\`, \`play\`, \`shuffle\``)
          );
        break;

      }

    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.message}\`\`\``)
        );
    }
  }
};
Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
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
