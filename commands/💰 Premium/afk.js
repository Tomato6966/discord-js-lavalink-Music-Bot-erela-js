
const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`)
const ee = require(`../../botconfig/embed.json`)
const emoji = require(`../../botconfig/emojis.json`);
const { databasing } = require(`../../handlers/functions`);
module.exports = {
    name: `afk`,
  	aliases: [`twentyfourseven`, `noleave`, `unlimitedtime`, `24/7`],
    category: `💰 Premium`,
    description: `Disables leaving channel for The Server / Player | Toggle`,
    usage: `afk [guild/user]`,
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      //call databasing just to be sure!
      databasing(client, message.guild.id, message.author.id)
      //get the channel instance
      const { channel } = message.member.voice;
      //if not in a voice Channel return error
      if (!channel)
          return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR}  Error | You need to join a voice channel.`)
          );
      //get the player instance
      const player = client.manager.players.get(message.guild.id);
      //if no player available return error | aka not playing anything
      if (!player)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Error | There is nothing playing`)
        );
      //if not in the same channel --> return
      if(player && channel.id !== player.voiceChannel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR}  Error | You need to be in my voice channel to use this command!`)
          .setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
        );

      //get the database information for the GUILD
      let gpremium = client.premium.get(message.guild.id);
      //get the database information for the USER
      let ppremium = client.premium.get(message.author.id);
      //these few lines create the Stringarray of each OWNER USER of the config.json
      let ownerstringarray = ``;
      for(let i = 0; i<config.ownerIDS.length; i++){
        try{
          let user = await client.users.fetch(config.ownerIDS[i]);
          ownerstringarray += `\`${user.tag}\` /`
        }catch{ }
      }
      //save the string
      ownerstringarray = ownerstringarray.substr(0, ownerstringarray.length-2);
      //if no enabled premiums, return
      if(!gpremium.enabled && !ppremium.enabled)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR}  Error | No Premium Commands Available`)
          .setDescription(`Dm to get premium:\n ${ownerstringarray}`.substr(0, 2040))
        )
      //if no args --> return with information
      if(!args[0]){
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR}  Error | Invalid Input method`)
          .setDescription(`Usage: \`${prefix}afk [guild/user]\``)
          .addField(`${emoji.msg.premium} Player Premium`, `${ppremium ? (ppremium.enabled ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.ERROR}  Disabled\nDm to enable:\n> ${ownerstringarray.substr(0, ownerstringarray.length - 1)}`.substr(0, 1020)) : `${emoji.msg.ERROR}  Disabled`}`, true)
          .addField(`${emoji.msg.premium} Guild Premium`, `${gpremium ? (gpremium.enabled ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.ERROR}  Disabled\nDm to enable:\n> ${ownerstringarray.substr(0, ownerstringarray.length - 1)}`.substr(0, 1020)) : `${emoji.msg.ERROR}  Disabled`}`, true)
        )
      }
      //if args 0 is guild
      if(args[0].toLowerCase() === `guild`) {
        //if guild premium is not enabled return error
        if(!gpremium.enabled)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR}  Error | No Premium Commands Available for this Guild`)
            .setDescription(`Dm to get premium:\n ${ownerstringarray}`.substr(0, 2040))
          );
        //toggle the database state
        player.set(`afk-${message.guild.id}`, !player.get(`afk-${message.guild.id}`))
        //return information message
        return message.channel.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.premium} Successfully ${player.get(`afk-${message.guild.id}`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled}  Disabled`} 24/7`)
          .setDescription(`For the Guild: \`${message.guild.name}\``)
        );
      }
      //if the args 0 is user
      else if(args[0].toLowerCase() === `user`) {
        //if user premium is not enbaled return error
        if(!ppremium.enabled)
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR}  Error | No Premium Commands Available for you`)
            .setDescription(`Dm to get premium:\n ${ownerstringarray}`.substr(0, 2040))
          );
        //the creater of the player, did not have premium! return error
        if(message.author.id !== player.get(`playerauthor`))
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR}  Error | You did not created that player!`)
            .setDescription(`*The one who requests, the first Song is the Creator of the Player: * ${message.guild.members.cache.get(player.get(`playerauthor`)).user}`)
          );
        //toggle the database state
        player.set(`afk-${player.get(`playerauthor`)}`, !player.get(`afk-${player.get(`playerauthor`)}`))
        //return information message
        return message.channel.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.premium} Successfully ${player.get(`afk-${player.get(`playerauthor`)}`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled}  Disabled`} 24/7`)
          .setDescription(`For the Player: \`${message.author.tag}\``)
        );
      }
      //else return information message
      else
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR}  Error | Invalid Input method`)
          .setDescription(`Usage: \`${prefix}afk [guild/user]\``)
        )
      } catch (e) {
          console.log(String(e.stack).bgRed)
          return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR}  ERROR | An error occurred`)
              .setDescription(`\`\`\`${e.message}\`\`\``)
          );
      }
    }
};
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
