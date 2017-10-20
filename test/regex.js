let str = '[{user|tag} ({user|id})]'
let users = [
    {
        id: "141610251299454976",
        tag: "Mackan#7196"
    },
    {
        id: "133659993768591360",
        tag: "PlayTheFallen#8318"
    },
    {
        id: "156230015481151488",
        tag: "Naisd#5389"
    }
]
let match = str.match(/\[.*?]/g)[0].split('')
match.pop()
match.shift()
match
let result = []
users.forEach(user => result.push(match.join('').replace(/{user\|tag}/g, user.tag).replace(/{user\|id}/g, user.id)))
console.log(result.join('\n'))