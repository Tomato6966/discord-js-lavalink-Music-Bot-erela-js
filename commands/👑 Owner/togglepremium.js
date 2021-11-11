const {
    MessageEmbed
  } = require(`discord.js`);
  var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
  var config = require(`${process.cwd()}/botconfig/config.json`);
  module.exports = {
    name: `togglepremium`,
    type: "info",
    category: `👑 Owner`,
    description: `ENABLE / DISABLE the PREMIUM - STATE of a GUILD`,
    usage: `togglepremium <GUILDID>`,
    cooldown: 360,
    run: async (client, message, args, cmduser, text, prefix) => {
      let es = client.settings.get(message.guild.id, "embed"); let ls = client.settings.get(message.guild.id, "language")
      if (!config.ownerIDS.includes(message.author.id))
        return message.channel.send({embeds :[new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.user.username, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["leaveserver"]["variable1"]))
        ]});
      try {
        if(client.premium.get("global", "guilds").includes(args[0])) {
          client.premium.remove("global", args[0], "guilds");
          let guild = client.guilds.cache.get(args[0]);
          if(guild){
            guild.fetchOwner().then(owner => {
              owner.send(`❌ Your Guild is no longer a \`PREMIUM-GUILD\``).catch(()=>{});
            }).catch(()=>{});
          }
          return message.reply(`✅ **The Guild ${guild ? guild.name : args[0]} is now __no longer__ a \`PREMIUM-GUILD\`**`)
        } else {
          client.premium.push("global", args[0], "guilds");
          let guild = client.guilds.cache.get(args[0]);
          if(guild){
            guild.fetchOwner().then(owner => {
              owner.send(`✅ Your Guild is now a \`PREMIUM-GUILD\``).catch(()=>{});
            }).catch(()=>{});
          }
          return message.reply(`✅ **The Guild ${guild ? guild.name : args[0]} is now a \`PREMIUM-GUILD\`**`)
        }
      } catch (e) {
        console.log(String(e.stack).dim.bgRed)
        return message.channel.send({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(client.la[ls].common.erroroccur)
          .setDescription(`\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
        ]});
      }
    },
  };
  /**
   * @INFO
   * Bot Coded by Tomato#6966 | https://discord.gg/milrato
   * @INFO
   * Work for Milrato Development | https://milrato.dev
   * @INFO
   * Please mention him / Milrato Development, when using this Code!
   * @INFO
   */
  