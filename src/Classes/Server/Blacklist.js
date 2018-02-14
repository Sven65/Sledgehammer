const r = require('../../Util/DB');

/**
 * @class
 * @memberof Server
 */
class Blacklist {
    /**
     * @constructor
     * @param {String} id 
     */
    constructor(id) {
        this.id = id
    }

    /**
     * 
     * @param {String|RegExp} phrase
     */
    async add(phrase){
        return r.table('servers').update(s => {
            return s('blacklist').default([]).append(phrase);
        });
    }

    /**
     * @returns {Promise<Server.BlacklistObject[]>}
     */
    async get() {
        return r.table('servers').get(this.id)('blacklist').run();
    }

    /**
     * 
     * @param {Number} phrase
     */
    async remove(phrase){
        return r.table('servers').update(s => {
            return s('blacklist').default([]).deleteAt(phrase);
        });
    }
}

module.exports = Blacklist;