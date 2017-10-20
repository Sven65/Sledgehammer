const { Client } = require('discord.js')
const Config = require('../config.json')

module.exports = class SledgeClient extends Client {
    constructor() {
        super({
            //shardId: 0
            //shardCount: Config.shards
            disableEveryone: true,
            messageSweepInterval: 60,
            ws: {
                large_threshold: 500
            }
        })
        this.Config = Config
    }

    login() {
        super.login(this.Config.token)
    }

    loaded(bool = null) {
        if (typeof bool === 'boolean') {
            this._loaded = bool
            return
        }

        return this._loaded
    }

    locked(bool = null) {
        if (typeof bool === 'boolean') {
            this._locked = bool
            return
        }

        return this._locked
    }
}