/*
	Config.js
	Configuration commands for servers
*/

module.exports = {
	Metadata: {
		List: ['modlog', 'linkfilter', 'config', 'setprefix', 'edit'],
		Name: "Configuration Commands",
		Description: "Configurations"
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
	},

	linkfilter: {
		Execute: (Args, message) => {
			if(Args.length >= 1){
				let Mentions = message.mentions.channels;
				let s = new Server(message.guild.id);
				if(Mentions.size >= 1){
					if(message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")){
						if(message.guild.channels.find("id", Mentions.first().id).permissionsFor(Sledgehammer.user).hasPermission("MANAGE_MESSAGES")){
							if(Args[1] === undefined){
								Args[1] = "";
							}
							if(Args[1].toLowerCase() === 'invites' || Args[0].toLowerCase() === 'invite'){
								s.linkFilterAdd(Mentions.first().id, 'invite').then(() => {
									message.channel.sendMessage(`:white_check_mark: Now filtering invite links in <#${Mentions.first().id}>.`);
								}).catch((e) => {
									message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else if(Args[1].toLowerCase() === 'none'){
								s.removeLinkFilter(Mentions.first().id).then(() => {
									message.channel.sendMessage(`:white_check_mark: No longer filtering links in <#${Mentions.first().id}>.`);
								}).catch((e) => {
									message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else{
								s.linkFilterAdd(Mentions.first().id, 'all').then(() => {
									message.channel.sendMessage(`:white_check_mark: Now filtering all links in <#${Mentions.first().id}>.`);
								}).catch((e) => {
									message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
								});
							}
						}else{
							message.channel.sendMessage(`:no_entry_sign: I can't do that, ${message.author.username}, I'm missing the permission to manage messages in that channel.`);
						}
					}else{
						message.channel.sendMessage(`:no_entry_sign: I can't let you do that, ${message.author.username}. You don't have the permission to manage channels.`);
					}
				}else{
					if(Args[0].toLowerCase() === 'invites' || Args[0].toLowerCase() === 'invite'){
						s.linkFilterAdd(message.channel.id, 'invite').then(() => {
							message.channel.sendMessage(`:white_check_mark: Now filtering invite links in ${message.channel}.`);
						}).catch((e) => {
							message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
						});
					}else if(Args[0].toLowerCase() === 'none'){
						s.removeLinkFilter(message.channel.id).then(() => {
							message.channel.sendMessage(`:white_check_mark: No longer filtering links in ${message.channel}.`);
						}).catch((e) => {
							message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
						});
					}else{
						s.linkFilterAdd(message.channel.id, 'all').then(() => {
							message.channel.sendMessage(`:white_check_mark: Now filtering all links in ${message.channel}.`);
						}).catch((e) => {
							message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
						});
					}
				}
			}else{
				message.channel.sendMessage(`:x: Not enough arguments, ${message.author.username}.`);
			}
		},
		Cooldown: 5,
		Description: "Changes if links should be filtered.",
		Usage: "`[#channel]`, `[all/invite/none]`"
	},

	config: {
		Execute: (Args, message) => {
			let s = new Server(message.guild.id);
			s.all.then((server) => {
				if(server !== null){
					let toSend = `__**❯ ${message.guild.name} configuration ❮**__`;
					if(server.Blacklist !== null && server.Blacklist !== undefined){
						toSend += `\n**❯ Blacklist: ${server.Blacklist.join(', ')} ❮**`;
					}
					if(server.modlog !== null && server.modlog !== undefined){
						toSend += `\n**❯ Modlog channel: <#${server.modlog}>❮ **`;
					}
					if(server.linkFilter !== undefined && server.linkFilter !== null){
						for(let filter in server.linkFilter){
							toSend += `\n**❯ Link filtering in <#${filter}>: ${server.linkFilter[filter].type} ❮**`;
						}
					}
					if(server.prefix !== null){
						toSend += `\n**❯ Prefix: ${server.prefix} ❮**`;
					}
					message.channel.sendMessage(toSend);
				}else{
					message.channel.sendMessage(`:x: This server doesn't have a configuration.`);
				}
			}).catch((e) => {
				message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
			})
		},
		Cooldown: 5,
		Description: "Shows the configuration of the current server.",
		Usage: ""
	},

	setprefix: {
		Execute: (Args, message) => {
			let s = new Server(message.guild.id);
			if(Args.length >= 1){
				message.guild.fetchMember(message.author).then((user) => {
					if(user.roles.exists("name", "Sledgehammer Configurator")){
						let prefix = Args.join(" ");
						if(prefix.actualLength > 16){
							message.channel.sendMessage(`:no_entry_sign: Sorry, ${message.author.username}, but a prefix can be a maximum of 16 characters.`);
						}else{
							s.setPrefix(prefix).then(() => {
								message.channel.sendMessage(`:white_check_mark: Prefix for ${message.guild.name} set to \`${prefix}\``);
							}).catch((e) => {
								message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
							});
						}
					}else{
						message.channel.sendMessage(`:no_entry_sign: I can't let you do that, ${message.author.username}. You need a role called \`Sledgehammer Configurator\`.`);
					}
				});
			}else{
				message.channel.sendMessage(`:x: Not enough arguments, ${message.author.username}.`);
			}
		},
		Cooldown: 5,
		Description: "Changes the prefix of Sledgehammer",
		Usage: "``prefix``"
	},

	edit: {
		Execute: (Args, message) => {
			/*
				Command to edit event responses
				Valid events are
					- Join Events: 
						onJoin, onLeave
					- Moderation events:
						onKick, onBan, onUnban
					- Server emojis
						onEmojiCreate, onEmojiDelete, onEmojiUpdate
					- User events
						onMemberUpdate, onUserUpdate
					- Server events
						onServerUpdate
					- Message events
						onMessageDelete, onMessageUpdate
					- Role Events
						onRoleCreate, onRoleDelete, onRoleUpdate
			*/
			let s = new Server(message.guild.id);
			if(Args.length >= 1){
				message.guild.fetchMember(message.author).then((user) => {
					if(user.roles.exists("name", "Sledgehammer Configurator")){
						let s = new Server(message.guild.id);
						let Channels = message.mentions.channels;
						switch(Args[0].toLowerCase()){
							case "onjoin":
								if(Args.length >= 2){
									if(Args[1].toLowerCase() === "message"){
										let channel = message.channel.id;
										if(Channels.size >= 1){
											channel = Channels.first().id;
											Args.splice(Args.indexOf(`<#${channel}>`), 1);
										}
										Args.shift();
										Args.shift();
										let msg = Args.join(" ");
										s.setJoinLog(channel, msg).then(() => {
											message.channel.sendMessage(`:white_check_mark: onJoin message \`${msg}\` set to send in <#${channel}>`);
										}).catch((e) => {
											message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
										});
									}else{
										message.channel.sendMessage(":no_entry_sign: That's not a valid response type, ${message.author.username}.");
									}
								}else{
									message.channel.sendMessage(`:x: Not enough arguments, ${message.author.username}.`);
								}
							break;

							case "onleave":

							break;

							case "onkick":

							break;

							case "onban":

							break;

							case "onunban":

							break;

							case "onemojicreate":

							break;

							case "onemojidelete":

							break;

							case "onemojiupdate":

							break;

							case "onmemberupdate":

							break;

							case "onuserupdate":

							break;

							case "onserverupdate":

							break;

							case "onmessagedelete":

							break;

							case "onmessageupdate":

							break;

							case "onrolecreate":

							break;

							case "onroledelete":

							break;

							case "onroleupdate":

							break;
						}
					}else{
						message.channel.sendMessage(`:no_entry_sign: I can't let you do that, ${message.author.username}. You need a role called \`Sledgehammer Configurator\`.`);
					}
				});
			}else{
				message.channel.sendMessage(`:x: Not enough arguments, ${message.author.username}.`);
			}
		},
		Cooldown: 5,
		Description: "Edits responses for events",
		Usage: "``event``, ``responseType``, ``value``",
		Extra: {
			Events: ["`onJoin`", '`onLeave`', '`onKick`', '`onBan`', '`onUnban`', '`onEmojiCreate`', '`onEmojiDelete`', '`onEmojiUpdate`', '`onMemberUpdate`', '`onUserUpdate`', '`onServerUpdate`', '`onMessageDelete`', '`onMessageUpdate`', '`onRoleCreate`', '`onRoleDelete`', '`onRoleUpdate`'],
			Response__types: ['`message`'],
			Values: [`#channel`, `[message]`]
		}
	}
}