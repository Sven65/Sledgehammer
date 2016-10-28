const Discord = require("Discord.js");
const Config = require("./Config.json");
const fs = require("fs");

let Commands = {
	all: [],
	list: {}
};

let Cooldown = {
	lastExecTime: {},
	firstTime: {}
};


const Utils = {
	loadCommands: () => {
		return new Promise((resolve, reject) => {
			let Files = fs.readdirSync(__dirname+"/Commands");
			for(let File of Files){
				if(File.endsWith('.js')){
					try{
						Commands.all[File.slice(0, -3)] = require(__dirname+'/Commands/'+File);
						for(let Command of Commands.all[File.slice(0, -3)].List){
							Commands.list[Command] = File.slice(0, -3);
						}
					}catch(e){
						reject(e);
					};
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

Utils.loadCommands().then(() => { // Load the commands and wait for it to finish
	global.Commands = Commands;
	global.Sledgehammer = Sledgehammer;
	Sledgehammer.login(Config.token).then(() => { // Login
		// Logged in
		console.log("Logged in");
	}).catch((e) => {
		throw e;
	});
}).catch((e) => {
	throw e;
})

Sledgehammer.on("ready", () => {
	console.log("Sledgehammer ready to hammer.");
});

Sledgehammer.on("message", (message) => {
	if(message.author.bot) return;
	let Args = message.content.replace(/\s\s+/g, " ").split(" ");

	if(Args[0].startsWith(Config.prefix)){
		let Command = Args[0].replace(Config.prefix, "").toLowerCase();

		if(Command in Commands.list){
			try{
				let now = new Date().valueOf();
				if(Cooldown.firstTime[Command] === undefined){
					Cooldown.firstTime[Command] = {};
				}
				if(Cooldown.lastExecTime[Command] === undefined){
					Cooldown.lastExecTime[Command] = {};
				}

				let FirstTime = Cooldown.firstTime[Command][message.author.id] || false;
				let last = Cooldown.lastExecTime[Command][message.author.id] || 0;


				if(now <= last+Utils.resolveCooldown(Command)*1000 && FirstTime){
					// Cooldown
					let time = Math.round(((last + Utils.resolveCooldown(Command) * 1000) - now) / 1000);
					message.channel.sendMessage(`You need to calm down, ${message.author.username}. :hourglass: ${time} seconds`);
				}else{
					Utils.resolveCommand(Command).Execute(Args, message);
					Cooldown.firstTime[Command][message.author.id] = true;
					Cooldown.lastExecTime[Command][message.author.id] = now;
				}
			}catch(e){
				console.log(e);
			};
		}
	}
});