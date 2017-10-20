const path = require('path')
const Command = require(path.join(__dirname, '../../', 'Structures', 'Command'))

module.exports = class extends Command {
    constructor(client) {
        super(client, `${__dirname}/${__filename}`, {
            description: "",
            cooldown: 0,
            usage: ""
        })
    }

    run(ctx) {

    }
}