import { Event } from '../Structures';

export default class extends Event {
	constructor(client) {
		super(client, __filename, {
			name: "guildMemberChunk"
		})
	}

	/**
	 * @param {Eris.Guild} guild 
	 * @param {Array<Eris.Member>} members 
	 */
	async handle(guild, members) {

	}
}