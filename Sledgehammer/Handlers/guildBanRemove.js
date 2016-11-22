module.exports = {
	Handle: (guild, member) => {
		let Guild = new Server.Server(guild.id);
		Guild.modlog.then((ModLog) => {
			Guild.channels.then((channels) => {
				let Message = `${member.user.username} was unbanned.`;
				if(channels !== null){
					if(channels.unbanLog !== null && channels.unbanLog !== undefined){
						let time = new Date();
						let Message = channels.unbanLog.message;
						Message = Message.replace(/\${user}/gi, member.user.username);
						Message = Message.replace(/\${userid}/gi, member.user.id);
						Message = Message.replace(/\${userdiscrim}/gi, member.user.discriminator);
						Message = DateFormat.formatDate(time, Message);
						ModLog = channels.unbanLog.id;
					}
				}

				Guild.messages.then((messages) => {
					if(messages !== null){
						if(messages.unban !== null){
							if(messages.unban){
								if(ModLog !== null){
									member.guild.channels.get(ModLog).sendMessage(Message);
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