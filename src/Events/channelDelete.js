import { Event } from '../Structures';

export default class extends Event {
	constructor(client) {
		super(client, __filename, {
			name: "channelDelete"
		})
	}

	/**
	 * @param {Channel} channel
	 */
	async handle(channel) {

	}
}