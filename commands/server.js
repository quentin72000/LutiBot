const api = require("../api.js")
module.exports = {
	name: "server",
	async execute(message, args, client, config) {
		if (!message.member.hasPermission('ADMINISTRATOR')) return client.errors.noPerms(message, "ADMINISTRATOR");
		if(!message)

		if (args.length === 0) return message.channel.send("Un argument est requis. Arguments possible: `ressource`, `content`, `info` et `action`")
		let time = new Date;
		if (args[0] === "ressource" || args[0] === "ressources") {
			const request = async () => {
				const reponse = await api.getRessources(config.api.code)
				let data = reponse.data.data[0]
				if (data.status === "on") {
					message.channel.send({
						embed: {
							title: "Informations concernants les ressources",
							description: `Status: \`${data.status}\`\nOffre: ${data.offer}\nCPU: \`${data.cpu.live}%\` / \`${data.cpu.max}%\`\nMemoire: \`${data.memory.live} Mo\` / \`${data.memory.max} Mo\`\nEspaces disque: \`${data.disk.live} Mo\` / \`${data.disk.max} Mo\``,
							footer: {
								text: "Commande éxécuté en " + reponse.data.exectime + " secondes"
							},
							timestamp: new Date()
						}

					})
					//return message.channel.send(`Status: ${data.status}\nOffre: ${data.offer}\nCPU: ${data.cpu.live}% / ${data.cpu.max}%\nMemoire: ${data.memory.live}Mo / ${data.memory.max}Mo\nEspaces disque: ${data.disk.live}Mo / ${data.disk.max}Mo`)
				} else if (data.status === "starting") return message.channel.send("Le server est en train de démarré !")
				else if (data.status === "stopping") return message.channel.send("Le serveur est entrain de s'arrété !!!")
				else if (data.status === "off") return message.channel.send("Le serveur est éteint !!!")
			}
			request()
		} else if (args[0] === "content") {

			const request = async () => {
				const reponse = await api.getContent(config.api.code)

				var data = reponse.data.data[0]
				if (data.status === "on") {
				//	message.channel.send(`Status: ${data.status}\nJoueurs: ${data.players.online} / ${data.players.max}`)
					message.channel.send({embed: {
						title: "Informations sur le contenu du serveur",
						description: `Status: \`${data.status}\`\nJoueurs: \`${data.players.online}\` / \`${data.players.max}\`\nVersion: \`${data.version}\``,
						footer: {
							text: "Commande éxécuté en " + reponse.data.exectime + " secondes"
						},
						timestamp: new Date()
					}})
					
					//return message.channel.send("Le server est " + data.status + "\nDisk utilisé: " + data.disk.live + "Mo / " + data.disk.max + "Mo\nRAM utilisé: " + data.memory.live + "Mo / " + data.memory.max + "Mo")
				} else if (data.status === "starting") return message.channel.send("Le server est en train de démarré !")
				else if (data.status === "stopping") return message.channel.send("Le serveur est entrain de s'arrété !!!")
				else if (data.status === "off") return message.channel.send("Le serveur est éteint !!!")
			}
			request();

		} else if (args[0] === "info") {
			const request = async () => {
				const reponse = await api.getInfo(config.api.code)
				// console.log(reponse.data.data[0])
				var data = reponse.data.data[0]
				let r = data.ressources
				message.channel.send(/*`Nombre de cpu: ${r.cpu.core}, Flexcore: ${r.cpu.flexcore}\nMemoire(RAM) en dédié: ${r.memory.dedicated}Mo, Bonus: ${r.memory.bonus}Mo, Total: ${parseInt(r.memory.dedicated) + r.memory.bonus}Mo\nDisque: ${r.disk.dedicated}Mo\nBase de donné ${r.databases.dedicated}Mo`,*/ {
					embed: {
						title: "Informations concernant l'offre du serveur",
						description: `Nombre de cpu: ${r.cpu.core}, Flexcore: ${r.cpu.flexcore}\nMemoire(RAM) en dédié: ${r.memory.dedicated}Mo, Bonus: ${r.memory.bonus}Mo, Total: ${parseInt(r.memory.dedicated) + r.memory.bonus}Mo\nDisque: ${r.disk.dedicated}Mo\nBase de donné ${r.databases.dedicated}Mo`,
						footer: {
							text: "Commande éxécuté en " + reponse.data.exectime + " secondes"
						},
						timestamp: new Date()
					}
				})
			}
			request();
		} else if (args[0] === "action") {
			if (args[1] != "start" && args[1] != "stop" && args[1] != "restart" && args[1] != "kill") return message.reply("Actions invalide. Actions possible: `start`, `stop`, `restart`, `kill`");
			if (args[1] === "kill") return message.channel.send("Le kill n'est pas utilisable sur le bot par sécurité, veuillez vous rendre sur le panel pour effectuer cette action")
			const axios = require("axios");
			axios({
				method: 'post',
				url: 'https://rest.minestrator.com/api/v1/server/action',
				responseType: 'json',
				data: 'hashsupport=' + config.api.code + '&action=' + args[1].toLowerCase(),
				headers: {
					"Authorization": config.api.token
				},
			}).then(function (reponse) {
				console.log(reponse.data.data.message);
				message.channel.send({
					embed: {
						title: "Reponse du serveur:",
						description: "`" + reponse.data.data.message + "`"
					}
				})
			}).catch(err => {
				message.channel.send("Une erreur est survenue lors de la demande. Veuillez réessayer.")
				console.log(err)
			});
		} else return message.channel.send("Arguments invalide. Arguments possible: `ressource`, `content`, `info` et `action`")
	}
}