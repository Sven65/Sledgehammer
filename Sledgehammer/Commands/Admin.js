/*
	Admin.js
	Commands for admin commands such as ban and kick
*/


module.exports = {
	List: ['kick'],

	kick: {
		Execute: (Args, message) => {
			
		},
		Cooldown: 10,
		Description: "Kicks a member.",
		Usage: "@user"
	}
}