let Utils = {
	Kick: (Mentions, message) => { // Function for kicking users
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
};

module.exports = {
	Metadata: {
		Name: "Kick"
	},

	Execute: (Args, message) => {
		let Member = message.guild.fetchMember(message.author);
		if(Args.length >= 1){
			let Mentions = message.mentions.users;
			if(Mentions.size >= 1){
				if(message.channel.permissionsFor(message.author).hasPermission("KICK_MEMBERS")){
					if(message.channel.permissionsFor(Sledgehammer.user).hasPermission("KICK_MEMBERS")){
						let toSend = "";
						Utils.Kick(Mentions, message).then((Kicked) => {
							let s = new Server.Server(message.guild.id);
							let and = "";
							let kicker = message.author.username;
							let kicks = `${Kicked.length>1?'users':'user'}`;
							toSend = `:white_check_mark: ${message.author.username} Kicked ${Kicked.length>1?'users':'user'}`;
							if(Kicked.length >= 2){
								and = Kicked.pop();
							}
							kicks += ` ${Kicked.join(',')} ${and.length>0?'and':''} ${and.length>0?and:''}`;
							toSend += ` ${Kicked.join(',')} ${and.length>0?'and':''} ${and.length>0?and:''}`;
							s.modlog.then((ml) => {
								if(ml === null){
									ml = message.channel.id;
								}
								s.channels.then((channels) => {
									if(channels !== null){
										if(channels.kickLog !== null && channels.kickLog !== undefined){
											let time = new Date();
											let ms = channels.kickLog.message.replace(/\${kicker}/gi, kicker).replace(/\${kickCount}/gi, Kicked.length).replace(/\${kicks}/gi, kicks);
											toSend = DateFormat.formatDate(time, ms);
											ml = channels.kickLog.id;
										}
									}

									s.messages.then((messages) => {
										if(messages !== null){
											if(messages.kick !== null){
												if(messages.kick){
													message.guild.channels.get(ml).sendMessage(toSend);
												}
											}else{
												message.guild.channels.get(ml).sendMessage(toSend);
											}
										}else{
											message.guild.channels.get(ml).sendMessage(toSend);
										}
									});

								});
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
};