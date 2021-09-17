module.exports = {
    name: "test",
    execute (message, args, client) {
    	/*
    	message.channel.awaitMessages(m => m.author.id == message.author.id,
                            {max: 1, time: 30000}).then(collected => {
                                    // only accept messages by the user who sent the command
                                    // accept only 1 message, and return the promise after 30000ms = 30s
                                    
                                    var color = collected.first().content;
                                    message.channel.send({embed: {
                                    	title: args.join(" "),
                                        color: color


}})                                    
                                    collected.first().delete();
                                                
                            }).catch((err) => {
                                 message.reply('No answer after 30 seconds, operation canceled.');
                                  console.log(err)
                            });
      
                           
                         */ 
                        //   console.log(message.guild.owner.user.tag)
                        // const channel = message.client.channels.cache.get("794699229150183434")
                        // console.log(channel.name)
                        // message.author.send("test: " +channel)
      client.log("test", "error")
                  
                  
                  
                

    }

}