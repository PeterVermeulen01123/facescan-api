const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controllers/signin.js');
const register = require('./controllers/register.js');
const profile = require('./controllers/profile.js');

const image = require('./controllers/image.js');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : '$4dm!n$',
    database : 'smartbrain'
  }
});

const app = express();
app.use(bodyParser.json());

app.use(cors());

//SIGNIN
app.post('/signin', (req,res)=>{signin.handleSignin(req, res, db, bcrypt)});

//REGISTER
app.post('/register', (req, res)=>{register.handleRegister(req, res, db, bcrypt)});

//PROFILE
app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req, res, db)});

//IMAGE
app.put('/image', (req,res)=>{image.handleImage(req, res, db)});
app.post('/imageurl', (req,res)=>{image.handleApiCall(req, res)});



app.listen(process.env.PORT || 3000, ()=>{
	console.log(`app is running on port ${process.env.PORT}`);
})