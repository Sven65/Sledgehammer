module.exports = class {

    /**
     * @typedef {Object} resolvedObject
     * @property {Array<resolvedWord>} success - Words that return the result `true`
     * @property {Array<resolvedWord>} failure - Words that return the result `false`
     * @description An object of resolved words, provided by the function parameters.
     */

    /**
     * @typedef {Boolean|String} resolvedWord
     * @description A resolved string `true | false`, provided by the function parameters.
     */

    /**
     * @constructor
     * @param {String} id - Discord Guild ID
     */

    constructor(id) {
        this.id = id
    }

    /** Add words to the blacklist
     * @function
     * @param {Array<String>|String} words
     */

    addWords(words = []) {
        if(!words || (words instanceof Array && words.length === 0)) return false;
        if (Array.isArray(words)) {
            let toResolve = {
                success: [],
                failure: []
            }
            r.table('servers').get(this.id).run().then(blacklist => {
                words.forEach(word => {
                    if (blacklist.find(w => w === word)) {
                        r.table('servers').get(this.id).update({ blacklist: r.row('blacklist').append(word) }).run()
                    }
                })
            })
            words.forEach(word => {
                r.table('servers').get(this.id).update({ blacklist: r.row('blacklist').append(word) })
            })
        } else {
            r.table('servers').get(this.id).run().then(blacklist => {
                if (blacklist.find(w => words === w)) {
                    r.table('servers').get(this.id).update({ blacklist: r.row('blacklist').append([word]) }).run()
                    return true
                } else {
                    return false
                }
            })
        }
    }

    /** Remove words from the blacklist
     * @function
     * @param {Array<String>|String} words
     * @returns {resolvedObject|resolvedWord}
     */

    removeWords(words = []) {
        if(!words || (words instanceof Array && words.length === 0)) return false;
        if (Array.isArray(words)) {
            let toResolve = {
                success: [],
                failure: []
            }
            r.table('servers').get(this.id)('blacklist').run().then(blacklist => {
                words.forEach(word => {
                    if (blacklist.find(w => w === word)) {
                        r.table('servers').get(this.id).update({ blacklist: r.row('blacklist').difference([word]) }).run()
                        toResolve.success.push(word)
                    } else {
                        toResolve.failure.push(word)
                    }
                })
            })
            return toResolve
        } else {
            r.table('servers').get(this.id).run().then(blacklist => {
                if (blacklist.find(w => words === w)) {
                    r.table('servers').get(this.id).update({ blacklist: r.row('blacklist').difference([word]) }).run()
                    return true
                } else {
                    return false
                }
            })
        }
    }

    getWords() {
        return r.table('servers').get(this.id)('blacklist').run()
    }
}