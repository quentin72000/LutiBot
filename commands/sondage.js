module.exports = {
	name: 'sondage',
	description: "Commande pour créer un sondage! Pratique n'est-ce pas ?",
	inDev: true,
	execute(message, args, client, config) {
		if(!message.member.hasPermission('MANAGE_MESSAGE')) return;

		if(args.join(" ").length == 0){
			message.channel.send({
				embed:{
					title:"Un ou des arguments sont manquants !",
					color:"#AA0000"
				}
			})
			return
		}

		message.channel.send({
			embed: {
				color: "#999999",
				description: args.join(" "),
				author: {
					name: "Sondage de : "+message.author.username
				}
			}
		})
		.then(async function(embed){
			await embed.react("✅");
			await embed.react("❔");
			await embed.react("❌");
		})

		message.delete()
	},
};