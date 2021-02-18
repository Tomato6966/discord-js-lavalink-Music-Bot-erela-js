const config = require("../../botconfig/config.json");
module.exports = {
    name: "react",
    category: "⛔️ Administration",
    aliases: ["delete"],
    description: "Closes the ticket",
    useage: "react <msgid> <Emoji>",
    run: async (client, message, args, cmduser, text, prefix) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You are not allowed to run this command!");
        try {
            message.delete({ timeout: 350 }).catch((e) => console.log(String(e.stack).red));
            message.channel.messages
                .fetch(args[0])
                .then((msg) => msg.react(args[1]).catch((e) => console.log(String(e.stack).red)))
                .catch((e) => console.log(String(e.stack).red));
        } catch {}
    },
};
