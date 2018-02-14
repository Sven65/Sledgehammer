const r = require('../../Util/DB');

/**
 * @class
 * @memberof Server
 */
class Modlog {
	/**
	 * @constructor
	 * @param {String} id 
	 */
	constructor(id) {
		this.id = id;
	}

	/**
	 * @param {String} type
	 * @returns {Promise<Server.LogType>}
	 */
	async getLogType(type) {
		return await r.table('servers').get(this.id)('channels')(type).default(null).run();
	}

	/**
	 * @param {String} type
	 * @returns {Promise<Server.MessageType>}
	 */
	async getMessageType(type) {
		return await r.table('servers').get(this.id)('messages')(type).default(null).run();
	}

	/**
	 * @param {String} type
	 * @returns {Promise<Server.RoleType>}
	 */
	async getRoleType(type) {
		return await r.table('servers').get(this.id)('roles')(type).default(null).run();
	}

	/**
	 * 
	 * @param {String} type
	 * @param {Server.LogType} data
	 * @returns {Promise<Cursor>}
	 */
	async setLogType(type, data) {
		return await r.table('servers').get(this.id).update({ logs: { [type]: data } }).run();
	}

	/**
	 * 
	 * @param {String} type
	 * @param {Server.MessageType} data
	 * @returns {Promise<Cursor>}
	 */
	async setMessageType(type, data) {
		return await r.table('servers').get(this.id).update({ messages: { [type]: data } }).run();
	}

	/**
	 * 
	 * @param {String} type
	 * @param {Server.RoleType} data
	 * @returns {Promise<Cursor>}
	 */
	async setRoleType(type, data) {
		return await r.table('servers').get(this.id).update({ roles: { [type]: data } }).run();
	}
}

module.exports = Modlog;