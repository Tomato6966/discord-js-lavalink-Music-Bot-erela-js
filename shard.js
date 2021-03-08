const { ShardingManager } = require("discord.js");
const config = require("./botconfig/config.json");

const shards = new ShardingManager("./index.js", {
  token: config.token,
  totalShards: "auto",
});

shards.on("shardCreate", shard => console.log(` || <==> || [${String(new Date).split(" ", 5).join(" ")}] || <==> || Launched Shard #${shard.id} || <==> ||`))

shards.spawn(shards.totalShards, 10000);
