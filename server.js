const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const flash = require('connect-flash')
const util = require('./util');

app.use(methodOverride('_method'));
require('dotenv').config()

app.use(express.static(__dirname+'/public/'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'MySecret', resave: false, saveUninitialized: true }));
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
   res.locals.isAuthenticated = req.isAuthenticated();
   res.locals.currentUser = req.user;
   res.locals.util = util; // 1
   next();
 });

// 다 완료하고 redirect 주석 풀것
// app.use(function(req, res, next){
//    if(!req.secure){
//       res.redirect("https://"+"caerang.co.kr"+req.url);
//    } else{
//       next()
//    }
// })

// Routes
app.use('/auth', require('./routes/auth'))
app.use('/posts',  require('./routes/posts'));
app.use('/comments', require('./routes/comments')); // 1


 app.get('/', (req, res) => {
   res.render('main')
})

app.listen(process.env.PORT, (요청, 응답) => {
   console.log('server on! http://localhost:'+process.env.PORT);
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



