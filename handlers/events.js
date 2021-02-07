const fs = require("fs"); //requireing, the module for reading files 
const ascii = require("ascii-table"); //requiring ascii-table which is a great tool for creating ascii tables
let table = new ascii("Events"); //creating a new table with the name "Commands"
table.setHeading("Events", "Load status");
module.exports = async (client) => {
    let theevents; //global variable
    fs.readdirSync("./events/").forEach(file => { //reading each command
        theevents =  fs.readdirSync(`./events/`).filter(file => file.endsWith(".js")); //it will be only a command if it ends with .js
        fs.readdir("./events/", (err, files) => { //for each file we will "LOAD THE EVENT"
            if (err) return console.error(err); //if an error log it
                    const event = require(`../events/${file}`); //create the event from the filename
                    let eventName = file.split(".")[0]; //get the eventname from it
                    theevents = eventName; //set it into the global variable
                    client.on(eventName, event.bind(null, client)); //LOAD THE EVENT
            });
    });
    //now we have an array for all events in the event folder, we can load it in loop and pass it onto our beautiful table
    for(let i = 0; i< theevents.length; i++){
        try {
            table.addRow(theevents[i], 'Ready'); //log in table ready
        } catch (error) {
            console.error(error.stack); // If there is an error, console log the error stack message
        }
    }
    console.log(table.toString()); //showing the table
    console.log("Welcome to SERVICE HANDLER /--/ By https://x10-gaming.eu/service/dc /--/ Discord: Tomato#6966") //logging that it loades
	console.log("Logging into the BOT..."); //showing loading status
}
