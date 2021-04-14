module.exports = (client) => {
  var stringlength = 69;
  client.manager
    .on("nodeConnect", (node) => {
      console.log("\n")
      console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
      console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
      console.log(`     ┃ `.bold.brightGreen + `Node connected: `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Node connected: `.length) + "┃".bold.brightGreen)
      console.log(`     ┃ `.bold.brightGreen + ` { ${node.options.identifier} } `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - ` { ${node.options.identifier} } `.length) + "┃".bold.brightGreen)
      console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
      console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
    })
    .on("nodeCreate", (node) => {
      console.log("\n")
      console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.green)
      console.log(`     ┃ `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.green)
      console.log(`     ┃ `.bold.green + `Node created: `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length - `Node created: `.length) + "┃".bold.green)
      console.log(`     ┃ `.bold.green + ` { ${node.options.identifier} } `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length - ` { ${node.options.identifier} } `.length) + "┃".bold.green)
      console.log(`     ┃ `.bold.green + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.green)
      console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.green)
    })
    .on("nodeReconnect", (node) => {
      console.log("\n")
      console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightYellow)
      console.log(`     ┃ `.bold.brightYellow + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightYellow)
      console.log(`     ┃ `.bold.brightYellow + `Node reconnected: `.bold.brightYellow + " ".repeat(-1 + stringlength - ` ┃ `.length - `Node reconnected: `.length) + "┃".bold.brightYellow)
      console.log(`     ┃ `.bold.brightYellow + ` { ${node.options.identifier} } `.bold.brightYellow + " ".repeat(-1 + stringlength - ` ┃ `.length - ` { ${node.options.identifier} } `.length) + "┃".bold.brightYellow)
      console.log(`     ┃ `.bold.brightYellow + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightYellow)
      console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightYellow)
    })
    .on("nodeDisconnect", (node) => {


      console.log("\n")
      console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.red)
      console.log(`     ┃ `.bold.red + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.red)
      console.log(`     ┃ `.bold.red + `Node disconnected: `.bold.red + " ".repeat(-1 + stringlength - ` ┃ `.length - `Node disconnected: `.length) + "┃".bold.red)
      console.log(`     ┃ `.bold.red + ` { ${node.options.identifier} } `.bold.red + " ".repeat(-1 + stringlength - ` ┃ `.length - ` { ${node.options.identifier} } `.length) + "┃".bold.red)
      console.log(`     ┃ `.bold.red + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.red)
      console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.red)

    })
    .on("nodeError", (node, error) => {
      console.log("\n")
      console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightRed)
      console.log(`     ┃ `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightRed)
      console.log(`     ┃ `.bold.brightRed + `Node reconnected: `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length - `Node reconnected: `.length) + "┃".bold.brightRed)
      console.log(`     ┃ `.bold.brightRed + ` { ${node.options.identifier} } `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length - ` { ${node.options.identifier} } `.length) + "┃".bold.brightRed)
      console.log(`     ┃ `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightRed)
      console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightRed)
    })
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
