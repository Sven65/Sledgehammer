module.exports = {
	Handle: (oldEmoji, newEmoji) => {
		let Guild = new Server.Server(newEmoji.guild.id);
		Guild.modlog.then((ModLog) => {
			Guild.channels.then((channels) => {
				let Message = `Emoji ${oldEmoji.toString()} was updated to ${newEmoji.toString()}.`;
				if(channels !== null){
					if(channels.emojiUpdate !== null && channels.emojiUpdate !== undefined){
						let time = new Date();
						let Message = channels.emojiUpdate.message;
						Message = Message.replace(/\${oldemoji}/gi, oldEmoji.toString());
						Message = Message.replace(/\${oldemojiname}/gi, oldEmoji.name);
						Message = Message.replace(/\${oldemojiid}/gi, oldEmoji.id);
						Message = Message.replace(/\${oldemojiCreated}/gi, oldEmoji.createdAt);
						Message = Message.replace(/\${oldemojiURL}/gi, oldEmoji.url);

						Message = Message.replace(/\${newemoji}/gi,  newEmoji.toString());
						Message = Message.replace(/\${newemojiname}/gi, newEmoji.name);
						Message = Message.replace(/\${newemojiid}/gi, newEmoji.id);
						Message = Message.replace(/\${newemojiCreated}/gi, newEmoji.createdAt);
						Message = Message.replace(/\${newemojiURL}/gi, newEmoji.url);
						Message = DateFormat.formatDate(time, Message);
						ModLog = channels.unbanLog.id;
					}
				}

				Guild.messages.then((messages) => {
					if(messages !== null){
						if(messages.emojiupdate !== null){
							if(messages.emojiupdate){
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