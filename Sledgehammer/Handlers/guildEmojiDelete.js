module.exports = {
	Handle: (Emoji) => {
		let Guild = new Server.Server(Emoji.guild.id);
		Guild.modlog.then((ModLog) => {
			Guild.channels.then((channels) => {
				let Message = `Emoji ${Emoji.toString()} was deleted.`;
				if(channels !== null){
					if(channels.emojiDelete !== null && channels.emojiDelete !== undefined){
						let time = new Date();
						let Message = channels.emojiDelete.message;
						Message = Message.replace(/\${emoji}/gi, Emoji.toString());
						Message = Message.replace(/\${emojiname}/gi, Emoji.name);
						Message = Message.replace(/\${emojiid}/gi, Emoji.id);
						Message = Message.replace(/\${emojiCreated}/gi, Emoji.createdAt);
						Message = Message.replace(/\${emojiURL}/gi, Emoji.url);
						Message = DateFormat.formatDate(time, Message);
						ModLog = channels.unbanLog.id;
					}
				}

				Guild.messages.then((messages) => {
					if(messages !== null){
						if(messages.emojidelete !== null){
							if(messages.emojidelete){
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