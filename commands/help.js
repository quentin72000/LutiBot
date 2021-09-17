 
module.exports = {
    name: 'help',
    description: "Envoie les info sur une commande ou la liste des commandes",
    aliases: ['aide'],
    execute (message, args, client, config) {
	
		if(!args.length) {
		
        return message.channel.send({embed:  {
        	
			title: "Informations et liste des commandes",
			footer: {
				text: "Pour avoir plus d’informations concernant une commande, faites `l!help <commande>`"
                },
			color: config.color.basic,
			fields: [
			     {
				name: "> ℹ Informations",
				value: "Préfixe: l! \nDévloppeur: quentin72000#3364"
                 },
                 {
                 name: "> 📃 Liste des commandes",
                 value: "help, avatar, ping, say, clear, sugg, faq, pfc, user-info, info, ftop, mc, tag"
                }
		]

        }}) }
        if(args[0] === "admin"){
          if(!message.member.hasPermission('ADMINISTRATOR'))return client.errors.noPerms(message, "ADMINISTRATOR");
          return message.channel.send({embed: {
              title: "Commandes pour les Administrateurs",
              description: "Les commandes suivantes sont accesible aux administrateur: \n`clear`, `lock`, ``"
          }})

        }

        var data = "";
		const { commands } = client;
        const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
		
		if(!command)return message.reply("Commande spécifié inconnue");
		
        data += `\n**Nom:** \`${command.name}\``;

		if (command.aliases) data += `\n**Aliases:** \`${command.aliases.join('\`, \`')}\``;
		if (command.description) {
			data += `\n**Description:** ${command.description}`;
		} else data += "\n**Description:** Aucune description"
		//data += `\n**Cooldown:** ${command.cooldown || 3} second(s)`;
        if (command.usage) data += `\n**Usage:**  ${command.usage}`;
	//	if (command.usage) data += `\n**Usage:** ${config.prefix}${command.name} {command.usage}`;

		message.channel.send({embed: {
			title: "Informations sur la commande `" + command.name + "`",
			description: data,
			color: "config.color.basic"
}});
		
        
  
    }
}