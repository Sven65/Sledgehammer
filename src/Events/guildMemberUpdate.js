import { Event } from '../Structures';

export default class extends Event {
	constructor(client) {
		super(client, __filename, {
			name: "guildMemberUpdate"
		})
	}

	/**
	 * @param {Eris.Guild} guild
	 * @param {Eris.Member} member
	 * @param {Object} oldMember
	 * @param {Array<String>} oldMember.roles
	 * @param {String} oldMember.nick
	 */
	async handle(guild, member, oldMember) {

	}
}