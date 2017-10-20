module.exports = (message, tags) => {
    let result = {}
    Object.keys(tags).forEach(key => {
        let matches = message.match(`|${new RegExp(tags[key])};|`, 'g')
    })
}