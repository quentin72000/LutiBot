const config = require("../config.json")
module.exports = {
	async reloadRessource(client){
		
		const api = require('../api.js')
		
			const reponse = await api.getRessources("X5UZP") // X5UZP, FREESWVV7
			var data = reponse.data.data[0]
			
			var status = "";
			if (data.status === "on") {
				status = "Le server est " + data.status + "\nDisk utilisé: " + data.disk.live + "Mo / " + data.disk.max + "Mo\nRAM utilisé: " + data.memory.live + "Mo / " + data.memory.max + "Mo"
			} else if (data.status === "starting") status = "Le server est en train de démarré !"
			else if (data.status === "stopping") status = "Le serveur est entrain de s'arrété !!!"
			else if (data.status === "off") {
				status = "Le serveur est off !!!"
			}
		//	console.log(data)
		
		
		// console.log(data);
		
		
		const channel = client.channels.cache.get("853185416311865404");
		channel.messages.fetch({
			limit: 10
		}).then(messages => {
			messages.forEach(message => {
				if(message.id == "855904715387568158")	message.edit({embed: {
                       title: "Ressoucrces:",
                       description: status,
                      // color: status.color,
                       timestamp: new Date(),
                } }).then(() => client.log("Embed des ressources actualisé acctualisé !", "log"))
			})
		})
	},
	async reloadStatus(client){
		const tcp = require('tcp-ping');
        const mc = require("minecraft-protocol")

        let result = {}
        result.web = {};
        result.offcount = 0;
        await tcp.ping({
            address: config.site,
            timeout: 1000
          }, function(err, data){
            if(err)throw err;
            if(data.max == undefined){
              console.log(data.address + " est hors ligne: " + data.results[0].err);
              result.web.status = false
              result.web.msg = "<:s_off:750646770853347359> Le site est down"
              // result.color = "#bf0000"
              result.offcount++;
        
            }else {
              console.log(data.address + " est en ligne avec " + parseInt(data.avg * 100)/100 + "ms de moyenne de ping")
              result.web.status = true
              result.web.msg = "<:s_on:750646690079440898> Le site est up avec " + parseInt(data.avg * 100)/100 + "ms de moyenne en latence."
            }
          })
        
		// console.log(result.web.row)




        mc.ping({
            host: config.ip
        }, function (err, res) {
            if (err) {
                console.log(err)
                result.mc = {
                    msg: "<:s_off:750646770853347359> Le serveur mc est down !",
                    connected: false,
                    latency: 0,
                    players: {
                        max: 0,
                        online: 0
                    }
                }
                result.offcount++;
                
            } else {
                result.mc = {
                    connected: true,
                    msg: `<:s_on:750646690079440898> Le serveur mc est up ! (Latence: ${res.latency}, Joueurs: ${res.players.online}/${res.players.max})`,
                    latency: res.latency,
                    players: {
                        max: res.players.max,
                        online: res.players.online

                    }
                }
                
            }
            switch (result.offcount) {
                case 0:
                    result.color = "00FF00";
                    result.description = "Tous est en ordres, tous les services sont en ligne."
                    break;
                case 1:
                    result.color = "eed202";
                    result.description = "<:s_warning:750648019564888065> Certains services sont hors-ligne.";
                    break;
                case 2:
                    result.color = "cc0000";
                    result.description = ":x: Tous les services sont hors-ligne !!!"
                    break;
            }
            const channel = client.channels.cache.get("750644750759100436");
            channel.messages.fetch({
                limit: 10
            }).then(messages => {
                console.log(result.web.msg)
                messages.forEach(message => {
                    if (message.id == "859064641837989938") message.edit({
                        embed: {
                            title: "Status de nos diférents services",
                            description: result.description,
                            color: result.color,
                            timestamp: new Date(),
                            fields: [{
                                    name: "<:s_website:750647434052370442> Status du site: ",
                                    value: result.web.msg
                                },
                                {
                                    name: "<:s_server:750647306939793439> Status du serveur MC:",
                                    value: result.mc.msg
                                }
                            ]

                        }
                    })
                })
            })
        });
	}
}