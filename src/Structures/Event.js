class Event {
	/**
	 * 
	 * @param {Client} client 
	 * @param {String} path 
	 * @param {Object.<string, String>?} [meta={}]
	 * @param {?String} [meta.name]
	 */
	constructor(client, path, meta={}) {
		Object.defineProperty(this, 'client', {
			value: client
		});

		this.path = path;
		
		this.name = meta.name || this.path.split('\\').slice(-1)[0].replace(/\.js/, '');
	}

	async check(...args) {
		return this.client.ready;
	}

	async handle(...args) {

	}
}

export default Event;