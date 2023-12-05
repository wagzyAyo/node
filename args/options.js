const yargs = require('yargs')

yargs.version('1.1.0')

yargs.command ({
    command: 'add',
    describe: 'Add new note',
    builder : {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('Title: ' + argv.title)
        console.log('Body: ' + argv.body)
    }
})
yargs.parse()