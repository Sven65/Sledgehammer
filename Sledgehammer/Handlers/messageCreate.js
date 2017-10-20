module.exports = {
	Handle: (message) => {
		if(message.author === Sledgehammer.user) return;

		if(message.channel.type !== "text"){
			message.channel.send(`Sorry, I don't respond to private messages.`);
			return;
		}

		let Guild = new Server.Server(message.guild.id);
		let ACL = new Server.ACL(Guild);

		Guild.exists.then((Exists) => {
			if(!Exists) Guild.create();

		
			let Args = message.content.replace(/\s\s+/g, " ").split(" ");
			let Time = new Date();

			Guild.prefix.then((prefix) => {
				Guild.blacklist.then((Blacklist) => {
					Guild.messages.then((Messages) => {

						Guild.modlog.then((ModLog) => {
							Guild.channels.then((channels) => {

								if(Blacklist === null){
									Blacklist = [];
								}

								ACL.ACLState.then((ACLState) => {
									ACL.ACLNodes(message.author.id).then((Nodes) => {

										if(Nodes === null || Nodes === undefined){
											Nodes = [];
										}

										if(message.content.replace(/\s\s+/g, " ").containsArray(Blacklist)){

											if(Args[0].toLowerCase() === `${prefix}whitelist`){
												if(ACLState && !ACL.checkACL(Nodes, ["messages.blacklist.ignore", "messages.blacklist.*", "messages.*", "messages.blacklist.manage"], "any") || !ACLState && !message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")){
													let Message = `Removed message from ${message.author.username} (${message.author.id})`;
													message.delete();
													if(channels !== null){
														if(channels.blacklistDelete !== null && channels.blacklistDelete !== undefined){
															let Message = channels.blacklistDelete.message;
															Message = Message.replace(/\${user}/gi, message.author.username);
															Message = Message.replace(/\${userid}/gi, message.author.id);
															Message = Message.replace(/\${userdiscrim}/gi, message.author.discriminator);
															Message = DateFormat.formatDate(Time, Message);
															ModLog = channels.blacklistDelete.id;
														}
													}

													if(Messages !== null){
														if(Messages.blacklistdelete !== null && Messages.blacklistdelete !== undefined){
															if(Messages.blacklistdelete){
																message.guild.channels.get(ModLog).send(Message);
															}
														}
													}
												}
											}

											if(ACLState && !ACL.checkACL(Nodes, ["messages.blacklist.ignore", "messages.blacklist.*", "messages.*"], "any") || !ACLState && !message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")){
												let Message = `Removed message from ${message.author.username} (${message.author.id})`;
												message.delete();
												if(channels !== null){
													if(channels.blacklistDelete !== null && channels.blacklistDelete !== undefined){
														let Message = channels.blacklistDelete.message;
														Message = Message.replace(/\${user}/gi, message.author.username);
														Message = Message.replace(/\${userid}/gi, message.author.id);
														Message = Message.replace(/\${userdiscrim}/gi, message.author.discriminator);
														Message = DateFormat.formatDate(Time, Message);
														ModLog = channels.blacklistDelete.id;
													}
												}

												if(Messages !== null){
													if(Messages.blacklistdelete !== null && Messages.blacklistdelete !== undefined){
														if(Messages.blacklistdelete){
															message.guild.channels.get(ModLog).send(Message);
														}
													}
												}
											}
											return;
										}

										Guild.linkFilter(message.channel.id).then((filter) => {
											if(filter !== null){
												let ToSend = {
													Type: "",
													From: "",
													Channel: "",
													ShouldSend: false
												};
												if(filter.type === "all"){
													if(ACLState && !ACL.checkACL(Nodes, ["messages.links.embed", "messages.links.*", "messages.*"], "any") || !ACLState && !message.channel.permissionsFor(message.author).hasPermission("EMBED_LINKS")){
												
														let Regex = new RegExp(
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

														if(Regex.test(message.content)){
															message.delete();
															ToSend.Type = "link";
															ToSend.From = message.author;
															ToSend.Channel = message.channel;
															ToSend.ShouldSend = true;
														}

													}
												}else if(filter.type === "invite" || filter.type === "invites"){
													if(message.channel !== null){
														let Perms = message.channel.permissionsFor(message.author);
														if(Perms !== null){
															if(ACLState && !ACL.checkACL(Nodes, ["messages.links.embed", "messages.links.*", "messages.*", "messages.links.invite"], "any") || !ACLState && !Perms.hasPermission("EMBED_LINKS")){
																let Regex = new RegExp("(?:http\:\/\/)?(?:https\:\/\/)?discord.gg\/(?:[^\s]*)", "gi");
																if(Regex.test(message.content)){
																	message.delete();
																	ToSend.Type = "invite";
																	ToSend.From = message.author;
																	ToSend.Channel = message.channel;
																	ToSend.ShouldSend = true;
																}
															}
														}
													}
												}

												if(ToSend.ShouldSend){
													let Message = `Removed ${ToSend.Type} from ${ToSend.From.username} in ${ToSend.Channel}`;
													if(Messages !== null){
														if(Messages.linkdelete){
															if(channels.linkLog !== null){
																let toSend = channels.linkLog.message;
																let time = new Date();
																toSend = toSend.replace(/\${type}/gi, ToSend.Type);

																toSend = toSend.replace(/\${From}/gi, ToSend.From);
																toSend = toSend.replace(/\${FromName}/gi, ToSend.From.username);
																toSend = toSend.replace(/\${FromID}/gi, ToSend.From.id);
																toSend = toSend.replace(/\${FromDiscrim}/gi, ToSend.From.discriminator);

																toSend = toSend.replace(/\${Channel}/gi, ToSend.Channel);
																toSend = toSend.replace(/\${ChannelName}/gi, ToSend.Channel.name);
																toSend = toSend.replace(/\${ChannelID}/gi, ToSend.Channel.id);

																toSend = DateFormat.formatDate(time, toSend);

																ModLog = channels.linkLog.id;
															}
															if(ModLog !== null && ModLog !== undefined){
																message.guild.channels.get(ModLog).send(Message);
															}
														}
													}
												}

											}
										}).catch((e) => {
											console.dir(e.stack);
										});

									
										if(message.author.bot) return;

										let user = new User.User(message.author.id);

										if(Args[0].startsWith(prefix)){
											let Command = Args[0].replace(prefix, "").toLowerCase();
											if(Sledgehammer.Commands.All.indexOf(Command) > -1){
												try{
													user.isFirstTime(Command).then((FirstTime) => {
														user.getLastExec(Command).then((lastExecTime) => {
															let now = new Date().valueOf();
															if(now <= lastExecTime+Sledgehammer.Utils.resolveCooldown(Command)*1000 && FirstTime){
																let time = Math.round(((lastExecTime + Sledgehammer.Utils.resolveCooldown(Command) * 1000) - now) / 1000);
																message.channel.send(`You need to calm down, ${message.author.username}. :hourglass: ${time} seconds`);
															}else{
																Args.shift();
																Sledgehammer.Utils.resolveCommand(Command).Execute(Args, message);
																user.setFirstTime(Command, true).then(() => {
																	user.setLastExec(Command, now).then(() => {

																	});
																})
															}
														});
													});
												}catch(e){
													console.log(e);
												};
											}
										}
									}).catch((e) => {
										console.dir(e.stack);
									});
								}).catch((e) => {
									console.dir(e.stack);
								});

								
							}).catch((e) => {
								console.dir(e.stack);
							});
						}).catch((e) => {
							console.dir(e.stack);
						});

					}).catch((e) => {
						console.dir(e.stack);
					});
				}).catch((e) => {
					console.dir(e.stack);
				});
			}).catch((e) => {
				console.dir(e.stack);
			});
		}).catch((e) => {
			console.dir(e.stack);
		});
	}
};