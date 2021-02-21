/**
  * @INFO
  * Loading all needed File Information Parameters
*/
const config = require("../../botconfig/config.json"); //loading config file with token and prefix, and settings
const ee = require("../../botconfig/embed.json"); //Loading all embed settings like color footertext and icon ...
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const { createBar, format, databasing, escapeRegex, isrequestchannel} = require("../../handlers/functions"); //Loading all needed functions
//here the event starts
module.exports = async (client, message) => {
  //if the message is not in a guild (aka in dms), return aka ignore the inputs
  if (!message.guild) return;
  //if the channel is on partial fetch it
  if (message.channel.partial) await reaction.message.channel.fetch();
  //if the message is on partial fetch it
  if (message.partial) await reaction.message.fetch();
  //ensure all databases for this server/user from the databasing function
  databasing(client, message.guild.id, message.author.id)
  //get the setup channel from the database and if its in there sent then do this
  if(isrequestchannel(client, message)) return require("../../handlers/requestcmds")(client, message); //requestcommands
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
          return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ Error | Not in the Bot Chat!`)
            .setDescription(`There is a Bot chat setup in this GUILD! try using the Bot Commands here:\n> ${leftb.substr(0, leftb.length - 3)}`)
          ).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log("Couldn't Delete --> Ignore")));
      }
  }
  //create the arguments with sliceing of of the rightprefix length
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  //creating the cmd argument by shifting the args by 1
  const cmd = args.shift().toLowerCase();
  //if no cmd added return error
  if (cmd.length === 0) return message.channel.send(new Discord.MessageEmbed()
    .setColor(ee.wrongcolor)
    .setFooter(ee.footertext, ee.footericon)
    .setTitle(`❌ Unkown command, try: **\`${prefix}help\`**`)
    .setDescription(`To play Music simply type \`${prefix}play <Title / Url>\`\n\nTo create a unique Requesting Setup type \`${prefix}setup\``)
  )
  //get the command from the collection
  let command = client.commands.get(cmd);
  //if the command does not exist, try to get it by his alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  //if the command is now valid
  if (command)
  {
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
          return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext,ee.footericon)
            .setTitle(`❌ Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
          ); //send an information message
        }
      }
      timestamps.set(message.author.id, now); //if he is not on cooldown, set it to the cooldown
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again
    try{
      client.stats.inc(message.guild.id, "commands"); //counting our Database stats for SERVER
      client.stats.inc("global", "commands"); //counting our Database Stats for GLOBAL
      //try to delete the message of the user who ran the cmd
      try{  message.delete();   }catch{}
      //if Command has specific permission return error
      if(command.memberpermissions) {
        if (!message.member.hasPermission(command.memberpermissions))
          return message.channel.send(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle("❌ Error | You are not allowed to run this command!")
            .setDescription(`You need these Permissions: \`${command.memberpermissions.join("`, ``")}\``)
          ).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log("Couldn't Delete --> Ignore")));
      }
      //if Command has specific permission return error
      if(client.settings.get(message.guild.id, `djonlycmds`).join(" ").toLowerCase().split(" ").includes(command.name.toLowerCase())) {
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
                return message.channel.send(new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle("❌ Error | You are not allowed to run this command!")
                  .setDescription(`You need to have one of those Roles:\n${leftb.substr(0, leftb.length-3)}\n\nOr be the Requester (${player.queue.current.requester}) of the current Track!`)
                ).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log("Couldn't Delete --> Ignore")));
              }
            }
          }
      }
      //if the Bot has not enough permissions return error
      if(!message.guild.me.hasPermission("ADMINISTRATOR"))
        return message.channel.send(new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle("❌ Error | I don't have enough Permissions!")
        .setDescription("Please give me ADMINISTRATOR, because i need it to delete Messages, Create Channel and execute all Admin Commands ;)")
      )
      //run the command with the parameters:  client, message, args, user, text, prefix,
      command.run(client, message, args, message.member, args.join(" "), prefix);
    }catch (e) {
      console.log(String(e.stack).red)
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle("❌ Something went wrong while, running the: `" + command.name + "` command")
        .setDescription(`\`\`\`${e.stack}\`\`\``)
      ).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log("Couldn't Delete --> Ignore")));
    }
  }
  else //if the command is not found send an info msg
  return message.channel.send(new Discord.MessageEmbed()
    .setColor(ee.wrongcolor)
    .setFooter(ee.footertext, ee.footericon)
    .setTitle(`❌ Unkown command, try: **\`${prefix}help\`**`)
    .setDescription(`To play Music simply type \`${prefix}play <Title / Url>\``)
  ).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log("Couldn't Delete --> Ignore")));
}
