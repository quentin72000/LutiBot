const axios = require("axios");
const {token} = require("./config.json").api;
const BASE_URL = `https://rest.minestrator.com/api/v1/`
module.exports = {
    getList: () => axios({
        methode:"GET",
        url : BASE_URL + "server/list",
        headers: {
            "Authorization": token
        }
    }).catch(error => console.error(error)),
    getInfo: (code) => axios({
        methode: "GET",
        url : BASE_URL + "server/data/" + code,
        headers: {
            "Authorization": token
        }
    }).catch(error => console.error(error)),
    getContent: (code) => axios({
        methode: "GET",
        url: BASE_URL + "server/content/" + code,
        headers: {
            "Authorization": token
        }
    }).catch(error => console.error(error)),
    getRessources: (code) => axios({
        methode: "GET",
        url: BASE_URL + "server/ressources/" + code,
        headers: {
            "Authorization": token
        }
    }).catch(error => console.error(error)),

    // doAction ne fonctione pas: reponse = undefined
    // pour l'utiliser quand méme utiliser le code présent dans "doaction.txt"
    doAction: (code, action) => {
        
            axios({ //Actions possible : start, stop, restart, kill
                method: 'post',
                url: "https://rest.minestrator.com/api/v1/server/action",
             //   responseType: 'json',
                data: "hashsupport=" + code + "&action=" + action,
                headers: {
                    "Authorization" : token
                }
                // params: {
                //     hashsupport: "FREESWVV",
                //     action: "start"
                // }//.catch((err) => {
                   // console.error(err);
                //})
            })
         
  }
}
