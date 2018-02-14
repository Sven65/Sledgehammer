const config = require('config');

const r = require('rethinkdbdash')(config.get('db'));

module.exports = r;