let Utils = {
	Clean: (message, Count, User) => { // Cleaning messages
		console.log(User);
		return new Promise((resolve, reject) => {
			let i = 0;
			let toClean = 0;
			message.channel.fetchMessages({limit: Count}).then((messages) => {
				messages.map((a) => {
					if(User !== ""){
						if(a.author.id === User){
							toClean++;
						}
					}		
				});
				messages.map((ms) => {
					if(User !== ""){
						if(ms.author.id === User){
							ms.delete().then(() => {
								i++;
								if(i === toClean || i === messages.size){
									resolve(i);
								}
							}).catch((e) => {
								i++;
								if(i === toClean || i === messages.size){
									resolve(i);
								}
							});	
						}
					}else{
						ms.delete().then(() => {
							i++;
							if(i === Count || i === messages.size){
								resolve(i);
							}
						}).catch((e) => {
							i++;
							if(i === Count || i === messages.size){
								resolve(i);
							}
						});	
					}
				});
			});
		});
	}
}

module.exports = {
	Metadata: {
		Name: "Clean"
	},

	Execute: (Args, message) => {
		let Member = message.guild.fetchMember(message.author);
		let purgeCount = 10;
		if(Args.length >= 1){
			purgeCount = parseInt(Args[0]) || 10;
		}
		if(message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")){
			if(message.channel.permissionsFor(Sledgehammer.user).hasPermission("MANAGE_MESSAGES")){
				let user = "";
				if(message.mentions.users.size >= 1){
					user = message.mentions.users.first().id;
				}
				let toSend = "";
				Utils.Clean(message, purgeCount, user).then((Purged) => {
					toSend = `Purged ${Purged.formatNumber()} messages in ${message.channel}.`;
					message.channel.sendMessage(toSend);
				});
			}else{
				message.channel.sendMessage(`:no_entry_sign: I can't do that, ${message.author.username}, I'm missing the permission to manage messages.`);
			}
		}else{
			message.channel.sendMessage(`:no_entry_sign: I can't let you do that, ${message.author.username}. You don't have the permission to manage messages.`);
		}
	},
	Cooldown: 5,
	Description: "Purges messages",
	Usage: "`[amount]`, `[@user]`"
};