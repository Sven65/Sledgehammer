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
	}
}

module.exports = {
	Metadata: {
		List: ['kick', 'ban'],
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
								let and = "";
								toSend = `Kicked ${Kicked.length>1?'users':'user'}`;
								if(Kicked.length >= 2){
									and = Kicked.pop();
								}
								toSend += ` ${Kicked.join(',')} ${and.length>0?'and':''} ${and.length>0?and:''}`;
								message.channel.sendMessage(toSend);
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
								toSend = `Banned ${Banned.length>1?'users':'user'}`;
								if(Banned.length >= 2){
									and = Banned.pop();
								}
								toSend += ` ${Banned.join(',')} ${and.length>0?'and':''} ${and.length>0?and:''}`;
								message.channel.sendMessage(toSend);
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
	}
}