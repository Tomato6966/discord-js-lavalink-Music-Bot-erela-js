const Discord = require("discord.js")
const {
    MessageEmbed
} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
const paginationEmbed = require('discord.js-pagination');
const radios = require("../../botconfig/radiostations.json")

module.exports = {
    name: "radio",
    category: "🎶 Music",
    aliases: ["stream"],
    description: "Plays a defined radiostream",
    usage: "radio <1-183>",
    run: async (client, message, args) => {
        const {
            channel
        } = message.member.voice;
        if (!channel) return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle("You need to join a voice channel."));
            //LINKS
if(!args[0])
return stations(client,config.prefix,message);

if(isNaN(args[0])) {
    return message.reply(
        new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(`Error`, ee.footericon, "https://milrato.eu")
            .setFooter(client.user.username, config.AVATARURL)  
            .setTitle( `Not a valid radio station please use a Number between \`1\` and \`183\``)
    );
}
if(Number(args[1])>150) return message.reply("**Maximum Volume is `150`!**")
if(Number(args[1])<1) return message.reply("**Minimum Volume is `1`!**")
let volume;
if(isNaN(args[1])) {
volume = 50;
}
else{
    volume = args[1]
}
let args2;
if(Number([args[0]])>0 && Number(args[0])<=10){
    args2 =radios.EU.United_Kingdom[Number(args[0])-1].split(` `);
}
else if(Number([args[0]])>10 && Number(args[0])<=20){
    args2 =radios.EU.Austria[Number(args[0])-10-1].split(` `);
}
else if(Number([args[0]])>20 && Number(args[0])<=30){
    args2 =radios.EU.Belgium[Number(args[0])-20-1].split(` `);
}
else if(Number([args[0]])>30 && Number(args[0])<=40){
    args2 =radios.EU.Bosnia[Number(args[0])-30-1].split(` `);
}
else if(Number([args[0]])>40 && Number(args[0])<=50){
    args2 =radios.EU.Czech[Number(args[0])-40-1].split(` `);
}
else if(Number([args[0]])>50 && Number(args[0])<=60){
    args2 =radios.EU.Denmark[Number(args[0])-50-1].split(` `);
}
else if(Number([args[0]])>60 && Number(args[0])<=70){
    args2 =radios.EU.Germany[Number(args[0])-60-1].split(` `);
}
else if(Number([args[0]])>70 && Number(args[0])<=80){
    args2 =radios.EU.Hungary[Number(args[0])-70-1].split(` `);
}
else if(Number([args[0]])>80 && Number(args[0])<=90){
    args2 =radios.EU.Ireland[Number(args[0])-80-1].split(` `);
}
else if(Number([args[0]])>90 && Number(args[0])<=100){
    args2 =radios.EU.Italy[Number(args[0])-90-1].split(` `);
}
else if(Number([args[0]])>100 && Number(args[0])<=110){
    args2 =radios.EU.Luxembourg[Number(args[0])-100-1].split(` `);
}
else if(Number([args[0]])>110 && Number(args[0])<=120){
    args2 = radios.EU.Romania[Number(args[0])-110-1].split(` `);
}
else if(Number([args[0]])>120 && Number(args[0])<=130){
    args2 = radios.EU.Serbia[Number(args[0])-120-1].split(` `);
}
else if(Number([args[0]])>130 && Number(args[0])<=140){
   args2 = radios.EU.Spain[Number(args[0])-130-1].split(` `);
}
else if(Number([args[0]])>140 && Number(args[0])<=150){
   args2 = radios.EU.Sweden[Number(args[0])-140-1].split(` `);
}
else if(Number([args[0]])>150 && Number(args[0])<=160){
   args2 = radios.EU.Ukraine[Number(args[0])-150-1].split(` `);
}
else if(Number([args[0]])>160 && Number(args[0])<=183){
   args2 = radios.OTHERS.request[Number(args[0])-160-1].split(` `);
}
else {
   return message.reply("This radio station was not found")
}
const song = {
    title: args2[0].replace("-", " "),
    url: args2[1],
};


        const search = song.url;
		message.reply(new Discord.MessageEmbed().setColor(ee.color).setTitle("Searching: " + song.title).setURL(song.url).setFooter(ee.footertext, ee.footericon)).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log(e)))
       
        let res;
        try {
            // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
            res = await client.manager.search(search, message.author);
            // Check the load type as this command is not that advanced for basics
            if (res.loadType === "LOAD_FAILED") throw res.exception;
            else if (res.loadType === "PLAYLIST_LOADED") throw {
                message: "Playlists are not supported with this command. Use `?playlist`"
            };
        } catch (err) {
           return message.reply(new MessageEmbed().setColor(ee.wrongcolor).setTitle(`There was an error while searching:`).setDescription(`\`\`\`${err.message}\`\`\``));
        }
        try {
            // Create the player 
            const player = client.manager.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id,
                selfDeafen: true,
            });

            // Connect to the voice channel and add the track to the queue
            if (player.state !== "CONNECTED") {
                player.connect();
                player.queue.add(res.tracks[0]);
                player.play()
            } else {
                player.queue.add(res.tracks[0]);
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Added to Queue 🩸 **\`${res.tracks[0].title}\`**`)
                    .setURL(res.tracks[0].uri).setColor(ee.color).setFooter(ee.footertext, ee.footericon)
                    .setThumbnail(res.tracks[0].displayThumbnail(1))
                    .addField("Duration: ", `\`${res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration)}\``, true)
                    .addField("Song By: ", `\`${res.tracks[0].author}\``, true)
                    .addField("Queue length: ", `\`${player.queue.length} Songs\``, true)
                    .setFooter(`Requested by: ${res.tracks[0].requester.tag}`, res.tracks[0].requester.displayAvatarURL({
                        dynamic: true
                    }))
                return message.channel.send(embed).then(msg => msg.delete({
                    timeout: 4000
                }).catch(e => console.log(String(e.stack).red)));
            }

        } catch (e) {
            console.log(String(e.stack).red)
            message.channel.send(new Discord.MessageEmbed().setColor(ee.wrongcolor).setTitle(":x: Found nothing for: " + search))
        }
    }
};
function format(millis){
    var h=Math.floor(millis/360000),m=Math.floor(millis/60000),s=((millis%60000)/1000).toFixed(0);
    if(h<1) return(m<10?'0':'')+m+":"+(s<10?'0':'')+s;
    else return(h<10?'0':'')+h+":"+(m<10?'0':'')+m+":"+(s<10?'0':'')+s;
}
    
function stations(client,prefix,message){
    let amount = 0;
	const stationsembed = new Discord.MessageEmbed()
	.setColor(ee.color)
	.setFooter(ee.footertext, ee.footericon)
	.setTitle("Pick your Station, by typing in the right `INDEX` Number!")
	.setDescription("Example: `?radio 11`")
		const stationsembed2 = new Discord.MessageEmbed()
	.setColor(ee.color)
	.setFooter(ee.footertext, ee.footericon)
	.setTitle("Pick your Station, by typing in the right `INDEX` Number!")
	.setDescription("Example: `?radio 11`")
			const stationsembed3 = new Discord.MessageEmbed()
	.setColor(ee.color)
	.setFooter(ee.footertext, ee.footericon)
	.setTitle("Pick your Station, by typing in the right `INDEX` Number!")
	.setDescription("Example: `?radio 11`")


    let United_Kingdom = "";
    for(let i = 0; i<radios.EU.United_Kingdom.length;i++){
        United_Kingdom += `**${i+1+10*amount}** [${radios.EU.United_Kingdom[i].split(" ")[0].replace("-"," ").substr(0, 16)}](${radios.EU.United_Kingdom[i].split(" ")[1]})\n`
    }
    stationsembed.addField("🇬🇧 United Kingdom", `>>> ${United_Kingdom}`,true);
    amount++;
    let austria = ""; 
    for(let i = 0; i<radios.EU.Austria.length;i++){
        austria += `**${i+1+10*amount}** [${radios.EU.Austria[i].split(" ")[0].replace("-"," ").substr(0, 16)}](${radios.EU.Austria[i].split(" ")[1]})\n`
    }
    stationsembed.addField("🇦🇹 Austria", `>>> ${austria}`,true);
    amount++;
    let Belgium = ""; 
    for(let i = 0; i<radios.EU.Belgium.length;i++){
        Belgium += `**${i+1+10*amount}** [${radios.EU.Belgium[i].split(" ")[0].replace("-"," ").substr(0, 16)}](${radios.EU.Belgium[i].split(" ")[1]})\n`
    }
    stationsembed.addField("🇧🇪 Belgium", `>>> ${Belgium}`,true);
    amount++;
    let Bosnia = ""; 
    for(let i = 0; i<radios.EU.Bosnia.length;i++){
        Bosnia += `**${i+1+10*amount}** [${radios.EU.Bosnia[i].split(" ")[0].replace("-"," ").substr(0, 16)}](${radios.EU.Bosnia[i].split(" ")[1]})\n`
    }
    stationsembed.addField("🇧🇦 Bosnia", `>>> ${Bosnia}`,true);
    amount++; 
    let Czech = ""; 
    for(let i = 0; i<radios.EU.Czech.length;i++){
        Czech += `**${i+1+10*amount}** [${radios.EU.Czech[i].split(" ")[0].replace("-"," ").substr(0, 16)}](${radios.EU.Czech[i].split(" ")[1]})\n`
    }
    stationsembed.addField("🇨🇿 Czech", `>>> ${Czech}`,true);
    amount++; 
    let Denmark = ""; 
    for(let i = 0; i<radios.EU.Denmark.length;i++){
        Denmark += `**${i+1+10*amount}** [${radios.EU.Denmark[i].split(" ")[0].replace("-"," ").substr(0, 16)}](${radios.EU.Denmark[i].split(" ")[1]})\n`
    }
    stationsembed.addField("🇩🇰 Denmark", `>>> ${Denmark}`,true);
    amount++; 
	
	
    let germany = ""; 
    for(let i = 0; i<radios.EU.Germany.length;i++){
        germany += `**${i+1+10*amount}** [${radios.EU.Germany[i].split(" ")[0].replace("-"," ").substr(0, 16)}](${radios.EU.Germany[i].split(" ")[1]})\n`
    }
    stationsembed2.addField("🇩🇪 Germany", `>>> ${germany}`,true);
    amount++; 
    let Hungary = ""; 
    for(let i = 0; i<radios.EU.Hungary.length;i++){
        Hungary += `**${i+1+10*amount}** [${radios.EU.Hungary[i].split(" ")[0].replace("-"," ").substr(0, 16)}](${radios.EU.Hungary[i].split(" ")[1]})\n`
    }
    stationsembed2.addField("🇭🇺 Hungary", `>>> ${Hungary}`,true);
    amount++; 
    let Ireland = ""; 
    for(let i = 0; i<radios.EU.Ireland.length;i++){
        Ireland += `**${i+1+10*amount}** [${radios.EU.Ireland[i].split(" ")[0].replace("-"," ").substr(0, 16)}](${radios.EU.Ireland[i].split(" ")[1]})\n`
    }
    stationsembed2.addField("🇮🇪 Ireland", `>>> ${Ireland}`,true);
    amount++; 	
    let Italy = ""; 
    for(let i = 0; i<radios.EU.Italy.length;i++){
        Italy += `**${i+1+10*amount}** [${radios.EU.Italy[i].split(" ")[0].replace("-"," ").substr(0, 16)}](${radios.EU.Italy[i].split(" ")[1]})\n`
    }
    stationsembed2.addField("🇮🇹 Italy", `>>> ${Italy}`,true);
    amount++; 
    let Luxembourg = ""; 
    for(let i = 0; i<radios.EU.Luxembourg.length;i++){
        Luxembourg += `**${i+1+10*amount}** [${radios.EU.Luxembourg[i].split(" ")[0].replace("-"," ").substr(0, 16)}](${radios.EU.Luxembourg[i].split(" ")[1]})\n`
    }
    stationsembed2.addField("🇱🇺 Luxembourg", `>>> ${Luxembourg}`,true);
    amount++; 
    let Romania = ""; 
    for(let i = 0; i<radios.EU.Romania.length;i++){
        Romania += `**${i+1+10*amount}** [${radios.EU.Romania[i].split(" ")[0].replace("-"," ").substr(0, 16)}](${radios.EU.Romania[i].split(" ")[1]})\n`
    }
    stationsembed2.addField("🇷🇴 Romania", `>>> ${Romania}`,true);
    amount++; 
	
	
    let Serbia = ""; 
    for(let i = 0; i<radios.EU.Serbia.length;i++){
        Serbia += `**${i+1+10*amount}** [${radios.EU.Serbia[i].split(" ")[0].replace("-"," ").substr(0, 16)}](${radios.EU.Serbia[i].split(" ")[1]})\n`
    }
    stationsembed3.addField("🇷🇸 Serbia", `>>> ${Serbia}`,true);
    amount++; 
    let Spain = ""; 
    for(let i = 0; i<radios.EU.Spain.length;i++){
        Spain += `**${i+1+10*amount}** [${radios.EU.Spain[i].split(" ")[0].replace("-"," ").substr(0, 16)}](${radios.EU.Spain[i].split(" ")[1]})\n`
    }
    stationsembed3.addField("🇪🇸 Spain", `>>> ${Spain}`,true);
    amount++; 
    let Sweden = ""; 
    for(let i = 0; i<radios.EU.Sweden.length;i++){
        Sweden += `**${i+1+10*amount}** [${radios.EU.Sweden[i].split(" ")[0].replace("-"," ").substr(0, 16)}](${radios.EU.Sweden[i].split(" ")[1]})\n`
    }
    stationsembed3.addField("🇸🇪 Sweden", `>>> ${Sweden}`,true);
    amount++; 
    let Ukraine = ""; 
    for(let i = 0; i<radios.EU.Ukraine.length;i++){
        Ukraine += `**${i+1+10*amount}** [${radios.EU.Ukraine[i].split(" ")[0].replace("-"," ").substr(0, 16)}](${radios.EU.Ukraine[i].split(" ")[1]})\n`
    }
    stationsembed3.addField("🇺🇦 Ukraine", `>>> ${Ukraine}`,true);
    amount++; 
    let requests = ""; 
    for(let i = 0; i < 10;i++){
        requests += `**${i+1+10*amount}** [${radios.OTHERS.request[i].split(" ")[0].replace("-"," ").substr(0, 15)}](${radios.OTHERS.request[i].split(" ")[1]})\n`
    }
    stationsembed3.addField("🧾 OTHERS", `>>> ${requests}`,true);
	requests = ""; 
    for(let i = 10; i < 20; i++){
        try{requests += `**${i+1+10*amount}** [${radios.OTHERS.request[i].split(" ")[0].replace("-"," ").substr(0, 15)}](${radios.OTHERS.request[i].split(" ")[1]})\n`}catch{}
    }
    stationsembed3.addField("🧾 OTHERS", `>>> ${requests}`,true);


    message.channel.send(stationsembed);
	 message.channel.send(stationsembed2);
	 message.channel.send(stationsembed3);
}
