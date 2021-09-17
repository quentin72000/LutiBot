const config = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'code',
    inDev: true,
    execute (message) {
    
    
        const embed = {
        
             color: config.color.basic,
             title: 'Code d’erreur :x:',
             fields : [
          
              {
                name: "code 1",
                value: "erreur critique lors de l’execution d’une commande"
                          
             },
             {
                name: "code 5",
               value: "erreur lors d’une suppression d'un message precis\nCela peut etre du au fait que le message n'exsite plus"
             
             }
          
          ]
             

          
          
        
        };
       message.channel.send({embed: embed})
    
    }
}