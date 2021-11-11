const {
  MessageEmbed
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
const {
  databasing
} = require(`${process.cwd()}/handlers/functions`);
module.exports = client => {

  process.on('unhandledRejection', (reason, p) => {
    console.log('\n\n\n\n\n=== unhandled Rejection ==='.toUpperCase().yellow.dim);
    console.log('Reason: ', reason.stack ? String(reason.stack).gray : String(reason).gray);
    console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });
  process.on("uncaughtException", (err, origin) => {
    console.log('\n\n\n\n\n\n=== uncaught Exception ==='.toUpperCase().yellow.dim);
    console.log('Exception: ', err.stack ? err.stack : err)
    console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  })
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('=== uncaught Exception Monitor ==='.toUpperCase().yellow.dim);
  });
  process.on('beforeExit', (code) => {
    console.log('\n\n\n\n\n=== before Exit ==='.toUpperCase().yellow.dim);
    console.log('Code: ', code);
    console.log('=== before Exit ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });
  process.on('exit', (code) => {
    console.log('\n\n\n\n\n=== exit ==='.toUpperCase().yellow.dim);
    console.log('Code: ', code);
    console.log('=== exit ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });
  process.on('multipleResolves', (type, promise, reason) => {
    console.log('\n\n\n\n\n=== multiple Resolves ==='.toUpperCase().yellow.dim);
    console.log(type, promise, reason);
    console.log('=== multiple Resolves ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });

  //ALWAYS SERVER DEAF THE BOT WHEN JOING
  client.on("voiceStateUpdate", (oldState, newState) => {
    try {
      //skip if not the bot
      if (client.user.id != newState.id) return;
      if (
        (!oldState.streaming && newState.streaming) ||
        (oldState.streaming && !newState.streaming) ||
        (!oldState.serverDeaf && newState.serverDeaf) ||
        (oldState.serverDeaf && !newState.serverDeaf) ||
        (!oldState.serverMute && newState.serverMute) ||
        (oldState.serverMute && !newState.serverMute) ||
        (!oldState.selfDeaf && newState.selfDeaf) ||
        (oldState.selfDeaf && !newState.selfDeaf) ||
        (!oldState.selfMute && newState.selfMute) ||
        (oldState.selfMute && !newState.selfMute) ||
        (!oldState.selfVideo && newState.selfVideo) ||
        (oldState.selfVideo && !newState.selfVideo)
      )
        if (((!oldState.channelId && newState.channelId) || (oldState.channelId && newState.channelId))) {
          try {
            newState.setDeaf(true);
          } catch {}
          return;
        }
    } catch {

    }

  });
  //ANTI UNMUTE THING
  client.on("voiceStateUpdate", async (oldState, newState) => {
    if(newState.id === client.user.id && oldState.serverDeaf === true && newState.serverDeaf === false){
      try{
        newState.setDeaf(true).catch(() => {});
      } catch (e){
        //console.log(e)
      }
    }
  });

  client.on("interactionCreate", async interaction => {
    if(interaction.isButton() && interaction.message.author.id == client.user.id && interaction.customId.includes("PREMIUM-")){
      let requesterId = interaction.message.embeds[0].footer.text.split("-")[0];
      let guildId = interaction.message.embeds[0].footer.text.split("-")[1];
      let guild = client.guilds.cache.get(guildId)
      if(!guild) return interaction.reply("❌ **I got kicked out of that Guild**")
      let requester = guild.members.cache.get(requesterId);
      if(!requester) requester = await guild.members.fetch(requesterId).catch(()=>{}) || false;
      if(requester){
        requester.send(`${interaction.customId == "PREMIUM-ACCEPT" ? `✅ **Your Requested for: \`${guild.name}\` got accepted!**` : `❌ **Your Requested for: \`${guild.name}\` got declined!**` }`).catch(()=>{});
      }
      if(interaction.customId == "PREMIUM-ACCEPT" && requester.id != guild.ownerId){
        guild.fetchOwner(owner => {
          owner.send(`✅ **Your Guild: \`${guild.name}\` got accepted for PREMIUM!**`).catch(()=>{});
        }).catch(()=>{});
      }
      if(interaction.customId == "PREMIUM-ACCEPT"){
        if(client.premium.get("global", "guilds").includes(guild.id)){
          interaction.update({embeds: [interaction.message.embeds[0].setTitle(`✅ Guild is already a PREMIUM Member!`)], components: []})
        } else {
          client.premium.push("global", guild.id, "guilds");
          interaction.update({embeds: [interaction.message.embeds[0].setTitle(`✅ Accepted the Guild!`)], components: []})
        }
      } else {
        if(client.premium.get("global", "guilds").includes(guild.id)){
          interaction.update({embeds: [interaction.message.embeds[0].setTitle(`✅ Guild is already a PREMIUM Member!`)], components: []})
        } else {
          interaction.update({embeds: [interaction.message.embeds[0].setTitle(`❌ Denied the Guild!`)], components: []})
        }
      }
    }
  })

  client.on("guildCreate", async guild => {
    if(!guild || guild.available === false) return
    let theowner = "NO OWNER DATA! ID: ";
    await guild.fetchOwner().then(({ user }) => {
      theowner = user;
    }).catch(() => {})
    databasing(client, guild.id)
    let ls = client.settings.get(guild.id, "language")
    let embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`<a:Join_vc:863876115584385074> Joined a New Server`)
      .addField("Guild Info", `>>> \`\`\`${guild.name} (${guild.id})\`\`\``)
      .addField("Owner Info", `>>> \`\`\`${theowner ? `${theowner.tag} (${theowner.id})` : `${theowner} (${guild.ownerId})`}\`\`\``)
      .addField("Member Count", `>>> \`\`\`${guild.memberCount}\`\`\``)
      .addField("Servers Bot is in", `>>> \`\`\`${client.guilds.cache.size}\`\`\``)
      .addField("Leave Server:", `>>> \`\`\`${config.prefix}leaveserver ${guild.id}\`\`\``)
      .setThumbnail(guild.iconURL({dynamic: true}));
    for(const owner of config.ownerIDS){
      client.users.fetch(owner).then(user => {
        user.send({ embeds: [embed] }).catch(() => {})
      }).catch(() => {});
    }
  });

  client.on("guildDelete", async guild => {
    if(!guild || guild.available === false) return
    let theowner = "NO OWNER DATA! ID: ";
    await guild.fetchOwner().then(({ user }) => {
      theowner = user;
    }).catch(() => {})
    let ls = "en"
    let embed = new MessageEmbed()
      .setColor("RED")
      .setTitle(`<:leaves:866356598356049930> Left a Server`)
      .addField("Guild Info", `>>> \`\`\`${guild.name} (${guild.id})\`\`\``)
      .addField("Owner Info", `>>> \`\`\`${theowner ? `${theowner.tag} (${theowner.id})` : `${theowner} (${guild.ownerId})`}\`\`\``)
      .addField("Member Count", `>>> \`\`\`${guild.memberCount}\`\`\``)
      .addField("Servers Bot is in", `>>> \`\`\`${client.guilds.cache.size}\`\`\``)
      .addField("Leave Server:", `>>> \`\`\`${config.prefix}leaveserver ${guild.id}\`\`\``)
      .setThumbnail(guild.iconURL({dynamic: true}));
    for(const owner of config.ownerIDS){
      client.users.fetch(owner).then(user => {
        user.send({ embeds: [embed] }).catch(() => {})
      }).catch(() => {});
    }
  });
}