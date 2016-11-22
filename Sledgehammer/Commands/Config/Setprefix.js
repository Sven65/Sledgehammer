module.exports = {
	Metadata: {
		Name: "Setprefix",
	},

	Execute: (Args, message) => {
		let s = new Server.Server(message.guild.id);
		if(Args.length >= 1){
			message.guild.fetchMember(message.author).then((user) => {
				if(user.roles.exists("name", "Sledgehammer Configurator")){
					let prefix = Args.join(" ");
					if(prefix.actualLength > 16){
						message.channel.sendMessage(`:no_entry_sign: Sorry, ${message.author.username}, but a prefix can be a maximum of 16 characters.`);
					}else{
						s.setPrefix(prefix).then(() => {
							message.channel.sendMessage(`:white_check_mark: Prefix for ${message.guild.name} set to \`${prefix}\``);
						}).catch((e) => {
							message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
						});
					}
				}else{
					message.channel.sendMessage(`:no_entry_sign: I can't let you do that, ${message.author.username}. You need a role called \`Sledgehammer Configurator\`.`);
				}
			});
		}else{
			message.channel.sendMessage(`:x: Not enough arguments, ${message.author.username}.`);
		}
	},
	Cooldown: 5,
	Description: "Changes the prefix of Sledgehammer",
	Usage: "``prefix``"
};