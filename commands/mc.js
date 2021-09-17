module.exports = {
	name: "mc",
	aliases: ["mcinfo", "minecraftinfo", "mc-info", "minecraft-info"],
	description: "Envoie le satus du serveur Minecraft (la commande peut prendre du temps a étre éxécuté)",
	execute (message) {
        const mc = require("minecraft-protocol")
        const Discord = require("discord.js")
		
		result = {}
		mc.ping({
			host: config.ip
		}, function(err, res) {
			if (err) {
				console.log(err)
				result.minecraft = {
					connected: false,
					latency: 0,
					players: {
						max: 0,
						online: 0
					}
				}
			} else {
				result.minecraft = {
					connected: true,
					latency: res.latency,
					players: {
						max: res.players.max,
						online: res.players.online
					}
				}
			}
            let embed= {
				footer: {text: `Systéme crée par J.A. | Commande éxécuté par ${message.author.username} en ${ Date.now() - message.createdTimestamp}ms`}


     };
            	if (result.minecraft.connected) {
					// si serveur on
					embed.color = "#80FF00"
				
					embed.title = "<:s_on:750646690079440898> **Serveur Minecraft** : En ligne (Latence :\`" + result.minecraft.latency +"\`ms)"
					embed.description = "Joueurs: \`" + result.minecraft.players.online + "\`/\`"+ result.minecraft.players.max + "\`"
				} else {
					// si serveur off
					embed.color = "#FF0000"
					
					embed.title = `<:s_off:750646770853347359> **Serveur Minecraft** : Hors-ligne`
				}
            message.channel.send({embed: embed})

            })
                
                 
                }
                }
            
