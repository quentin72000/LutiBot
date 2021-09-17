module.exports = {
    name: "tag-v2",
    description: "Version 2 de la commande \"tag\"",
    inDev: true,
    execute(message, args){
        if(!args.length)return message.channel.send("Vous devez présisez un tag apres la commandes")
        const fs = require("fs");
        const tagsFile = JSON.parse(fs.readFileSync("./commands/tags.json").toString())

        for (const i in tagsFile) {
            if(tagsFile[i].name === args[0]) {
                return message.channel.send(tagsFile[i].message)
            } else message.channel.send("Aucun tags trouvé")
        }


    }
}