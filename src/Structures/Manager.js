import { Collection } from 'discord.js';

/**
 * @ignore
 */
class Manager {
	constructor(client, path, meta) {
		Object.defineProperty(this, 'client', {
			value: client
		});
		this.path = path;
		this.name = meta.name || this.constructor.name;
		this.base = meta.base || null;
		this.dir = meta.dir || `${__dirname}/../${this.base.constructor.name}s`;
		this.store = new Collection();
	}

	async init() {

	}

	/* Placeholders */
	async load() {}
	async unload() {}
	async reload() {}

	/**
	 * 
	 * @param {String} name 
	 * @returns {Command|Event|Locale|Mode|Role|null}
	 */
	resolve(name) {
		return this.store.has(name) ? this.store.get(name) : null;
	}
}