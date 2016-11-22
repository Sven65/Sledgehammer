module.exports = {
	Metadata: {
		Name: "Ping",
		Description: "Pong!"
	},

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
};