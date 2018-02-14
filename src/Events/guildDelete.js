import { Event } from '../Structures';

export default class extends Event {
	constructor(client) {
		super(client, __filename, {
			name: "guildDelete"
		})
	}

	/**
	 * @param {Eris.Guild} guild 
	 */
	async handle(guild) {

	}
}