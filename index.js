//Modules
const Discord = require("discord.js");
const { Client, Collection } = require("discord.js");
const config = require("./botconfig/config.json"); //loading config file with token and prefix
const ee = require("./botconfig/embed.json");
const { createBar, format, databasing, escapeRegex} = require("./handlers/functions");
const colors = require("colors")
const prefix = (config.prefix); //defining the prefix as a constant variable
const fs = require("fs"); //this package is for reading files and getting their inputs

const Enmap = require("enmap");

const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,

  messageCacheMaxSize: 10,
  shards: "auto",
  shardCount: 5,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
}); //creating the client with partials, so you can fetch OLD messages

client.commands = new Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Collection(); //an collection for all your command-aliases
const cooldowns = new Collection(); //an collection for cooldown commands of each user


client.categories = fs.readdirSync("./commands/"); //categories 

["command"].forEach(handler => {
    require(`./handlers/command`)(client);
}); //this is for command loading in the handler file, one fireing for each cmd

require("./handlers/events")(client); //this is for event handling  
require("./handlers/erelahandler")(client);
require("./handlers/clientvariables")(client);

client.premium = new Enmap({name: "premium", dataDir: "./databases/premium"})

//fires each time the bot receives a message
client.on("message", async message => {
    if (!message.guild) return; //if the message is not in a guild (aka in dms), return aka ignore the inputs
    databasing(client, message.guild.id, message.author.id)
    if (message.author.bot) return;// if the message  author is a bot, return aka ignore the inputs
    

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);

    const cmd = args.shift().toLowerCase(); //creating the cmd argument by shifting the args by 1
    
    if (cmd.length === 0) return message.reply(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle(`Unkown command, try: **\`${prefix}help\`**`).setDescription(`To play Music simply type \`${prefix}play <Title / Url>\``).setFooter(ee.footertext, ee.footericon))
    
    let command = client.commands.get(cmd); //get the command from the collection
    if (!command) command = client.commands.get(client.aliases.get(cmd)); //if the command does not exist, try to get it by his alias

   
    if (command) //if the command is now valid
    {
        if (!cooldowns.has(command.name)) { //if its not in the cooldown, set it too there
            cooldowns.set(command.name, new Collection());
        }
        
        const now = Date.now(); //get the current time
        const timestamps = cooldowns.get(command.name); //get the timestamp of the last used commands
        const cooldownAmount = (command.cooldown || 1) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
      
        if (timestamps.has(message.author.id)) { //if the user is on cooldown
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
      
          if (now < expirationTime) { //if he is still on cooldonw
            const timeLeft = (expirationTime - now) / 1000; //get the lefttime
            return message.reply( 
              `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
            ); //send an information message
          }
        }
      
        timestamps.set(message.author.id, now); //if he is not on cooldown, set it to the cooldown
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again
      try{
        command.run(client, message, args, message.member, args.join(" "), matchedPrefix); //run the command with the parameters:  client, message, args, user, text, prefix, 
      }catch (e){
        console.log(String(e.stack).red)
        return message.reply("Something went wrong while, running the: `" + command.name + "` command")
      }
    } 
    else //if the command is not found send an info msg
    return message.reply(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle(`Unkown command, try: **\`${prefix}help\`**`).setDescription(`To play Music simply type \`${prefix}play <Title / Url>\``).setFooter(ee.footertext, ee.footericon))
    
});

client.login(config.token); //login into the bot