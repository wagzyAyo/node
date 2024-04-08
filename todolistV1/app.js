const express = require('express');
const parser = require('body-parser');

const app = express();
app.set('view engine', 'ejs')

const day = new Date();
const today = day.getDay();
let weekDay = '';


// if (today === 0 || today === 6){
//     weekDay = 'Weekend'
// }else {
//     weekDay = 'Week day'
// }

switch (today) {
    case 0:
        weekDay = 'Sunday'
        break;
    case 1:
        weekDay = 'Monday';
        break;
    case 2:
        weekDay = 'Tuesday';
        break;
    case 3:
        weekDay = 'Wednessday';
        break;
    case 4:
        weekDay = 'Thursday';
        break;
    case 5:
        weekDay = 'Friday';
        break;
    case 6:
        weekDay = 'Saturday'

    default:
        console.log('Day Not recognized!.')
        break;
}


app.get('/', (req, res)=> {
    res.render('index', {dayOfTheWeek: weekDay})
})


app.listen(3000, ()=> {
    console.log('App listening on port 3000')
})