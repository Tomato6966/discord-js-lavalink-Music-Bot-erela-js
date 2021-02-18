const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const radios = require("../../botconfig/radiostations.json");
const playermanager = require("../../handlers/playermanager");
const { stations } = require("../../handlers/functions");
module.exports = {
    name: "radio",
    category: "🎶 Music",
    aliases: ["stream"],
    description: "Plays a defined radiostream",
    usage: "radio <1-183>",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        if (!args[0]) return stations(client, config.prefix, message);
        if (isNaN(args[0])) {
            return message.reply(
                new Discord.MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setAuthor(`Error`, ee.footericon, "https://milrato.eu")
                    .setFooter(client.user.username, config.AVATARURL)
                    .setTitle(`Not a valid radio station please use a Number between\`1\`and\`183\``)
            );
        }
        if (Number(args[1]) > 150) return message.reply("**Maximum Volume is `150`!**");
        if (Number(args[1]) < 1) return message.reply("**Minimum Volume is `1`!**");
        let volume;
        if (isNaN(args[1])) {
            volume = 50;
        } else {
            volume = args[1];
        }
        let args2;
        if (Number([args[0]]) > 0 && Number(args[0]) <= 10) {
            args2 = radios.EU.United_Kingdom[Number(args[0]) - 1].split(``);
        } else if (Number([args[0]]) > 10 && Number(args[0]) <= 20) {
            args2 = radios.EU.Austria[Number(args[0]) - 10 - 1].split(``);
        } else if (Number([args[0]]) > 20 && Number(args[0]) <= 30) {
            args2 = radios.EU.Belgium[Number(args[0]) - 20 - 1].split(``);
        } else if (Number([args[0]]) > 30 && Number(args[0]) <= 40) {
            args2 = radios.EU.Bosnia[Number(args[0]) - 30 - 1].split(``);
        } else if (Number([args[0]]) > 40 && Number(args[0]) <= 50) {
            args2 = radios.EU.Czech[Number(args[0]) - 40 - 1].split(``);
        } else if (Number([args[0]]) > 50 && Number(args[0]) <= 60) {
            args2 = radios.EU.Denmark[Number(args[0]) - 50 - 1].split(``);
        } else if (Number([args[0]]) > 60 && Number(args[0]) <= 70) {
            args2 = radios.EU.Germany[Number(args[0]) - 60 - 1].split(``);
        } else if (Number([args[0]]) > 70 && Number(args[0]) <= 80) {
            args2 = radios.EU.Hungary[Number(args[0]) - 70 - 1].split(``);
        } else if (Number([args[0]]) > 80 && Number(args[0]) <= 90) {
            args2 = radios.EU.Ireland[Number(args[0]) - 80 - 1].split(``);
        } else if (Number([args[0]]) > 90 && Number(args[0]) <= 100) {
            args2 = radios.EU.Italy[Number(args[0]) - 90 - 1].split(``);
        } else if (Number([args[0]]) > 100 && Number(args[0]) <= 110) {
            args2 = radios.EU.Luxembourg[Number(args[0]) - 100 - 1].split(``);
        } else if (Number([args[0]]) > 110 && Number(args[0]) <= 120) {
            args2 = radios.EU.Romania[Number(args[0]) - 110 - 1].split(``);
        } else if (Number([args[0]]) > 120 && Number(args[0]) <= 130) {
            args2 = radios.EU.Serbia[Number(args[0]) - 120 - 1].split(``);
        } else if (Number([args[0]]) > 130 && Number(args[0]) <= 140) {
            args2 = radios.EU.Spain[Number(args[0]) - 130 - 1].split(``);
        } else if (Number([args[0]]) > 140 && Number(args[0]) <= 150) {
            args2 = radios.EU.Sweden[Number(args[0]) - 140 - 1].split(``);
        } else if (Number([args[0]]) > 150 && Number(args[0]) <= 160) {
            args2 = radios.EU.Ukraine[Number(args[0]) - 150 - 1].split(``);
        } else if (Number([args[0]]) > 160 && Number(args[0]) <= 183) {
            args2 = radios.OTHERS.request[Number(args[0]) - 160 - 1].split(``);
        } else {
            return message.reply("This radio station was not found");
        }
        const song = { title: args2[0].replace("-", " "), url: args2[1] };
        args = [song.url];
        message
            .reply(
                new Discord.MessageEmbed()
                    .setColor(ee.color)
                    .setTitle("Searching: " + song.title)
                    .setURL(song.url)
                    .setFooter(ee.footertext, ee.footericon)
            )
            .then((msg) => msg.delete({ timeout: 5000 }).catch((e) => console.log(String(e.stack).red)));
        playermanager(client, message, args, "song:youtube");
    },
};
