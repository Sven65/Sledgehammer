import fs from "fs";
import path from "path";

import {
	Manager,
	Command as base
} from "../Structures/index";

class CommandManager extends Manager {
	constructor(client) {
		super(client, __filename, {
			base: Base,
			dir: path.resolve("./src/Commands")
		})
	}

	async handle(ctx) {
		
	}

	async init() {
		let groups = fs.readdirSync(this.dir);
		for (const group of groups) await this.loadGroup(group);
	}

	async loadGroup(group) {
		let cmds = fs.readdirSync(`${this.dir}/${group}`);
		for (const cmd of cmds) await this.load(group, cmd);
	}

	async load(group, name) {
		if(this.store.has(name)) return false;
		let filePath = `${this.dir}/${group}/${name}`;
		let file = new(require(filePath))(this.client);
		this.store.set(file.name, file);
		return true;
	}

	async unload(name) {
		if(!this.store.has(name)) return false;
		return this.store.delete(name);
	}

	async reload(name) {
		if(!this.store.has(name)) return false;
		return (await this.unload(name) && await this.load(name))
	}
}

export default CommandManager;