module.exports = {
	Metadata: {
		Name: "Grant"
	},

	Execute: (Args, message) => {
		if(Args.length >= 2){
			let Mentions = message.mentions.users;
			if(Mentions.size >= 1){
				if(message.channel.permissionsFor(message.author).has("MANAGE_ROLES_OR_PERMISSIONS")){
					let s = new Server.Server(message.guild.id);
					let ACL = new Server.ACL(s);

					let user = Mentions.first();

					if(user === undefined || user === null){
						message.channel.send(`:x: Please mention a valid user, ${message.author.username}.`);
						return;
					}

					Args.shift();

					if(Args.length === 1){
						let node = Args.join(" ").toLowerCase();
						if(Server.ACLNodes.indexOf(node) > -1){
							ACL.AddNode(user.id, node).then(() => {
								message.channel.send(`:white_check_mark: Added permission node \`${node}\` to ${user.username}.`);
							}).catch((e) => {
								console.log(e.stack);
								message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
							});
						}else{
							message.channel.send(`:x: Invalid permission node, ${message.author.username}.`);
						}
					}else{
						let NodesToAdd = [];
						Args.map((NodeString) => {
							if(Server.ACLNodes.indexOf(NodeString.toLowerCase()) > -1){
								NodesToAdd.push(NodeString.toLowerCase());
							}
						});

						if(NodesToAdd.length >= 1){
							ACL.AddNodes(user.id, NodesToAdd).then(() => {
								let ToSend = `:white_check_mark: Added node${NodesToAdd.length>1?'s':''}`;
								NodesToAdd.map((Node, Count) => {
									if(Count === NodesToAdd.length){
										if(NodesToAdd.length > 1){
											ToSend += ` and \`${Node}\``;
										}else{
											ToSend += ` \`${Node}\``;
										}
									}else{
										ToSend += ` \`${Node}\`,`;
									}
								});
								ToSend += `to user ${user.username}.`;
								message.channel.send(ToSend);
							}).catch((e) => {
								console.log(e.stack);
								message.channel.send(`:x: Something went wrong, ${message.author.username}.`);
							});
						}else{
							message.channel.send(`:x: No valid permission nodes found, ${message.author.username}.`);
						}
					}

				}else{
					message.channel.send(`:no_entry_sign: I can't let you do that, ${message.author.username}. You don't have the permission to manage roles.`);
				}
			}else{
				message.channel.send(`:x: Please tell me who to add the permissions to, ${message.author.username}.`);
			}
		}else{
			message.channel.send(`:x: Not enough arguments, ${message.author.username}.`);
		}
	},
	Cooldown: 5,
	Description: "Grants a permission to a user",
	Usage: "`@user`, `Permission Node`, `[Permission Node]...`"
};