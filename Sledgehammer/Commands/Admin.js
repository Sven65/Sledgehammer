/*
	Admin.js
	Commands for admin commands such as ban and kick
*/

let Utils = {
	Kick: (Mentions, message) => {
		return new Promise((resolve, reject) => {
			let Kicked = [];
			let i = 0;
			Mentions.map((user) => {
				message.guild.fetchMember(user).then((gUser) => {
					gUser.kick().then(() => {
						Kicked.push(`${user.username} (${user.id})`);
						i++;
						if(i === Mentions.size){
							resolve(Kicked);
						}
					}).catch((e) => {
						i++;
						if(i === Mentions.size){
							resolve(Kicked);
						}
					});
				});
			});
		});
	},
	Ban: (Mentions, message) => {
		return new Promise((resolve, reject) => {
			let Banned = [];
			let i = 0;
			Mentions.map((user) => {
				message.guild.fetchMember(user).then((gUser) => {
					gUser.ban().then(() => {
						Banned.push(`${user.username} (${user.id})`);
						i++;
						if(i === Mentions.size){
							resolve(Banned);
						}
					}).catch((e) => {
						i++;
						if(i === Mentions.size){
							resolve(Banned);
						}
					});
				});
			});
		});
	},
	Clean: (message, Count) => {
		return new Promise((resolve, reject) => {
			let i = 0;
			message.channel.fetchMessages({limit: Count}).then((messages) => {
				messages.map((ms) => {
					ms.delete().then(() => {
						i++;
						if(i === Count || i === messages.size){
							resolve(i);
						}
					}).catch((e) => {
						i++;
						if(i === Count || i === messages.size){
							resolve(i);
						}
					});	
				});
			});
		});
	}
}

module.exports = {
	Metadata: {
		List: ['kick', 'ban', 'clean', 'blacklist', 'modlog'],
		Name: "Admin Commands",
		Description: "Administrative commands"
	},

	kick: {
		Execute: (Args, message) => {
			let Member = message.guild.fetchMember(message.author);
			if(Args.length >= 1){
				let Mentions = message.mentions.users;
				if(Mentions.size >= 1){
					if(message.channel.permissionsFor(message.author).hasPermission("KICK_MEMBERS")){
						if(message.channel.permissionsFor(Sledgehammer.user).hasPermission("KICK_MEMBERS")){
							let toSend = "";
							Utils.Kick(Mentions, message).then((Kicked) => {
								let s = new Server(message.guild.id);
								let and = "";
								toSend = `:white_check_mark: Kicked ${Kicked.length>1?'users':'user'}`;
								if(Kicked.length >= 2){
									and = Kicked.pop();
								}
								toSend += ` ${Kicked.join(',')} ${and.length>0?'and':''} ${and.length>0?and:''}`;
								s.modlog.then((ml) => {
									if(ml === null){
										ml = message.channel.id;
									}
									message.guild.channels.find("id", ml).sendMessage(toSend);
								});
							});
						}else{
							message.channel.sendMessage(`:no_entry_sign: I can't do that, ${message.author.username}, I'm missing the permission to kick members.`);
						}
					}else{
						message.channel.sendMessage(`:no_entry_sign: I can't let you do that, ${message.author.username}. You don't have the permission to kick members.`);
					}
				}else{
					message.channel.sendMessage(`I can't do that, ${message.author.username},`)
				}
			}
		},
		Cooldown: 5,
		Description: "Kicks members from the server.",
		Usage: "`@user` `[@user]` `[@user]...`"
	},

	ban: {
		Execute: (Args, message) => {
			let Member = message.guild.fetchMember(message.author);
			if(Args.length >= 1){
				let Mentions = message.mentions.users;
				if(Mentions.size >= 1){
					if(message.channel.permissionsFor(message.author).hasPermission("BAN_MEMBERS")){
						if(message.channel.permissionsFor(Sledgehammer.user).hasPermission("BAN_MEMBERS")){
							let toSend = "";
							Utils.Ban(Mentions, message).then((Banned) => {
								let and = "";
								toSend = `:white_check_mark: Banned ${Banned.length>1?'users':'user'}`;
								if(Banned.length >= 2){
									and = Banned.pop();
								}
								toSend += ` ${Banned.join(',')} ${and.length>0?'and':''} ${and.length>0?and:''}`;
								s.modlog.then((ml) => {
									if(ml === null){
										ml = message.channel.id;
									}
									message.guild.channels.find("id", ml).sendMessage(toSend);
								});
							});
						}else{
							message.channel.sendMessage(`:no_entry_sign: I can't do that, ${message.author.username}, I'm missing the permission to ban members.`);
						}
					}else{
						message.channel.sendMessage(`:no_entry_sign: I can't let you do that, ${message.author.username}. You don't have the permission to ban members.`);
					}
				}else{
					message.channel.sendMessage(`I can't do that, ${message.author.username},`)
				}
			}
		},
		Cooldown: 5,
		Description: "Bans members from the server.",
		Usage: "`@user` `[@user]` `[@user]...`"
	},

	clean: {
		Execute: (Args, message) => {
			let Member = message.guild.fetchMember(message.author);
			let purgeCount = 10;
			if(Args.length >= 1){
				purgeCount = parseInt(Args[0]) || 10;
			}
			if(message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")){
				if(message.channel.permissionsFor(Sledgehammer.user).hasPermission("MANAGE_MESSAGES")){
					let toSend = "";
					Utils.Clean(message, purgeCount).then((Purged) => {
						toSend = `Purged ${Purged.formatNumber()} messages in ${message.channel}.`;
						message.channel.sendMessage(toSend);
					});
				}else{
					message.channel.sendMessage(`:no_entry_sign: I can't do that, ${message.author.username}, I'm missing the permission to manage messages.`);
				}
			}else{
				message.channel.sendMessage(`:no_entry_sign: I can't let you do that, ${message.author.username}. You don't have the permission to manage messages.`);
			}
		},
		Cooldown: 5,
		Description: "Purges messages",
		Usage: "`[amount]`"
	},

	blacklist: {
		Execute: (Args, message) => {
			let Member = message.guild.fetchMember(message.author);
			if(Args.length >= 1){
				if(message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")){
					if(message.channel.permissionsFor(Sledgehammer.user).hasPermission("MANAGE_MESSAGES")){
						let server = new Server(message.guild.id);
						server.blacklistAdd(Args.join(" ")).then(() => {
							message.channel.sendMessage(`:white_check_mark: Blacklisted \`${Args.join(" ")}\`.`);
						}).catch((e) => {
							message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
						});
					}else{
						message.channel.sendMessage(`:no_entry_sign: I can't do that, ${message.author.username}, I'm missing the permission to manage messages.`);
					}
				}else{
					message.channel.sendMessage(`:no_entry_sign: I can't let you do that, ${message.author.username}. You don't have the permission to manage messages.`);
				}
			}else{

				message.channel.sendMessage(`:no_entry_sign: Not enough arguments, ${message.author.username}.`);
			}
		},
		Cooldown: 5,
		Description: "Adds a word or phrase to the blacklist.",
		Usage: "``word``"
	},

	modlog: {
		Execute: (Args, message) => {
			if(Args.length >= 1){
				let Mentions = message.mentions.channels;
				if(Mentions.size >= 1){
					if(message.channel.permissionsFor(message.author).hasPermission("MANAGE_CHANNELS")){
						if(message.guild.channels.find("id", Mentions.first().id).permissionsFor(Sledgehammer.user).hasPermission("SEND_MESSAGES")){
							if(message.guild.channels.find("id", Mentions.first().id).permissionsFor(Sledgehammer.user).hasPermission("READ_MESSAGES")){
								let server = new Server(message.guild.id);
								server.setModlog(Mentions.first().id).then(() => {
									message.channel.sendMessage(`:white_check_mark: Modlog channel set to <#${Mentions.first().id}>`)
								}).catch((e) => {
									message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
									console.log(e);
								});
							}else{
								message.channel.sendMessage(`:no_entry_sign: I can't do that, ${message.author.username}, I'm missing the permission to read messages in that channel.`);
							}
						}else{
							message.channel.sendMessage(`:no_entry_sign: I can't do that, ${message.author.username}, I'm missing the permission to send messages in that channel.`);
						}
					}else{
						message.channel.sendMessage(`:no_entry_sign: I can't let you do that, ${message.author.username}. You don't have the permission to manage channels.`);
					}
				}else{
					message.channel.sendMessage(`:x: Not enough arguments, ${message.author.username}.`);
				}
			}else{
				message.channel.sendMessage(`:x: Not enough arguments, ${message.author.username}.`);
			}
		},
		Cooldown: 5,
		Description: "Changes the channel Sledgehammer outputs messages in",
		Usage: "``#channel``"
	}
}