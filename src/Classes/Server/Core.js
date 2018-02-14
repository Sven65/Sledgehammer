const r = require('../../Util/DB');

/**
 * @class
 * @memberof Server
 */
class Core {
    /**
     * @function
     * @param {String}
     */
    constructor(id) {
        this.id = id
    }

    /**
     * @returns {Promise<Server._Object>}
     */
    async get() {
        return await r.table('servers').get(this.id).run();
    }

    /**
     * @param {Object} data 
     * @returns {Promise<Cursor>}
     */
    async set(data) {
        return await r.table('servers').get(this.id).updaet(data).run();
    }
}

module.exports = Core;