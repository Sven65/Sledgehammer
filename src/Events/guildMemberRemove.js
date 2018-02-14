import { Event } from '../Structures';

export default class extends Event {
	constructor(client) {
		super(client, __filename, {
			name: "guildMemberRemove"
		})
	}

	/**
	 * @param {Eris.Guild} guild 
	 * @param {Eris.Member|Object} member
	 */
	async handle(guild, member) {

	}
}