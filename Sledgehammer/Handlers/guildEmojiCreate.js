module.exports = {
	Handle: (Emoji) => {
		let Guild = new Server.Server(Emoji.guild.id);
		Guild.modlog.then((ModLog) => {
			Guild.channels.then((channels) => {
				let Message = `Emoji ${Emoji.toString()} was created.`;
				if(channels !== null){
					if(channels.emojiCreate !== null && channels.emojiCreate !== undefined){
						let time = new Date();
						let Message = channels.emojiCreate.message;
						Message = Message.replace(/\${emoji}/gi, Emoji.toString());
						Message = Message.replace(/\${emojiname}/gi, Emoji.name);
						Message = Message.replace(/\${emojiid}/gi, Emoji.id);
						Message = Message.replace(/\${emojiCreated}/gi, Emoji.createdAt);
						Message = Message.replace(/\${emojiURL}/gi, Emoji.url);
						Message = DateFormat.formatDate(time, Message);
						ModLog = channels.emojiCreate.id;
					}
				}

				Guild.messages.then((messages) => {
					if(messages !== null){
						if(messages.emojicreate !== null){
							if(messages.emojicreate){
								if(ModLog !== null){
									Emoji.guild.channels.get(ModLog).send(Message).catch((e) => {
										console.dir(e.stack);
									})
								}
							}
						}else{
							if(ModLog !== null){
								Emoji.guild.channels.get(ModLog).send(Message).catch((e) => {
									console.dir(e.stack);
								})
							}
						}
					}else{
						if(ModLog !== null){
							Emoji.guild.channels.get(ModLog).send(Message).catch((e) => {
								console.dir(e.stack);
							})
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
	}
};