const fs = require('fs')
const path = require('path')

module.exports = class {
    constructor(client) {
        this.client = client
        this._path = path.join(this.client.__basedir, 'Events')
        this._events = new Map()
    }

    init() {
        let eventFiles = fs.readdirSync(this._path)
        for(const file in eventFiles) {
            this.loadEvent(file.replace(/.js/, ''))
        }
    }

    loadEvent(name) {
        if(this._events.has(name)) return false;
        let eventFile = require(path.join(this._path, `${name}.js`))
        this.client.addListener(name, eventFile)
        this._events.set(name, eventFile)
        return true
    }

    unloadEvent(name) {
        if(!this._events.has(name)) return false;
        this.client.removeListener(name, this._events.get(name))
        delete require.cache[ require.resolve(path.join(this._path, `${name}.js`)) ]
        return true
    }

    reloadEvent(name) {
        if(!this._events.has(name)) return false;
        this.unloadEvent(name)
        this.loadEvent(name)
        return true;
    }

    get events() {
        return this._events
    }
}