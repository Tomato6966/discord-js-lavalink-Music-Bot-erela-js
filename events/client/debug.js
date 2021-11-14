//here the event starts
const settings = require(`${process.cwd()}/botconfig/settings.json`);
module.exports = (client, info) => {
  if (!settings[`debug-discordjs-logs`]) return;
  console.log(String(info).grey);
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
