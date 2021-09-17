const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "edit",
  execute (message, args, client, config) {
  	let editEmbed = {
  	title: "Listes des rôles: ",
      description: "Clique sur :loudspeaker: pour recevoir le rôle <@&778350208454623232>"
      + "\nClique sur :bar_chart:  pour recevoir le rôle <@&778350467969187840>"
      + "\nClique sur :tada: pour recevoir le rôle <@&791275467650498560>"
      + "\nClique sur :dollar: pour recevoir le rôle <@&821778529594245160>",
      color: config.basicColor
}
      			const channel = client.channels.cache.get("779083445212282920");
			channel.messages.fetch({
				limit: 5
			}).then(messages => {
				messages.forEach(message => {
					if(message.id == "791668567225139200") message.edit({embed: editEmbed})
				})
			})
      
  }
}