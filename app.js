const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./router/authRoutes')
const cookieParser = require('cookie-parser')
const {requireAuth, checkUser} = require('./middleware/authMiddleware')
const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
// middleware
app.use(express.static('public'));
app.use(cookieParser())
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Admin:Showgoeson001@cluster0.li8dk.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth ,(req, res) => res.render('smoothies'));
app.use(authRoutes)



