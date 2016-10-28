module.exports = {
	List: ["ping"],

	ping: {
		Execute: (args, message) => {
			let n = Date.now();
			let id = message.author.id;
			message.reply(`:hourglass:`).then(m => {
				let time = (m.createdAt-n)/1000;
				m.edit(`<@${message.author.id}> :hourglass: ${time} seconds.`);
			});
		},
		Description: "Pings",
		Cooldown: 10,
		Usage: ""
	}
}