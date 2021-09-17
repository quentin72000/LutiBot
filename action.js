module.exports = {
	// execute(button, client){
		
  // },
  async actionButton(button, client){
  	const config = require("./config.json");
    if(!config.whitelist.includes(button.user.id)) return;
    if(button.id.includes("start")) action = "start";
        if(button.id.includes("restart")) action = "restart";
        if(button.id.includes("stop")) action = "stop";
      //  var result;
        let result = await confirm(button.clicker.user, action)
        console.log(result)

  }
}

async function confirm(user, action){
  user.send("Voulez vous vraiment " + action + " ?").then(async (messageC) => {
    await messageC.react("✅")
    await messageC.react("❌")
    messageC.awaitReaction((reaction, userC) => userC.id == user.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'), {max: 1, time: 40000}).then(collected => {
      messageC.delete();
      if(collected.firt().emoji.name == '✅'){
        return true;
      }
      else if(collected.firt().emoji.name == '❌'){
        return false;
      }
    }).catch((err) => {
      console.error(err)
            message.reply('Aucune reaction apres 30sec, operation annulé');
    });
    
  }).catch((err) => {
    
  });
}