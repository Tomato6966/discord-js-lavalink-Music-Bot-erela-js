const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "equalizer",
    category: "👀 Filter",
    aliases: ["eq"],
    description: "Changes the Equalizer",
    usage: "bassboost <music/bassboost/earrape>",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));
        if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
        let level = "none";
        if (!args.length || (!client.eqs[args[0].toLowerCase()] && args[0].toLowerCase() != "none")) return message.reply("Bass boost level must be one of the following: `music`, `bassboost`, `earrape`");
        level = args[0].toLowerCase();
        switch (level) {
            case "music":
                player.setEQ(client.eqs.music);
                break;
            case "bassboost":
                player.setEQ(client.eqs.bassboost);
                break;
            case "earrape":
                player.setVolume(player.volume + 50);
                player.setEQ(client.eqs.earrape);
                break;
        }
        const embed = new MessageEmbed().setTitle(`:white_check_mark:Set Equalizer to\`${level}\`.`).setColor(ee.color).setFooter(ee.footertext, ee.footericon);
        return message.reply(embed);
    },
};
