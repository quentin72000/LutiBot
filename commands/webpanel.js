module.exports = {
	name: "webpanel",
	execute (message) {
		const { MessageEmbed } = require("discord.js");
		if(message.author.id !==  "611938209366016000") return;
		message.channel.send({embed: {
			title: "Lien WebPanel du bot",
			description: `https://cp.something.host/services/3894`
        }});
    }
}