module.exports = {
	Metadata: {
		Name: "Blacklist"
	},

	Execute: (Args, message) => {
		if(Args.length >= 1){
			if(message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")){
				if(message.channel.permissionsFor(Sledgehammer.user).hasPermission("MANAGE_MESSAGES")){
					let server = new Server.Server(message.guild.id);
					server.blacklistAdd(Args.join(" ")).then(() => {
						message.channel.sendMessage(`:white_check_mark: Blacklisted \`${Args.join(" ")}\`.`);
					}).catch((e) => {
						message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
					});
				}else{
					message.channel.sendMessage(`:no_entry_sign: I can't do that, ${message.author.username}, I'm missing the permission to manage messages.`);
				}
			}else{
				message.channel.sendMessage(`:no_entry_sign: I can't let you do that, ${message.author.username}. You don't have the permission to manage messages.`);
			}
		}else{

			message.channel.sendMessage(`:no_entry_sign: Not enough arguments, ${message.author.username}.`);
		}
	},
	Cooldown: 5,
	Description: "Adds a word or phrase to the blacklist.",
	Usage: "``Word/RegExp``"
};