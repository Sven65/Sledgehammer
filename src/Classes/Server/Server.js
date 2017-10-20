const Blacklist = require('./Blacklist')
const Filter = require('./Filter')
const ACL = require('./ACL')

module.exports = class {
    constructor(id) {
        this.id = id
    }

    create() {
        let data = { id: this.id, blacklist: [], logs: [], warns: {} }
        return r.table('servers').insert(data).run()
    }

    get() {
        return r.table('servers').get(this.id).default(null).run()
    }

    setPrefix(prefix) {
        return r.table('servers').get(this.id).update({ prefix }).run()
    }

    setRole(role, id) {
        let data {
            roles: {}
        }
        data.roles[role] = id
    }

    get prefix() {
        return r.table('servers').get(this.id)('prefix').default('=>').run()
    }

    get blacklist() {
        return new Blacklist(this.id)
    }

    get modlog() {
        return new Modlog(this.id)
    }

    get prefix() {
        return r.table('servers').get(this.id)('prefix').default(null).run()
    }
}