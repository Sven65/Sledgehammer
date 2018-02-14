class ACL {
	constructor(id) {
		this.id = id;
	}

	getState() {
		return r.table('servers').get(this.id)('acl').default(false).run();\
	}
}