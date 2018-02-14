const { exec } = require('child_process')

module.exports = {
    Metadata: {
        Name: "Eval",
        Description: "Evaluates code"
    },

    Execute: (Args, message) => {
        if (message.author.id === "141610251299454976" || message.author.id === '133659993768591360') {
            try {
                let start = new Date().getTime()
                let code = Args.splice(0, Args.length).join(" ")
                exec(code, function (err, stdout, stderr) {
                    if (err) message.channel.send("```sh\n" + err + "```");
                    if (stderr) message.channel.send("```sh\n" + stderr + "```");
                    let end = new Date().getTime()
                    let time = end - start
                    message.channel.send("Time taken: " + (time / 1000) + "```" + " seconds\n```sh\n" + stdout + "```")
                })

            } catch (e) {
                message.channel.send("```sh\n" + e + "```");
            }
        }
    },
    Description: "Evaluates a query.",
    Cooldown: 10,
    Usage: "",
    Unlisted: true
};