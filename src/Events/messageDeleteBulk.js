import { Event } from '../Structures';

export default class extends Event {
	constructor(client) {
		super(client, __filename, {
			name: "messageDelete"
		})
	}
	
	/**
	 * @param {Array<Eris.Message>|Array<Object>} message 
	 */
	async handle(message) {

	}
}