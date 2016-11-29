module.exports = {
	Handle: (member) => {
		let Guild = new Server.Server(member.guild.id);
		Guild.modlog.then((ModLog) => {
			Guild.channels.then((channels) => {
				let Message = `${member.user.username} Joined the server.`;
				if(channels !== null){
					if(channels.joinLog !== null && channels.joinLog !== undefined){
						let time = new Date();
						let Message = channels.joinLog.message;
						Message = Message.replace(/\${user}/gi, member.user.username);
						Message = Message.replace(/\${userid}/gi, member.user.id);
						Message = Message.replace(/\${userdiscrim}/gi, member.user.discriminator);
						Message = DateFormat.formatDate(time, Message);
						ModLog = channels.joinLog.id;
					}
				}

				Guild.messages.then((messages) => {
					if(messages !== null){
						if(messages.join !== null){
							if(messages.join){
								if(ModLog !== null){
									member.guild.channels.get(ModLog).sendMessage(Message);
								}
							}

							if(messages.userjoin !== null){
								if(messages.userjoin){
									Guild.userJoin.then((message) => {
										member.sendMessage(message);
									});
								}
							}

						}else{
							if(ModLog !== null){
								member.guild.channels.get(ModLog).sendMessage(Message);
							}
						}
					}else{
						if(ModLog !== null){
							member.guild.channels.get(ModLog).sendMessage(Message);
						}
					}
				}).catch((e) => {

				});

			}).catch((e) => {

			});
		}).catch((e) => {

		})
	}
};