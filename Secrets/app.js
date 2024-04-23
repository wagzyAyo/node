//jshint esversion:
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

mongoose.connect("mongodb://localhost:27017/secrets")
.then(console.log('connected to database'))
.catch(err =>{
    console.log("Error connecting to database:"+ err)
});




const userSchema = mongoose.Schema({
    email: String,
    password: String
});



const User = mongoose.model('User', userSchema);

const saltRounds = 10;

app.get('/', (req,res)=>{
    res.render('home')
});

app.get('/register', (req, res)=>{
    res.render('register')
});

app.get('/login', (req, res)=>{
    res.render('login')
});

app.post('/login', async (req,res)=>{
    const email = req.body.username;
    const password = req.body.password;

    await User.findOne({email: email})
    .then(foundUser=>{
        bcrypt.compare(password, foundUser.password, function(err, result) {
            if (result == true){
                res.render('secrets')
            } else{
                console.log("Error finding match: "+ err)
            }
        });
    }).catch(err=>{
        console.log('No User found: '+ err)
        res.redirect('/login')
    })
   
});

app.post('/register', (req,res)=>{
    const email = req.body.username;
    const password = req.body.password
    bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        if (!err){
            const newUser = new User({
                email: email,
                password: hash
            });
            newUser.save()
            res.render('secrets')
        } else{
            res.send({message: "Error creating account"})
        }
        
    });

    
})


app.listen(3000, ()=>{
    console.log('app listening on port 3000')
})