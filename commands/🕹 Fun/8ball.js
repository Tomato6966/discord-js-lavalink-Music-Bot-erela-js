const Discord = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
    name: "8ball",
    category: "🕹 Fun",
    description: "Answers your Question",
    usage: "8ball <Questions>",
    run: async(client, message, args) => {
        const Discord = require('discord.js');
        const request = require('request');
        const question = args.slice(0).join(' ');
        if(!question) return message.channel.send("You didn't ask a question");
        const url = 'https://8ball.delegator.com/magic/JSON/' + question;
        request(url, function(err, response, body) {
            if(err) {
                message.channel.send("Can't get 8ball replies, try again later.");
            }
            body = JSON.parse(body);
            let embedColor = `RANDOM`;
            if(body.magic.type === "Affirmative") embedColor = "#0dba35";
            if(body.magic.type === "Contrary") embedColor = "#ba0d0d";
            if(body.magic.type === "Neutral") embedColor = "#6f7275";
            const eightBallEmbed = new Discord.MessageEmbed()
            .setTitle("8ball")
            .setColor(embedColor)
            .setThumbnail(message.author.avatarURL)
            .addField("Question: ", question, false)
            .addField("Asked by: ", message.author.tag, false)
            .addField("Reply: ", body.magic.answer,  false)
            .setFooter("API provided by Delegator 8ball");
            message.channel.send(eightBallEmbed)
        });
    }
};