class Core {
	constructor(id) {
		this.id = id;
	}

	/**
	 * @param {String}
	 * @returns {Promise<Boolean>}
	 */
	async getFirstTime(command) {
		return await r.table('firstTime').get(this.id)(command).default(false).run();
	}

	/**
	 * 
	 * @param {String} command 
	 * @returns {Promise<Date>}
	 */
	async getLastExec(command) {
		return await r.table('cooldowns').get(this.id)(command).default(r.now()).run();
	}

	/**
	 * @returns {Promise<Date>}
	 */
	async getLastSeen() {
		return await r.table('users').get(this.id)('lastSeen').default(r.now()).run();
	}

	// ###############################################################################
	// ###############################################################################

	/**
	 * 
	 * @param {String} command 
	 * @param {Boolean} bool 
	 */
	async setFirstTime(command, bool) {
		return await r.table('firstTime').get(this.id).update({ [command]: bool }).run();
	}

	/**
	 * 
	 * @param {String} command 
	 * @param {Date|Number} time 
	 */
	async setLastExec(command, time) {
		return await r.table('cooldwons').get(this.id).update({ [command]: new Date(time) }).run();
	}

	/**
	 * 
	 * @param {Date|Number} time
	 * @returns {Promise<Cursor>}
	 */
	async setLastSeen(time) {
		return await r.table('users').get(this.id).update({ lastSeen: new Date(time) }).run();
	}
}

module.exports = Core;