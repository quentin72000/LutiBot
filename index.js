const fs = require('fs');
// const log = require("./utils/logger.js")
const Discord = require('discord.js');
const config = require('./config.json');
/* const moment = require("moment");
 require("moment-duration-format"); */
 
 const { createConnection } = require("mysql")
 const db = new createConnection({
	host: config.db.host,
	port: config.db.port,
	user: config.db.user,
	database: config.db.database,
	password: config.db.password
})
 
 
 db.connect(function(err){
	if(err) throw err;
	client.log("Connected to the minestrator database!", 'debug')
})

const client = new Discord.Client({
  presence: {
    status: 'online',
    activity: {
      name: `Démarage...`,
      type: 'PLAYING'
    }
   }
  
});
const disbut = require('discord-buttons')(client);


client.fonction = require('./utils/fonction.js'); // pour utiliser les fonctions et les fonctions error dans les commandes à partir de client
client.errors = require('./utils/errors.js');
client.log = require("./utils/logger.js")

client.commands = new Discord.Collection();

//   si j’ai besoin de l’uptime
// const uptime = moment.duration(client.uptime).format(" D [jours(s)], H [heure(s)], m [minute(s)], s [seconde(s)]");


client.once('ready', () => {

	client.log('Ready ! Loged as ' + client.user.tag, "log"); //log lors que le bot est pret
	client.user.setActivity("Bot démarré !")
	const status = require("./utils/status.js");
    status.reloadRessource(client)
    status.reloadStatus(client)
    
	// fonction qui change le status du bot aléatoirement automatiquement
	setInterval(function() {
		let status = ["Bot de " + config.server_name, "Faites "+ config.prefix + "help pour voir la liste des commandes", "IP: " + config.ip, "Site: " + config.site];
		client.user.setActivity(status[Math.floor(Math.random() * (status.length))]);
	}, 10 * 1000)
	setInterval(function() {
		const status = require("./utils/status.js");
        status.reloadRessource(client)
        status.reloadStatus(client)
        
	}, 6 * 10000)
    
    // si la variable "inDev" est sur "false", envoie un message dans le salon logs de luti
  if (!config.inDev) client.channels.cache.get(config.luti.channels.log).send("✅ Bot démarré !");
  
  
  

  
  });
const  commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}



client.on('message', message => {

	// tags
	if(message.content.startsWith("..")){
		const tagName = message.content.slice(2)
		require('./utils/tag.js').execute(message, tagName, "..")
	} // fin tags


	// console.log(message.content)
	//lors que quelqu'un mentionne le bot, envoie le prefix 
	if(message.content.startsWith("<@!" + client.user.id + ">")){
      message.channel.send("Salut 👋, \nMoi c’est LutiBot, mon prefixe est `" + config.prefix + "`\nPour voir la liste de commande que je dispose fait `" + config.prefix + "help`")
      // console.log("pinged !")
    }
	
	
	/* const similarity = require("similarity")
	let test = similarity(message.content, "mot de passe oublié")
	if(test => 0.3 )return message.reply("yes:")*/
	
	// si quelqu'un utilise la commande play de MEE6, cela lui dit que il faut qu’il utilise Rythm
	if(message.content.startsWith("!p" || "!play")){
		message.reply("Veuillez utiliser le prefix `+` pour utiliser cette commande, cela donne donc `+p URL ou nom de la musique sur youtube`")
}

  // pour les oublie de mot de passe, a améliorer (phase de test)
	if(message.content.startsWith("+lostmdp")){
       	return message.reply({embed: {
       	title: "Tu a oublié ton mot de passe pour te connecter ? Pas de soucis ! :",
           description: "Contact un administrateur pour qu’il puisse reset ton mdp (__**ouvre un ticket !**__)"
           + "\n:warning:Une preuve que ton compte t’appartient vraiment peut être demander"
          
}})
}
// debut des commandes
   if(!message.content.startsWith(config.prefix) || message.author.bot)return;
   const args = message.content.slice(config.prefix.length).trim().split(/ +/)
   let commandName = args.shift().toLowerCase();
  
       
      //Commande de reload, ne fonctione pas
      /*
   	if(commandName === "reload"){
		message.channel.send({
			embed: {
				title: "Rechargement des commandes/plugins...",
				color: "#DD7700"
			}
		})
		try{
			const commandFiles = fs.readdirSync('./old_luti_bot/commands').filter(file => file.endsWith('.js'));
			var reloadedCommands = []
			for (const file of commandFiles) {
				const command = require(`./commands/${file}`);
				client.commands.set(command.name, command);
				reloadedCommands.push(command.name)
			}
			message.channel.send({
				embed:{
					title:"Commandes rechargées avec succès !",
					description:"```\n- "+reloadedCommands.join("\n- ")+"\n```",
					color:"#00AA00"
				}
			})
			return;
		} catch (err) {
			console.log(err)
			message.channel.send({
				embed:{
					title:"Impossible de recharger les commandes !",
					description: "```\n"+err+"\n```",
					color:"#AA0000"
				}
			})
		}
} */
   
//   const command = client.commands.get(commands) || client.commands.find(cmd => cmd.aliases.includes(commands))
      const command = client.commands.get(commandName) 
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); // ligne pour les alias 
   if(!command) return message.reply("Désolée, mais cette commande n’existe pas, faite `" + config.prefix + "help` pour avoir la liste de commandes");  // envoie un message lors que la commande éxécuté n’existe pas
 
   if (command.inDev && message.guild.id !== config.testServ.id){
     if(command.devMsg) return message.channel.send(command.devMsg)
     return message.reply("Cette commande est actuellement en dev. Vous ne pouvez donc pas l’utiliser dans se serveur."
     + "\nSi cella est une erreur contactez le dévlopeur. ") // Si la commande est "inDev", elle ne pourra etre utilisér que dans le serveur de test
   }
   
   if (command.guildOnly && message.channel.type === 'dm') {
    message.react('❌');
     
	return message.reply({embed: {
  color: config.color.error,
  title: ":x: | Imposible d'utiliser cette commande en message privé !"
}});
    
}
   
  try {
    
    command.execute(message, args, client, config, db);
	client.log(`La commande "${command.name} a été éxécuté par ${message.author.tag}"`, "debug")
   
} catch (error) {
	var time = new Date();
	
    client.log("Une erreur est survenue le " +  time.toLocaleTimeString('fr') + "\nsur la commande \"" + command.name + "\" "  + "\nsur le serveur \"" + message.guild.name + "\"" + "\n", "error");
  console.error(error); // envoie l’erreur et qu’elle que Informations sur celle-ci

    message.react('❌').catch(()=> 0); // reagis aux message concerné avec une croix
    
    message.channel.send({embed: {
  color: config.color.error,
  title: ":x: | Une erreur est survenue lors de l’exécution de la commande !\n" +
         "Si cette erreur persiste,  veuillez contactez le dévlopeur.",
      description: `Details: ${error}`,
      timestamp: new Date()
      
}}); // envoie un embed avec l’erreur (en reduit, see console for more)
    client.fonction.logEmbed(message, "Une erreur est survenue:",  "\nsur la commande \"" + command.name + "\"\ndans le salon \" #" + message.channel.name + " \"\n" + error, config.color.error) // envoie l’erreur dans les logs
}

  
   
})
client.on("messageDelete", message => {
	blockedChann = ["713031312633757747"]
	if (message.channel.type === 'dm') return;
	if (message.author.id === client.user.id) return;
	if (blockedChann.includes(message.channel.id))return;
	if(message.content.startsWith("l!shutdown")) return;
    if(message.content.startsWith("l!sugg")) return;
	client.fonction.logEmbed(message, "Un message de " + message.author.username + " à été supprimé",  "Contenu: `" + message.content +
"` \nDans: "+ message.channel.name, "#FF5160")
})

client.on("messageUpdate", (oldMessage, newMessage) => {
	if(newMessage.author.bot)return;
	if(newMessage.content === oldMessage.content)return;
	if (newMessage.channel.type === 'dm') return;
	if(newMessage.id === "855904715387568158")return;
	if(newMessage.id === "859064641837989938")return;
    client.fonction.logEmbed(newMessage, "Le message (" + newMessage.id  + ") de " + newMessage.author.tag + "(" + newMessage.author.id + "):", "`Ancien message`: " + oldMessage.content + "\n`Nouveau message`: " + newMessage.content, "COLOR", newMessage.url)

	
})

client.on('clickButton', async (button) => {
//	if(button.id === "test") require("./test.js").execute(button, client, config)
    if(button.id.startsWith("action_")){
      // console.log("yep 1")
    	if(button.clicker.user.id != "611938209366016000") return button.clicker.user.send("nop");
		// button.clicker.user.send("nop");
        let action = "";
        if(button.id.includes("start")) action = "start";
        if(button.id.includes("restart")) action = "restart";
        if(button.id.includes("stop")) action = "stop";
        button.defer()
        require("./action.js").actionButton(button, client, config)
        
		// const axios = require("axios");
		// 	axios({
		// 		method: 'post',
		// 		url: 'https://rest.minestrator.com/api/v1/server/action',
		// 		responseType: 'json',
		// 		data: 'hashsupport=X5UZP&action=' + action,
		// 		headers: {
		// 			"Authorization": config.api.token
		// 		},
		// 	}).then(function (reponse) {
		// 		console.log(reponse.data.data.message);
		// 		button.channel.send({
		// 			embed: {
		// 				title: "Reponse du serveur:",
		// 				description: "`" + reponse.data.data.message + "`"
		// 			}
		// 		})
		// 	}).catch(err => {
		// 		button.channel.send("Une erreur est survenue lors de la demande. Veuillez réessayer.")
		// 		console.log(err)
		// 	});
     //   console.log(action)
        
      
  }
});

client.login(config.token); // se login

/*

const http = require("http")

http.createServer(function(req,res){
	if (fs.existsSync("./pages_http"+req.url) && req.url != "/"){
		res.write(fs.readFileSync("./pages_http"+req.url))
	} else if (fs.existsSync("./pages_http"+req.url+".run.js")) {
		const tempLib = require("./pages_http"+req.url+".run.js")(req.url)
	} else if (req.url == "/") {
		res.write(fs.readFileSync("./pages_http/index.html"))
	} else if (fs.existsSync("./404.html")) {
		res.write(fs.readFileSync("./pages_http/404.html"))
	} else {
		res.write("404 Error")
	}

	if(req.url == "/online.txt"){
		require("./uptime.js").execute(client, config)
	}
	res.end()
}).listen(2000) */

require('./server')();