//jshint esversion:
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config();
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption')

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

mongoose.connect("mongodb://localhost:27017/secrets")
.then(console.log('connected to database'))
.catch(err =>{
    console.log("Error connecting to database:"+ err)
});

const secret = process.env.SECRETE;



const userSchema = mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(encrypt, {secret: secret, excludeFromEncryption: ['email']})

const User = mongoose.model('User', userSchema);


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
        if (foundUser.password === password){
            res.render('secrets')
        } else{
            res.send({message: "Username and password do no match"})
        }
    }).catch(err=>{
        console.log('No User found: '+ err)
        res.redirect('/login')
    })
   
});

app.post('/register', (req,res)=>{
    const email = req.body.username;
    const password = req.body.password;

    const newUser = new User({
        email: email,
        password: password
    });
    newUser.save()
    res.render('secrets')
})


app.listen(3000, ()=>{
    console.log('app listening on port 3000')
})