module.exports = {
  name: "join",
  descrition: "simule un join",
  execute (message, args, client){
    try{
    client.emit('guildMemberAdd', message.member)
    message.reply("simulation en cours !")
    } catch (error){
      console.error(error)
    }
  }
}