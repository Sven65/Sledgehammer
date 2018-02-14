import { Event } from '../Structures';

export default class extends Event {
	constructor(client) {
		super(client, __filename, {
			name: "guildCreate"
		})
	}

	/**
	 * @param {Eris.Guild} guild 
	 */
	async handle(guild) {

	}
}