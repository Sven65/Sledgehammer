import { Event } from '../Structures';

export default class extends Event {
	constructor(client) {
		super(client, __filename, {
			name: "messageDelete"
		})
	}

	/**
	 * @param {Eris.Message|Object} message 
	 */
	async handle(message) {

	}
}