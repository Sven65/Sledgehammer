const path = require('path')
const Event = require(path.join(__dirname, '../Structures/Event'))

module.exports = class guildDelete extends Event {
    constructor(client) {
        super(client, path.join(__dirname, __filename), {
            name: __filename.replace(/.js/, '')
        })
    }

    handle(guild) {

    }
}