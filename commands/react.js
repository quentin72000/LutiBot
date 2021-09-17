module.exports = {
    name: 'react',
    inDev: true,
    execute (message) {
      
     let msg = message.client.channels.cache.get("713400991935889418").messages.fetch("793779643978219551")
     msg.react('2️⃣')
     message.react('✅'); 
     message.react('⛔');
    }
}