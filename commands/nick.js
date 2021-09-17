module.exports = {

   name: "nick",
   inDev: true,
   aliases: ['nickname', 'pseudo'],
   execute (message) {
   message.guild.members.setNickname("RandomName");
     
   
   }

}