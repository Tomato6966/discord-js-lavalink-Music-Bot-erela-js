const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "help",
    category: "🔰 Info",
    aliases: ["h", "commandinfo"],
    cooldown: 5,
    usage: "help [Command]",
    description: "Returns all Commmands, or one specific command",
    run: async (client, message, args, user, text, prefix) => {
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return getAll(client, message);
        }
    },
};
function getAll(client, message) {
    const embed = new MessageEmbed()
        .setColor(ee.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle("HELP MENU")
        .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
    const commands = (category) => {
        return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
    };
    try {
        for (let i = 0; i < client.categories.length; i += 1) {
            const current = client.categories[i];
            const info = commands(current);
            const items = info;
            const n = 3;
            const result = [[], [], []];
            const wordsPerLine = Math.ceil(items.length / 3);
            for (let line = 0; line < n; line++) {
                for (let i = 0; i < wordsPerLine; i++) {
                    const value = items[i + line * wordsPerLine];
                    if (!value) continue;
                    result[line].push(value);
                }
            }
            if (current.toLowerCase().includes("administration")) {
                if (!message.member.hasPermission("ADMINISTRATOR")) continue;
            }
            if (current.toLowerCase().includes("owner")) {
                if (!config.ownerIDS.includes(message.author.id)) continue;
            }
            embed.addField(`**${current.toUpperCase()}**`, `> ${result[0].join("\n> ")}`, true);
            embed.addField(`\u200b`, `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`, true);
            embed.addField(`\u200b`, `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`, true);
        }
    } catch (e) {
        console.log(String(e.stack).red);
    }
    return message.channel.send(embed);
}
function getCMD(client, message, input) {
    const embed = new MessageEmbed();
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    if (!cmd) {
        return message.channel.send(embed.setColor(ee.wrongcolor).setDescription(`No Information found for command **${input.toLowerCase()}**`));
    }
    if (cmd.name) embed.addField("**Command name**", `\`${cmd.name}\``);
    if (cmd.name) embed.setTitle(`Detailed Information about:\`${cmd.name}\``);
    if (cmd.description) embed.addField("**Description**", `\`${cmd.description}\``);
    if (cmd.aliases) embed.addField("**Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
    if (cmd.cooldown) embed.addField("**Cooldown**", `\`${cmd.cooldown} Seconds\``);
    else embed.addField("**Cooldown**", `\`1 Second\``);
    if (cmd.usage) {
        embed.addField("**Usage**", `\`${config.prefix}${cmd.usage}\``);
        embed.setFooter("Syntax: <> = required, [] = optional");
    }
    if (cmd.useage) {
        embed.addField("**Useage**", `\`${config.prefix}${cmd.useage}\``);
        embed.setFooter("Syntax: <> = required, [] = optional");
    }
    return message.channel.send(embed.setColor(ee.main));
}
