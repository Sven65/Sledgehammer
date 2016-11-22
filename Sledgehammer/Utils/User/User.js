module.exports = class User{
	constructor(id){
		this.id = id;
	}

	getLastExec(command){
		let now = new Date().valueOf();
		return Sledgehammer.rdb.r.table("Cooldowns").get(this.id)(command).default(now).run(Sledgehammer.rdb.conn);
	}

	setLastExec(command, exec){
		let data = {id: this.id};
		data[command] = exec;
		return Sledgehammer.rdb.r.table("Cooldowns").insert(data, {conflict: "update"}).run(Sledgehammer.rdb.conn);
	}

	isFirstTime(command){
		return Sledgehammer.rdb.r.table('FirstTime').get(this.id)(command).default(false).run(Sledgehammer.rdb.conn);
	}

	setFirstTime(command, time){
		let data = {id: this.id};
		data[command] = time;
		return Sledgehammer.rdb.r.table('FirstTime').insert(data, {conflict: "update"}).run(Sledgehammer.rdb.conn);
	}
}