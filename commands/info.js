
const Discord = require("discord.js")
const config = require("../../config.json")
module.exports = {
    name: "info",
    aliases: ["information", "informations"],
    description: "Envoie des informations (comme le lien du site ou l’ip)",
    execute (message) {
    	
        message.channel.send({embed: {
        	title: "Informations:",
           fields: [
            {
            name: "Site",
            value: `[${config.site}](${config.site_url})`,
            inline: true,
            },
            {
            name: "Ip du serveur",
            value: config.ip,
            inline: true,
            
            } 
            

    ] 
    

    
    }})

    }
}