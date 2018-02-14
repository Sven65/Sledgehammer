import { Event } from '../Structures';

export default class extends Event {
	constructor(client) {
		super(client, __filename, {
			name: "channelUpdate"
		})
	}

	/**
	 * @param {Eris.Channel} oldChannel
	 * @param {Eris.Channel} newChannel
	 */
	async handle(oldChannel, newChannel) {

	}
}