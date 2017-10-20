let Utils = {
	Mute: (Mentions, message, Role) => { // Function for muting users
		return new Promise((resolve, reject) => {
			let Muted = [];
			let i = 0;
			Mentions.map((user) => {
				message.guild.fetchMember(user).then((gUser) => {
					gUser.addRole(Role).then(() => {
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
		Name: "Mute"
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

								if(message.guild.roles.get(role) !== null){

									Utils.Mute(Mentions, message, role).then((Muted) => {
										let toSend = "";
										let and = "";
										let muter = message.author.username;
										let mutes = `${Muted.length>1?'users':'user'}`;
										toSend = `:white_check_mark: ${message.author.username} Muted ${Muted.length>1?'users':'user'}`;
										if(Muted.length >= 2){
											and = Muted.pop();
										}
										mutes += ` ${Muted.join(',')} ${and.length>0?'and':''} ${and.length>0?and:''}`;
										toSend += ` ${Muted.join(',')} ${and.length>0?'and':''} ${and.length>0?and:''}`;
										s.modlog.then((ml) => {
											if(ml === null){
												ml = message.channel.id;
											}
											s.channels.then((channels) => {
												if(channels !== null){
													if(channels.muteLog !== null && channels.muteLog !== undefined){
														let time = new Date();
														let ms = channels.muteLog.message.replace(/\${muter}/gi, muter).replace(/\${muteCount}/gi, Muted.length).replace(/\${mutes}/gi, mutes);
														toSend = DateFormat.formatDate(time, ms);
														ml = channels.muteLog.id;
													}
												}
												s.messages.then((messages) => {
													if(messages !== null){
														if(messages.mutes !== null && messages.mutes !== undefined){
															if(messages.mutes){
																message.guild.channels.get(ml).send(toSend).catch((e) => {console.dir(e)});
															}
														}else{
															message.guild.channels.get(ml).send(toSend).catch((e) => {console.dir(e)});
														}
													}else{
														message.guild.channels.get(ml).send(toSend).catch((e) => {console.dir(e)});
													}
												}).catch((e) => {console.dir(e)});

											}).catch((e) => {console.dir(e)});
										}).catch((e) => {console.dir(e)});
									}).catch((e) => {console.dir(e)});
								}else{
									message.channel.send(`:x: Sorry, ${message.author.username}, but the role you set doesn't exist.`);
								}
							}else{
								message.channel.send(`:no_entry_sign: Please set a role to add, ${message.author.username}.`);
							}
						}).catch((e) => {console.dir(e)});
					}else{
						message.channel.send(`:no_entry_sign: I can't do that, ${message.author.username}, I'm missing the permission to manage roles.`);
					}
				}else{
					message.channel.send(`:no_entry_sign: I can't let you do that, ${message.author.username}. You don't have the permission to manage roles.`);
				}
			}else{
				message.channel.send(`I can't do that, ${message.author.username},`)
			}
		}
	},
	Cooldown: 5,
	Description: "Mutes members on the server.",
	Usage: "`@user` `[@user]` `[@user]...`"
};