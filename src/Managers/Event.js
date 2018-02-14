import fs from "fs";
import path from "path";

import { Event as Base, Manager } from '../Structures';

function constructListener(e) {
	return async function (...args) {
		if (await e.check(...args)) {
			e.handle(...args)
		} else {
			return false
		}
	}
}

class EventManager extends Manager {
	constructor(client) {
		super(client, __filename, {
			base: Base,
			dir: path.resolve('./src/Events')
		})
		this.emitted = new Set();
	}

	async init() {
		let events = fs.readdirSync(this.dir);
		for (const event of events) await this.load(event);
	}

	async load(name) {
		if (this.store.has(name)) return false;
		let filePath = `${this.dir}/${name}`;
		let file = new(require(filePath))(this.client);
		this.store.set(file.name, file);
		let listener = constructListener.call(this, file);
		this.client.on(file.name, listener.bind(this));
		file.listener = listener;
		return true;
	}

	async unload(name) {
		if (!this.store.has(name)) return false;
		return this.store.delete(name)
	}

	async reload(name) {
		return (await this.unload(name) ? await this.load(name) : false)
	}
}

module.exports = EventManager;