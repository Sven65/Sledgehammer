module.exports = {
	Metadata: {
		Name: "Edit",
	},

	Execute: (Args, message) => {
		/*
			Command to edit event responses
			Valid events are
				- Join Events: 
					onJoin, onLeave
				- Moderation events:
					onKick, onBan, onUnban
				- User events
					onMemberUpdate, onUserUpdate
				- Server events
					onServerUpdate
				- Message events
					onMessageDelete, onMessageUpdate
				- Role Events
					onRoleCreate, onRoleDelete, onRoleUpdate
		*/
		let s = new Server.Server(message.guild.id);
		if(Args.length >= 1){
			message.guild.fetchMember(message.author).then((user) => {
				if(user.roles.exists("name", "Sledgehammer Configurator")){
					let s = new Server.Server(message.guild.id);
					let Channels = message.mentions.channels;
					switch(Args[0].toLowerCase()){
						case "onjoin":
							if(Args.length >= 2){
								if(Args[1].toLowerCase() === "message"){
									let channel = message.channel.id;
									s.modlog.then((ml) => {
										if(ml !== null){
											channel = ml;
										}
										if(Channels.size >= 1){
											channel = Channels.first().id;
											Args.splice(Args.indexOf(`<#${channel}>`), 1);
										}
										Args.shift();
										Args.shift();
										let msg = Args.join(" ");
										s.setJoin(channel, msg).then(() => {
											message.channel.sendMessage(`:white_check_mark: onJoin message \`${msg}\` set to send in <#${channel}>`);
										}).catch((e) => {
											message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
										});
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
							if(Args.length >= 2){
								if(Args[1].toLowerCase() === "message"){
									let channel = message.channel.id;
									s.modlog.then((ml) => {
										if(ml !== null){
											channel = ml;
										}
										if(Channels.size >= 1){
											channel = Channels.first().id;
											Args.splice(Args.indexOf(`<#${channel}>`), 1);
										}
										Args.shift();
										Args.shift();
										let msg = Args.join(" ");
										s.setLeave(channel, msg).then(() => {
											message.channel.sendMessage(`:white_check_mark: onLeave message \`${msg}\` set to send in <#${channel}>`);
										}).catch((e) => {
											message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
										});
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

						case "onkick":
							if(Args.length >= 2){
								if(Args[1].toLowerCase() === "message"){
									let channel = message.channel.id;
									s.modlog.then((ml) => {
										if(ml !== null){
											channel = ml;
										}
										if(Channels.size >= 1){
											channel = Channels.first().id;
											Args.splice(Args.indexOf(`<#${channel}>`), 1);
										}
										Args.shift();
										Args.shift();
										let msg = Args.join(" ");
										s.setKick(channel, msg).then(() => {
											message.channel.sendMessage(`:white_check_mark: onKick message \`${msg}\` set to send in <#${channel}>`);
										}).catch((e) => {
											console.dir(e);
											message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
										});
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

						case "onban":
							if(Args.length >= 2){
								if(Args[1].toLowerCase() === "message"){
									let channel = message.channel.id;
									s.modlog.then((ml) => {
										if(ml !== null){
											channel = ml;
										}
										if(Channels.size >= 1){
											channel = Channels.first().id;
											Args.splice(Args.indexOf(`<#${channel}>`), 1);
										}
										Args.shift();
										Args.shift();
										let msg = Args.join(" ");
										s.setBan(channel, msg).then(() => {
											message.channel.sendMessage(`:white_check_mark: onBan message \`${msg}\` set to send in <#${channel}>`);
										}).catch((e) => {
											console.dir(e);
											message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
										});
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

						case "onunban":
							if(Args.length >= 2){
								if(Args[1].toLowerCase() === "message"){
									let channel = message.channel.id;
									s.modlog.then((ml) => {
										if(ml !== null){
											channel = ml;
										}
										Args.shift();
										Args.shift();
										let msg = Args.join(" ");
										s.setUnban(channel, msg).then(() => {
											message.channel.sendMessage(`:white_check_mark: onUnban message set to \`${msg}\`.`);
										}).catch((e) => {
											message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
										});
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

						case "onmute":
							if(Args.length >= 2){
								if(Args[1].toLowerCase() === "message"){
									let channel = message.channel.id;
									s.modlog.then((ml) => {
										if(ml !== null){
											channel = ml;
										}

										if(Channels.size >= 1){
											channel = Channels.first().id;
											Args.splice(Args.indexOf(`<#${channel}>`), 1);
										}

										Args.shift();
										Args.shift();
										let msg = Args.join(" ");
										s.setMute(channel, msg).then(() => {
											message.channel.sendMessage(`:white_check_mark: onMute message set to \`${msg}\`.`);
										}).catch((e) => {
											message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
										});
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

						case "onunmute":
							if(Args.length >= 2){
								if(Args[1].toLowerCase() === "message"){
									let channel = message.channel.id;
									s.modlog.then((ml) => {
										if(ml !== null){
											channel = ml;
										}

										if(Channels.size >= 1){
											channel = Channels.first().id;
											Args.splice(Args.indexOf(`<#${channel}>`), 1);
										}

										Args.shift();
										Args.shift();
										let msg = Args.join(" ");
										s.setUnMute(channel, msg).then(() => {
											message.channel.sendMessage(`:white_check_mark: onUnMute message set to \`${msg}\`.`);
										}).catch((e) => {
											message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
										});
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

						case "onlinkremove":
							if(Args.length >= 2){
								if(Args[1].toLowerCase() === "message"){
									let channel = message.channel.id;
									s.modlog.then((ml) => {
										if(ml !== null){
											channel = ml;
										}

										if(Channels.size >= 1){
											channel = Channels.first().id;
											Args.splice(Args.indexOf(`<#${channel}>`), 1);
										}

										Args.shift();
										Args.shift();
										let msg = Args.join(" ");
										s.setLinkRemove(channel, msg).then(() => {
											message.channel.sendMessage(`:white_check_mark: onLinkRemove message set to \`${msg}\`.`);
										}).catch((e) => {
											message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
										});
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

						case "onblacklistdelete":
							if(Args.length >= 2){
								if(Args[1].toLowerCase() === "message"){
									let channel = message.channel.id;
									s.modlog.then((ml) => {
										if(ml !== null){
											channel = ml;
										}

										if(Channels.size >= 1){
											channel = Channels.first().id;
											Args.splice(Args.indexOf(`<#${channel}>`), 1);
										}

										Args.shift();
										Args.shift();
										let msg = Args.join(" ");
										s.setBlacklistDelete(channel, msg).then(() => {
											message.channel.sendMessage(`:white_check_mark: onBlacklistDelete message set to \`${msg}\`.`);
										}).catch((e) => {
											message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
										});
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
		Events: ["`onJoin`", '`onLeave`', '`onKick`', '`onBan`', '`onUnban`', '`onEmojiCreate`', '`onEmojiDelete`', '`onEmojiUpdate`', '`onMemberUpdate`', '`onUserUpdate`', '`onServerUpdate`', '`onMessageDelete`', '`onMessageUpdate`', '`onRoleCreate`', '`onRoleDelete`', '`onRoleUpdate`', '`onLinkRemove`'],
		Response__types: ['`message`'],
		Values: [`#channel`, `[message]`]
	}
};