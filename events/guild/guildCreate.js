//The Module
const {
    Permissions
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`)
module.exports = async (client, guild) => {
    if (!config[`show-serverjoins`]) return;
    if (!guild || guild.available === false) return
    let theowner = "NO OWNER DATA! ID: ";
    await guild.fetchOwner().then(({
        user
    }) => {
        theowner = user;
    }).catch(() => {})
    databasing(client, guild.id)
    let embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(`👍 Joined a New Server`)
        .addField("Guild Info", `>>> \`\`\`${guild.name} (${guild.id})\`\`\``)
        .addField("Owner Info", `>>> \`\`\`${theowner ? `${theowner.tag} (${theowner.id})` : `${theowner} (${guild.ownerId})`}\`\`\``)
        .addField("Member Count", `>>> \`\`\`${guild.memberCount}\`\`\``)
        .addField("Servers Bot is in", `>>> \`\`\`${client.guilds.cache.size}\`\`\``)
        .addField("Leave Server:", `>>> \`\`\`${config.prefix}leaveserver ${guild.id}\`\`\``)
        .setThumbnail(guild.iconURL({
            dynamic: true
        }));
    for (const owner of config.ownerIDS) {
        client.users.fetch(owner).then(user => {
            user.send({
                embeds: [embed]
            }).catch(() => {})
        }).catch(() => {});
    }
}