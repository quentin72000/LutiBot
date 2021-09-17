module.exports = {
    // old command -> moved tag-v2
    name: "tag",
    description: "Envoie de courtes informations",
    usage: "`l!tag <nom du tag>` ou `l!tag list`",
    aliases: ["tags"],
    execute(message, args, _client, config) {
        // console.log(args[0]);

        if (!args.length) return message.channel.send("Vous devez présicez un tag aprés la commande ! Faites `l!tag list` pour accédez a la liste des tags.")
        var tags = ["lostpass", "site", "ip", "vote"]
        switch (args[0].toLowerCase()) {
        	case "mdpoublié":
            case "motdepasseoublié":
            case "lostpassword":
            case "lostpass":
                send(message, "Tu as oublié ton mot de passe pour te connecter ? Pas de soucis ! :", "Contact un administrateur pour qu’il puisse reset ton mdp (__**ouvre un ticket !**__)" +
                    "\n:warning:Une preuve que ton compte t’appartient vraiment peut t'être demander :warning:");
                break;
            case "site":
                send(message, "Site", "Notre site est disponible a l'addresse suivante: [luticorp.cf](https://www.luticorp.cf)");
                break;
            case "ip":
                send(message, "IP", "Vous pouvez vous connectez au serveur avec l'ip suivante: `" + config.ip + "`");
                break;
             case "vote":
                 send(message, "Votez pour récupérer des récompenses !", "Vous pouvez votez [ici: luticorp.cf/vote](https://luticorp.cf/vote)");
                 break;
            case "l":
            case "list":
                message.reply("Listes des tags: `" + tags.join('`, `') + "`");
                break;

            default:
                message.reply("Le tag `" + args[0] + "` n'éxiste pas ! Faites `l!tag list` pour avoir la liste des tags exsistant.");
                break;
        }

        function send(message, tagTitle, tagMessage) {
            return message.channel.send({
                embed: {
                    title: tagTitle,
                    description: tagMessage,
                    color: "0E71E2"
                }
            })
        }
    }

}