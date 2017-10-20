module.exports = {
	Metadata: {
		Name: "Modlog",
	},

	Execute: (Args, message) => {
		if(Args.length >= 1){
			let Mentions = message.mentions.channels;
			if(Mentions.size >= 1){
				if(message.channel.permissionsFor(message.author).hasPermission("MANAGE_CHANNELS")){
					if(message.guild.channels.get(Mentions.first().id).permissionsFor(Sledgehammer.user).hasPermission("SEND_MESSAGES")){
						if(message.guild.channels.get(Mentions.first().id).permissionsFor(Sledgehammer.user).hasPermission("READ_MESSAGES")){
							let server = new Server.Server(message.guild.id);
							server.setModlog(Mentions.first().id).then(() => {
								message.channel.send(`:white_check_mark: Modlog channel set to <#${Mentions.first().id}>`)
							}).catch((e) => {
								message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
								console.log(e);
							});
						}else{
							message.channel.send(`:no_entry_sign: I can't do that, ${message.author.username}, I'm missing the permission to read messages in that channel.`);
						}
					}else{
						message.channel.send(`:no_entry_sign: I can't do that, ${message.author.username}, I'm missing the permission to send messages in that channel.`);
					}
				}else{
					message.channel.send(`:no_entry_sign: I can't let you do that, ${message.author.username}. You don't have the permission to manage channels.`);
				}
			}else{
				message.channel.send(`:x: Not enough arguments, ${message.author.username}.`);
			}
		}else{
			message.channel.send(`:x: Not enough arguments, ${message.author.username}.`);
		}
	},
	Cooldown: 5,
	Description: "Changes the channel Sledgehammer outputs messages in",
	Usage: "``#channel``"
};