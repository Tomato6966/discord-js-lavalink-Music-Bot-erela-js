/**
  * @INFO
  * Loading all needed File Information Parameters
*/
const config = require("../../botconfig/config.json"); //loading config file with token and prefix, and settings
const ee = require("../../botconfig/embed.json"); //Loading all embed settings like color footertext and icon ...
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const { createBar, format, databasing, escapeRegex, isrequestchannel, getRandomInt, delay} = require("../../handlers/functions"); //Loading all needed functions
const requestcmd = require("../../handlers/requestcmds");
//here the event starts
module.exports = async (client, message) => {
  try {
    //if the message is not in a guild (aka in dms), return aka ignore the inputs
    if (!message.guild) return;
    //if the channel is on partial fetch it
    if (message.channel.partial) await message.channel.fetch();
    //if the message is on partial fetch it
    if (message.partial) await message.fetch();
    //ensure all databases for this server/user from the databasing function
    databasing(client, message.guild.id, message.author.id)
    //get the setup channel from the database and if its in there sent then do this
    if(isrequestchannel(client, message)) return requestcmd(client, message); //requestcommands
    // if the message  author is a bot, return aka ignore the inputs
    if (message.author.bot) return;
    //get the current prefix from the database
    let prefix = client.settings.get(message.guild.id, "prefix");
    //if not in the database for some reason use the default prefix
    if (prefix === null) prefix = config.prefix;
    //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    //if its not that then return
    if (!prefixRegex.test(message.content)) return;
    //now define the right prefix either ping or not ping
    const [, matchedPrefix] = message.content.match(prefixRegex);
    //CHECK IF IN A BOT CHANNEL OR NOT
    if(client.settings.get(message.guild.id, `botchannel`).toString() !== ""){
        //if its not in a BotChannel, and user not an ADMINISTRATOR
        if (!client.settings.get(message.guild.id, `botchannel`).includes(message.channel.id) && !message.member.hasPermission("ADMINISTRATOR")) {
          //create the info string
            let leftb = "";
            for(let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++){
                leftb  +="<#" +client.settings.get(message.guild.id, `botchannel`)[i] + "> / "
            }
            //send informational message
            try{ message.react("❌"); }catch{}
            return message.channel.send(new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`❌ Error | Not in the Bot Chat!`)
              .setDescription(`There is a Bot chat setup in this GUILD! try using the Bot Commands here:\n> ${leftb.substr(0, leftb.length - 3)}`)
            ).then(async msg => {
              try{
                await delay(5000)
                if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
              }catch{ /* */ }
            });
        }
    }
    //create the arguments with sliceing of of the rightprefix length
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    //creating the cmd argument by shifting the args by 1
    const cmd = args.shift().toLowerCase();
    //if no cmd added return error
    if (cmd.length === 0){
      if(matchedPrefix.includes(client.user.id))
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext,ee.footericon)
          .setTitle(`Hugh? I got pinged? Imma give you some help`)
          .setDescription(`To see all Commands type: \`${prefix}help\`\n\nTo setup a Unique Song Request System type \`${prefix}setup\`\n\nOther then that, start listening to some music with \`${prefix}play <Song/Url>\``)
        );
      return;
      }
    //get the command from the collection
    let command = client.commands.get(cmd);
    //if the command does not exist, try to get it by his alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    //if the command is now valid
    if (command){
        if (!client.cooldowns.has(command.name)) { //if its not in the cooldown, set it too there
            client.cooldowns.set(command.name, new Discord.Collection());
        }
        const now = Date.now(); //get the current time
        const timestamps = client.cooldowns.get(command.name); //get the timestamp of the last used commands
        const cooldownAmount = (command.cooldown || 1) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
        if (timestamps.has(message.author.id)) { //if the user is on cooldown
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
          if (now < expirationTime) { //if he is still on cooldonw
            const timeLeft = (expirationTime - now) / 1000; //get the lefttime
            try{ message.react("❌"); }catch{}
            return message.channel.send(new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext,ee.footericon)
              .setTitle(`❌ Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
              .addField("Why a delay?", "Because that's the only way how I can prevent you from abusing(spamming) me!")
            ); //send an information message
          }
        }
        timestamps.set(message.author.id, now); //if he is not on cooldown, set it to the cooldown
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again
      try{
        client.stats.inc(message.guild.id, "commands"); //counting our Database stats for SERVER
        client.stats.inc("global", "commands"); //counting our Database Stats for GLOBAL
        //if Command has specific permission return error
        if(command.memberpermissions) {
          if (!message.member.hasPermission(command.memberpermissions)) {
            try{ message.react("❌"); }catch{}
            message.channel.send(new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle("❌ Error | You are not allowed to run this command!")
              .setDescription(`You need these Permissions: \`${command.memberpermissions.join("`, ``")}\``)
            ).then(async msg => {
              try{
                await delay(5000)
                if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
              }catch{ /* */ }
            });
            }
          }
        //if Command has specific permission return error

        if(client.settings.get(message.guild.id, `djonlycmds`) && client.settings.get(message.guild.id, `djonlycmds`).join(" ").toLowerCase().split(" ").includes(command.name.toLowerCase())) {
          //Check if there is a Dj Setup
          if(client.settings.get(message.guild.id, `djroles`).toString()!==""){
            const player = client.manager.players.get(message.guild.id);
            //create the string of all djs and if he is a dj then set it to true
            let isdj=false;
            let leftb = "";
              if(client.settings.get(message.guild.id, `djroles`).join("") === "")
                  leftb = "no Dj Roles, aka all Users are Djs"
              else
                for(let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++){
                  if(message.member.roles.cache.has(client.settings.get(message.guild.id, `djroles`)[i])) isdj = true;
                    if(!message.guild.roles.cache.get(client.settings.get(message.guild.id, `djroles`)[i])) continue;
                      leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
                }
              //if not a DJ and not a nAdmin

              if(!isdj && !message.member.hasPermission("ADMINISTRATOR")) {
                if(player && player.queue.current.requester.id !== message.author.id) {
                  try{ message.react("❌"); }catch{}
                   return message.channel.send(new Discord.MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle("❌ Error | You are not allowed to run this command!")
                    .setDescription(`You need to have one of those Roles:\n${leftb.substr(0, leftb.length-3)}\n\nOr be the Requester (${player.queue.current.requester}) of the current Track!`)
                  ).then(async msg => {
                    try{
                      await delay(5000)
                      if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                    }catch{ /* */ }
                  });
                }
              }
            }
        }
        //if there is a SETUP with an EXISTING text channel                             and its a   MUSIC  or FILTER COMMAND                              AND NOT in the                         RIGHT CHANNEL return error msg        and if its request only enabled
        if(message.guild.channels.cache.get(client.setups.get(message.guild.id, "textchannel")) &&
          (command.category.toLowerCase().includes("music") || command.category.toLowerCase().includes("filter")) &&
           client.setups.get(message.guild.id, "textchannel") !== message.channel.id &&
           client.settings.get(message.guild.id, `requestonly`)){
             try{ message.react("❌"); }catch{}
              return message.channel.send(new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle("❌ Error | You are not allowed to run this Command here!")
              .setDescription(`Please run it in: ${message.guild.channels.cache.get(client.setups.get(message.guild.id, "textchannel"))} | To enable that you can use the Command anywhere type: \`${prefix}togglerequestonly\``)
            )

        }


        if(command.category.toLowerCase().includes("admin") ||command.category.toLowerCase().includes("settings") || command.category.toLowerCase().includes("owner")) {
          let required_perms = ["KICK_MEMBERS","BAN_MEMBERS","MANAGE_CHANNELS","ADD_REACTIONS","VIEW_CHANNEL","SEND_MESSAGES","MANAGE_MESSAGES"
          ,"EMBED_LINKS", "ATTACH_FILES","CONNECT","SPEAK", "MANAGE_ROLES"]
          if(!message.guild.me.hasPermission(required_perms)){
            try{ message.react("❌"); }catch{}
            return message.channel.send(new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle("❌ Error | I don't have enough Permissions!")
              .setDescription("Please give me just `ADMINISTRATOR`, because I need it to delete Messages, Create Channel and execute all Admin Commands.\n If you don't want to give me them, then those are the exact Permissions which I need: \n> `" + required_perms.join("`, `") +"`")
            )
          }
        }
        //try to delete the message of the user who ran the cmd
          //try{  message.delete(); }catch{}

        //react with an random emoji, ... "random"
          //let emojis = ["👌", "👌", "👌", "👍", "👍", "✅", "✅", "✅", "✌", "🎧", "❤", "✨"]
          //try{ message.react(emojis[getRandomInt(emojis.length)]); }catch{}
        //run the command with the parameters:  client, message, args, user, text, prefix,
        command.run(client, message, args, message.member, args.join(" "), prefix);
      }catch (e) {
        console.log(String(e.stack).red)
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Something went wrong while, running the: `" + command.name + "` command")
          .setDescription(`\`\`\`${e.message}\`\`\``)
        ).then(async msg => {
          try{
            await delay(5000)
            if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
          }catch{ /* */ }
        });
      }
    }
    else //if the command is not found send an info msg
    return message.channel.send(new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`❌ Unkown command, try: **\`${prefix}help\`**`)
      .setDescription(`The prefix for this Guild is: \`${prefix}\`\nYou can also ping me, instead of using a Prefix!\n\nTo play Music simply type \`${prefix}play <Title / Url>\`\n\nTo create a unique Requesting Setup type \`${prefix}setup\``)
    ).then(async msg => {
      try{
        await delay(5000)
        if(msg && message.channel.messages.cache.get(msg.id)) msg.delete();
      }catch{ /* */ }
    });
  }catch (e){
    return message.channel.send(new MessageEmbed()
      .setColor("RED")
      .setTitle(`❌ ERROR | An error occurred`)
      .setDescription(`\`\`\`${e.message}\`\`\``)
    );
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
