const Enmap = require("enmap");
module.exports = client => {

  client.stats = new Enmap({
    name: "stats",
    dataDir: "./databases/stats"
  });
  client.musicsettings = new Enmap({
    name: "musicsettings",
    dataDir: "./databases/musicsettings"
  });
  client.autoresume = new Enmap({
    name: "autoresume",
    dataDir: "./databases/musicsettings"
  });
  client.settings = new Enmap({
    name: "settings",
    dataDir: "./databases/settings"
  });
  client.queuesaves = new Enmap({
    name: "queuesaves",
    dataDir: "./databases/queuesaves",
    ensureProps: false
  });
  client.premium = new Enmap({
    name: "premium",
    dataDir: "./databases/premium"
  })




  client.premium.ensure("global", {
    guilds: [],
  });

  client.stats.ensure("global", {
    commands: 0,
    songs: 0,
    setups: 0
  });
}
