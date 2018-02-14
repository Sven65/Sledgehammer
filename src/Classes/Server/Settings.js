const r = require('../../Util/DB');

/**
 * @class
 * @memberof Server
 */
class Settings {
	/**
	 * @constructor
	 * @param {String} id
	 */
	constructor(id) {
		this.id = id;
	}

	/**
	 * @returns {Promise<Boolean>}
	 */
	async getACL() {
		return await r.table('servers').get(this.id)('settings')('acl').default(false).run();
	}

	/**
	 * @returns {Promise<String>}
	 */
	async getPrefix() {
		return await r.table('servers').get(this.id)('settings')('prefix').default(null).run();
	}

	/**
	 * @param {Boolean} acl
	 * @returns {Promise<Cursor>}
	 */
	async setACL(acl) {
		return await r.table('servers').get(this.id).update({ settings: { acl } }).run();
	}

	/**
	 * 
	 * @param {String} prefix 
	 * @returns {Promise<Cursor>}
	 */
	async setPrefix(prefix) {
		return await r.table('servers').get(this.id).update({ settings: { prefix } }).run();
	}
}

module.exports = Settings;