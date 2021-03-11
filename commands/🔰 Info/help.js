const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: "help",
    category: "🔰 Info",
    aliases: ["h", "commandinfo"],
    cooldown: 4,
    usage: "help [Command]",
    description: "Returns all Commmands, or one specific command",
    run: async (client, message, args, user, text, prefix) => {
      try{
        if (args[0]) {
          const embed = new MessageEmbed();
          const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
          if (!cmd) {
              return message.channel.send(embed.setColor(ee.wrongcolor).setDescription(`No Information found for command **${args[0].toLowerCase()}**`));
          }
          if (cmd.name) embed.addField("**Command name**", `\`${cmd.name}\``);
          if (cmd.name) embed.setTitle(`Detailed Information about:\`${cmd.name}\``);
          if (cmd.description) embed.addField("**Description**", `\`${cmd.description}\``);
          if (cmd.aliases) try{embed.addField("**Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);}catch{}
          if (cmd.cooldown) embed.addField("**Cooldown**", `\`${cmd.cooldown} Seconds\``);
          else embed.addField("**Cooldown**", `\`3 Seconds\``);
          if (cmd.usage) {
              embed.addField("**Usage**", `\`${config.prefix}${cmd.usage}\``);
              embed.setFooter("Syntax: <> = required, [] = optional");
          }
          if (cmd.useage) {
              embed.addField("**Useage**", `\`${config.prefix}${cmd.useage}\``);
              embed.setFooter("Syntax: <> = required, [] = optional");
          }
          return message.channel.send(embed.setColor(ee.main));
        } else {
          let userperms = message.member.hasPermission("ADMINISTRATOR");
          let owner = config.ownerIDS.includes(message.author.id);
          let cmduser = message.author.id;

const baseembed = new MessageEmbed()
.setColor(ee.color)
.setFooter("react with the right emoji!", ee.footericon)
.setTitle("Pick the right Category")
.setDescription(`
💪  **==>** To see the **Source Help** Commands

💰  **==>** To see the **Premium** Commands

🔰  **==>** To see the **Information** Commands

🕹️  **==>** To see the **Fun** Commands

🎶  **==>** To see the **Music** Commands

👀  **==>** To see the **Audio Filter** Commands

⚜️  **==>** To see the **Saved (custom) Queue** Commands
${owner == true ? `\n👑 **==>** To see the **Owner** Commands` : ""}
${userperms == true ? `\n⚙️ **==>** To see the **Setting** Commands

🚫  **==>** To see the **Administration** Commands` : ""}
`)
          sendBaseEmbed();

          async function sendBaseEmbed(basemsg){
            try{
              let msg;
              if(basemsg) msg = await basemsg.edit(baseembed)
              else msg = await message.channel.send(baseembed);

              let emojis = ["💪", "💰", "🔰", "🕹️", "🎶", "👀", "⚜️"]
              if(owner) emojis.push("👑")
              if(userperms) {
                emojis.push("⚙️")
                emojis.push("🚫")
              }

              for(const emoji of emojis)
                msg.react(emoji).catch(e=>console.log("couldnt add reaction"))

              const filter = (reaction, user) => {
                	return emojis.includes(reaction.emoji.name) && user.id === cmduser;
                };

              msg.awaitReactions(filter, { max: 1, time: 30 * 1000, errors: ['time'] })
            	.then(collected => {
                  collected.first().users.remove(user.id).catch(error => console.error('Failed to clear reactions: '));
                  var found = false;
                  for (var i = 0; i < client.categories.length && !found; i++) {
                    if (client.categories[i].includes(collected.first().emoji.name)) {
                      sendCategoryEmbed(client.categories[i], msg)
                      break;
                    }
                  }
              })
            	.catch(e => {
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`${emoji.msg.ERROR} ERROR | TIME RAN OUT  `)
                    .setDescription(`\`\`\`${e.message}\`\`\``)
                ).then(msg=>msg.delete({timeout: 4000}).catch(e => console.log("couldn't delete message this is a catch to prevent a crash".grey)))
            	});
            } catch (e) {
                console.log(String(e.stack).bgRed)
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
                    .setDescription(`\`\`\`${e.message}\`\`\``)
                );
            }
          }
          function sendCategoryEmbed(category, message){

            try{
              const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
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

              const embed = new MessageEmbed()
              .setColor(ee.color)
              .setThumbnail(client.user.displayAvatarURL())
              .setTitle(`MENU 🔰 **${category.toUpperCase()} [${items.length}]**`)
              .setDescription("*To go back react with:* ⏪")
              .setFooter(`To see command descriptions and Inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());

              if (category.toLowerCase().includes("custom")){
                const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
                try{embed.addField(`**${category.toUpperCase()} [${items.length}]**`, `> \`${items[0]}\`\n\n**Usage:**\n> \`${cmd.usage}\``);}catch{}
              }
              else{
                try{embed.addField(`\u200b`, `> ${result[0].join("\n> ")}`, true);}catch{}
                try{embed.addField(`\u200b`, `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`, true);}catch{}
                try{embed.addField(`\u200b`, `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`, true);}catch{}
              }
              message.edit(embed).then(msg=>{
                  msg.react("⏪")
                  const filter = (reaction, user) => {
                  	return ["⏪"].includes(reaction.emoji.name) && user.id === cmduser;
                  };
                msg.awaitReactions(filter, { max: 1, time: 60 * 1000, errors: ['time'] })
              	.then(collected => {
                  collected.first().users.remove(user.id).catch(error => console.error('Failed to clear reactions: '));
                  sendBaseEmbed(msg);
                })
              	.catch(e => {
                  try{
                    message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: '));
                  }catch{ /* */ }
              	});
              })
            } catch (e) {
                console.log(String(e.stack).bgRed)
                return message.channel.send(new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
                    .setDescription(`\`\`\`${e.message}\`\`\``)
                );
            }
          }
 /* OLD HELP COMMAND
          const embed = new MessageEmbed()
              .setColor(ee.color)
              .setThumbnail(client.user.displayAvatarURL())
              .setTitle("HELP MENU 🔰 OTHER Commands")
              .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          const embed2 = new MessageEmbed()
              .setColor(ee.color)
              .setThumbnail(client.user.displayAvatarURL())
              .setTitle("HELP MENU -🎶 MUSIC Commands")
              .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          const commands = (category) => {
              return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          };
          try {
            for (let i = 0; i < client.categories.length; i += 1) {
              const current = client.categories[i];
              const items = commands(current);
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
              if (current.toLowerCase().includes("music") || current.toLowerCase().includes("filter")){
                try{embed2.addField(`**${current.toUpperCase()} [${items.length}]**`, `> ${result[0].join("\n> ")}`, true);}catch{}
                try{embed2.addField(`\u200b`, `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`, true);}catch{}
                try{embed2.addField(`\u200b`, `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`, true);}catch{}
                continue;
              }
              if (current.toLowerCase().includes("custom")){
                const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
                if (!cmd) {
                    continue;
                }
                try{embed2.addField(`**${current.toUpperCase()} [${items.length}]**`, `> \`${items[0]}\`\n**Usage:**\n> \`${cmd.usage}\``);}catch{}
                continue;
              }
              try{embed.addField(`**${current.toUpperCase()} [${items.length}]**`, `> ${result[0].join("\n> ")}`, true);}catch{}
              try{embed.addField(`\u200b`, `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`, true);}catch{}
              try{embed.addField(`\u200b`, `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`, true);}catch{}
            }
          } catch (e) {
              console.log(String(e.stack).red);
          }
          message.channel.send(embed);
          return message.channel.send(embed2);*/
      }
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.message}\`\`\``)
        );
    }
  }
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
