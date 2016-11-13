class ACL{
	constructor(Server){
		this.Server = Server;
	}

	get ACLState(){
		return Sledgehammer.rdb.r.table("Servers").get(this.Server.id)("ACL").default(false).run(Sledgehammer.rdb.conn);
	}

	ACLNodes(id){
		return Sledgehammer.rdb.r.table("Servers").get(this.Server.id)("ACLNodes")(id).default(null).run(Sledgehammer.rdb.conn);
	}

	AddNode(id, Node){
		let Data = {id: this.Server.id};
		Data = {ACLNodes: {}};
		Data.ACLNodes[id] = [Node];
		return Sledgehammer.rdb.r.table("Servers").insert(Data, {conflict: "update"}).run(Sledgehammer.rdb.conn);
	}

	AddNodes(id, Nodes){
		let Data = {id: this.Server.id};
		Data = {ACLNodes: {}};
		Data.ACLNodes[id] = Nodes;
		return Sledgehammer.rdb.r.table("Servers").insert(Data, {conflict: "update"}).run(Sledgehammer.rdb.conn);
	}

	setACL(State){
		return Sledgehammer.rdb.r.table("Servers").get(this.Server.id).update({ACL: State}).run(Sledgehammer.rdb.conn);
	}

	checkACL(Nodes, NodeToCheck, Type=null){
		if(Type === null){
			return Nodes.indexOf(NodeToCheck)>-1;
		}else if(Type === "any"){
			if(typeof NodeToCheck === typeof []){
				return NodeToCheck.some(function (v) {
					return Nodes.indexOf(v) >= 0;
				});
			}else{
				return false;
			}
		}
		//return Nodes.indexOf(NodeToCheck)>-1;
	}

}

module.exports = ACL;