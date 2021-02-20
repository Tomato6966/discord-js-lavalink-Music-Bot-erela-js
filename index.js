/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://github.com/Milrato-Development
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
/**
  * @INFO
  * Importing all needed Commands
*/
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const Enmap = require("enmap"); //this package is our Database! We will use it to save the data for ever!
const fs = require("fs"); //this package is for reading files and getting their inputs
/**
  * @INFO
  * Loading all needed File Information Parameters
*/
const config = require("./botconfig/config.json"); //loading config file with token and prefix, and settings
const ee = require("./botconfig/embed.json"); //Loading all embed settings like color footertext and icon ...
const { createBar, format, databasing, escapeRegex, isrequestchannel} = require("./handlers/functions"); //Loading all needed functions
/**
  * @START
  * Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
*/
const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  shards: "auto",
  shardCount: 5,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
/**
  * @INFO
  * This will be all of our CLIENT VARIABLES for the commands as well as a cooldown system for each cmd!
*/
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user
/**
  * @INFO
  * Loading files, with the client variable like Command Handler, Event Handler, ...
*/
["command"].forEach(handler => {
    require(`./handlers/command`)(client);
}); //this is for command loading in the handler file, one fireing for each cmd
require("./handlers/events")(client); //this is for event handling
require("./handlers/erelahandler")(client); //Erela.js handler which handels erela.js
require("./handlers/clientvariables")(client); //clientvariables
require("./handlers/requestreacts")(client); //requestreaction system

/**
  * @INFO - DATABASES
  * Each Database gets a own file and folder which is pretty handy!
*/
client.premium = new Enmap({name: "premium", dataDir: "./databases/premium"})
client.stats = new Enmap({name: "stats", dataDir: "./databases/stats"})
client.setups = new Enmap({name: "setups", dataDir: "./databases/setups"})
/**
  * @INFO - client.on("message") --> EVENT
  * This Discord Event will fire, for each message which is sent into a Channel
*/
client.on("message", async message => {
    if (!message.guild) return; //if the message is not in a guild (aka in dms), return aka ignore the inputs
    //Fix almost never existing bugs
    if (message.channel.partial) await reaction.message.channel.fetch();
    if (message.partial) await reaction.message.fetch();
    //ensure all databases for this server/user from the databasing function
      databasing(client, message.guild.id, message.author.id)

    //get the setup channel from the database
    if(isrequestchannel(client, message)) return require("./handlers/requestcmds")(client, message); //requestcommands

    if (message.author.bot) return;// if the message  author is a bot, return aka ignore the inputs
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(config.prefix)})\\s*`); //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
    if (!prefixRegex.test(message.content)) return; //if its not that then return
    const [, matchedPrefix] = message.content.match(prefixRegex); //now define the right prefix either ping or not ping
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/); //create the arguments with sliceing of of the rightprefix length
    const cmd = args.shift().toLowerCase(); //creating the cmd argument by shifting the args by 1
    if (cmd.length === 0) return message.reply(new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`:x: Unkown command, try: **\`${config.prefix}help\`**`)
      .setDescription(`To play Music simply type \`${config.prefix}play <Title / Url>\`\n\nTo create a unique Requesting Setup type \`${config.prefix}setup\``)
    )

    let command = client.commands.get(cmd); //get the command from the collection
    if (!command) command = client.commands.get(client.aliases.get(cmd)); //if the command does not exist, try to get it by his alias


    if (command) //if the command is now valid
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
            return message.reply(new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext,ee.footericon)
              .setTitle(`:x: Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
            ); //send an information message
          }
        }
        timestamps.set(message.author.id, now); //if he is not on cooldown, set it to the cooldown
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again
      try{
        client.stats.inc(message.guild.id, "commands"); //counting our Database stats for SERVER
        client.stats.inc("global", "commands"); //counting our Database Stats for GLOBAL
        //run the command with the parameters:  client, message, args, user, text, prefix,
        command.run(client, message, args, message.member, args.join(" "), config.prefix);
      }catch (e) {
        console.log(String(e.stack).red)
        return message.reply(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(":x: Something went wrong while, running the: `" + command.name + "` command")
          .setDescription(`\`\`\`${e.stack}\`\`\``)
        )
      }
    }
    else //if the command is not found send an info msg
    return message.reply(new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`:x: Unkown command, try: **\`${config.prefix}help\`**`)
      .setDescription(`To play Music simply type \`${config.prefix}play <Title / Url>\``)
    )
});
client.login(config.token); //login into the bot
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://github.com/Milrato-Development
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
