// avant
module.exports = {
	name: "old-ftop",
	 description: "Donne les 3ere faction du ftop",
	execute(message, args, client, config, db){
		
		db.query("SELECT `FactionName`, `FactionLeader`, `TotalWorth`, `TotalWorthFormatted` FROM `faction_top` WHERE 1 ORDER BY `TotalWorth` DESC", async (err, result) => {
        if(err)throw err;
//        console.log(result)
          
        message.channel.send("1er: " + result[0].FactionName + " avec " + result[0].TotalWorthFormatted + " points"
                            + "\n2ème: " + result[1].FactionName + " avec " + result[1].TotalWorthFormatted + " points"
                            + "\n3ème: " + result[2].FactionName  + " avec " + result[2].TotalWorthFormatted + " points"
                            + "\4ème: " + result[3].FactionName  + " avec " + result[3].TotalWorthFormatted + " points"); 
           message.channel.send({embed: {
            
             title: "Faction Top",
             description: "1er: " + result[0].FactionName + " avec " + result[0].TotalWorthFormatted + " points"
                             + "\n2ème: " + result[1].FactionName + " avec " + result[1].TotalWorthFormatted + " points"
                            + "\n3ème: " + result[2].FactionName  + " avec " + result[2].TotalWorthFormatted + " points"
                           + "\n4ème: " + result[3].FactionName  + " avec " + result[3].TotalWorthFormatted + " points"
           }})  
		
	})
		
    }
}