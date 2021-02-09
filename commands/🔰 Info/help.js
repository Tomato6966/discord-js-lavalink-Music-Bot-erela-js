const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
//Here the command starts
module.exports = {
    //definition
     name: "help", //the name of the command 
     category: "🔰 Info", //the category this will be listed at, for the help cmd
     aliases: ["h", "commandinfo"], //every parameter can be an alias or empty for no aliases
     cooldown: 5, //this will set it to a 5 second cooldown
     usage: "help [Command]", //this is for the help command for EACH cmd
     description: "Returns all Commmands, or one specific command", //the description of the command
 
     //running the command with the parameters: client, message, args, user, text, prefix
   run: async (client, message, args, user, text, prefix) => {
        if(args[0]){ //if there are arguments then get the command help
            return getCMD(client,message,args[0]);
        }
        else{ //if not get all commands
            return getAll(client, message);
        }
    }
}
//function for getting all commands
function getAll(client,message){
const embed = new MessageEmbed() //defining the Embed
    .setColor(ee.color)
    .setThumbnail(client.user.displayAvatarURL())
    .setTitle("HELP MENU")
    .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
    const commands = (category) => { //finding all commands and listing them into a string with filter and map
        return client.commands.filter(cmd => cmd.category === category)
                .map(cmd => `\`${cmd.name}\``)
    }
    try {
        for (let i = 0; i < client.categories.length; i += 1) {
            const current = client.categories[i]
            const info = commands(current);
            const items = info
            const n = 3
            const result = [[], [], []] 
            const wordsPerLine = Math.ceil(items.length / 3)
            for (let line = 0; line < n; line++) {
              for (let i = 0; i < wordsPerLine; i++) {
                const value = items[i + line * wordsPerLine]
                if (!value) continue
                result[line].push(value)
              }
            }
            embed.addField(`**${current.toUpperCase()}**`,`> ${result[0].join("\n> ")}`,true)
            embed.addField(`\u200b`,`${result[1].join("\n") ? result[1].join("\n"): "\u200b"}`,true)
            embed.addField(`\u200b`,`${result[2].join("\n") ? result[2].join("\n"): "\u200b"}`,true)
        }
    } catch (error) {
        console.log(error)
    }
    return message.channel.send(embed)
}
//function for all commands
function getCMD(client,message,input){
    const embed = new MessageEmbed() //creating a new Embed

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase())) //getting the command by name/alias
    if(!cmd){ //if no cmd found return info no infos!
        return message.channel.send(embed.setColor(ee.wrongcolor).setDescription(`No Information found for command **${input.toLowerCase()}**`));
    }
    if(cmd.name) embed.addField("**Command name**", `\`${cmd.name}\``)
    if(cmd.name) embed.setTitle(`Detailed Information about: \`${cmd.name}\``)
    if(cmd.description) embed.addField("**Description**", `\`${cmd.description}\``);

    if(cmd.aliases) embed.addField("**Aliases**", `\`${cmd.aliases.map(a => `${a}`).join("\`, \`")}\``)
    if(cmd.cooldown) embed.addField("**Cooldown**", `\`${cmd.cooldown} Seconds\``)
        else embed.addField("**Cooldown**", `\`1 Second\``)
    if(cmd.usage){
        embed.addField("**Usage**", `\`${config.prefix}${cmd.usage}\``);
        embed.setFooter("Syntax: <> = required, [] = optional"); 
    }
    if(cmd.useage){
        embed.addField("**Useage**", `\`${config.prefix}${cmd.useage}\``);
        embed.setFooter("Syntax: <> = required, [] = optional"); 
    }
    //send the new Embed
    return message.channel.send(embed.setColor(ee.main))
}
