const config = require("../../botconfig/config.json");
module.exports = {
    name: "say",
    category: "⛔️ Administration",
    aliases: ["say", "sayit"],
    cooldown: 4,
    usage: "say <Text>",
    description: "Resends the message",
    memberpermissions: ["MANAGE_GUILD"],
    run: async (client, message, args, cmduser, text, prefix) => {
        if (!text) return message.channel.send("Please add something you want to say! Usage: `?say <Text>`");
        message.channel.send(text);
    },
};
