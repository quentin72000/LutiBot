// To use it paste that in our file: const log = require("[PATH TO THIS FILE]")
// and use log("[MESSAGE TO LOG]", "SEVERITY") // note: severity can only be "info", "warn", "error" or "debug"
// to enable debug message, set "debug" to true in our config.json file

// module required: moment and chalk

const { debug } = require("../config.json") // make sure to verify the file path

const chalk = require('chalk');
// const debug = true;
module.exports =  (logM, severity) => {
	
		
		var moment = require('moment');
		moment.updateLocale("Paris/France");
		var now = moment().format("H:mm:ss")

		if (!severity || severity === "log") {
			if (logM.includes("\n")) {
				return parseMulLine(logM, "INFO", now)
			}
			parse(logM, "INFO", now)
		} else if (severity === "warn") {
			if (logM.includes("\n")) {
				return parseMulLine(logM, "WARN", now)
			}
			console.warn("[" + now + " WARN]: " + logM)
		} else if (severity === "error") {
			if (logM.includes("\n")) {
				return parseMulLine(logM, "ERROR", now)
			}
			parse(logM, "ERROR", now)
		}
		else if(severity === "debug" && debug === true){
			if(logM.includes("\n")){
				return parseMulLine(logM, "DEBUG", now)
			}
			parse(logM, "DEBUG", now)
		}
	}


function parse(message, severity, time) {
	if (severity === "INFO") {
	console.info("[" + time + " " + chalk.hex("6ca0d6")(severity) + "]: " + message)
	}else if (severity === "WARN"){
		console.warn("[" + time + " " + chalk.keyword('orange')(severity) + "]: " + message)
	}else if (severity === "ERROR"){
		console.error("[" + time + " " + chalk.red(severity) + "]: " + chalk.bgRed(message))
	}else if(severity === "DEBUG"){
		console.debug("[" + time + " " + chalk.green(severity) + "]: " + message)
	}

}

function parseMulLine(message, severity, time) {
	const mulM = message.split("\n")
	if (severity === "INFO") {
		for (let i = 0; i < mulM.length; i++) {
			console.info("[" + time + " " + chalk.hex("6ca0d6")(severity) + "]: " + mulM[i])
		}
	} else if (severity === "WARN") {
		for (let i = 0; i < mulM.length; i++) {
			console.warn("[" + time + " " + chalk.keyword('orange')(severity) + "]: " + mulM[i])
		}
	} else if (severity === "ERROR") {
		for (let i = 0; i < mulM.length; i++) {
			console.error("[" + time + " " + chalk.red(severity) + "]: " + chalk.bgHex("#d61304")(mulM[i]))
		}
	} else if (severity === "DEBUG") {
		for (let i = 0; i < mulM.length; i++) {
			console.debug("[" + time + " " + chalk.green(severity) + "]: " + mulM[i])
		}
	}

}