//here the event starts
const config = require("../botconfig/config.json")
module.exports = client => {
    console.log(`Discord Bot  /--/ ${client.user.tag} /--/  is online!`); //log when ready aka the bot usable
    
    try{
        client.user.setActivity(config.status.text, {type: config.status.type, url: config.status.url}); //status
    }catch (error) {
        console.log(error);  
        client.user.setActivity(client.user.username, { type: "PLAYING" });
    }
}