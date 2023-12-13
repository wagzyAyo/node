//CommonJS, Evry file is a module (by default)
// Modules - Encapsulated code (Only share minimum)


const names = require('./obj')
const sayHi = require('./utils')


console.log(names)

sayHi('Susan')
sayHi(names.name1)
sayHi(names.name2)