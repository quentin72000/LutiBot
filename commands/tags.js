module.exports = {
    name: "tags",
    description: "Envoie de courtes informations",
    usage: "`l!tag <nom du tag>` ou `l!tag list`",
    aliases: ["tag"],
    execute(message, args, client, config) {
        let tagName = ""
        if(!args[0]) tagName = "help";
        else tagName = args[0]
        require("../util/tags.js").execute(message, tagName, "l!tags ")
        

    }

}