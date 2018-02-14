const r = require('../../Util/DB');

/**
 * @class
 * @memberof Server
 */
class Filter {
	/**
	 * @constructor
	 * @param {String} id 
	 */
	constructor(id) {
		this.id = id;
	}

	/**
	 * 
	 * @param {String} channel 
	 * @param {Number} type 
	 */
	add(channel, type) {
		return await r.table('servers').get(this.id).update({linkFilter: {[channel]: type}}).run();
	}

	/**
	 * @param {String} channel 
	 * @returns {Promise<Number>}
	 */
	get(channel) {
		return await r.table('servers').get(this.id)('linkFilter')(channel).default(null).run();
	}

	/**
	 * @param {String} channel 
	 * @returns {Promise<Cursor>}
	 */
	remove(channel) {
		return await r.table('servers').get(this.id).update(r.row('linkFilter').without(channel)).run();
	}
}

module.exports = Filter;