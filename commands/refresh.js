module.exports = {
	name: "refresh",
	description: "Rafraichit le status et le status des ressources",
	execute(message, args, client, config) {
		if(!config.whitelist.includes(message.author.id))return message.channel.send("Vous ne pouvez pas éxécutez cette commande.")
		const status = require("../util/status.js")
		status.reloadRessource(client)
		status.reloadStatus(client)
		message.channel.send("Les status on bien été actualisé !");
	}
}