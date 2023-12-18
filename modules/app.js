const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req)
    if (req.url === '/'){
        res.end('Welcome to our home page')
    }
    if (req.url === '/about'){
        res.end('Here is our brief history')
    }
    res.write('<h1>OOPS!!> </h1>')
    res.write('<p> Page you are looking for doesnt exist </p>')
    res.write(' <a href="./">Go back to home page</a>')
    res.end()
})

server.listen(5000)