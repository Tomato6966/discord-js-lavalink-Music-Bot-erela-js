const config = require("../../botconfig/config.json");
module.exports = {
    name: "react",
    category: "⛔️ Administration",
    aliases: ["delete"],
    description: "Closes the ticket",
    useage: "react <msgid> <Emoji>",
    memberpermissions: ["MANAGE_GUILD"],
    run: async (client, message, args, cmduser, text, prefix) => {
        try {
            message.channel.messages
                .fetch(args[0])
                .then((msg) => msg.react(args[1]).catch((e) => console.log(String(e.stack).red)))
                .catch((e) => console.log(String(e.stack).red));
        } catch {}
    },
};
