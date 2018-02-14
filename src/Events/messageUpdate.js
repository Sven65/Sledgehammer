import { Event } from '../Structures';

export default class extends Event {
	constructor(client) {
		super(client, __filename, {
			name: "messageUpdate"
		})
	}

	/**
	 * @param {Eris.Message} message 
	 * @param {Object} oldMessage
	 * @param {Array<Object>} oldMessage.attachments
	 * @param {Array<Object>} oldMessage.embeds
	 * @param {String} oldMessage.content
	 * @param {Number} oldMessage.editedTimestamp
	 * @param {Object} oldMessage.mentionedBy
	 * @param {Boolean} oldMessage.tts
	 * @param {Array<String>} oldMessage.mentions
	 * @param {Array<String>} oldMessage.roleMentions
	 * @param {Array<String>} oldMessage.channelMentions
	 */
	async handle(message, oldMessage) {

	}
}