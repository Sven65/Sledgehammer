module.exports = {
	Metadata: {
		Name: "Help",
		Description: "Shows help"
	},

	Execute: (Args, message) => {
		let s = new Server.Server(message.guild.id);
		s.prefix.then((prefix) => {
			if (Args.length >= 1) {
				try {
					let Command = Args[0].toLowerCase();
					if (Sledgehammer.Commands.All.indexOf(Command) > -1) {

						let helpMsg = `__**${Command.capFirst()}**__\n\n`;
						helpMsg += Sledgehammer.Commands.List[Sledgehammer.Commands.Map[Command]][Command].Description + "\n\n";

						helpMsg += `**Usage: **\`${prefix}${Command.capFirst()}\` ${Sledgehammer.Commands.List[Sledgehammer.Commands.Map[Command]][Command].Usage}\n\n`;
						helpMsg += `**Cooldown: ** ${Sledgehammer.Commands.List[Sledgehammer.Commands.Map[Command]][Command].Cooldown.formatNumber()} seconds.`;
						if (Sledgehammer.Commands.List[Sledgehammer.Commands.Map[Command]][Command].hasOwnProperty("Extra")) {
							for (let Extra in Sledgehammer.Commands.List[Sledgehammer.Commands.Map[Command]][Command].Extra) {
								helpMsg += "\n";
								helpMsg += `**${Extra.replace("__", " ")}: `;
								if (Array.isArray(Sledgehammer.Commands.List[Sledgehammer.Commands.Map[Command]][Command].Extra[Extra])) {
									helpMsg += `${Sledgehammer.Commands.List[Sledgehammer.Commands.Map[Command]][Command].Extra[Extra].join(', ')}`;
									helpMsg += "**";
								}
							}
						}

						message.channel.send(helpMsg);
					}
				} catch (e) {
					console.dir(e.stack);
				}
			} else {
				let msg = `Okay, ${message.author.username}, check your messages.`;
				let x = {};

				let m = "```ini\n";
				Sledgehammer.Commands.All.map((a) => {
					let Group = Sledgehammer.Commands.Map[a];
					if (!x.hasOwnProperty(Group)) {
						x[Group] = [];
					}

					let Commands = Sledgehammer.Commands.List[Group];

					for (Command in Commands) {
						if (x[Group].indexOf(Command) === -1) {
							x[Group].push(Command);
						}
					}
				});
				Object.keys(x).map((a) => {
					console.log(a);
					let b = x[a].join(", ");
					console.log(b);
					m += `[${a}]\n${b}\n`;
				});

				m += "```";

				message.channel.send(msg).then(() => {
					message.author.send(m).catch((e) => {
						console.dir(e);
					});
				}).catch((e) => {
					console.dir(e);
				})
			}
		});
	},
	Description: "Sends a list of the commands that can be used.",
	Cooldown: 10,
	Usage: "`[command]`"
};