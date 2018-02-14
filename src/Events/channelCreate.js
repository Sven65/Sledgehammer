import { Event } from '../Structures';

export default class extends Event {
	constructor(client) {
		super(client, __filename, {
			name: "channelCreate"
		})
	}

	/**
	 * @param {Channel} channel
	 */
	async handle(channel) {

	}
}