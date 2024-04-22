//jshint esversion:
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

mongoose.connect("mongodb://localhost:27017/secrets")
.then(console.log('connected to database'))
.catch(err =>{
    console.log("Error connecting to database:"+ err)
});

app.get('/', (req,res)=>{
    res.render('home')
})



app.listen(3000, ()=>{
    console.log('app listening on port 3000')
})