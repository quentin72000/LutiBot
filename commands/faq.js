module.exports = {
  name: 'faq',
  description: 'envoie un embed avec les questions récurrentes (foires aux questions)',
  guildOnly: false,
  execute(message, args, client, config) {
    let color = ["#40A497", "#B938B8", "#59B938", "#6D41FF"];
    const index = Math.floor(Math.random() * (color.length));
    let embed = {
      title: "Questions récurrentes (foires aux questions)\n",
      color: color[index],
      fields: [{
          name: "> ️1️⃣ Quelle est l'ip du serveur ?",
          value: "L’ip du serveur est: `" + config.ip + "`"
        },
        {
          name: "> 2️⃣ Le serveur est-il ouvert aux cracks ?",
          value: "**Oui**, le serveur est __ouvert au crack__ !"
        },
        {
          name: "> 3️⃣ Avec quel Minecraft puis-je me connecter ?",
          value: "Lutiorp est un serveur **Java** Edition."
        },
        {
          name: "> 4️⃣ Pourquoi je n'arrive pas à me connecter ?",
          value: "Le serveur est peut-être **hors ligne** ou en **maintenance**.\nPour plus d'informations, veuillez vérifier le salon <#799946410664394772>."
        },
        {
          name: "> 5️⃣ Quelle est la version du serveur ?",
          value: "Le serveur est accessible de la version **1.8 à la version 1.17**.\n__Nous vous recommandons de vous connecter en **version 1.9.4**__."
        },
        {
          name: "> ️6️⃣ Avez vous un site pour que je puisse voter ?",
          value: `Oui ! Vous pouvez voter **[ici](${config.site_url}/vote)** et le site est accesible à cette adresse: **[${config.site}](${config.site_url})**`
        }
      ],
      timestamp: new Date(),
      footer: {
        text: `Commande éxécuté par ${message.author.username}`
      }
    };
    message.channel.send({
      embed: embed
    });

  }
}