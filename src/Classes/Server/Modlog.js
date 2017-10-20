module.exports = class {
    constructor(id) {
        this.id = id
    }

    setJoin(channel, message) {
        return r.table('servers').get(this.id).update({
            channels: {

            }
        })
    }

    setKick(channel, message) {
        return r.table('servers').get(this.id).update({
            channels: {
                kickLog: {
                    id: channel,
                    message: message
                }
            }
        }).run()
    }

    setUnban(channel, message) {
        return r.table('servers').get(this.id).update({
            channels: {
                unbanLog
            }
        })
    }

    setBan(channel, message) {
        return r.table('servers').get(this.id)
    }

    setMute(channel, message) {
        return r.table('servers').get(this.id)
    }

    setBlacklistDelete(channel, message) {
        return r.table('servers').get(this.id)
    }

    setUnMute(channel, message) {
        return r.table('servers').get(this.id)
    }

    setMessage(type, value) {
        return r.table('servers').get(this.id)
    }

    setLeave(channel, message) {
        return r.table('servers').get(this.id)
    }

    setRole(role, id) {
        return r.table('servers').get(this.id)
    }

    setLinkRemove(channel, message) {
        return r.table('servers').get(this.id)
    }

    setEmojiCreate(channel, message) {
        return r.table('servers').get(this.id)
    }

    setEmojiDelete(channel, message) {
        return r.table('servers').get(this.id)
    }

    setEmojiUpdate(channel, message) {
        return r.table('servers').get(this.id)
    }

    setUserJoin(message) {
        return r.table('servers').get(this.id)
    }

    get userJoin() {
        return r.table('servers').get(this.id)
    }

    get modlog() {
        return r.table('servers').get(this.id)
    }

    get joinLog() {
        return r.table('servers').get(this.id)
    }

    get leaveLog() {
        return r.table('servers').get(this.id)
    }

    get muteRole() {
        return r.table('servers').get(this.id)
    }
}