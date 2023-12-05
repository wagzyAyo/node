const book = {
    title: 'Ego is the money',
    author: 'Ryan Goslin'
}

const bookjson = JSON.stringify(book)

console.log(bookjson)

const parseBook = JSON.parse(bookjson)
console.log(parseBook)

console.log(book.title)