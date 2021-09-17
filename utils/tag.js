module.exports = {
    execute(message, tagName, prefix) {
        // console.log(args[0]);
        const responseObject = require("./tags.json")

        // lors de la demandes de la liste des tags

        const tagList = getTagsList();

        if (!tagName.length || tagName === "help") return message.channel.send("Vous devez présicez un tag aprés la commande ! Faites `" + prefix + "list` pour accédez à la liste des tags.", {
            embed: {
                title: "Explication du principe et de l'utilisation des tags",
                fields: [
                    {
                        name: "C'est quoi les tags ?",
                        value: "Les tags sont des racourcis pour éviter de devoir répéter les information souvent demandé."
                    },
                    {
                        name: "Comment sa marche les tags ?",
                        value: "Pour voir un tags faite `" + prefix + "<nom du tags>` (sans les \"< >\") et `" + prefix + "list`"
                    },
                    {
                        name: "Quels sont les tags disponibles actuellement ?",
                        value: "Les tags suivants sont actuellement disponibles: `" + tagList.join("`, `") + "`"
                    }

                ]
            }
        })
        else if (tagName === "list") {
            return message.reply("Listes des tags: `" + tagList.join("`, `") + "`")
        }


        if (responseObject[tagName]) {
            message.channel.send({ embed: {
                    title: responseObject[tagName].title,
                    description: responseObject[tagName].description,
                    color: responseObject[tagName].color ? responseObject[tagName].color : "#B3AD7D",
                    footer: {
                        text: "Tags demandé par " + message.author.tag,
                        icon_url: message.author.displayAvatarURL({dynamic: true})
                    },
                    timestamp: new Date()
                }
            });
        } else return message.channel.send("Ce tag n'éxiste pas ! Faites `" + prefix + "list` pour avoir la liste des tags exsistant.");
    }

}


function getTagsList() {
	const responseObject = require("./tags.json")
    let tagListResult = []
    for (const property in responseObject) {
        tagListResult.push(property)
    }
    return tagListResult;
}