const Discord = require("discord.js");
const fs = require("fs");
// const moment = require("moment")
let config = require ("../config.json")
const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

module.exports.notWhitelisted = (message) => {
    message.channel.send({embed: {
      title: "Vous ne pouvez pas utilisé cette commande. Vous devez étre whitelist pour exécuter cette commande.",
      color: config.color.error,
      author: {
        name: message.author.tag,
        icon_url: message.author.displayAvatarURL({dynamic: true})
      }
    }})
}
module.exports.noPerms = (message, perm) => {
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setTitle("Tu n\'as pas la permission pour exécuter cette commande !")
    .setColor(config.color.error)
    .addField("Permission requise:", perm)
    .setFooter('Commande éxécuté par' + message.author.username, message.author.displayAvatarURL())
    .setTimestamp();
  
    message.react('❌');
    message.delete({timeout : 10000})
    message.channel.send(embed).then(m => m.delete({ timeout: 10000}));
    message.client.channels.cache.get(config.luti.channels.log).send({embed: {
        title: "Un utilisateur a tenté d'utilisé une commande au quel il n'avait pas accés",
        description: `Utilisateur: ${message.author.tag} ${message.user}\n` + 
          `Commande: ${message.content}\n` + 
          `Permision requise: ${perm}`,
          color: "FFBD00",
          author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL({dynamic: true})
          }

    }});
}

/* module.exports.equalPerms = (message, user, perms) => {

    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setColor(config.color.error)
    .setTitle("Error")
    .addField(`${user} has perms`, perms);
    message.channel.send(embed).then(m => m.delete({timeout : 10000}));
} */

module.exports.botuser = (message) => {
    let embed = new Discord.MessageEmbed()
    .setTitle("Erreur")
    .setDescription("Tu ne peux pas ban le bot.")
    .setColor(config.color.error);
    message.channel.send(embed).then(m => m.delete({timeout: 10000}));
}

module.exports.cantfindUser = (message) => {
    let embed = new Discord.MessageEmbed()
    .setTitle("Erreur")
    .setDescription("Impossible de trouver cet utilisateur.")
    .setColor(config.color.error);
    message.channel.send(embed).then(m => m.delete(10000));
}

module.exports.noReason = (message) => {
    let embed = new Discord.MessageEmbed()
    .setTitle("Erreur")
    .setDescription("Stp indique une ou des raison(s).")
    .setColor(config.color.error);
    message.channel.send(embed).then(m => m.delete(10000));
}
module.exports.otherError = (message, description) => {

    
    let embed = {
      color: config.color.error,
      title: ':x: | Erreur !',
      description: description
    };
    message.react('❌');
  message.delete({timeout: 10000}).catch();
  message.channel.send({embed : embed}).then(m => m.delete({timeout: 10000}));
  
}

