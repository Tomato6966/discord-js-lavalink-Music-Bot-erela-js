const {
  readdirSync,
  lstatSync
} = require("fs");
const {
  SlashCommandBuilder
} = require('@discordjs/builders');
const config = require(`${process.cwd()}/botconfig/config.json`);
const settings = require(`${process.cwd()}/botconfig/settings.json`);

module.exports = (client) => {
  try {
    // client.slashCommands.set("commandname") //Each Command Data
    // client.slashCommands("normal" + "commandname") //each Command Data
    client.allCommands = []; //raw Slash Commands Data
    readdirSync("./slashCommands/").forEach((dir) => {
      let pull = require(`../slashCommands/${dir}`);
      if (pull.name && pull.description) {
        let Command = new SlashCommandBuilder().setName(String(pull.name).toLowerCase()).setDescription(pull.description);
        if (pull.options && pull.options.length > 0) {
          for (const option of pull.options) {
            if (option.User && option.User.name && option.User.description) {
              Command.addUserOption((op) =>
                op.setName(String(option.User.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.User.description).setRequired(option.User.required)
              )
            } else if (option.Integer && option.Integer.name && option.Integer.description) {
              Command.addIntegerOption((op) =>
                op.setName(String(option.Integer.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.Integer.description).setRequired(option.Integer.required)
              )
            } else if (option.String && option.String.name && option.String.description) {
              Command.addStringOption((op) =>
                op.setName(String(option.String.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.String.description).setRequired(option.String.required)
              )
            } else if (option.Channel && option.Channel.name && option.Channel.description) {
              Command.addChannelOption((op) =>
                op.setName(String(option.Channel.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.Channel.description).setRequired(option.Channel.required)
              )
            } else if (option.Role && option.Role.name && option.Role.description) {
              Command.addRoleOption((op) =>
                op.setName(String(option.Role.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.Role.description).setRequired(option.Role.required)
              )
            } else if (option.StringChoices && option.StringChoices.name && option.StringChoices.description && option.StringChoices.choices && option.StringChoices.choices.length > 0) {
              Command.addStringOption((op) =>
                op.setName(String(option.StringChoices.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.StringChoices.description).setRequired(option.StringChoices.required)
                .addChoices(option.StringChoices.choices.map(c => [String(c[0]).replace(/\s+/g, '_').toLowerCase(), String(c[1])])),
              )
            } else if (option.IntChoices && option.IntChoices.name && option.IntChoices.description && option.IntChoices.choices && option.IntChoices.choices.length > 0) {
              Command.addStringOption((op) =>
                op.setName(String(option.IntChoices.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.IntChoices.description).setRequired(option.IntChoices.required)
                .addChoices(option.IntChoices.choices.map(c => [String(c[0]).replace(/\s+/g, '_').toLowerCase(), parseInt(c[1])])),
              )
            } else {
              console.log(`A Option is missing the Name or/and the Description of ${pull.name}`)
            }
          }
        }
        client.allCommands.push(Command.toJSON());
        client.slashCommands.set("normal" + pull.name, pull)
      } else {
        console.log(file, `error -> missing a help.name, or help.name is not a string.`.brightRed);
      }
    });
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
