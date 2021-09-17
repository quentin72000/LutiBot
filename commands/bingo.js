module.exports = {
    name: "bingo",
    inDev: true,
    execute (message, args) {
    	const number = randomInt(1, 10)
        var messageN;
        /*
    	message.channel.awaitMessages(m => m.author.id == message.author.id,
                            {max: 10, time: 30000}).then(collected => {
                            	if(collected[messageN].content === "1") return console.log("yes")
                            else return console.log("no")
})*/

message.channel.awaitMessages(m => m.author.id == message.author.id,
                            {max: 1, time: 30000}).then(collected => {
                            	if(collected[0].content === "1") return console.log("yes")
                            else return console.log("no")
                                  
                                                
                            }).catch((err) => {
                                 message.reply('No answer after 30 seconds, operation canceled.');
                                  console.log(err)
                            });

}}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};