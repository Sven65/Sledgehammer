module.exports = {
	channelCreate: require("./channelCreate.js"),
	channelDelete: require("./channelDelete.js"),
	channelUpdate: require("./channelUpdate.js"),

	channelPinsUpdate: require("./channelPinsUpdate.js"),

	guildBanAdd: require("./guildBanAdd.js"),
	guildBanRemove: require("./guildBanRemove.js"),

	guildEmojiCreate: require("./guildEmojiCreate.js"),
	guildEmojiDelete: require("./guildEmojiDelete.js"),
	guildEmojiUpdate: require("./guildEmojiUpdate.js"),

	guildMemberAdd: require("./guildMemberAdd.js"),
	guildMemberRemove: require("./guildMemberRemove.js"),
	guildMemberUpdate: require("./guildMemberUpdate.js"),

	guildUpdate: require("./guildUpdate.js"),
	
	messageDelete: require("./messageDelete.js"),
	messageUpdate: require("./messageUpdate.js"),
	
	roleCreate: require("./roleCreate.js"),
	roleDelete: require("./roleDelete.js"),
	roleUpdate: require("./roleUpdate.js"),
	
	userUpdate: require("./userUpdate.js")
}