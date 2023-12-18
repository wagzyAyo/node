const { readFileSync, writeFileSync, readFile} = require('fs')
const { encode } = require('querystring')

const first = readFileSync('../content/first.txt', 'utf-8')
const second = readFileSync('../content/second.txt', 'utf-8')

// console.log(first, second)

writeFileSync('../content/result-sync.txt', 
`Here is the result: ${first}, ${second}`)