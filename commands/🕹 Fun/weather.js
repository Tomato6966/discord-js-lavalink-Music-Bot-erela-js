const weather = require('weather-js');
const { Client, Collection, MessageEmbed } = require(`discord.js`);
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const path = require("path");
module.exports = {

  name: path.parse(__filename).name,
  category: "🕹 Fun",
  useage: `${path.parse(__filename).name} <C/F> <Location>`,
description: "*Image cmd in the style:* " + path.parse(__filename).name ,
  run: async (client, message, args) => {
    //get the name to search for
    let degree;
      //check if the user entered a first arg
      if(args[0]){
        //check if the first argument was a valid degree type
        if(args[0] === "C" || args[0] === "c" || args[0] === "F" || args[0] === "f"){
            degree = args[0].toUpperCase();
        } else{
            return message.channel.send("Enter a valid degree type (C | F).");
        }
      } else{
        return message.channel.send(`Wrong Format try: \`${PREFIX}weather <C/F> <Location>\``);
      }

      //check if there was a second arg
      if(!args[1]) return message.channel.send("Enter a location to search for.");

      //search for the location and specify degree type
      weather.find({search: args[1], degreeType: degree}, function(err, result) {
        try{
          //TODO: add a 5 day forecast

          //create a new embed with the weather data
          let embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon) 
            .setTitle(`Weather`)
            .setThumbnail(result[0].current.imageUrl)
            .setDescription(`Showing weather data for ${result[0].location.name}`)
            .addField("**Temp:**", `${result[0].current.temperature}°${result[0].location.degreetype}`, true)
            .addField("**Weather:**", `${result[0].current.skytext}`, true)
            .addField("**Day:**", `${result[0].current.shortday}`, true)
            .addField("**Feels like:**", `${result[0].current.feelslike}°${result[0].location.degreetype}`, true)
            .addField("**Humidity:**", `${result[0].current.humidity}%`, true)
            .addField("**Wind:**", `${result[0].current.winddisplay}`, true)
         
          message.channel.send(embed); 
        } catch(err){
          console.log(err); //log an error to the console if one occurs

          return message.channel.send("Are you sure that place exists?"); //return message to channel
        }
      });
  }
}