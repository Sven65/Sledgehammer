const Core = require('./Core');

/**
 * @constructor
 * @param {String} id 
 */
function User(id) {
	return new Core(id);
}



module.exports = User;