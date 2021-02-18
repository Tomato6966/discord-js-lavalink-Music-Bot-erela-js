const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "embed",
    category: "⛔️ Administration",
    aliases: [""],
    description: "Resends the message as an embed",
    useage: "embed <Title> + <Description>",
    run: async (client, message, args, cmduser, text, prefix) => {
        message.delete({ timeout: 350 }).catch((e) => console.log(String(e.stack).red));
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this command!");
        const argsneu = message.content.slice(5 + prefix.length).split("+");
        if (!argsneu) return message.reply("Useage: `embed <Title> + <Description>`");
        const Title = argsneu[0];
        if (Title.length > 256) return message.reply(":x: Error | Title is only allowed to be `256` Letters Long!\nUseage: `embed <Title> + <Description>`");
        const Description = argsneu.slice(1).join(" ");
        if (Description.length > 2048) return message.reply(":x: Error | Title is only allowed to be `256` Letters Long!\nUseage: `embed <Title> + <Description>`");
        const embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTimestamp();
        try {
            embed.setTitle(Title);
        } catch {}
        try {
            embed.setDescription(Description);
        } catch {}
        message.channel.send(embed).catch((e) => console.log(String(e.stack).red));
    },
};
