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
	}
}

module.exports = {
	List: ['kick'],

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
		Description: "Kicks a member.",
		Usage: "@user"
	}
}