const path = require('path')
const Event = require(path.join(__dirname, '../Structures/Event'))

module.exports = class channelUpdate extends Event {
    constructor(client) {
        super(client, path.join(__dirname, __filename), {
            name: __filename.replace(/.js/, '')
        })
    }
    handle(oldChannel, newChannel) {

    }
}