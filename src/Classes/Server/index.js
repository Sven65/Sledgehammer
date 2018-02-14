const Core = require('./Core');

/**
 * @class
 * @param {String} id 
 */
function Server(id) {
	return new Core(id);
}

Server.ACL = require('./ACL');
Server.Blacklist = require('./Blacklist');
Server.Core = Core;
Server.Filter = require('./Filter');
Server.Modlog = require('./Modlog');

module.exports = Server;