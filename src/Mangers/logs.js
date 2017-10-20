module.exports = class {
    constructor(client) {
        this.client = client
        this.path = path.join(this.client.__basedir, 'Logs')
    }
}