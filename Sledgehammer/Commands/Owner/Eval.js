module.exports = {
	Metadata: {
		Name: "Eval",
		Description: "Evaluates code"
	},

	Execute: (Args, message) => {
		if(message.author.id === "141610251299454976"){
			try{
				let start = new Date().getTime();
				let msg = "";
				if(Args[0] == "-c"){
					Args = args.splice(0, Args.length);
					let code = Args.splice(0, Args.length).join(" ");
					msg += "```js\n"+code+"```\n";
					msg += "```js\n"+eval(code)+"```";
				}else{
					let code = Args.splice(0, Args.length).join(" ");
					msg += "```js\n"+eval(code)+"```";
				}

				let end = new Date().getTime();
				let time = end - start;

				message.channel.sendMessage("Time taken: "+(time/1000)+" seconds\n"+msg);
			}catch(e){
				message.channel.sendMessage("```js\n"+e+"```");
			}
		}
	},
	Description: "Evaluates a query.",
	Cooldown: 10,
	Usage: "",
	Unlisted: true
};