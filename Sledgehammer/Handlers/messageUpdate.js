module.exports = {
	Handle: (oldMessage, newMessage) => {
		if(newMessage.author === Sledgehammer.user) return;

		if(newMessage.channel.type !== "text") return;

		let Guild = new Server.Server(newMessage.guild.id);
		let ACL = new Server.ACL(Guild);

		Guild.exists.then((Exists) => {
			if(!Exists) Guild.create();

			let Time = new Date();

			Guild.blacklist.then((Blacklist) => {
				Guild.messages.then((Messages) => {

					Guild.modlog.then((ModLog) => {
						Guild.channels.then((channels) => {

							if(Blacklist === null){
								Blacklist = [];
							}

							ACL.ACLState.then((ACLState) => {
								ACL.ACLNodes(newMessage.author.id).then((Nodes) => {

									if(Nodes === null || Nodes === undefined){
										Nodes = [];
									}

									if(newMessage.content.replace(/\s\s+/g, " ").containsArray(Blacklist)){

										if(ACLState && !ACL.checkACL(Nodes, ["messages.blacklist.ignore", "messages.blacklist.*", "messages.*"], "any") || !ACLState && !newMessage.channel.permissionsFor(newMessage.author).has("MANAGE_MESSAGES")){
											let Message = `Removed message from ${newMessage.author.username} (${newMessage.author.id})`;
											newMessage.delete();
											if(channels !== null){
												if(channels.blacklistDelete !== null && channels.blacklistDelete !== undefined){
													let Message = channels.blacklistDelete.message;
													Message = Message.replace(/\${user}/gi, newMessage.author.username);
													Message = Message.replace(/\${userid}/gi, newMessage.author.id);
													Message = Message.replace(/\${userdiscrim}/gi, newMessage.author.discriminator);
													Message = DateFormat.formatDate(Time, Message);
													ModLog = channels.blacklistDelete.id;
												}
											}

											if(Messages !== null){
												if(Messages.blacklistdelete !== null && Messages.blacklistdelete !== undefined){
													if(Messages.blacklistdelete){
														newMessage.guild.channels.get(ModLog).send(Message);
													}
												}
											}
										}
										return;
									}

									Guild.linkFilter(newMessage.channel.id).then((filter) => {
										if(filter !== null){
											let ToSend = {
												Type: "",
												From: "",
												Channel: "",
												ShouldSend: false
											};
											if(filter.type === "all"){
												if(ACLState && !ACL.checkACL(Nodes, ["messages.links.embed", "messages.links.*", "messages.*"], "any") || !ACLState && !newMessage.channel.permissionsFor(newMessage.author).has("EMBED_LINKS")){
											
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

													if(Regex.test(newMessage.content)){
														newMessage.delete();
														ToSend.Type = "link";
														ToSend.From = newMessage.author;
														ToSend.Channel = newMessage.channel;
														ToSend.ShouldSend = true;
													}

												}
											}else if(filter.type === "invite" || filter.type === "invites"){
												if(ACLState && !ACL.checkACL(Nodes, ["messages.links.embed", "messages.links.*", "messages.*", "messages.links.invite"], "any") || !ACLState && !newMessage.channel.permissionsFor(newMessage.author).has("EMBED_LINKS")){
													let Regex = new RegExp("(?:http\:\/\/)?(?:https\:\/\/)?discord.gg\/(?:[^\s]*)", "gi");
													if(Regex.test(newMessage.content)){
														message.delete();
														ToSend.Type = "invite";
														ToSend.From = newMessage.author;
														ToSend.Channel = newMessage.channel;
														ToSend.ShouldSend = true;
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
															newMessage.guild.channels.get(ModLog).send(Message);
														}
													}
												}
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