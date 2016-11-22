module.exports = {
	Metadata: {
		Name: "Config",
	},

	Execute: (Args, message) => {
		let s = new Server.Server(message.guild.id);
		s.all.then((server) => {
			if(server !== null){
				let toSend = `__**❯ ${message.guild.name} configuration ❮**__`;
				if(server.Blacklist !== null && server.Blacklist !== undefined){
					toSend += `\n**❯ Blacklist: ${server.Blacklist.join(', ')} ❮**`;
				}
				if(server.modlog !== null && server.modlog !== undefined){
					toSend += `\n**❯ Modlog channel: <#${server.modlog}>❮ **`;
				}
				if(server.linkFilter !== undefined && server.linkFilter !== null){
					for(let filter in server.linkFilter){
						toSend += `\n**❯ Link filtering in <#${filter}>: ${server.linkFilter[filter].type} ❮**`;
					}
				}
				if(server.prefix !== null && server.prefix !== undefined){
					toSend += `\n**❯ Prefix: ${server.prefix} ❮**`;
				}
				message.channel.sendMessage(toSend);
			}else{
				message.channel.sendMessage(`:x: This server doesn't have a configuration.`);
			}
		}).catch((e) => {
			message.channel.sendMessage(`:x: Something went wrong, ${message.author.username}.`);
		})
	},
	Cooldown: 5,
	Description: "Shows the configuration of the current server.",
	Usage: ""
};