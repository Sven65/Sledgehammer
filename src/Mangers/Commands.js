const fs = require('fs')
const path = require('path')
const Manager = require(`${__dirname}/../Structures/Manager`)

module.exports = class Commands extends Manager {
    constructor(client) {
        super(client, path.join(__dirname, __filename), {
            name: __filename.replace(/.js/, '')
        })
        this._commands = {
            all: [],
            list: {},
            map: new Map()
        }
    }

    init() {
        let catagories = fs.readdirSync(path.join(this.client.__basedir, 'Commands'), 'utf-8')
        for (const catagory of catagories) {
            this.loadCatagory(catagory)
        }
    }

    loadCatagory(catagory) {
        if (!this._commands.list[catagory]) this._commands.list[catagory] = {}
        let commands = fs.readdirSync(path.join(this.client.__basedir, 'Commands', catagory), 'utf-8')
        for (const command of commands) {
            this.load(catagory, command.replace(/\.js/, ''))
        }
    }

    load(catagory, name) {
        if (this._commands.all.includes(name.toLowerCase())) throw new Error('Command name already exists');
        if (this._commands.list[catagory] && this._commands.list[catagory][name]) throw new Error('Command is already loaded.');
        if (this._commands.map.has(name.toLowerCase())) throw new Error('Command is already mapped to a catagory.')
        let cmd = require(path.join(this.client.__basedir, 'Commands', catagory, `${name}.js`))

        this._commands.all.push(name.toLowerCase())
        this._commands.list[catagory][name.toLowerCase()] = new cmd(this.client)
        this._commands.map.set(name.toLowerCase(), catagory)

        console.log(`[Commands] Loaded ${catagory}/${name}`)
        this.client.ipc.emit('cmdLoad', { catagory, name, shard: this.client.shard.id })
    }

    unload(catagory, name) {
        if (!this._commands.all.includes(name)) throw new Error('Command name does not exist.');
        if (!this._commands.list[catagory]) throw new Error('Catagory does not exist.');
        if (!this._commands.list[catagory][name]) throw new Error('Command is not loaded.');
        if (!this._commands.map.has(name)) throw new Error('Command is not mapped to catagory.');

        this._commands.all.splice(this._commands.all.indexOf(name), 1)
        delete this._commands.list[catagory][name]
        this._commands.map.delete(name)

        this.client.ipc.emit('cmdUnload', { catagory, name, shard: this.client.shard.id })
    }

    reload(name) {
        let catagory = this._commands.map[name]
        this.unload(catagory, name)
        this.load(catagory, name)
    }

    get commands() {
        return this._commands
    }

    resolveCommand(cmd) {
        return this._commands.list[this._commands.map.get(cmd)][cmd]
    }

    resolveCooldown(cmd) {
        return this.resolveCommand(cmd).meta.cooldown
    }
}