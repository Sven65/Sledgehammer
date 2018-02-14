const roles = {
	"stream": "252531905566605313",
	"code": "287312688692985856",
	"nsfw": "323899708882026516"
}

module.exports = {
	Execute: (Args, message) => {
		if (message.guild.id == "172382467385196544") {
			if (Object.keys(roles).includes(Args[0])) {
				let role = roles[Args[0]]
				if (!message.member.roles.keyArray().includes(message.guild.roles.get(role))) {
					message.member.addRole(role).then(() => {
						message.channel.send(`Added Role ${Args[0]}`)
					})
				} else {
					message.member.removeRole(role).then(() => {
						message.channel.send(`Removed Role ${Args[0]}`)
					})

				}
			} else {
				message.channel.send([
					`Role List:`,
					Object.keys(roles).join(', ')
				].join('\n'))
			}
		}
	},
	Description: "For Discord Dungeons only!",
	Usage: "<name>",
	Unlisted: true
}