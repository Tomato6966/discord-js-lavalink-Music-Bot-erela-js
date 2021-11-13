var {
    Manager
  } = require("erela.js"),
    { Permissions } = require("discord.js"),
    Spotify = require("erela.js-spotify"),
    Deezer = require("erela.js-deezer"),
    Facebook = require("erela.js-facebook"),
    config = require(`${process.cwd()}/botconfig/config.json`),
  
    clientID = process.env.clientID || config.spotify.clientID,
    clientSecret = process.env.clientSecret || config.spotify.clientSecret;
  module.exports = (client) => {
      if ((!clientID || clientID.length <5) || (!clientSecret || clientSecret.length <5)) {
        client.manager = new Manager({
          nodes: config.clientsettings.nodes,
          plugins: [
            new Deezer(),
            new Facebook(),
          ],
          send(id, payload) {
            var guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
          },
        });
      } else {
        client.manager = new Manager({
          nodes: config.clientsettings.nodes,
          plugins: [
            new Spotify({
              clientID, //get a clientID from there: https://developer.spotify.com/dashboard
              clientSecret
            }),
            new Deezer(),
            new Facebook(),
          ],
          send(id, payload) {
            var guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
          },
        });
      }
      //Log information
      client.logger(`Player for the Bot ${client.user ? client.user.username + " " : ""}created!`);
      
      
      client.once("ready", () => {
        client.manager.init(client.user.id);
      });
      //require the other events
      require("./node_events")(client)
      require("./events")(client)
      require("./musicsystem")(client)
      
  };
  /**
   * @INFO
   * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
   * @INFO
   * Work for Milrato Development | https://milrato.dev
   * @INFO
   * Please mention Him / Milrato Development, when using this Code!
   * @INFO
   */
  