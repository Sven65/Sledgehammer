let Utils = {
	Unmute: (Mentions, message, Role) => { // Function for unmuting users
		return new Promise((resolve, reject) => {
			let Muted = [];
			let i = 0;
			Mentions.map((user) => {
				message.guild.fetchMember(user).then((gUser) => {
					gUser.removeRole(Role).then(() => {
						Muted.push(`${user.username} (${user.id})`);
						i++;
						if(i === Mentions.size){
							resolve(Muted);
						}
					}).catch((e) => {
						i++;
						if(i === Mentions.size){
							resolve(Muted);
						}
					});
				}).catch((e) => {reject(e)});
			});
		});
	}
};

module.exports = {
	Metadata: {
		Name: "Unmute"
	},

	Execute: (Args, message) => {
		if(Args.length >= 1){
			let Mentions = message.mentions.users;
			if(Mentions.size >= 1){
				if(message.channel.permissionsFor(message.author).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")){
					if(message.channel.permissionsFor(Sledgehammer.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")){
						
						let s = new Server.Server(message.guild.id);

						s.muteRole.then((role) => {
							if(role !== null){

								if(message.guild.roles.find("id", role) !== null){

									Utils.Unmute(Mentions, message, role).then((Unmuted) => {
										let toSend = "";
										let and = "";
										let muter = message.author.username;
										let mutes = `${Unmuted.length>1?'users':'user'}`;
										toSend = `:white_check_mark: ${message.author.username} Unmuted ${Unmuted.length>1?'users':'user'}`;
										if(Unmuted.length >= 2){
											and = Unmuted.pop();
										}
										mutes += ` ${Unmuted.join(',')} ${and.length>0?'and':''} ${and.length>0?and:''}`;
										toSend += ` ${Unmuted.join(',')} ${and.length>0?'and':''} ${and.length>0?and:''}`;
										s.modlog.then((ml) => {
											if(ml === null){
												ml = message.channel.id;
											}
											s.channels.then((channels) => {
												if(channels !== null){
													if(channels.unmuteLog !== null && channels.unmuteLog !== undefined){
														let time = new Date();
														let ms = channels.unmuteLog.message.replace(/\${muter}/gi, muter).replace(/\${muteCount}/gi, Unmuted.length).replace(/\${unmutes}/gi, mutes);
														toSend = DateFormat.formatDate(time, ms);
														ml = channels.muteLog.id;
													}
												}
												s.messages.then((messages) => {
													if(messages !== null){
														if(messages.unmutes !== null && messages.unmutes !== undefined){
															if(messages.unmutes){
																message.guild.channels.find("id", ml).sendMessage(toSend).catch((e) => {console.dir(e)});
															}
														}else{
															message.guild.channels.find("id", ml).sendMessage(toSend).catch((e) => {console.dir(e)});
														}
													}else{
														message.guild.channels.find("id", ml).sendMessage(toSend).catch((e) => {console.dir(e)});
													}
												}).catch((e) => {console.dir(e)});

											}).catch((e) => {console.dir(e)});
										}).catch((e) => {console.dir(e)});
									}).catch((e) => {console.dir(e)});
								}else{
									message.channel.sendMessage(`:x: Sorry, ${message.author.username}, but the role you set doesn't exist.`);
								}
							}else{
								message.channel.sendMessage(`:no_entry_sign: Please set a role to add, ${message.author.username}.`);
							}
						}).catch((e) => {console.dir(e)});
					}else{
						message.channel.sendMessage(`:no_entry_sign: I can't do that, ${message.author.username}, I'm missing the permission to manage roles.`);
					}
				}else{
					message.channel.sendMessage(`:no_entry_sign: I can't let you do that, ${message.author.username}. You don't have the permission to manage roles.`);
				}
			}else{
				message.channel.sendMessage(`I can't do that, ${message.author.username},`)
			}
		}
	},
	Cooldown: 5,
	Description: "Unmutes members on the server.",
	Usage: "`@user` `[@user]` `[@user]...`"
};