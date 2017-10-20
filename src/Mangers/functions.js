module.exports = class {
    constructor(client) {
        this.client = client
        this.path = path.join(this.client.__basedir, 'Functions')
        this._funcs = new Map()
    }

    init() {

    }

    load(name) {

    }

    unload(name) {

    }

    reload(name) {

    }

    get funcs() {
        return this._funcs
    }
}