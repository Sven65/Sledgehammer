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

	set removeBlacklist(word){
		return Sledgehammer.rdb.r.table("Servers").get(this.id)("Blacklist")(word).run(Sledgehammer.rdb.conn);
	}

	setModlog(channel){
		return Sledgehammer.rdb.r.table("Servers").get(this.id).update({modlog: channel}).run(Sledgehammer.rdb.conn);
	}

	get modlog(){
		return Sledgehammer.rdb.r.table("Servers").get(this.id)("modlog").default(null).run(Sledgehammer.rdb.conn)
	}
}