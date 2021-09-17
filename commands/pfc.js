const Discord= require("discord.js");
module.exports = {
	name: "pfc",
	description: "jouer aux pierre, feuilles, ciseaux !",
	execute(message, args){
  if (!args[0])
    return message.reply('Veuillez mettre un argument à la commande. Choisissez entre `p`, `f` ou `c`.'); // envoie un message lors que aucun args fournit
    
  if (args[0] != 'p' && args[0] != 'f' && args[0] != 'c') {
    message.reply('Ceci n’est pas un argument valide ! Choisissez entre `p`, `f` ou `c`.') // envoie un message lors qu'un args invalide est fournit
      .then((msg) => msg.delete({timeout: 5000}))
      .catch(err => console.error(err));
    return;
  }

  var playerV;
  var player;

  var meV = randomInt(0, 2);
  var me;

  switch (args[0]) {
    case 'p':
      player = ':rock: pierre'
      playerV = 0;
      break;
    case 'f':
      player = ':page_facing_up:feuilles'
      playerV = 1;
      break;
    case 'c':
      player = ':scissors: ciseaux'
      playerV = 2;
      break;
  }
  switch (meV) {
    case 0:
      me = ':rock: pierre'
      break;
    case 1:
      me = ':page_facing_up:feuilles'
      break;
    case 2:
      me = ':scissors: ciseaux'
      break;
  }
  let result= {
  title: "🎖 Resultat:",
  description: "Votre choix: " + player
  + "\nMon choix: " + me
}
  if (meV == playerV) {
 //   message.channel.send(`Vous avez choisi ${player}, et j’ai choisi ${me}. Égalité !`);
    result.description += "\n\nÉgalité !";
    result.color = "#B3B3B3";
    message.channel.send({embed: result})
   
  }

  if (meV == eClamp(playerV + 1, 0, 2)) {
  //  message.channel.send(`Vous avez choisi ${player}, et j’ai choisi ${me}. J’ai gagné !`);
    result.description += "\n\nJ’ai gagné !";
    result.color = "#E55700";
    message.channel.send({embed: result})
  }

  if (meV == eClamp(playerV - 1, 0, 2)) {
//    message.channel.send(`Vous avez choisi ${player}, et j’ai choisi ${me}. Vous avez gagné!`);
    result.description += "\n\nVous avez gagné !";
    result.color = "#00E60F";
    message.channel.send({embed: result})
  }
  
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function eClamp(value, min, max) {
  if (value < min)
    value = max;

  if (value > max)
    value = min;

  return value;
};
}
}