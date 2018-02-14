import { Event } from '../Structures';

export default class extends Event {
	constructor(client) {
		super(client, __filename, {
			name: "messageCreate"
		})
	}

	/**
	 * @param {Eris.Message} message 
	 */
	async handle(message) {

	}
}