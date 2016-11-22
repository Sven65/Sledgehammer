const Discord = require("discord.js");
const Config = require("./Config.json");
const Token = require("./token.json").token;
const fs = require("fs");
const rethink = require('rethinkdb');
const Handlers = require("./Handlers/Handlers.js");

global.Server = require("./Utils/Server/Index.js");
global.DateFormat = require("./Utils/DateFormat.js");
global.User = require("./Utils/User/Index.js");

let Commands = {
	all: [],
	list: {}
};

String.prototype.capFirst = function(){
	return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.formatNumber = function(){
	return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

Number.prototype.formatNumber = function(){
	return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

String.prototype.escapeRegExp = function(){
    return this.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

String.prototype.actualLength = function(){
	return this.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '_').length;
}

String.prototype.containsArray = function(array){
	let x = false;
	let valid = true;
	array.map((a) => {
		try{
			let dd = new RegExp(a.replace(/\//g, ""));
		}catch(e){
			valid = false;
		}

		if(!valid){
			if(this.includes(a)){
				x = true;
			}
		}else{
			let p = new RegExp(a.replace(/\//g, ""), "gi");
			if(p.test(this)){
				x = true;
			}
		}

	});
	return x;
}

const Utils = {
	loadCommands: () => {
		return new Promise((resolve, reject) => {
			let Files = fs.readdirSync(__dirname+"/Commands");
			for(let File of Files){
				if(File.endsWith('.js')){
					try{
						Commands.all[File.slice(0, -3)] = require(__dirname+'/Commands/'+File);
						if(Commands.all[File.slice(0, -3)].Metadata !== undefined){
							for(let Command of Commands.all[File.slice(0, -3)].Metadata.List){
								Commands.list[Command] = File.slice(0, -3);
							}
						}
					}catch(e){
						console.dir(e);
						reject(e);
					}
				}
			}
			resolve();
		});
	},
	resolveCommand: (command) => {
		return Commands.all[Commands.list[command]][command];
	},
	resolveCooldown: (command) => {
		return Commands.all[Commands.list[command]][command].Cooldown;
	}
};

let Sledgehammer = new Discord.Client({
	autoReconnect: true,
	disable_everyone: true,
	maxCachedMessages: 250,
	bot: true,
	userAgent: {
		version: require(__dirname+'/../package.json').version
	}
});

rethink.connect({host: 'localhost', port: 28015, user: Config.database.user, password: Config.database.password}, (err, conn) => {
	if(err){ throw err; }
	console.log("Connected to rethink");
	conn.use('Sledgehammer');
	Sledgehammer.rdb = {r: rethink, conn: conn};

	Utils.loadCommands().then(() => { // Load the commands and wait for it to finish
		Sledgehammer.Commands = Commands;
		Sledgehammer.Utils = Utils;
		global.Sledgehammer = Sledgehammer;
		Sledgehammer.login(Token).then(() => { // Login
			// Logged in
			console.log("Logged in");
		}).catch((e) => {
			throw e;
		});
	}).catch((e) => {
		throw e;
	})
}).catch((e) => {
	throw e;
})

Sledgehammer.on("ready", () => {
	console.log("Sledgehammer ready to hammer.");
});

Sledgehammer.on("guildMemberAdd", (member) => {
	Handlers.guildMemberAdd.Handle(member);
});

Sledgehammer.on("guildMemberRemove", (member) => {
	Handlers.guildMemberRemove.Handle(member);
});

Sledgehammer.on("guildBanRemove", (guild, member) => {
	Handlers.guildBanRemove.Handle(guild, member);
});

Sledgehammer.on('messageUpdate', (oldMessage, newMessage) => {
	Handlers.messageUpdate.Handle(oldMessage, newMessage);
});

Sledgehammer.on("message", (message) => {
	Handlers.messageCreate.Handle(message);
});

process.on("uncaughtException", (e) => {
	console.dir(e.stack);
});