/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
//Importing all needed Commands
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const Enmap = require("enmap"); //this package is our Database! We will use it to save the data for ever!
const fs = require("fs"); //this package is for reading files and getting their inputs
//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client = new Discord.Client({
//  messageCacheLifetime: 60,
  fetchAllMembers: false,
//  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
//Loading files, with the client variable like Command Handler, Event Handler, ...
["clientvariables", "command", "events", "erelahandler", "requestreacts"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
//Each Database gets a own file and folder which is pretty handy!
client.premium = new Enmap({name: "premium", dataDir: "./databases/premium"})
client.stats = new Enmap({name: "stats", dataDir: "./databases/stats"})
client.settings = new Enmap({name: "setups", dataDir: "./databases/settings"})
client.setups = new Enmap({name: "setups", dataDir: "./databases/setups",})
client.queuesaves = new Enmap({name: "queuesaves", dataDir: "./databases/queuesaves", ensureProps: false})
client.modActions = new Enmap({name: 'actions', dataDir: "./databases/warns"});
client.userProfiles = new Enmap({name: 'userProfiles', dataDir: "./databases/warns" });

//login into the bot
client.login(require("./botconfig/config.json").token);
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
