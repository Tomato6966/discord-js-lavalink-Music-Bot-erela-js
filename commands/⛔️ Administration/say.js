const config = require("../../botconfig/config.json");
module.exports = {
    name: "say",
    category: "⛔️ Administration",
    aliases: ["say", "sayit"],
    cooldown: 4,
    usage: "say <Text>",
    description: "Resends the message",
    run: async (client, message, args, cmduser, text, prefix) => {
        message.delete({ timeout: 350 }).catch((e) => console.log(String(e.stack).red));
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this command!");
        if (!text) return message.reply("Please add something you want to say! Usage: `?say <Text>`");
        message.channel.send(text).catch((e) => console.log(String(e.stack).red));
    },
};
