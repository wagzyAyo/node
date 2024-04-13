const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

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

mongoose.connect('mongodb://localhost:27017/todos');
const todosSchema = mongoose.Schema({
    name: String
})

const todoList = mongoose.model('todoList', todosSchema)



app.get('/', (req, res)=> {
    const todoData = Promise.all()
    .then(()=> {
        const todoData = todoList.find({})
        return todoList.find({});
    })
    .then(todos=> {
        console.log(todos);
    })
    .catch(err => {
        console.error('Error:', err)
    });

    res.render('index', {dayOfTheWeek: today, taskItems: todoData})
})

app.post('/', (req, res)=> {
    //Get The value of task from index.ejs through post request
    //and push to the tasks array
    //then redirect to the home route

    const newTask = req.body.task;
    if (newTask.length > 0){
        const newTodo = new todoList({name: newTask})
        newTodo.save()
    } else{
        console.log('New Task should contain actual word')
    }
    

    res.redirect('/');
})

app.listen(3000, ()=> {
    console.log('App listening on port 3000')
})