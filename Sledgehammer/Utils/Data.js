module.exports = class Server{
	constructor(id){
		this.id = id;
	}

	create(){
		let data = {id: this.id, Blacklist: []};
		return Sledgehammer.rdb.r.table("Servers").insert(data).run(Sledgehammer.rdb.conn);
	}

	blacklistAdd(word){
		return Sledgehammer.rdb.r.table("Servers").get(this.id).update({
			Blacklist: Sledgehammer.rdb.r.row("Blacklist").append(word)
		}).run(Sledgehammer.rdb.conn);
	}

	removeBlacklist(word){
		return Sledgehammer.rdb.r.table("Servers").get(this.id).update({
			Blacklist: Sledgehammer.rdb.r.row("Blacklist").difference([word])
		}).run(Sledgehammer.rdb.conn);
	}

	setModlog(channel){
		return Sledgehammer.rdb.r.table("Servers").get(this.id).update({modlog: channel}).run(Sledgehammer.rdb.conn);
	}

	sendModlog(message, text){
		this.modlog.then((l) => {
			if(l !== null){
				message.guild.channels.find("id", l).sendMessage(text);
			}else{
				message.channel.sendMessage(text);
			}
		});
	}

	linkFilterAdd(channel, type){
		let data = {};
		data[channel] = {type: type};
		return Sledgehammer.rdb.r.table("Servers").get(this.id).update({linkFilter: data}).run(Sledgehammer.rdb.conn);
	}

	removeLinkFilter(channel){
		return Sledgehammer.rdb.r.db('Sledgehammer').table('Servers').get('241593567485755392').replace(Sledgehammer.rdb.r.row.without({linkFilter: channel})).run(Sledgehammer.rdb.conn);
	}

	linkFilter(channel){
		return Sledgehammer.rdb.r.table("Servers").get(this.id)("linkFilter")(channel).default(null).run(Sledgehammer.rdb.conn);
	}

	setPrefix(prefix){
		return Sledgehammer.rdb.r.table("Servers").get(this.id).update({prefix: prefix}).run(Sledgehammer.rdb.conn);
	}

	setJoin(channel, message){
		return Sledgehammer.rdb.r.table("Servers").get(this.id).update({
			channels: {
				joinLog: {
					id: channel,
					message: message
				}
			}
		}).run(Sledgehammer.rdb.conn);
	}

	setKick(channel, message){
		return Sledgehammer.rdb.r.table("Servers").get(this.id).update({
			channels: {
				kickLog: {
					id: channel,
					message: message
				}
			}
		}).run(Sledgehammer.rdb.conn);
	}

	setUnban(channel, message){
		return Sledgehammer.rdb.r.table("Servers").get(this.id).update({
			channels: {
				unbanLog: {
					id: channel,
					message: message
				}
			}
		}).run(Sledgehammer.rdb.conn);
	}

	setBan(channel, message){
		return Sledgehammer.rdb.r.table("Servers").get(this.id).update({
			channels: {
				banLog: {
					id: channel,
					message: message
				}
			}
		}).run(Sledgehammer.rdb.conn);
	}

	setMessage(type, value){
		return Sledgehammer.rdb.r.table("Servers").get(this.id).update({messages: {type: value}}).run(Sledgehammer.rdb.conn);
	}

	setLeave(channel, message){
		return Sledgehammer.rdb.r.table("Servers").get(this.id).update({
			channels: {
				leaveLog: {
					id: channel,
					message: message
				}
			}
		}).run(Sledgehammer.rdb.conn);
	}

	setRole(role, id){
		let data = {
			roles: {}
		};
		data.roles[role] = id;
		return Sledgehammer.rdb.r.table("Servers").get(this.id).update(data).run(Sledgehammer.rdb.conn);
	}

	// Getters

	get exists(){
		let id = this.id;
		return Sledgehammer.rdb.r.table("Servers").filter(function(server){
			return server("id").eq(id)
		}).isEmpty().not().run(Sledgehammer.rdb.conn);
	}

	get blacklist(){
		return Sledgehammer.rdb.r.table("Servers").get(this.id)("Blacklist").default(null).run(Sledgehammer.rdb.conn)
	}

	get modlog(){
		return Sledgehammer.rdb.r.table("Servers").get(this.id)("modlog").default(null).run(Sledgehammer.rdb.conn)
	}

	get all(){
		return Sledgehammer.rdb.r.table("Servers").get(this.id).default(null).run(Sledgehammer.rdb.conn);
	}

	get prefix(){
		return Sledgehammer.rdb.r.table("Servers").get(this.id)("prefix").default("=>").run(Sledgehammer.rdb.conn);
	}

	get joinLog(){
		return Sledgehammer.rdb.r.table("Servers").get(this.id)("joinLog").default(null).run(Sledgehammer.rdb.conn);
	}

	get leaveLog(){
		return Sledgehammer.rdb.r.table("Servers").get(this.id)("leaveLog").default(null).run(Sledgehammer.rdb.conn);
	}

	get messages(){
		return Sledgehammer.rdb.r.table("Servers").get(this.id)("messages").default(null).run(Sledgehammer.rdb.conn);
	}

	get unbanMessage(){
		return Sledgehammer.rdb.r.table("Servers").get(this.id)("modMessages")("unban").default(null).run(Sledgehammer.rdb.conn);
	}

	get channels(){
		return Sledgehammer.rdb.r.table("Servers").get(this.id)("channels").default(null).run(Sledgehammer.rdb.conn);
	}

	get muteRole(){
		return Sledgehammer.rdb.r.table("Servers").get(this.id)("roles")("mute").default(null).run(Sledgehammer.rdb.conn);
	}
}