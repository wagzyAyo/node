const os = require('os')

//info about current user

const user = os.userInfo()
console.log(user)

//method returns system uptime in seconds
console.log(`The System Uptime is ${os.uptime} seconds`)

const currentOS = {
    name:os.type(),
    release:os.release(),
    totalMem:os.totalmem(),
    FreeMem: os.freemem()
}

console.log(currentOS)