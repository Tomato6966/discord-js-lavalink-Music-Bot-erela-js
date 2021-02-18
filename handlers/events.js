const fs = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Events");
table.setHeading("Events", "Load status");
module.exports = async (client) => {
    let theevents;
    fs.readdirSync("./events/").forEach((file) => {
        theevents = fs.readdirSync(`./events/`).filter((file) => file.endsWith(".js"));
        fs.readdir("./events/", (e, files) => {
            if (e) return console.log(String(e.stack).red);
            const event = require(`../events/${file}`);
            let eventName = file.split(".")[0];
            theevents = eventName;
            client.on(eventName, event.bind(null, client));
        });
    });
    for (let i = 0; i < theevents.length; i++) {
        try {
            table.addRow(theevents[i], "Ready");
        } catch (e) {
            console.log(String(e.stack).red);
        }
    }
    console.log(table.toString().cyan);
    console.log("Welcome to SERVICE HANDLER /--/ By https://milrato.eu /--/ Discord: Tomato#6966".bold.green);
    console.log("Logging into the BOT...".yellow);
};
