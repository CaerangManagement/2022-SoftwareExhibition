const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth')
const session = require('express-session');
const passport = require('passport');
require('dotenv').config()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

// Passport setting
app.use(session({ secret: 'MySecret', resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

// Routes


app.use('/auth', authRouter)
app.use(function(req,res,next){
   res.locals.isAuthenticated = req.isAuthenticated();
   res.locals.currentUser = req.user;
   next();
 });
 app.get('/', (req, res) => {
   res.render('main')
})


app.listen(process.env.PORT, (요청, 응답) => {
   console.log('server listening 8080')
})

mongoose.connect(
   process.env.DB_URL,
   {
      useNewUrlParser: true,
   }
)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
   console.log("Connected successfully");
});



