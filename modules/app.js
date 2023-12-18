const http = require('node:http')

const server = http.createServer((req, res) => {
    res.write('Welcome to home page')
    res.end()
})

server.listen(5000)