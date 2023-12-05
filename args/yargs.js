const yargs = require('yargs')

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add new note',
    handler: function() {
        console.log('Adding new note!')
    }
})

console.log(yargs.argv)