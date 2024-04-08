const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

let tasks = []

const day = new Date();

const options = {
    weekDay: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}

const today = day.toLocaleDateString('en-US', options)
console.log(today)

// if (today === 0 || today === 6){
//     weekDay = 'Weekend'
// }else {
//     weekDay = 'Week day'
// }




app.get('/', (req, res)=> {
    res.render('index', {dayOfTheWeek: today, taskItems: tasks})
})

app.post('/', (req, res)=> {
    //Get The value of task from index.ejs through post request
    //and push to the tasks array
    //then redirect to the home route

    const newTask = req.body.task;
    tasks.push(newTask)

    res.redirect('/');
})

app.listen(3000, ()=> {
    console.log('App listening on port 3000')
})