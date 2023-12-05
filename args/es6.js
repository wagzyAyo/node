const event = {
    name: 'Birthday party',
    guessList: ['Andrew', 'Tobi', 'Mikel'],
    printGuessList() {
        console.log('Guess List for ' + this.name)

        this.guessList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name )
        })
    }
}

event.printGuessList()