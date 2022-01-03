const {
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  MessageSelectMenu
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  duration,
  handlemsg
} = require(`${process.cwd()}/handlers/functions`)
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo", "halp", "hilfe"],
  usage: "help [Command/Category]",
  description: "Returns all Commmands, or one specific command",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    if (args[0]) {
      const embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null);
      const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
      var cat = false;
      if (!cmd) {
        cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
      }
      if (!cmd && (!cat || cat == null)) {
        return message.reply({
          embeds: [embed.setColor(es.wrongcolor).setDescription(handlemsg(client.la[ls].cmds.info.help.noinfo, {
            command: args[0].toLowerCase()
          }))]
        });
      } else if (cat) {
        var category = cat;
        const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
        const embed = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
          .setThumbnail(client.user.displayAvatarURL())
          .setTitle(`💿 Detailed Information about: \`${cat.name}\``)
          .setFooter(client.getFooter("No Custom Information for ", client.user.displayAvatarURL()));
        let embeds = allotherembeds_eachcategory();
        if (cat == "🔰 Info")
          return message.reply({
            embeds: [embeds[0]]
          })
        if (cat == "🎶 Music")
          return message.reply({
            embeds: [embeds[1]]
          })
        if (cat == "👀 Filter")
          return message.reply({
            embeds: [embeds[2]]
          })
        if (cat == "💰 Premium")
          return message.reply({
            embeds: [embeds[3]]
          })
        if (cat == "⚙️ Settings")
          return message.reply({
            embeds: [embeds[4]]
          })
        if (cat == "👑 Owner")
          return message.reply({
            embeds: [embeds[5]]
          })
        embed.setDescription(`:x: No Information found about this Category`)
        return message.reply({
          embeds: [embed]
        })
      }
      if (cmd.name) embed.addField("**💿 Command name**", `\`${cmd.name}\``);
      if (cmd.name) embed.setTitle(`💿 Detailed Information about: \`${cmd.name}\``);
      if (cmd.description) embed.addField("**💿 Description**", `\`\`\`${cmd.description}\`\`\``);
      if (cmd.aliases) try {
        embed.addField("**💿 Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
      } catch {}
      if (cmd.cooldown) embed.addField("**💿 Cooldown**", `\`\`\`${cmd.cooldown} Seconds\`\`\``);
      else embed.addField("**💿 Default-Cooldown**", `\`\`\`1 Second\`\`\``);
      if (cmd.usage) {
        embed.addField("**💿 Usage**", `\`\`\`${prefix}${cmd.usage}\`\`\``);
        embed.setFooter(client.getFooter("Syntax: <> = required, [] = optional", es.footericon));
      }
      return message.reply({
        embeds: [embed]
      });
    } else {
      let button_back = new MessageButton().setStyle('SUCCESS').setCustomId('1').setEmoji("833802907509719130").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.back))
      let button_home = new MessageButton().setStyle('DANGER').setCustomId('2').setEmoji("🏠").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.home))
      let button_forward = new MessageButton().setStyle('SUCCESS').setCustomId('3').setEmoji('832598861813776394').setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.forward))
      let button_tutorial = new MessageButton().setStyle('LINK').setEmoji("840260133686870036").setLabel("Tutorial").setURL("https://youtu.be/E0R7d8gS908")
      let menuOptions = [{
          label: "Overview",
          value: "Overview",
          emoji: "833101995723194437",
          description: "My Overview of me!"
        },
        {
          label: "Information",
          value: "Information",
          emoji: "🔰",
          description: "Commands to share Information"
        },
        {
          label: "Music",
          value: "Music",
          emoji: "🎶",
          description: "Commands to play Music / add Filter"
        },
        {
          label: "Filter",
          value: "Filter",
          emoji: "👀",
          description: "Commands to add Filters to the Music"
        },
        {
          label: "Premium",
          value: "Premium",
          emoji: "💰",
          description: "Commands to for Premium Server"
        },
        {
          label: "Settings",
          value: "Settings",
          emoji: "⚙️",
          description: "Commands to change Server Settings"
        },
        {
          label: "Owner",
          value: "Owner",
          emoji: "👑",
          description: "Commands to to manage the Bot"
        },
      ];
      let menuSelection = new MessageSelectMenu()
        .setCustomId("MenuSelection")
        .setPlaceholder("Click me to view Help-Menu-Category-Page(s)")
        .setMinValues(1)
        .setMaxValues(5)
        .addOptions(menuOptions.filter(Boolean))
      let buttonRow = new MessageActionRow().addComponents([button_back, button_home, button_forward, button_tutorial])
      let SelectionRow = new MessageActionRow().addComponents([menuSelection])
      const allbuttons = [buttonRow, SelectionRow]
      //define default embed
      let OverviewEmbed = new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
        .setFooter(client.getFooter("Page Overview\n" + client.user.username, client.user.displayAvatarURL()))
        .setTitle(`Information about __${client.user.username}__`)
        .addField(":muscle: **__My Features__**",
          `>>> :notes: An advanced <:Spotify:846090652231663647> **Music System** with **Audio Filtering**
:video_game: A unique Music Request System and way much more!`)
        .addField(":question: **__How do you use me?__**",
          `>>> \`${prefix}setup-music #Channel\` To create the Music System, then connect to a **VC** and type your wished Song!

but you can also do \`${prefix}play <SONGNAME/SONGLINK>\` without setting it up!`)
        .addField(":chart_with_upwards_trend: **__STATS:__**",
          `>>> :gear: **${client.commands.map(a=>a).length} Commands**
:file_folder: on **${client.guilds.cache.size} Guilds**
⌚️ **${duration(client.uptime).map(i=> `\`${i}\``).join("︲")} Uptime**
📶 **\`${Math.floor(client.ws.ping)}ms\` Ping**
<:MilratoDevelopment:900389724936609842>  Made by [**Milrato Development**](https://discord.gg/milrato)`)


      //Send message with buttons
      let helpmsg = await message.reply({
        content: `***Click on the __Buttons__ to swap the Help-Pages***`,
        embeds: [OverviewEmbed],
        components: allbuttons
      }).catch(e => {
        console.log(e.stack ? String(e.stack).grey : String(e).grey)
        return message.reply(`:x: I couldn't send help? Maybe I am missing the Permission to **EMBED LINKS**`).catch(() => {})
      });
      var edited = false;
      var embeds = [OverviewEmbed]
      for (const e of allotherembeds_eachcategory(true))
        embeds.push(e)
      let currentPage = 0;

      //create a collector for the thinggy
      const collector = helpmsg.createMessageComponentCollector({
        filter: (i) => (i.isButton() || i.isSelectMenu()) && i.user && i.message.author.id == client.user.id,
        time: 180e3
      });
      //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
      collector.on('collect', async b => {
        try {
          if (b.isButton()) {
            if (b.user.id !== message.author.id)
              return b.reply({
                content: handlemsg(client.la[ls].cmds.info.help.buttonerror, {
                  prefix: prefix
                }),
                ephemeral: true
              });

            //page forward
            if (b.customId == "1") {
              //b.reply("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
              if (currentPage !== 0) {
                currentPage -= 1
              } else {
                currentPage = embeds.length - 1
              }
            }
            //go home
            else if (b.customId == "2") {
              //b.reply("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
              currentPage = 0;
            }
            //go forward
            else if (b.customId == "3") {
              //b.reply("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
              if (currentPage < embeds.length - 1) {
                currentPage++;
              } else {
                currentPage = 0
              }
            }
            await helpmsg.edit({
              embeds: [embeds[currentPage]],
              components: allbuttons
            }).catch(e => {})
            b.deferUpdate().catch(e => {})


          }
          if (b.isSelectMenu()) {
            //b.reply(`***Going to the ${b.customId.replace("button_cat_", "")} Page***, *please wait 2 Seconds for the next Input*`, true)
            //information, music, admin, settings, voice, minigames, nsfw
            let index = 0;
            let vembeds = []
            let theembeds = [OverviewEmbed, ...allotherembeds_eachcategory()];
            for (const value of b.values) {
              switch (value.toLowerCase()) {
                case "overview":
                  index = 0;
                  break;
                case "information":
                  index = 1;
                  break;
                case "music":
                  index = 2;
                  break;
                case "filter":
                  index = 3;
                  break;
                case "premium":
                  index = 4;
                  break;
                case "settings":
                  index = 5;
                  break;
                case "owner":
                  index = 6;
                  break;
              }
              vembeds.push(theembeds[index])
            }
            b.reply({
              embeds: vembeds,
              ephemeral: true
            });
          }
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey : String(e).grey)
          console.log(String(e).italic.italic.grey.dim)
        }
      });

      collector.on('end', collected => {
        //array of all disabled buttons
        let d_buttonRow = new MessageActionRow().addComponents([button_back.setDisabled(true), button_home.setDisabled(true), button_forward.setDisabled(true), button_tutorial])
        const alldisabledbuttons = [d_buttonRow]
        
        if (!edited) {
          edited = true;
          helpmsg.edit({
            content: handlemsg(client.la[ls].cmds.info.help.timeended, {
              prefix: prefix
            }),
            embeds: [helpmsg.embeds[0]],
            components: alldisabledbuttons
          }).catch((e) => {})
        }
      });
    }

    function allotherembeds_eachcategory(filterdisabled = false) {
      //ARRAY OF EMBEDS
      var embeds = [];

      //INFORMATION COMMANDS
      var embed0 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🔰 Info").size}\`] 🔰 Information Commands 🔰`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🔰 Info").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        .addField("\u200b", "__**Sub-Categorized Commands:**__")
        .addField(`<:Discord:787321652345438228> **Server Related Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "server").sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField(`<:Bot_Flag:835928340715012137> **Bot Related Commands**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "bot").sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
      embeds.push(embed0)

      //MUSIC COMMANDS type: song, queue, queuesong, bot
      var embed3 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🎶 Music").size}\`] 🎶 Music Commands 🎶`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🎶 Music").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        .addField("\u200b", "__**Sub-Categorized Commands:**__")
        .addField("📑 **Queue Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type?.includes("queue")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField("<a:Playing_Audio:859459305152708630> **Song Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type?.includes("song")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField("<:Bot_Flag:835928340715012137> **Bot Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type?.includes("bot")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
      embeds.push(embed3)

      //FILTER COMMANDS
      var embed4 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "👀 Filter").size}\`] 👀 Filter Commands 👀`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "👀 Filter").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
      embeds.push(embed4)

      //CUSTOM QUEUE COMMANDS
      var embed5 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "💰 Premium").size}\`] 💰 Premium`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "💰 Premium").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        .addField("\u200b", "__**Sub-Categorized Commands:**__")
        .addField("<:Bot_Flag:835928340715012137> **Bot Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type?.includes("bot")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField("🎶 **Music Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type?.includes("music")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
      embeds.push(embed5)

      //Settings
      var embed8 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").size}\`] ⚙️ Settings Commands ⚙️`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        .addField("\u200b", "__**Sub-Categorized Commands:**__")
        .addField("<:Bot_Flag:835928340715012137> **Bot Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type?.includes("bot")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField("🎶 **Music Related Commands**", "> " + client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type?.includes("music")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
      embeds.push(embed8)

      //Owner
      var embed9 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "👑 Owner").size}\`] 👑 Owner Commands 👑`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "👑 Owner").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        .addField("\u200b", "__**Sub-Categorized Commands:**__")
        .addField("<:Discord:787321652345438228> **Information & Manage**", "> " + client.commands.filter((cmd) => cmd.category === "👑 Owner" && cmd.type?.includes("info")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField("<:Bot_Flag:835928340715012137> **Adjust the Bot**", "> " + client.commands.filter((cmd) => cmd.category === "👑 Owner" && cmd.type?.includes("bot")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
      embeds.push(embed9)

      return embeds.map((embed, index) => {
        return embed
          .setColor(es.color)
          .setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
          .setFooter(client.getFooter(`Page ${index + 1} / ${embeds.length}\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL()));
      })
    }

  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
