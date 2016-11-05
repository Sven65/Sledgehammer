/*
	General.js
	General Commands for Sledgehammer
*/

module.exports = {
	Metadata: {
		List: ["ping", "help", "invite"],
		Name: "General Commands",
		Description: "General commands"
	},

	ping: {
		Execute: (Args, message) => {
			let n = Date.now();
			let id = message.author.id;
			message.reply(`:hourglass:`).then((m) => {
				let time = (m.createdTimestamp-n)/1000;
				m.edit(`<@${message.author.id}> :hourglass: ${time} seconds.`);
			});
		},
		Description: "Sends you information about the response time.",
		Cooldown: 5,
		Usage: ""
	},

	help: {
		Execute: (Args, message) => {
			let prefix = "=>";
			if(Args.length >= 1){
				let Command = Args[0].toLowerCase();
				if(Command in Commands.list){
					let helpMsg = `__**${Command.capFirst()}**__\n\n`;
					helpMsg += Commands.all[Commands.list[Command]][Command].Description+"\n\n";

					helpMsg += `**Usage: **\`${prefix}${Command.capFirst()}\` ${Commands.all[Commands.list[Command]][Command].Usage}\n\n`;
					helpMsg += `**Cooldown: ** ${Commands.all[Commands.list[Command]][Command].Cooldown.formatNumber()} seconds.`;
					if(Commands.all[Commands.list[Command]][Command].hasOwnProperty("Extra")){
						for(let Extra in Commands.all[Commands.list[Command]][Command].Extra){
							helpMsg += "\n";
							helpMsg += `**${Extra.replace("__", " ")}: `;
							if(Array.isArray(Commands.all[Commands.list[Command]][Command].Extra[Extra])){
								helpMsg += `${Commands.all[Commands.list[Command]][Command].Extra[Extra].join(', ')}`;
								helpMsg += "**";
							}
						}
					}

					message.channel.sendMessage(helpMsg);
				}
			}else{	
				let msg = `Okay, ${message.author.username}, check your messages.`;
				let x = {};

				let m = "```ini\n";
				Object.keys(Commands.all).map((a) => {
					if(x[a] === undefined){
						x[a] = [];
					}
					Commands.all[a].Metadata.List.map((b) => {
						if(Commands.all[a][b] !== undefined){
							if(!Commands.all[a][b].hasOwnProperty("Unlisted")){
								x[a].push(`${b}`);
							}
						}
					})
				});

				Object.keys(x).map((a) => {
					let b = `${Commands.all[a].Metadata.Name}`
					m += `[${b}]\n${x[a].join(", ")}\n`;
				});

				m += "```";
				
				message.channel.sendMessage(msg).then(() => {
					message.author.sendMessage(m).catch((e) => {
						console.dir(e);
					});
				}).catch((e) => {
					console.dir(e);
				})
			}
		},
		Description: "Sends a list of the commands that can be used.",
		Cooldown: 10,
		Usage: "`[command]`"
	},

	invite: {
		Execute: (Args, message) => {
			message.channel.sendMessage("You can add Sledgehammer here; https://discordapp.com/oauth2/authorize?client_id=241617911976951808&scope=bot&permissions=2080484415");
		},
		Description: "Sends the invite for Sledgehammer",
		Cooldown: 10,
		Usage: ""
	}
}