const Discord = require("discord.js");
const fs = require("fs")
const config = require("../botconfig/config.json");
const ee = require("../botconfig/embed.json");
const radios = require("../botconfig/radiostations.json");
module.exports = (client) => {
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
    * The Euqalizer Settings
  */
    client.defaultEQ = [
        { band: 0, gain: 0.375 },
        { band: 1, gain: 0.025 },
        { band: 2, gain: 0.0125 },
        { band: 3, gain: 0 },
        { band: 4, gain: 0 },
        { band: 5, gain: -0.0125 },
        { band: 6, gain: -0.025 },
        { band: 7, gain: -0.0175 },
        { band: 8, gain: 0 },
        { band: 9, gain: 0 },
        { band: 10, gain: 0.0125 },
        { band: 11, gain: 0.025 },
        { band: 12, gain: 0.375 },
        { band: 13, gain: 0.125 },
        { band: 14, gain: 0.125 },
    ];
    client.bassboost = {
        none: client.defaultEQ,
        low: [
            { band: 0, gain: 0.0625 },
            { band: 1, gain: 0.125 },
            { band: 2, gain: -0.125 },
            { band: 3, gain: -0.0625 },
            { band: 4, gain: 0 },
            { band: 5, gain: -0.0125 },
            { band: 6, gain: -0.025 },
            { band: 7, gain: -0.0175 },
            { band: 8, gain: 0 },
            { band: 9, gain: 0 },
            { band: 10, gain: 0.0125 },
            { band: 11, gain: 0.025 },
            { band: 12, gain: 0.375 },
            { band: 13, gain: 0.125 },
            { band: 14, gain: 0.125 },
        ],
        medium: [
            { band: 0, gain: 0.125 },
            { band: 1, gain: 0.25 },
            { band: 2, gain: -0.25 },
            { band: 3, gain: -0.125 },
            { band: 4, gain: 0 },
            { band: 5, gain: -0.0125 },
            { band: 6, gain: -0.025 },
            { band: 7, gain: -0.0175 },
            { band: 8, gain: 0 },
            { band: 9, gain: 0 },
            { band: 10, gain: 0.0125 },
            { band: 11, gain: 0.025 },
            { band: 12, gain: 0.375 },
            { band: 13, gain: 0.125 },
            { band: 14, gain: 0.125 },
        ],
        high: [
            { band: 0, gain: 0.1875 },
            { band: 1, gain: 0.375 },
            { band: 2, gain: -0.375 },
            { band: 3, gain: -0.1875 },
            { band: 4, gain: 0 },
            { band: 5, gain: -0.0125 },
            { band: 6, gain: -0.025 },
            { band: 7, gain: -0.0175 },
            { band: 8, gain: 0 },
            { band: 9, gain: 0 },
            { band: 10, gain: 0.0125 },
            { band: 11, gain: 0.025 },
            { band: 12, gain: 0.375 },
            { band: 13, gain: 0.125 },
            { band: 14, gain: 0.125 },
        ],
        earrape: [
            { band: 0, gain: 0.25 },
            { band: 1, gain: 0.5 },
            { band: 2, gain: -0.5 },
            { band: 3, gain: -0.25 },
            { band: 4, gain: 0 },
            { band: 5, gain: -0.0125 },
            { band: 6, gain: -0.025 },
            { band: 7, gain: -0.0175 },
            { band: 8, gain: 0 },
            { band: 9, gain: 0 },
            { band: 10, gain: 0.0125 },
            { band: 11, gain: 0.025 },
            { band: 12, gain: 0.375 },
            { band: 13, gain: 0.125 },
            { band: 14, gain: 0.125 },
        ],
    };
    client.eqs = { music: client.defaultEQ, bassboost: client.bassboost.medium, earrape: client.bassboost.earrape };
};
