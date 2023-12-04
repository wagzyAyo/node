const readline = require('readline');
const r1 = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
)

r1.question('please enter your name: ', (name) => {
    console.log('Welcome to node '+ name )
    r1.close()
})

r1.on('close', () => {
    console.log('Interface closed')
    process.exit(0)
})