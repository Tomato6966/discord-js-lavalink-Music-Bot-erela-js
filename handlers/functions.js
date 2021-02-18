const Discord = require("discord.js");
const config = require("../botconfig/config.json");
const ee = require("../botconfig/embed.json");
const radios = require("../botconfig/radiostations.json");
module.exports = {
    getMember: function (message, toFind = "") {
        toFind = toFind.toLowerCase();
        let target = message.guild.members.get(toFind);
        if (!target && message.mentions.members) target = message.mentions.members.first();
        if (!target && toFind) {
            target = message.guild.members.find((member) => {
                return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
            });
        }
        if (!target) target = message.member;
        return target;
    },
    formatDate: function (date) {
        return new Intl.DateTimeFormat("en-US").format(date);
    },
    promptMessage: async function (message, author, time, validReactions) {
        time *= 1000;
        for (const reaction of validReactions) await message.react(reaction);
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
        return message.awaitReactions(filter, { max: 1, time: time }).then((collected) => collected.first() && collected.first().emoji.name);
    },
    delay: function (delayInms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(2);
            }, delayInms);
        });
    },
    getRandomInt: function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    },
    createBar: function (total, current, size = 25, line = "▬", slider = config.settings.progressbar_emoji) {
        console.log(current);
        console.log(total);
        let bar =
            current > total ? [line.repeat(size * 2), (current / total) * 100] : [line.repeat(Math.round(size * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
        if (!String(bar).includes(config.settings.progressbar_emoji)) return `**[${config.settings.progressbar_emoji}${line.repeat(size - 1)}]**`;
        return `**[${bar[0]}]**`;
    },
    format: function (millis) {
        var h = Math.floor(millis / 360000),
            m = Math.floor(millis / 60000),
            s = ((millis % 60000) / 1000).toFixed(0);
        if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    },
    stations: function (client, prefix, message) {
        let amount = 0;
        const stationsembed = new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `?radio 11`");
        const stationsembed2 = new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `?radio 69`");
        const stationsembed3 = new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `?radio 180`");
        let United_Kingdom = "";
        for (let i = 0; i < radios.EU.United_Kingdom.length; i++) {
            United_Kingdom += `**${i + 1 + 10 * amount}**[${radios.EU.United_Kingdom[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.United_Kingdom[i].split(" ")[1]})\n`;
        }
        stationsembed.addField("🇬🇧 United Kingdom", `>>>${United_Kingdom}`, true);
        amount++;
        let austria = "";
        for (let i = 0; i < radios.EU.Austria.length; i++) {
            austria += `**${i + 1 + 10 * amount}**[${radios.EU.Austria[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Austria[i].split(" ")[1]})\n`;
        }
        stationsembed.addField("🇦🇹 Austria", `>>>${austria}`, true);
        amount++;
        let Belgium = "";
        for (let i = 0; i < radios.EU.Belgium.length; i++) {
            Belgium += `**${i + 1 + 10 * amount}**[${radios.EU.Belgium[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Belgium[i].split(" ")[1]})\n`;
        }
        stationsembed.addField("🇧🇪 Belgium", `>>>${Belgium}`, true);
        amount++;
        let Bosnia = "";
        for (let i = 0; i < radios.EU.Bosnia.length; i++) {
            Bosnia += `**${i + 1 + 10 * amount}**[${radios.EU.Bosnia[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Bosnia[i].split(" ")[1]})\n`;
        }
        stationsembed.addField("🇧🇦 Bosnia", `>>>${Bosnia}`, true);
        amount++;
        let Czech = "";
        for (let i = 0; i < radios.EU.Czech.length; i++) {
            Czech += `**${i + 1 + 10 * amount}**[${radios.EU.Czech[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Czech[i].split(" ")[1]})\n`;
        }
        stationsembed.addField("🇨🇿 Czech", `>>>${Czech}`, true);
        amount++;
        let Denmark = "";
        for (let i = 0; i < radios.EU.Denmark.length; i++) {
            Denmark += `**${i + 1 + 10 * amount}**[${radios.EU.Denmark[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Denmark[i].split(" ")[1]})\n`;
        }
        stationsembed.addField("🇩🇰 Denmark", `>>>${Denmark}`, true);
        amount++;
        let germany = "";
        for (let i = 0; i < radios.EU.Germany.length; i++) {
            germany += `**${i + 1 + 10 * amount}**[${radios.EU.Germany[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Germany[i].split(" ")[1]})\n`;
        }
        stationsembed2.addField("🇩🇪 Germany", `>>>${germany}`, true);
        amount++;
        let Hungary = "";
        for (let i = 0; i < radios.EU.Hungary.length; i++) {
            Hungary += `**${i + 1 + 10 * amount}**[${radios.EU.Hungary[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Hungary[i].split(" ")[1]})\n`;
        }
        stationsembed2.addField("🇭🇺 Hungary", `>>>${Hungary}`, true);
        amount++;
        let Ireland = "";
        for (let i = 0; i < radios.EU.Ireland.length; i++) {
            Ireland += `**${i + 1 + 10 * amount}**[${radios.EU.Ireland[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Ireland[i].split(" ")[1]})\n`;
        }
        stationsembed2.addField("🇮🇪 Ireland", `>>>${Ireland}`, true);
        amount++;
        let Italy = "";
        for (let i = 0; i < radios.EU.Italy.length; i++) {
            Italy += `**${i + 1 + 10 * amount}**[${radios.EU.Italy[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Italy[i].split(" ")[1]})\n`;
        }
        stationsembed2.addField("🇮🇹 Italy", `>>>${Italy}`, true);
        amount++;
        let Luxembourg = "";
        for (let i = 0; i < radios.EU.Luxembourg.length; i++) {
            Luxembourg += `**${i + 1 + 10 * amount}**[${radios.EU.Luxembourg[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Luxembourg[i].split(" ")[1]})\n`;
        }
        stationsembed2.addField("🇱🇺 Luxembourg", `>>>${Luxembourg}`, true);
        amount++;
        let Romania = "";
        for (let i = 0; i < radios.EU.Romania.length; i++) {
            Romania += `**${i + 1 + 10 * amount}**[${radios.EU.Romania[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Romania[i].split(" ")[1]})\n`;
        }
        stationsembed2.addField("🇷🇴 Romania", `>>>${Romania}`, true);
        amount++;
        let Serbia = "";
        for (let i = 0; i < radios.EU.Serbia.length; i++) {
            Serbia += `**${i + 1 + 10 * amount}**[${radios.EU.Serbia[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Serbia[i].split(" ")[1]})\n`;
        }
        stationsembed3.addField("🇷🇸 Serbia", `>>>${Serbia}`, true);
        amount++;
        let Spain = "";
        for (let i = 0; i < radios.EU.Spain.length; i++) {
            Spain += `**${i + 1 + 10 * amount}**[${radios.EU.Spain[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Spain[i].split(" ")[1]})\n`;
        }
        stationsembed3.addField("🇪🇸 Spain", `>>>${Spain}`, true);
        amount++;
        let Sweden = "";
        for (let i = 0; i < radios.EU.Sweden.length; i++) {
            Sweden += `**${i + 1 + 10 * amount}**[${radios.EU.Sweden[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Sweden[i].split(" ")[1]})\n`;
        }
        stationsembed3.addField("🇸🇪 Sweden", `>>>${Sweden}`, true);
        amount++;
        let Ukraine = "";
        for (let i = 0; i < radios.EU.Ukraine.length; i++) {
            Ukraine += `**${i + 1 + 10 * amount}**[${radios.EU.Ukraine[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Ukraine[i].split(" ")[1]})\n`;
        }
        stationsembed3.addField("🇺🇦 Ukraine", `>>>${Ukraine}`, true);
        amount++;
        let requests = "";
        for (let i = 0; i < 10; i++) {
            requests += `**${i + 1 + 10 * amount}**[${radios.OTHERS.request[i].split(" ")[0].replace("-", " ").substr(0, 15)}](${radios.OTHERS.request[i].split(" ")[1]})\n`;
        }
        stationsembed3.addField("🧾 OTHERS", `>>>${requests}`, true);
        requests = "";
        for (let i = 10; i < 20; i++) {
            try {
                requests += `**${i + 1 + 10 * amount}**[${radios.OTHERS.request[i].split(" ")[0].replace("-", " ").substr(0, 15)}](${radios.OTHERS.request[i].split(" ")[1]})\n`;
            } catch {}
        }
        stationsembed3.addField("🧾 OTHERS", `>>>${requests}`, true);
        message.channel.send(stationsembed);
        message.channel.send(stationsembed2);
        message.channel.send(stationsembed3);
    },
    databasing: function (client, guildid, userid) {
        client.premium.ensure("premiumlist", { list: [] });
        if (guildid) {
            client.premium.ensure(guildid, { enabled: false, twentyfourseven: false });
        }
        if (userid) {
            client.premium.ensure(userid, { enabled: false, twentyfourseven: false });
        }
        return;
    },
    escapeRegex: function (str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    },
    arrayMove: function (array, from, to) {
        array = [...array];
        const startIndex = from < 0 ? array.length + from : from;
        if (startIndex >= 0 && startIndex < array.length) {
            const endIndex = to < 0 ? array.length + to : to;
            const [item] = array.splice(from, 1);
            array.splice(endIndex, 0, item);
        }
        return array;
    },
};
