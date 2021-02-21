const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { format } = require("../../handlers/functions");
module.exports = {
    name: "queue",
    category: "🎶 Music",
    aliases: ["qu", "que", "queu", "list"],
    description: "Shows the Queue",
    usage: "queue",
    run: async (client, message, args, cmduser, text, prefix) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.channel.send("there is no player for this guild.");
        const queue = player.queue;
        const embed = new MessageEmbed().setAuthor(`Queue for ${message.guild.name}`);
        const multiple = 20;
        const page = args.length && Number(args[0]) ? Number(args[0]) : 1;
        const end = page * multiple;
        const start = end - multiple;
        const tracks = queue.slice(start, end);
        if (queue.current) embed.addField("Current", `[${queue.current.title}](${queue.current.uri})`);
        if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
        else embed.setDescription(tracks.map((track, i) => `**${start + ++i})** [${track.title.substr(0, 60)}](${track.uri}) - \`${track.isStream ? "LIVE STREAM" : format(track.duration)}\``).join("\n"));
        embed.setColor(ee.color);
        const maxPages = Math.ceil(queue.length / multiple);
        embed.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages} | Type \`?queue <Number>\``);
        return message.channel.send(embed);
    },
};
