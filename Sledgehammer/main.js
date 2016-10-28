const Discord = require("Discord.js");
const Config = require("./Config.json");
const fs = require("fs");

let Commands = {
	all: [],
	list: {}
};

const Utils = {
	loadCommands: () => {
		return new Promise((resolve, reject) => {
			let Files = fs.readdirSync(__dirname+"/Commands");
			for(let File of Files){
				if(File.endsWith('.js')){
					try{
						Commands.all[file.slice(0, -3)] = require(__dirname+'/Commands/'+file);
						for(let Command of Commands.all[File.slice(0, -3)].List){
							Commands.list[Command] = File.slice(0, -3);
						}
					}catch((e) => {
						reject(e);
					});
				}
			}
			resolve();
		});
	}
};

let Sledgehammer = new Discord.Client({
	autoReconnect: true,
	disable_everyone: true,
	maxCachedMessages: 250,
	bot: true,
	userAgent: {
		version: require('./package.json').version
	}
});

Utils.loadCommands().then(() => {

});