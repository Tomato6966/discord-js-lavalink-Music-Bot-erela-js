const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const moment = require('moment');
const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};
function  trimArray(arr, maxLen = 10) {
    if (arr.length > maxLen) {
      const len = arr.length - maxLen;
      arr = arr.slice(0, maxLen);
      arr.push(`${len} more...`);
    }
    return arr;
  }
module.exports = {
  name: "userinfo",
  aliases: ["uinfo"],
  category: "🔰 Info",
  description: "Get information about a user",
  usage: "userinfo [@USER]",
  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      
      const user = message.mentions.users.first() || message.author;
      if (!user)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(":x: Error | Please Mention the User you wanna get Information about")
        );
        const member = message.mentions.members.last() || message.member;
        const roles = member.roles.cache
          .sort((a, b) => b.position - a.position)
          .map(role => role.toString())
          .slice(0, -1);
        const userFlags = member.user.flags.toArray();
        const embeduserinfo = new MessageEmbed()
        try{embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))}catch{}
        try{embeduserinfo.setAuthor("Information about:   " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({ dynamic: true }))}catch{}
        try{embeduserinfo.addField('**❯ Username:**',`\`${member.user.username}#${member.user.discriminator}\``,true)}catch{}
        try{embeduserinfo.addField('**❯ ID:**',`\`${member.id}\``,true)}catch{}
        try{embeduserinfo.addField('**❯ Avatar:**',`[\`Link to avatar\`](${member.user.displayAvatarURL({ format: "png" })})`,true)}catch{}
        try{embeduserinfo.addField('**❯ Date Joined DC:**',`\`${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')}   ${moment(member.user.createdTimestamp).fromNow()}\``,true)}catch{}
        try{embeduserinfo.addField('**❯ Date Joined Server:**',`\`${moment(member.joinedAt).format('LL LTS')}\``,true)}catch{}
        try{embeduserinfo.addField('**❯ Flags:**',`\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``,true)}catch{}
        try{embeduserinfo.addField('**❯ Status:**',`\`${member.user.presence.status}\``,true)}catch{}
        try{embeduserinfo.addField('**❯ Game:**',`\`${member.user.presence.game || 'Not playing a game.'}\``,true)}catch{}
        try{embeduserinfo.addField('**❯ Highest Role:**',`${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest}`,true)}catch{}
        try{embeduserinfo.addField(`**❯ \`${roles.length}\` Roles:**`,`${roles.length < 10 ? roles.join('\n') : roles.length > 10 ? this.trimArray(roles) : 'None'}`)}catch{}
        embeduserinfo.setColor(ee.color)
        embeduserinfo.setFooter(ee.footertext, ee.footericon)

      message.channel.send(embeduserinfo)
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
