
const { MessageEmbed } = require("discord.js");
module.exports = {
  
  name: "ftop",
  aliases: ["top", "factiontop", "f-top", "faction-top", "factionstop"],
  inDev: false,
  devMsg: "Cette commande etant defectueuse, elle a été desactivée. Nous nous excusons pour la gêne occasionée.",
  description: "Donne les 3ere faction du ftop",
  execute(message, args, client, config, db){
		
		db.query("SELECT `FactionName`, `FactionLeader`, `TotalWorth`, `TotalWorthFormatted` FROM `factions_top` WHERE 1 ORDER BY `TotalWorth` DESC", async (err, result) => {
        if(err)throw err;
        if(args.length == 0) {
 
          
          
          let msg = "";
          
          for(let i = 0; ; i++){
            let n = i + 1
            if(n === 1) msg += `\n ${n}er: ` + result[i].FactionName + " avec " + result[i].TotalWorthFormatted + " points, avec comme leader `" + result[i].FactionLeader + "`";
            else {
           //   console.log(result[i].FactionName + " : " + result[i].TotalWorth)

            msg += `\n ${n}eme: ` + result[i].FactionName + " avec " + result[i].TotalWorthFormatted + " points, avec comme leader `" + result[i].FactionLeader + "`";
            }
          //  message.reply(msg)
  
             
            if (n == 5) {
              message.channel.send({embed: {

                title: "Factions Top | Page 1",
                description: ":warning: Attention: Les résultat peuvent étre fausé  a cause d'un bug ! :warning:\n" + msg,
                color: "0E4393",
                footer: {
                  text: "Page 1/2 | Faites l!ftop <page number> pour voir les autres page. | Mentioner @quentin72000#3364 pour actualiser le classement"
                }

              }})
              break;
              
            }

          }
        } else {
            if (args[0] = "2") {
              let msg = " ";

              for(let i = 5; ; i++){
                let n = i + 1
                
				console.log(n)
                msg += `\n ${n}eme: ` + result[i].FactionName + " avec " + result[i].TotalWorthFormatted + " points, avec comme leader `" + result[i].FactionLeader + "`";
                
              //  message.reply(msg)
      
                 
                if (i === 10 || result.length == i) {
                  message.channel.send({embed: {
    
                    title: "Factions Top | Page 2",
                    description: ":warning: Attention: Les résultat peuvent étre fausé  a cause d'un bug ! :warning:\n" + msg,
                    color: "0E4393",
                    footer: {
                      text: "Page 2/2 | Faites l!ftop <page number> pour voir les autres page. | Mentioner @quentin72000#3364 pour actualiser le classement"
                    }
    
                  }})
                  break;
                  
                }
    
              }
            }
          
        }
		
	})
		
    }
}