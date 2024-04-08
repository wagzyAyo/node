const express = require('express');
const parser = require('body-parser');

const app = express();
app.set('view engine', 'ejs')

const day = new Date()
const today = day.getDay()
let weekDay = ''

if (today === 0 || today === 6){
    weekDay = 'Weekend'
}else {
    weekDay = 'Week day'
}


app.get('/', (req, res)=> {
    res.render('index', {dayOfTheWeek: weekDay})
})


app.listen(3000, ()=> {
    console.log('App listening on port 3000')
})