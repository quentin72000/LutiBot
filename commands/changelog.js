module.exports = {
	name: "changelog",
	execute (message){
		message.channel.send({embed: {
		  title: "Changelog du 28 et 29 juin concernant LutiBot",
		description: "",
		color: "",
		footer: {
			text: "",
			icon_url: message.author.displayAvatarURL({dynamic:true})
        },
        timestamp: new Date()
    }})
  }
}