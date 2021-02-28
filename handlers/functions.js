const Discord = require("discord.js");
const {
  MessageEmbed
} = require("discord.js");
const config = require("../botconfig/config.json");
const ee = require("../botconfig/embed.json");
const radios = require("../botconfig/radiostations.json");
const ms = require("ms")
module.exports = {
  getMember: function(message, toFind = "") {
    try{
      toFind = toFind.toLowerCase();
      let target = message.guild.members.get(toFind);
      if (!target && message.mentions.members) target = message.mentions.members.first();
      if (!target && toFind) {
        target = message.guild.members.find((member) => {
          return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
        });
      }
      if (!target) target = message.member;
      return target;
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  formatDate: function(date) {
    try{
      return new Intl.DateTimeFormat("en-US").format(date);
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  duration: function(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString();
      const min = Math.floor((ms / (60 * 1000)) % 60).toString();
      const hrs = Math.floor((ms / (60 * 60 * 1000)) % 60).toString();
      const days = Math.floor((ms / (24 * 60 * 60 * 1000)) % 60).toString();
      return `\`${days}Days\`,\`${hrs}Hours\`,\`${min}Minutes\`,\`${sec}Seconds\``;
  },
  promptMessage: async function(message, author, time, validReactions) {
    try{
      time *= 1000;
      for (const reaction of validReactions) await message.react(reaction);
      const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
      return message.awaitReactions(filter, {
        max: 1,
        time: time
      }).then((collected) => collected.first() && collected.first().emoji.name);
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  delay: function(delayInms) {
    try{
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  //randomnumber between 0 and x
  getRandomInt: function(max) {
    try{
      return Math.floor(Math.random() * Math.floor(max));
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  //random number between y and x
  getRandomNum: function(min, max) {
    try{
      return Math.floor(Math.random() * Math.floor((max - min) + min));
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  createBar: function(player) {
    try{
      //player.queue.current.duration == 0 ? player.position : player.queue.current.duration, player.position, 25, "▬", config.settings.progressbar_emoji)
      if (!player.queue.current) return `**[${config.settings.progressbar_emoji}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
      let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
      let total = player.queue.current.duration;
      let size = 25;
      let line = "▬";
      let slider = config.settings.progressbar_emoji;
      let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
      if (!String(bar).includes(config.settings.progressbar_emoji)) return `**[${config.settings.progressbar_emoji}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
      return `**[${bar[0]}]**\n**${new Date(player.position).toISOString().substr(11, 8)+" / "+(player.queue.current.duration==0?" ◉ LIVE":new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  format: function(millis) {
    try{
      var h = Math.floor(millis / 3600000),
        m = Math.floor(millis / 60000),
        s = ((millis % 60000) / 1000).toFixed(0);
      if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
      else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  stations: function(client, prefix, message) {
    try{
      let amount = 0;
      const stationsembed = new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `?radio 11`");
      const stationsembed2 = new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `?radio 69`");
      const stationsembed3 = new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `?radio 180`");
      let United_Kingdom = "";
      for (let i = 0; i < radios.EU.United_Kingdom.length; i++) {
        United_Kingdom += `**${i + 1 + 10 * amount}**[${radios.EU.United_Kingdom[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.United_Kingdom[i].split(" ")[1]})\n`;
      }
      stationsembed.addField("🇬🇧 United Kingdom", `>>> ${United_Kingdom}`, true);
      amount++;
      let austria = "";
      for (let i = 0; i < radios.EU.Austria.length; i++) {
        austria += `**${i + 1 + 10 * amount}**[${radios.EU.Austria[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Austria[i].split(" ")[1]})\n`;
      }
      stationsembed.addField("🇦🇹 Austria", `>>> ${austria}`, true);
      amount++;
      let Belgium = "";
      for (let i = 0; i < radios.EU.Belgium.length; i++) {
        Belgium += `**${i + 1 + 10 * amount}**[${radios.EU.Belgium[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Belgium[i].split(" ")[1]})\n`;
      }
      stationsembed.addField("🇧🇪 Belgium", `>>> ${Belgium}`, true);
      amount++;
      let Bosnia = "";
      for (let i = 0; i < radios.EU.Bosnia.length; i++) {
        Bosnia += `**${i + 1 + 10 * amount}**[${radios.EU.Bosnia[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Bosnia[i].split(" ")[1]})\n`;
      }
      stationsembed.addField("🇧🇦 Bosnia", `>>> ${Bosnia}`, true);
      amount++;
      let Czech = "";
      for (let i = 0; i < radios.EU.Czech.length; i++) {
        Czech += `**${i + 1 + 10 * amount}**[${radios.EU.Czech[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Czech[i].split(" ")[1]})\n`;
      }
      stationsembed.addField("🇨🇿 Czech", `>>> ${Czech}`, true);
      amount++;
      let Denmark = "";
      for (let i = 0; i < radios.EU.Denmark.length; i++) {
        Denmark += `**${i + 1 + 10 * amount}**[${radios.EU.Denmark[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Denmark[i].split(" ")[1]})\n`;
      }
      stationsembed.addField("🇩🇰 Denmark", `>>> ${Denmark}`, true);
      amount++;
      let germany = "";
      for (let i = 0; i < radios.EU.Germany.length; i++) {
        germany += `**${i + 1 + 10 * amount}**[${radios.EU.Germany[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Germany[i].split(" ")[1]})\n`;
      }
      stationsembed2.addField("🇩🇪 Germany", `>>> ${germany}`, true);
      amount++;
      let Hungary = "";
      for (let i = 0; i < radios.EU.Hungary.length; i++) {
        Hungary += `**${i + 1 + 10 * amount}**[${radios.EU.Hungary[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Hungary[i].split(" ")[1]})\n`;
      }
      stationsembed2.addField("🇭🇺 Hungary", `>>> ${Hungary}`, true);
      amount++;
      let Ireland = "";
      for (let i = 0; i < radios.EU.Ireland.length; i++) {
        Ireland += `**${i + 1 + 10 * amount}**[${radios.EU.Ireland[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Ireland[i].split(" ")[1]})\n`;
      }
      stationsembed2.addField("🇮🇪 Ireland", `>>> ${Ireland}`, true);
      amount++;
      let Italy = "";
      for (let i = 0; i < radios.EU.Italy.length; i++) {
        Italy += `**${i + 1 + 10 * amount}**[${radios.EU.Italy[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Italy[i].split(" ")[1]})\n`;
      }
      stationsembed2.addField("🇮🇹 Italy", `>>> ${Italy}`, true);
      amount++;
      let Luxembourg = "";
      for (let i = 0; i < radios.EU.Luxembourg.length; i++) {
        Luxembourg += `**${i + 1 + 10 * amount}**[${radios.EU.Luxembourg[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Luxembourg[i].split(" ")[1]})\n`;
      }
      stationsembed2.addField("🇱🇺 Luxembourg", `>>> ${Luxembourg}`, true);
      amount++;
      let Romania = "";
      for (let i = 0; i < radios.EU.Romania.length; i++) {
        Romania += `**${i + 1 + 10 * amount}**[${radios.EU.Romania[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Romania[i].split(" ")[1]})\n`;
      }
      stationsembed2.addField("🇷🇴 Romania", `>>> ${Romania}`, true);
      amount++;
      let Serbia = "";
      for (let i = 0; i < radios.EU.Serbia.length; i++) {
        Serbia += `**${i + 1 + 10 * amount}**[${radios.EU.Serbia[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Serbia[i].split(" ")[1]})\n`;
      }
      stationsembed3.addField("🇷🇸 Serbia", `>>> ${Serbia}`, true);
      amount++;
      let Spain = "";
      for (let i = 0; i < radios.EU.Spain.length; i++) {
        Spain += `**${i + 1 + 10 * amount}**[${radios.EU.Spain[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Spain[i].split(" ")[1]})\n`;
      }
      stationsembed3.addField("🇪🇸 Spain", `>>> ${Spain}`, true);
      amount++;
      let Sweden = "";
      for (let i = 0; i < radios.EU.Sweden.length; i++) {
        Sweden += `**${i + 1 + 10 * amount}**[${radios.EU.Sweden[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Sweden[i].split(" ")[1]})\n`;
      }
      stationsembed3.addField("🇸🇪 Sweden", `>>> ${Sweden}`, true);
      amount++;
      let Ukraine = "";
      for (let i = 0; i < radios.EU.Ukraine.length; i++) {
        Ukraine += `**${i + 1 + 10 * amount}**[${radios.EU.Ukraine[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Ukraine[i].split(" ")[1]})\n`;
      }
      stationsembed3.addField("🇺🇦 Ukraine", `>>> ${Ukraine}`, true);
      amount++;
      let requests = "";
      for (let i = 0; i < 10; i++) {
        requests += `**${i + 1 + 10 * amount}**[${radios.OTHERS.request[i].split(" ")[0].replace("-", " ").substr(0, 15)}](${radios.OTHERS.request[i].split(" ")[1]})\n`;
      }
      stationsembed3.addField("🧾 OTHERS", `>>> ${requests}`, true);
      requests = "";
      for (let i = 10; i < 20; i++) {
        try {
          requests += `**${i + 1 + 10 * amount}**[${radios.OTHERS.request[i].split(" ")[0].replace("-", " ").substr(0, 15)}](${radios.OTHERS.request[i].split(" ")[1]})\n`;
        } catch {}
      }
      stationsembed3.addField("🧾 OTHERS", `>>> ${requests}`, true);
      message.channel.send(stationsembed);
      message.channel.send(stationsembed2);
      message.channel.send(stationsembed3);
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  databasing: function(client, guildid, userid) {
    try{
      client.stats.ensure("global", {
        commands: 0,
        songs: 0,
        setups: 0
      });
      client.premium.ensure("premiumlist", {
        list: [{
          "u": "XXXYYYXXXYYYXXXYYY"
        }, {
          "g": "XXXYYYXXXYYYXXXYYY"
        }]
      })
      if (guildid) {
        client.stats.ensure(guildid, {
          commands: 0,
          songs: 0
        });
        client.premium.ensure(guildid, {
          enabled: false,
        })
        client.setups.ensure(guildid, {
          textchannel: "0",
          voicechannel: "0",
          category: "0",
          message_cmd_info: "0",
          message_queue_info: "0",
          message_track_info: "0"
        });
        client.settings.ensure(guildid, {
          prefix: config.prefix,
          pruning: true,
          requestonly: true,
          djroles: [],
          djonlycmds: ["autoplay", "clearqueue", "forward", "loop", "jump", "loopqueue", "loopsong", "move", "pause", "resume", "removetrack", "removedupe", "restart", "rewind", "seek", "shuffle", "skip", "stop", "volume"],
          botchannel: [],
        });
      }
      if (userid) {
        client.premium.ensure(userid, {
          enabled: false,
        })
      }
      if(userid && guildid){
        client.userProfiles.ensure(userid, {
            id: userid,
            guild: guildid,
            totalActions: 0,
            warnings: [],
            kicks: []
        });
      }
      return;
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  escapeRegex: function(str) {
    try{
      return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  autoplay: async function(client, player, type) {
    try{
      if (player.queue.length > 0) return;
      const previoustrack = player.get("previoustrack");
      if (!previoustrack) return;

      const mixURL = `https://www.youtube.com/watch?v=${previoustrack.identifier}&list=RD${previoustrack.identifier}`;
      const response = await client.manager.search(mixURL, previoustrack.requester);
      //if nothing is found, send error message, plus if there  is a delay for the empty QUEUE send error message TOO
      if (!response || response.loadType === 'LOAD_FAILED' || response.loadType !== 'PLAYLIST_LOADED') {
        let embed = new MessageEmbed()
          .setTitle("❌ Error | Found nothing related for the latest Song!")
          .setDescription(config.settings.LeaveOnEmpty_Queue.enabled && type != "skip" ? `I'll leave the Channel: \`${client.channels.cache.get(player.voiceChannel).name}\` in: \`${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}\`, If the Queue stays Empty! ` : `I left the Channel: \`${client.channels.cache.get(player.voiceChannel).name}\` because the Queue was empty for: \`${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}\``)
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon);
        client.channels.cache.get(player.textChannel).send(embed);
        if (config.settings.LeaveOnEmpty_Queue.enabled && type != "skip") {
          return setTimeout(() => {
            try {
              player = client.manager.players.get(player.guild);
              if (player.queue.size === 0) {
                let embed = new MessageEmbed()
                try {
                  embed.setTitle("❌ Queue has ended.")
                } catch {}
                try {
                  embed.setDescription(`I left the Channel: \`${client.channels.cache.get(player.voiceChannel).name}\` because the Queue was empty for: \`${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}\``)
                } catch {}
                try {
                  embed.setColor(ee.wrongcolor)
                } catch {}
                try {
                  embed.setFooter(ee.footertext, ee.footericon);
                } catch {}
                client.channels.cache
                  .get(player.textChannel)
                  .send(embed)
                try {
                  client.channels.cache
                    .get(player.textChannel)
                    .messages.fetch(player.get("playermessage")).then(async msg => {
                      try{
                        await delay(7500)
                        if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                      }catch{ /* */ }
                    });
                } catch (e) {
                  console.log(String(e.stack).yellow);
                }
                player.destroy();
              }
            } catch (e) {
              console.log(String(e.stack).yellow);
            }
          }, config.settings.LeaveOnEmpty_Queue.time_delay);
        } else {
          player.destroy();
        }
      }
      player.queue.add(response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))]);
      return player.play();
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  arrayMove: function(array, from, to) {
    try{
      array = [...array];
      const startIndex = from < 0 ? array.length + from : from;
      if (startIndex >= 0 && startIndex < array.length) {
        const endIndex = to < 0 ? array.length + to : to;
        const [item] = array.splice(from, 1);
        array.splice(endIndex, 0, item);
      }
      return array;
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  isrequestchannel: function(client, message) {
    try{
      //get the setup channel from the database
      if (client.setups.get(message.guild.id, "textchannel") !== "0") {
        //get the channel from the database channelid data
        let channel = message.guild.channels.cache.get(client.setups.get(message.guild.id, "textchannel"));
        //if the channel is undefined aka not existing reset the database
        if (!channel) {
          return false;
        }
        //if its in the request channel do this
        if (channel.id === message.channel.id) {
          return true;
        } else {
          return false;
        }
      }
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  edit_request_message_track_info: async function(client, player, track) {
    try{
      let message = player.get("message");
      let db = client.setups.get(message.guild.id);

      function SongEmbed(track) {
        let embed = new MessageEmbed()
        try {
          embed.setTitle("Playing :notes: **`" + track.title + "`**")
        } catch {}
        try {
          embed.setURL(track.uri)
        } catch {}
        try {
          embed.setColor(ee.color)
        } catch {}
        try {
          embed.setThumbnail(track.displayThumbnail(1))
        } catch {}
        try {
          embed.addField("⌛️ Duration: ", `\`${track.isStream ? "LIVE STREAM" : format(track.duration)}\``, true)
        } catch {}
        try {
          embed.addField("💯 Song By: ", `\`${track.author}\``, true)
        } catch {}
        try {
          embed.addField("🎚 Equalizer: ", `\`🎵 Music\``, true)
        } catch {}
        try {
          embed.addField("🔊 Volume", `\`${player.volume}%\``, true)
        } catch {}
        try {
          embed.addField(`${player.queueRepeat ? "🔂 Queue Loop: " : "🔁 Song Loop: "}`, `\`${player.queueRepeat ? `\`✔️ Enabled\`` : player.trackRepeat ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}\``, true)
        } catch {}
        try {
          embed.addField("⏯ State", `\`${player.playing ? "▶️ Playing Song" : "⏸ Paused Song"}\``, true)
        } catch {}
        try {
          embed.addField("⏳ Progress: ", createBar(player.queue.current.duration == 0 ? player.position : player.queue.current.duration, player.position, 25, "▬", config.settings.progressbar_emoji) + "\n**" + new Date(player.position).toISOString().substr(11, 8) + " / " + (player.queue.current.duration == 0 ? " ◉ LIVE" : new Date(player.queue.current.duration).toISOString().substr(11, 8)) + "**")
        } catch {}
        try {
          embed.setFooter(`Requested by: ${track.requester.tag}`, track.requester.displayAvatarURL({
            dynamic: true
          }));
        } catch {}
        return embed;
      }

      function QueueEmbed(client, player) {
        const queue = player.queue;
        const embed = new MessageEmbed().setAuthor(`Lava Music | Music Queue`);
        const multiple = 15;
        const page = 1;
        const end = page * multiple;
        const start = end - multiple;
        const tracks = queue.slice(start, end);
        if (queue.current) embed.addField("**0) CURRENT TRACK**", `[${queue.current.title.substr(0, 35)}](${queue.current.uri}) - \`${track.isStream ? "LIVE STREAM" : format(track.duration)}\` - request by: **${queue.current.requester.tag}**`);
        if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
        else embed.setDescription(tracks.map((track, i) => `**${start + ++i})** [${track.title.substr(0, 35)}](${track.uri}) - \`${track.isStream ? "LIVE STREAM" : format(track.duration)}\` - request by: **${track.requester.tag}**`).join("\n"));
        embed.setColor(ee.color);
        embed.setFooter(ee.footertext, ee.footericon);
        return embed;
      }

      function format(millis) {
        var h = Math.floor(millis / 3600000),
          m = Math.floor(millis / 60000),
          s = ((millis % 60000) / 1000).toFixed(0);
        if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
        else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
      }

      function createBar(total, current, size = 25, line = "▬", slider = config.settings.progressbar_emoji) {
        let bar =
          current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
        if (!String(bar).includes(config.settings.progressbar_emoji)) return `**[${config.settings.progressbar_emoji}${line.repeat(size - 1)}]**`;
        return `**[${bar[0]}]**`;
      }

      function edit_10_s_np(track_info_msg, track, queue_info_msg, client, player) {
        track_info_msg.edit(SongEmbed(player.queue.current)).catch(e => String(e.stack).yellow);
        queue_info_msg.edit(QueueEmbed(client, player)).catch(e => String(e.stack).yellow);
      }
      //GET QUEUE INFO MSG
      let queue_info_msg = await message.channel.messages.fetch(db.message_queue_info);
      //IF NO QUEUE INFO MSG AVAILABLE --> resend it --> try find TRACK INFO MSG --> delete it!
      if (!queue_info_msg) return message.channel.send(new MessageEmbed()).then(async msg => {
        message.edit(QueueEmbed(client, player)).catch(e => String(e.stack).yellow);
        client.setups.set(message.guild.id, msg.id, "message_queue_info");
        let track_info_msg = await message.channel.messages.fetch(db.message_track_info);
        if (track_info_msg) track_info_msg.delete().catch(e => String(e.stack).yellow);
        return message.channel.send(new MessageEmbed()).then(msg => {
          msg.edit(SongEmbed(player.queue.current)).catch(e => String(e.stack).yellow);
          client.setups.set(message.guild.id, msg.id, "message_track_info");
        })
      })
      //GET TRACK INFO MSG
      let track_info_msg = await message.channel.messages.fetch(db.message_track_info);
      //IF NO TRACK INFO MSG --> DELETE
      if (!track_info_msg) return message.channel.send(new MessageEmbed()).then(msg => {
        msg.react("⏪"); //rewind 20 seconds
        msg.react("⏯"); //pause / resume
        msg.react("⏹"); //stop playing music
        msg.react("⏩"); //forward 20 seconds
        msg.react("⏭"); //skip track / stop playing
        msg.react("🔉"); //reduce volume by 10%
        msg.react("🔊"); //raise volume by 10%
        msg.react("🔁"); //change repeat mode --> track --> Queue --> none
        msg.react("🔀"); //shuffle the Queue
        msg.edit(SongEmbed(player.queue.current));
        client.setups.set(message.guild.id, msg.id, "message_track_info");
      })
      track_info_msg.edit(SongEmbed(player.queue.current)).catch(e => String(e.stack).yellow);
      queue_info_msg.edit(QueueEmbed(client, player)).catch(e => String(e.stack).yellow);
      for (let i = 0; i < 10; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(2);
          }, 7.5 * 1000);
        });
        if (i >= 5) i = 0;
        const curplayer = client.manager.players.get(player.guild);
        if (!curplayer) {
          reset(track_info_msg, queue_info_msg);
          break;
        }
        edit_10_s_np(track_info_msg, track, queue_info_msg, client, curplayer)
      }

      function reset(track_info_msg, queue_info_msg) {
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
        track_info_msg.edit(embed3).catch(e => String(e.stack).yellow);
        queue_info_msg.edit(embed2).catch(e => String(e.stack).yellow);
      }
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  edit_request_message_queue_info: async function(client, player) {
    try{
      const queue = player.queue;
      const embed = new MessageEmbed().setAuthor(`Lava Music | Music Queue`);
      const multiple = 15;
      const page = 1;
      const end = page * multiple;
      const start = end - multiple;
      const tracks = queue.slice(start, end);
      if (queue.current) embed.addField("**0) CURRENT TRACK**", `[${queue.current.title.substr(0, 35)}](${queue.current.uri}) - \`${queue.current.isStream ? "LIVE STREAM" : format(queue.current.duration)}\` - request by: **${queue.current.requester.tag}**`);
      if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
      else embed.setDescription(tracks.map((track, i) => `**${start + ++i})** [${track.title.substr(0, 35)}](${track.uri}) - \`${track.isStream ? "LIVE STREAM" : format(track.duration)}\` - request by: **${track.requester.tag}**`).join("\n"));
      embed.setColor(ee.color);
      embed.setFooter(ee.footertext, ee.footericon);
      embed;
      let message = player.get("message");
      let db = client.setups.get(message.guild.id)

      function SongEmbed(track) {
        let embed = new MessageEmbed()
        try {
          embed.setTitle("Playing :notes: **`" + track.title + "`**")
        } catch {}
        try {
          embed.setURL(track.uri)
        } catch {}
        try {
          embed.setColor(ee.color)
        } catch {}
        try {
          embed.setThumbnail(track.displayThumbnail(1))
        } catch {}
        try {
          embed.addField("⌛️ Duration: ", `\`${track.isStream ? "LIVE STREAM" : format(track.duration)}\``, true)
        } catch {}
        try {
          embed.addField("💯 Song By: ", `\`${track.author}\``, true)
        } catch {}
        try {
          embed.addField("🎚 Equalizer: ", `\`🎵 Music\``, true)
        } catch {}
        try {
          embed.addField("🔊 Volume", `\`${player.volume}%\``, true)
        } catch {}
        try {
          embed.addField(`${player.queueRepeat ? "🔂 Queue Loop: " : "🔁 Song Loop: "}`, `\`${player.queueRepeat ? `\`✔️ Enabled\`` : player.trackRepeat ? `\`✔️ Enabled\`` : `\`❌ Disabled\``}\``, true)
        } catch {}
        try {
          embed.addField("⏯ State", `\`${player.playing ? "▶️ Playing Song" : "⏸ Paused Song"}\``, true)
        } catch {}
        try {
          embed.addField("⏳ Progress: ", createBar(player.queue.current.duration == 0 ? player.position : player.queue.current.duration, player.position, 25, "▬", config.settings.progressbar_emoji) + "\n**" + new Date(player.position).toISOString().substr(11, 8) + " / " + (player.queue.current.duration == 0 ? " ◉ LIVE" : new Date(player.queue.current.duration).toISOString().substr(11, 8)) + "**")
        } catch {}
        try {
          embed.setFooter(`Requested by: ${track.requester.tag}`, track.requester.displayAvatarURL({
            dynamic: true
          }));
        } catch {}
        return embed;
      }

      function format(millis) {
        var h = Math.floor(millis / 3600000),
          m = Math.floor(millis / 60000),
          s = ((millis % 60000) / 1000).toFixed(0);
        if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
        else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
      }

      function createBar(total, current, size = 25, line = "▬", slider = config.settings.progressbar_emoji) {
        let bar =
          current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
        if (!String(bar).includes(config.settings.progressbar_emoji)) return `**[${config.settings.progressbar_emoji}${line.repeat(size - 1)}]**`;
        return `**[${bar[0]}]**`;
      }
      //GET QUEUE INFO MSG
      let queue_info_msg = await message.channel.messages.fetch(db.message_queue_info);
      //IF NO QUEUE INFO MSG AVAILABLE --> resend it --> try find TRACK INFO MSG --> delete it!
      if (!queue_info_msg) return message.channel.send(new MessageEmbed()).then(async msg => {
        message.edit(embed).catch(e => String(e.stack).yellow);
        client.setups.set(message.guild.id, msg.id, "message_queue_info");
        let track_info_msg = await message.channel.messages.fetch(db.message_track_info);
        if (track_info_msg) track_info_msg.delete().catch(e => String(e.stack).yellow);
        return message.channel.send(new MessageEmbed()).then(msg => {
          msg.edit(SongEmbed(player.queue.current)).catch(e => String(e.stack).yellow);
          client.setups.set(message.guild.id, msg.id, "message_track_info");
        })
      })
      queue_info_msg.edit(embed)

      function format(millis) {
        var h = Math.floor(millis / 3600000),
          m = Math.floor(millis / 60000),
          s = ((millis % 60000) / 1000).toFixed(0);
        if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
      }
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  }
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
