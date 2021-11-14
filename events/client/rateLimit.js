//here the event starts
const settings = require(`${process.cwd()}/botconfig/settings.json`);
module.exports = (client, rateLimitData) => {
  if (!settings["ratelimit-logs"]) return;
  console.warn(rateLimitData)
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
