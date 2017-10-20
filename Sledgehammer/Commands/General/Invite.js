module.exports = {
	Metadata: {
		Name: "Invite",
		Description: "Sends the invite"
	},

	Execute: (Args, message) => {
		message.channel.send("You can add Sledgehammer here; https://discordapp.com/oauth2/authorize?client_id=241617911976951808&scope=bot&permissions=2080484415");
	},
	Description: "Sends the invite for Sledgehammer",
	Cooldown: 10,
	Usage: ""
};