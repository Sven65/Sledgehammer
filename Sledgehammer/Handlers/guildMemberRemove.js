module.exports = {
	Handle: (member) => {
		let Guild = new Server.Server(member.guild.id);
		Guild.modlog.then((ModLog) => {
			Guild.channels.then((channels) => {
				let Message = `${member.user.username} Left the server.`;
				if(channels !== null){
					if(channels.leaveLog !== null && channels.leaveLog !== undefined){
						let time = new Date();
						let Message = channels.leaveLog.message;
						Message = Message.replace(/\${user}/gi, member.user.username);
						Message = Message.replace(/\${userid}/gi, member.user.id);
						Message = Message.replace(/\${userdiscrim}/gi, member.user.discriminator);
						Message = DateFormat.formatDate(time, Message);
						ModLog = channels.leaveLog.id;
					}
				}

				Guild.messages.then((messages) => {
					if(messages !== null){
						if(messages.join !== null){
							if(ModLog !== null){
								member.guild.channels.get(ModLog).sendMessage(Message);
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