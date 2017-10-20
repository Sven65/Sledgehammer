module.exports = {
	Metadata: {
		Name: "ACL"
	},

	Execute: (Args, message) => {
		let s = new Server.Server(message.guild.id);
		let ACL = new Server.ACL(s);
		if(Args.length >= 1){
			if(message.author.id === message.guild.ownerID){
				let option = Args[0].toLowerCase();
				if(option === "on"){
					ACL.setACL(true).then(() => {
						message.channel.send(`:white_check_mark: ACL Turned on, ${message.author.username}.`);
					}).catch((e) => {
						message.channel.send(`:x: Something went wrong, ${message.author.username}`);
					});
				}else if(option === "off"){
					ACL.setACL(false).then(() => {
						message.channel.send(`:white_check_mark: ACL Turned off, ${message.author.username}.`);
					}).catch((e) => {
						message.channel.send(`:x: Something went wrong, ${message.author.username}`);
					});
				}else{
					message.channel.send(`:x: That's not a valid option, ${message.author.username}`);
				}
			}else{
				message.channel.send(`:x: Only the server owner can change between ACL states, ${message.author.username}.`);
			}
		}else{
			message.channel.send(`:x: Not enough arguments, ${message.author.username}.`);
		}
	},
	Cooldown: 5,
	Description: "Changes whether ACL should be on or off.",
	Usage: "`state`",
	Extra: {
		States: ['`On`', '`Off`']
	}
};