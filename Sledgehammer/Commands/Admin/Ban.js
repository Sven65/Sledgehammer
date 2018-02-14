let Utils = {
	Ban: (Mentions, message) => { // Function for banning users
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
		Name: "Ban"
	},

	Execute: (Args, message) => {
		let Member = message.guild.fetchMember(message.author);
		let s = new Server.Server(message.guild.id);
		if(Args.length >= 1){
			let Mentions = message.mentions.users;
			if(Mentions.size >= 1){
				if(message.channel.permissionsFor(message.author).has("BAN_MEMBERS")){
					if(message.channel.permissionsFor(Sledgehammer.user).has("BAN_MEMBERS")){
						let toSend = "";
						let banner = message.author.username;
						Utils.Ban(Mentions, message).then((Banned) => {
							let and = "";
							let bans = `${Banned.length>1?'users':'user'}`;
							toSend = `:white_check_mark: ${message.author.username} Banned ${Banned.length>1?'users':'user'}`;
							if(Banned.length >= 2){
								and = Banned.pop();
							}
							bans += ` ${Banned.join(',')} ${and.length>0?'and':''} ${and.length>0?and:''}`;
							toSend += ` ${Banned.join(',')} ${and.length>0?'and':''} ${and.length>0?and:''}`;
							s.modlog.then((ml) => {
								if(ml === null){
									ml = message.channel.id;
								}
								s.channels.then((channels) => {
									if(channels !== null){
										if(channels.banLog !== null && channels.banLog !== undefined){
											let time = new Date();
											let ms = channels.banLog.message.replace(/\${banner}/gi, banner).replace(/\${banCount}/gi, Banned.length).replace(/\${bans}/gi, bans);
											toSend = DateFormat.formatDate(time, ms);
											ml = channels.banLog.id;
										}
									}

									s.messages.then((messages) => {
										if(messages !== null){
											if(messages.ban !== null){
												if(messages.ban){
													message.guild.channels.get(ml).send(toSend);
												}
											}else{
												message.guild.channels.get(ml).send(toSend);
											}
										}else{
											message.guild.channels.get(ml).send(toSend);
										}
									});

								});
							});
						});
					}else{
						message.channel.send(`:no_entry_sign: I can't do that, ${message.author.username}, I'm missing the permission to ban members.`);
					}
				}else{
					message.channel.send(`:no_entry_sign: I can't let you do that, ${message.author.username}. You don't have the permission to ban members.`);
				}
			}else{
				message.channel.send(`I can't do that, ${message.author.username},`)
			}
		}
	},
	Cooldown: 5,
	Description: "Bans members from the server.",
	Usage: "`@user` `[@user]` `[@user]...`"
};