const Discord = require("discord.js");
const Config = require("./Config.json");
const Token = Config.token;
const fs = require("fs");
const rethink = require('rethinkdb');
const Handlers = require("./Handlers/Handlers.js");
const path = require("path");

global.Server = require("./Utils/Server/Index.js");
global.DateFormat = require("./Utils/DateFormat.js");
global.User = require("./Utils/User/Index.js");

let Commands = {
	All: [],
	List: {},
	Map: {}
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
			try{
				let Files = fs.readdirSync(__dirname+"/Commands");
				for(let File of Files){
					let stats = fs.lstatSync(__dirname+"/Commands/"+File);
					if(!stats.isDirectory()){
						if(File.endsWith('.js')){
							try{
								if(Commands.List["Other"] === undefined){
									Commands.List["Other"] = {};
								}
								Commands.List["Other"][File.slice(0, -3).toLowerCase()] = require(__dirname+'/Commands/'+File);
								Commands.All.push(File.slice(0, -3).toLowerCase());
								Commands.Map[File.slice(0, -3).toLowerCase()] = "Other";
								console.log("Loading "+File);
							}catch(e){
								console.dir(e);
								reject(e);
							}
						}
					}else{
						let DirFiles = fs.readdirSync(__dirname+"/Commands/"+File);
						for(let DirFile of DirFiles){
							if(DirFile.endsWith('.js')){
								try{
									if(Commands.List[File] === undefined){
										Commands.List[File] = {};
									}
									Commands.List[File][DirFile.slice(0, -3).toLowerCase()] = require(__dirname+'/Commands/'+File+"/"+DirFile);
									Commands.All.push(DirFile.slice(0, -3).toLowerCase());
									Commands.Map[DirFile.slice(0, -3).toLowerCase()] = File;
								}catch(e){
									console.dir(e);
									reject(e);
								}
							}
						}
					}
				}
				resolve();
			}catch(e){
				reject(e);
			}
		});
	},
	resolveCommand: (command) => {
		return Commands.List[Commands.Map[command]][command];
	},
	resolveCooldown: (command) => {
		return Commands.List[Commands.Map[command]][command].Cooldown;
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

// Emoji

Sledgehammer.on("guildEmojiCreate", (emoji) => {
	console.log(emoji);
	try{
		Handlers.guildEmojiCreate.Handle(emoji);
	}catch(e){
		console.dir(e.stack);
	}
});

Sledgehammer.on("guildEmojiDelete", (emoji) => {
	Handlers.guildEmojiDelete.Handle(emoji);
});

Sledgehammer.on("guildEmojiUpdate", (oldEmoji, newEmoji) => {
	Handlers.guildEmojiUpdate.Handle(oldEmoji, newEmoji);
});

Sledgehammer.on("message", (message) => {
	Handlers.messageCreate.Handle(message);
});

process.on("uncaughtException", (e) => {
	console.dir(e.stack);
});