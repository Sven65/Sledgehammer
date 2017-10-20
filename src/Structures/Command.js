module.exports = class {
    constructor(client, path, meta) {
        this._client = client
        this._path = path
        this._meta = meta
    }

    async run(ctx) {
        
    }

    get meta() {
        return this._meta
    }

    get path() {
        return this._path
    }
}