//jshint esversion:
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose')


const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));
app.use(session({
    secret: process.env.SECRETE,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session())

mongoose.connect("mongodb://localhost:27017/secrets")
.then(console.log('connected to database'))
.catch(err =>{
    console.log("Error connecting to database:"+ err)
});




const userSchema = mongoose.Schema({
    email: String,
    password: String
});
userSchema.plugin(passportLocalMongoose)


const User = mongoose.model('User', userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

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

app.get('/secrets', (req,res)=>{
    if (req.isAuthenticated()){
        res.render('secrets');
    }else{
        res.redirect('login')
    }
})

app.post('/login', async (req,res)=>{
  

});

app.post('/register', (req,res)=>{
    User.register({username: req.body.username}, req.body.password, (err, user)=>{
        if(!err){
            passport.authenticate('local')(req, res, ()=>{
                res.redirect('/secrets')
            })
        } else{
            console.log("Error Authenticating user "+ err)
        }
    })
   
});


app.listen(3000, ()=>{
    console.log('app listening on port 3000')
})