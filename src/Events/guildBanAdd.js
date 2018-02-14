import { Event } from '../Structures';

export default class extends Event {
	constructor(client) {
		super(client, __filename, {
			name: "guildBanAdd"
		})
	}

	/**
	 * @param {Eris.Guild} guild 
	 * @param {Eris.User} user 
	 */
	async handle(guild, user) {

	}
}