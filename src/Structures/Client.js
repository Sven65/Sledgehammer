import config from 'config';
import Discord from 'discord.js';

class Client extends Discord.Client {
	constructor() {
		super({
			disableEveryone: true
		});
		this.ready = false;
		this.config = config;
	}

	async login() {
		return await super.login(this.config.get('token'));
	}

	async _ready() {
		console.log('[CLIENT] Connected.')

		this.CommandManager = new CommandManager(this);
		this.CommandManager.init();

		this.EventManager = new EventManager(this);
		this.EventManager.init();

		console.log([
			`|-------------------------------------------`,
			`| - = Client User = -`,
			`| Username      :: ${this.user.username}`,
			`| Discriminator :: ${this.user.discriminator}`,
			`| ID            :: ${this.user.id}`,
			`| Shard         :: ${this.shard.id}`,
			`|-------------------------------------------`,
			`| - = Current Statistics = -`,
			`| Users         :: ${this.users.size-1}`,
			`| Channels      :: ${this.channels.size}`,
			`| Guilds        :: ${this.guilds.size}`,
			`| Emojis        :: ${this.emojis.size}`,
			`|-------------------------------------------`,
			`| - = Framework Statistics = -`,
			`| Commands :: ${this.CommandManager.store.size}`,
			`| Events   :: ${this.EventManager.store.size}`,
			`|-------------------------------------------`

		])

		this.ready = true;
		this.emit('_ready');
		console.log('[CLIENT] Ready.');
	}
}

module.exports = Client;