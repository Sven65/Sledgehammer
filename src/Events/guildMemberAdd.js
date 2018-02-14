import { Event } from '../Structures';

export default class extends Event {
	constructor(client) {
		super(client, __filename, {
			name: "guildMemberAdd"
		})
	}

	/**
	 * @param {Eris.Guild} guild 
	 * @param {Eris.Member} member 
	 */
	async handle(guild, member) {

	}
}