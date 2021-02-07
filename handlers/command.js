const { readdirSync } = require("fs"); //requireing, the module for reading files 
const ascii = require("ascii-table"); //requiring ascii-table which is a great tool for creating ascii tables
let table = new ascii("Commands"); //creating a new table with the name "Commands"
table.setHeading("Command", "Load status");
console.log("Welcome to SERVICE HANDLER /--/ By https://x10-gaming.eu/service/dc /--/ Discord: Tomato#6966") //logging that it loades
module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => { //reading each command
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js")); //it will be only a command if it ends with .js
        for (let file of commands) { //for each file which is a command
            let pull = require(`../commands/${dir}/${file}`); //get informations
            if (pull.name) { //get the name of the command
                client.commands.set(pull.name, pull); //set the name of the command
                table.addRow(file, 'Ready'); //log in table ready
            } else {
                table.addRow(file, `error -> missing a help.name, or help.name is not a string.`); //if something wents wrong, do this
                continue; //and skip
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name)); //if there are aliases, do it too
        }
    });
    console.log(table.toString()); //showing the table

}