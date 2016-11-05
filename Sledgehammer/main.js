const Discord = require("discord.js");
const Config = require("./Config.json");
const Token = require("./token.json").token;
const fs = require("fs");
const rethink = require('rethinkdb');

global.Server = require("./Utils/Data.js");
global.DateFormat = require("./Utils/DateFormat.js");

let Commands = {
	all: [],
	list: {}
};

let Cooldown = {
	lastExecTime: {},
	firstTime: {}
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
		global.Commands = Commands;
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
	let s = new Server(member.guild.id);
	s.modlog.then((ml) => {
		s.channels.then((channels) => {
			let toSend = `${member.user.username} Joined the server.`;
			if(channels !== null){
				if(channels.joinLog !== null && channels.joinLog !== undefined){
					let time = new Date();
					let ms = channels.joinLog.message.replace(/\${user}/gi, member.user.username);
					toSend = DateFormat.formatDate(time, ms);
					ml = channels.joinLog.id;
				}
			}

			s.messages.then((messages) => {
				if(messages !== null){
					if(messages.join !== null){
						if(messages.join){
							if(ml !== null){
								member.guild.channels.find("id", ml).sendMessage(toSend);
							}
						}
					}else{
						if(ml !== null){
							member.guild.channels.find("id", ml).sendMessage(toSend);
						}
					}
				}else{
					if(ml !== null){
						member.guild.channels.find("id", ml).sendMessage(toSend);
					}
				}
			});
		});
	});
});

Sledgehammer.on("guildMemberRemove", (member) => {
	let s = new Server(member.guild.id);
	s.modlog.then((ml) => {
		s.channels.then((channels) => {
			let toSend = `${member.user.username} Left the server.`;
			if(channels !== null){
				if(channels.leaveLog !== null && channels.leaveLog !== undefined){
					let time = new Date();
					let ms = channels.leaveLog.message.replace(/\${user}/gi, member.user.username);
					toSend = DateFormat.formatDate(time, ms);
					ml = channels.leaveLog.id;
				}
			}

			s.messages.then((messages) => {
				if(messages !== null){
					if(messages.leave !== null){
						if(messages.leave){
							if(ml !== null){
								member.guild.channels.find("id", ml).sendMessage(toSend);
							}
						}
					}else{
						if(ml !== null){
							member.guild.channels.find("id", ml).sendMessage(toSend);
						}
					}
				}else{
					if(ml !== null){
						member.guild.channels.find("id", ml).sendMessage(toSend);
					}
				}
			});
		});
	});
});

Sledgehammer.on("guildBanRemove", (guild, member) => {
	let s = new Server(guild.id);
	s.messages.then((messages) => {
		if(messages !== null){
			if(messages.unban){
				s.modLog.then((ml) => {
					s.unbanMessage.then((message) => {
						let time = new Date();
						if(message !== null){
							message = DateFormat.formatDate(time, message.replace(/\${user}/gi, member.username));
						}else{
							message = `${time.toUTCString()} ${member.username} was unbanned.`;
						}
						guild.channels.find("id", ml).sendMessage(message);
					});
				});
			}
		}
	});
});

Sledgehammer.on('messageUpdate', (oldMessage, newMessage) => {
	if(newMessage.author === Sledgehammer.user) return;

	if(newMessage.channel.type !== "text"){
		return;
	}
	let s = new Server(newMessage.guild.id); // Make a new 'Server' class mapped to the current server ID
	
	s.exists.then((ex) => {

		let Args = newMessage.content.replace(/\s\s+/g, " ").split(" ");
		let Time = new Date().toUTCString();

		if(!ex){
			s.create();
		}

		s.blacklist.then((list) => { // Get the list of blacklisted words

			s.messages.then((messages) => {



				if(list === null){
					list = [];
				}

				if(newMessage.content.replace(/\s\s+/g, " ").containsArray(list)){
					newMessage.delete();
					if(messages !== null){
						if(messages.blacklistdelete){
							s.sendModlog(message, `[${Time}] Removed message from ${newMessage.author.username} (${newMessage.author.id})`)
						}
					}
					return;
				}

				s.linkFilter(newMessage.channel.id).then((filter) => {
					if(filter !== null){
						if(!newMessage.channel.permissionsFor(newMessage.author).hasPermission("EMBED_LINKS")){
							if(filter.type === "all"){
								let q = new RegExp(
								"^" +
								// protocol identifier
								"(?:(?:https?|ftp)://)" +
								// user:pass authentication
								"(?:\\S+(?::\\S*)?@)?" +
								"(?:" +
								// IP address exclusion
								// private & local networks
								"(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
								"(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
								"(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
								// IP address dotted notation octets
								// excludes loopback network 0.0.0.0
								// excludes reserved space >= 224.0.0.0
								// excludes network & broacast addresses
								// (first & last IP address of each class)
								"(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
								"(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
								"(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
								"|" +
								// host name
								"(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
								// domain name
								"(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
								// TLD identifier
								"(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
								// TLD may end with dot
								"\\.?" +
								")" +
								// port number
								"(?::\\d{2,5})?" +
								// resource path
								"(?:[/?#]\\S*)?" +
								"$", "i"
								);
								if(q.test(newMessage.content)){
									newMessage.delete();
									if(messages !== null){
										if(messages.linkdelete){
											s.sendModlog(message, `Removed link from ${newMessage.author.username} in ${newMessage.channel}`);
										}
									}
								}
							}else if(filter.type === "invite" || filter.type === "invites"){
								let q = new RegExp("(?:http\:\/\/)?(?:https\:\/\/)?discord.gg\/(?:[^\s]*)", "gi");
								if(q.test(message.content)){
									message.delete();
									if(messages !== null){
										if(messages.linkdelete){
											s.sendModlog(message, `Removed invite link from ${message.author.username} in ${message.channel}`);
										}
									}
								}
							}
						}
					}
				});
			});
		});
	});
});

Sledgehammer.on("message", (message) => {

	if(message.author === Sledgehammer.user) return;

	if(message.channel.type !== "text"){
		message.channel.sendMessage(`Sorry, I don't respond to private messages.`);
		return;
		message.guild = {id: "0"};
	}
	let s = new Server(message.guild.id); // Make a new 'Server' class mapped to the current server ID
	
	s.exists.then((ex) => {

		let Args = message.content.replace(/\s\s+/g, " ").split(" ");
		let Time = new Date().toUTCString();

		if(!ex){
			s.create();
		}

		s.prefix.then((prefix) => {

			s.blacklist.then((list) => { // Get the list of blacklisted words

				s.messages.then((messages) => {

					if(list === null){
						list = [];
					}

					if(message.content.replace(/\s\s+/g, " ").containsArray(list)){
						if(Args[0].toLowerCase() === prefix+"whitelist"){
							if(!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")){
								message.delete();
								if(messages !== null){
									if(messages.blacklistdelete){
										s.sendModlog(message, `[${Time}] Removed message from ${message.author.username} (${message.author.id})`)
									}
								}
								return;
							}
						}else{
							message.delete();
							if(messages !== null){
								if(messages.blacklistdelete){
									s.sendModlog(message, `[${Time}] Removed message from ${message.author.username} (${message.author.id})`)
								}
							}
							return;
						}
					}

					s.linkFilter(message.channel.id).then((filter) => {
						if(filter !== null){
							if(!message.channel.permissionsFor(message.author).hasPermission("EMBED_LINKS")){
								if(filter.type === "all"){
									let q = new RegExp(
									"^" +
									// protocol identifier
									"(?:(?:https?|ftp)://)" +
									// user:pass authentication
									"(?:\\S+(?::\\S*)?@)?" +
									"(?:" +
									// IP address exclusion
									// private & local networks
									"(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
									"(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
									"(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
									// IP address dotted notation octets
									// excludes loopback network 0.0.0.0
									// excludes reserved space >= 224.0.0.0
									// excludes network & broacast addresses
									// (first & last IP address of each class)
									"(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
									"(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
									"(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
									"|" +
									// host name
									"(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
									// domain name
									"(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
									// TLD identifier
									"(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
									// TLD may end with dot
									"\\.?" +
									")" +
									// port number
									"(?::\\d{2,5})?" +
									// resource path
									"(?:[/?#]\\S*)?" +
									"$", "i"
									);
									if(q.test(message.content)){
										message.delete();
										if(messages !== null){
											if(messages.linkdelete){
												s.sendModlog(message, `Removed link from ${message.author.username} in ${message.channel}`);
											}
										}
									}
								}else if(filter.type === "invite" || filter.type === "invites"){
									let q = new RegExp("(?:http\:\/\/)?(?:https\:\/\/)?discord.gg\/(?:[^\s]*)", "gi");
									if(q.test(message.content)){
										message.delete();
										if(messages !== null){
											if(messages.linkdelete){
												s.sendModlog(message, `Removed invite link from ${message.author.username} in ${message.channel}`);
											}
										}
									}
								}
							}
						}
					});

					if(message.author.bot) return;

					if(Args[0].startsWith(prefix)){
						let Command = Args[0].replace(prefix, "").toLowerCase();

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
									Args.shift();
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
			}).catch((e) => {
				console.dir(e);
			});
		}).catch((e) => {
			console.dir(e);
		});
	}).catch((e) => {
		console.dir(e);
	});
});

process.on("uncaughtException", (e) => {
	console.dir(e.stack);
});