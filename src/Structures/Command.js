class Command {
	constructor(client, path, meta) {
		Object.defineProperty(this, 'client', { value: client });
		this.path = path;
		this.name = meta.name || this.path.split('\\').splice(-1)[0].toLowerCase();
		this.aliases = [...meta.aliases] || [];
		this.group = meta.group || "Other";
		this.description = meta.description || "No Description";
		this.cooldown = meta.cooldown || 5;
	}

	/**
	 * @param {Context} ctx 
	 * @returns {Promise<Boolean>}
	 */
	async check(ctx) {
		return this.client.ready;
	}

	/**
	 * @param {Context} ctx 
	 * @returns {*}
	 */
	async run(ctx) {
		return await ctx.send("*nothing to see here*");
	}
}

module.exports = Command;