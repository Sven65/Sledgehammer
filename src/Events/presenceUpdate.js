import { Event } from '../Structures';

export default class extends Event {
	constructor(client) {
		super(client, __filename, {
			name: "presenceUpdate"
		})
	}

	/**
	 * 
	 * @param {Eris.Member} other 
	 * @param {Object} oldPresence 
	 * @param {String} oldPresence.status
	 * @param {Object} oldPresence.game
	 * @param {String} oldPresence.game.name
	 * @param {Number} oldPresence.game.type
	 * @param {String} oldPresence.game.url
	 */
	async handle(other, oldPresence) {

	}
}