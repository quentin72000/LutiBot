const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'suggv2',
    description: "Envoie une suggestion dans le channel suggestion",
    guildOnly: true,
    execute (message, args, client, config){
    	errors = client.errors
    	if(!args[0] || !args[1])return errors.otherError(message, 'Vous devez fournir un sujet (`mc`, `discord`, `bot` ou `autre`) une suggestion après la commande !')
  //     if (args[0] != "mc" || args[0] != "bot" || args[0] != "discord") return errors.otherError(message, "Vous devez fournir un sujet avant votre suggestion ! Les sujet possible sont: `mc`, `discord` ou `bot`")
       let suject;
if (args[0] === "mc") suject = "le serveur minecraft"; else if (args[0] === "bot") suject = "le lutibot"; else if (args[0] === "discord") suject = "le serveur discord"; else if (args[0] === "autre") suject = "un autre sujet"
else return errors.otherError(message, "Vous devez fournir un sujet avant votre suggestion ! Les sujet possible sont: `mc`, `discord`, `bot` ou `autre`")
    try{
    var suggC = message.client.channels.cache.get(config.testServ.channels.general);
     suggC.send({embed: {
        title: `Suggestion de ${message.author.username}, concernant __${suject}__:`,
        description: args.splice(1).join(' '),
        color: "#6D41FF"
}}).then(sugget => {
  sugget.react('✅')
  sugget.react('❌')
})
 message.channel.send({embed: {

  title: '✅ Succès !',
  description: 'La suggestion a bien été envoyé !',
  color: "#00EA11",

}})
}catch (err) {
	errors.otherError(message, "Une erreur inconue est survenue,  veuillez réessayer ou contactez le dévlopeur")

}
}
    
};