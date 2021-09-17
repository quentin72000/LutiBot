const Discord = require("discord.js");
const fs = require("fs");
let config = require ("../config.json");


module.exports.log = (message, logM) => {
  
    
	var channelId;
  
    if(message.guild.id === config.testServ.id) channelId = config.testServ.channels.log
    else if (message.guild.id === config.luti.id) channelId = config.luti.channels.log
    else channelId = config.luti.channels.log;
    var logsChannel = message.client.channels.cache.get(channelId);
    
    try{
    logsChannel.send(logM);
    } catch (e){
      console.error(e);
    }
}

module.exports.logEmbed = (message, title, description,  color, link) => {
	
	
	var channelId;
  
    if(message.guild.id === config.testServ.id) channelId = config.testServ.channels.log
    else if (message.guild.id === config.luti.id) channelId = config.luti.channels.log
    else channelId = config.luti.channels.log;
    var logsChannel = message.client.channels.cache.get(channelId);
    
  let embed = {
    title:  title,
    description: description,
    color: color,
    timestamp: new Date(),
    footer: {
    	url: message.author.displayAvatarURL({dynamic: true})
}
  }
  if(link) embed.url = link
  
  logsChannel.send({embed: embed})
  
}

