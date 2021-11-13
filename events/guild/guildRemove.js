//The Module
const { Permissions } = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`)
//If the Bot gets Remove from the Guild and there is still a player, remove it ;)
module.exports = async (client, guild) => {
    var player = client.manager.players.get(guild.id);
    if (!player) return;
    if (guild.id == player.guild) {
    //destroy
    player.destroy();
    }
}