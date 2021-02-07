//Here the command starts
module.exports = {
   //definition
	name: "ping", //the name of the command 
	category: "info", //the category this will be listed at, for the help cmd
	aliases: ["latency"], //every parameter can be an alias
	cooldown: 2, //this will set it to a 2 second cooldown
	usage: "ping", //this is for the help command for EACH cmd
  	description: "Gives you information on how fast the Bot can respond to you", //the description of the command

	//running the command with the parameters: client, message, args, user, text, prefix
  run: async (client, message, args, user, text, prefix) => {
        //creating a temporary message
        const msg = await message.channel.send(`🏓 Pinging....`); 
        //editing it to the actual latency
        msg.edit(`🏓 Pong!
        Ping is ${Math.round(client.ws.ping)}ms`);
    }
}
