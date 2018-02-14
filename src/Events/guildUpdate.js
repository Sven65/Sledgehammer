import { Event } from '../Structures';

export default class extends Event {
	constructor(client) {
		super(client, __filename, {
			name: "guildUpdate"
		})
	}

	/**
	 * @param {Eris.Guild} guild
	 */
	async handle(guild) {

	}
}