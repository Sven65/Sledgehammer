module.exports = class Server{
	constructor(id){
		this.id = id;
	}

	create(){
		let data = {id: this.id, Blacklist: []};
		return Sledgehammer.rdb.r.table("Servers").insert(data).run(Sledgehammer.rdb.conn);
	}

	get exists(){
		let id = this.id;
		return Sledgehammer.rdb.r.table("Servers").filter(function(server){
			return server("id").eq(id)
		}).isEmpty().not().run(Sledgehammer.rdb.conn);
	}

	get blacklist(){
		return Sledgehammer.rdb.r.table("Servers").get(this.id)("Blacklist").default(null).run(Sledgehammer.rdb.conn)
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

	get modlog(){
		return Sledgehammer.rdb.r.table("Servers").get(this.id)("modlog").default(null).run(Sledgehammer.rdb.conn)
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
		return r.db('Sledgehammer').table('Servers').get('241593567485755392').replace(r.row.without({linkFilter: channel})).run(Sledgehammer.rdb.conn);
	}

	linkFilter(channel){
		return Sledgehammer.rdb.r.table("Servers").get(this.id)("linkFilter")(channel).default(null).run(Sledgehammer.rdb.conn);
	}

	get all(){
		return Sledgehammer.rdb.r.table("Servers").get(this.id).default(null).run(Sledgehammer.rdb.conn);
	}

}