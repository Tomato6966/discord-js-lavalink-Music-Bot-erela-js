const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const {format} = require("duratiform")
module.exports = {
    name: "queue",
    category: "🎶 Music",
    aliases: [""],
    description: "Shows the Queue",
    usage: "queue",
    run: async(client, message, args) => {
      const { channel } = message.member.voice;
      const player = client.manager.players.get(message.guild.id);
      if(!player) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("There is nothing playing"));  
      if(channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to be in my voice channel to use this command!"));
      let currentPage = 0;
      const embeds = generateQueueEmbed(message, player.queue)

  const queueEmbed = await message.channel.send(
    `**Page: ${currentPage + 1}/${embeds.length}**`,
    embeds[currentPage]
  );

  try {
    await queueEmbed.react("⬅️");
    await queueEmbed.react("➡️");
  } catch (error) {
    console.error(error);
    message.channel.send(error.message).catch(console.error);
  }

  const filter = (reaction, user) =>
    ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
  const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

  collector.on("collect", async (reaction, user) => {
    try {
      if (reaction.emoji.name === "➡️") {
        if (currentPage < embeds.length - 1) {
          currentPage++;
          queueEmbed.edit(
            `**Page: ${currentPage + 1}/${embeds.length}**`,
            embeds[currentPage]
          );
        }
      } else if (reaction.emoji.name === "⬅️") {
        if (currentPage !== 0) {
          --currentPage;
          queueEmbed.edit(
            `**Page: ${currentPage + 1}/${embeds.length}**`,
            embeds[currentPage]
          );
        }
      } 
      await reaction.users.remove(message.author.id);
    } catch (error) {
      console.error(error);
      return message.channel.send(error.message).catch(console.error);
    }
  });
    }
};
function generateQueueEmbed(message, queue) {
  let embeds = [];
  let k = 10;

  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;

    const info = current.map((track) => `**${++j})** - [\`${track.title}\`](${track.uri}) - Requested by **${track.requester.tag}**`).join("\n");

    const embed = new MessageEmbed()
      .setAuthor(`Current queue for ${message.guild.name}`, message.guild.iconURL())
      .setColor(ee.color).setFooter(ee.footertext, ee.footericon)
      .setTitle(`**0)** - [\`${queue.current.title}\`](${queue.current.uri}) - Requested by **${queue.current.requester.tag}**`)
      .setDescription(info)
      .setTimestamp();
    embeds.push(embed);
  }

  return embeds;
}