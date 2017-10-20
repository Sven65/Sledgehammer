module.exports = {
	Metadata: {
		Name: "Message"
	},

	Execute: (Args, message) => {
		let s = new Server.Server(message.guild.id);
		if(Args.length >= 2){
			message.guild.fetchMember(message.author).then((user) => {
				if(user.roles.exists("name", "Sledgehammer Configurator")){
					switch(Args[0].toLowerCase()){
						case "join":
							if(Args[1].toLowerCase() === "true"){
								s.setMessage("join", true).then(() => {
									message.channel.send(`:white_check_mark: Messages will now be sent when a user joins.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else if(Args[1].toLowerCase() === "false"){
								s.setMessage("join", false).then(() => {
									message.channel.send(`:white_check_mark: Messages will no longer be sent when a user joins.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else{
								message.channel.send(`:x: That's not a valid value, ${message.author.username}.`);
							}
						break;
						case "userjoin":
							if(Args[1].toLowerCase() === "true"){
								s.setMessage("userjoin", true).then(() => {
									message.channel.send(`:white_check_mark: Messages will now be sent to users when they join.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else if(Args[1].toLowerCase() === "false"){
								s.setMessage("userjoin", false).then(() => {
									message.channel.send(`:white_check_mark: Messages will no longer be sent to users when they join.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else{
								message.channel.send(`:x: That's not a valid value, ${message.author.username}.`);
							}
						break;
						case "leave":
							if(Args[1].toLowerCase() === "true"){
								s.setMessage("leave", true).then(() => {
									message.channel.send(`:white_check_mark: Messages will now be sent when a user leaves.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else if(Args[1].toLowerCase() === "false"){
								s.setMessage("leave", false).then(() => {
									message.channel.send(`:white_check_mark: Messages will no longer be sent when a user leaves.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else{
								message.channel.send(`:x: That's not a valid value, ${message.author.username}.`);
							}
						break;
						case "ban":
							if(Args[1].toLowerCase() === "true"){
								s.setMessage("ban", true).then(() => {
									message.channel.send(`:white_check_mark: Messages will now be sent when a user gets banned.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else if(Args[1].toLowerCase() === "false"){
								s.setMessage("ban", false).then(() => {
									message.channel.send(`:white_check_mark: Messages will no longer be sent when a user gets banned.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else{
								message.channel.send(`:x: That's not a valid value, ${message.author.username}.`);
							}
						break;
						case "unban":
							if(Args[1].toLowerCase() === "true"){
								s.setMessage("unban", true).then(() => {
									message.channel.send(`:white_check_mark: Messages will now be sent when a user gets unbanned.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else if(Args[1].toLowerCase() === "false"){
								s.setMessage("unban", false).then(() => {
									message.channel.send(`:white_check_mark: Messages will no longer be sent when a user gets unbanned.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else{
								message.channel.send(`:x: That's not a valid value, ${message.author.username}.`);
							}
						break;
						case "linkdelete":
							if(Args[1].toLowerCase() === "true"){
								s.setMessage("linkdelete", true).then(() => {
									message.channel.send(`:white_check_mark: Messages will now be sent when a link gets deleted.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else if(Args[1].toLowerCase() === "false"){
								s.setMessage("linkdelete", false).then(() => {
									message.channel.send(`:white_check_mark: Messages will no longer be sent when a link gets deleted.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else{
								message.channel.send(`:x: That's not a valid value, ${message.author.username}.`);
							}
						break;
						case "blacklistdelete":
							if(Args[1].toLowerCase() === "true"){
								s.setMessage("blacklistdelete", true).then(() => {
									message.channel.send(`:white_check_mark: Messages will now be sent when a blacklisted word gets deleted.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else if(Args[1].toLowerCase() === "false"){
								s.setMessage("blacklistdelete", false).then(() => {
									message.channel.send(`:white_check_mark: Messages will no longer be sent when a blacklisted word gets deleted.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else{
								message.channel.send(`:x: That's not a valid value, ${message.author.username}.`);
							}
						break;
						case "mute":
							if(Args[1].toLowerCase() === "true"){
								s.setMessage("mute", true).then(() => {
									message.channel.send(`:white_check_mark: Messages will now be sent when a user gets muted.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else if(Args[1].toLowerCase() === "false"){
								s.setMessage("mute", false).then(() => {
									message.channel.send(`:white_check_mark: Messages will no longer be sent when a user gets muted.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else{
								message.channel.send(`:x: That's not a valid value, ${message.author.username}.`);
							}
						break;
						case "unmute":
							if(Args[1].toLowerCase() === "true"){
								s.setMessage("unmute", true).then(() => {
									message.channel.send(`:white_check_mark: Messages will now be sent when a user gets unmuted.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else if(Args[1].toLowerCase() === "false"){
								s.setMessage("unmute", false).then(() => {
									message.channel.send(`:white_check_mark: Messages will no longer be sent when a user gets unmuted.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else{
								message.channel.send(`:x: That's not a valid value, ${message.author.username}.`);
							}
						break;
						case "emojicreate":
							if(Args[1].toLowerCase() === "true"){
								s.setMessage("emojicreate", true).then(() => {
									message.channel.send(`:white_check_mark: Messages will now be sent when an emoji is created.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else if(Args[1].toLowerCase() === "false"){
								s.setMessage("emojicreate", false).then(() => {
									message.channel.send(`:white_check_mark: Messages will no longer be sent when an emoji is created.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else{
								message.channel.send(`:x: That's not a valid value, ${message.author.username}.`);
							}
						break;
						case "emojidelete":
							if(Args[1].toLowerCase() === "true"){
								s.setMessage("emojidelete", true).then(() => {
									message.channel.send(`:white_check_mark: Messages will now be sent when an emoji is deleted.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else if(Args[1].toLowerCase() === "false"){
								s.setMessage("emojidelete", false).then(() => {
									message.channel.send(`:white_check_mark: Messages will no longer be sent when an emoji is deleted.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else{
								message.channel.send(`:x: That's not a valid value, ${message.author.username}.`);
							}
						break;
						case "emojiupdate":
							if(Args[1].toLowerCase() === "true"){
								s.setMessage("emojiupdate", true).then(() => {
									message.channel.send(`:white_check_mark: Messages will now be sent when an emoji is updated.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else if(Args[1].toLowerCase() === "false"){
								s.setMessage("emojiupdate", false).then(() => {
									message.channel.send(`:white_check_mark: Messages will no longer be sent when an emoji is updated.`);
								}).catch((e) => {
									message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								});
							}else{
								message.channel.send(`:x: That's not a valid value, ${message.author.username}.`);
							}
						break;
					}
				}else{
					message.channel.send(`:no_entry_sign: I can't let you do that, ${message.author.username}. You need a role called \`Sledgehammer Configurator\`.`);
				}
			});
		}else{
			message.channel.send(`:x: Not enough arguments, ${message.author.username}.`);
		}
	},
	Cooldown: 5,
	Description: "Changes if messages should be sent",
	Usage: "``Type``, ``value``",
	Extra: {
		Types: ['`join`', '`leave`', '`ban`', '`unban`', '`linkdelete`', '`blacklistdelete`', '`mute`'],
		Values: ['`true`', '`false`']
	}
};