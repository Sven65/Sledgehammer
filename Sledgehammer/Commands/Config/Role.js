module.exports = {
	Metadata: {
		Name: "Role"
	},

	Execute: (Args, message) => {
		let s = new Server.Server(message.guild.id);
		if(Args.length >= 2){
			message.guild.fetchMember(message.author).then((user) => {
				if(user.roles.exists("name", "Sledgehammer Configurator")){
					switch(Args[0].toLowerCase()){
						case "mute":
						case "muted":
							let roleID = "";
							if(message.mentions.roles.size >= 1){
								roleID = message.mentions.roles.first().id;
							}else{
								Args.shift();
								message.guild.roles.map((a) => {
									if(a.name.toLowerCase() === Args.join(" ").toLowerCase()){
										roleID = a.id;
									}
								});
							}
							s.setRole("mute", roleID).then(() => {
								message.channel.sendMessage(`:white_check_mark: Mute role set to ${message.guild.roles.get(roleID).name}`);
							}).catch((e) => {
								message.channel.sendMessage(`:x: Something wen't wrong ${message.author.username}.`);
							})
						break;
						default:
							message.channel.sendMessage(`:x: That's not a valid value, ${message.author.username}.`);
						break;
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
	Description: "Sets a role to use for functions",
	Usage: "``RoleType``, ``@Role/Role Name``",
	Extra: {
		Role__Types: ['`muted`']
	}
};