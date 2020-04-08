const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const axios = require('axios');
const cors = require('cors');
const app = express();
var fs = require('fs');



// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/public', express.static('public'))


// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(cors()) // allow Cross-domain requests 


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


var parseString = require('xml2js').parseString;


var parsedxml = ""

fs.readFile( './public/feed.xml', function(err, data) {
  var xml = data

  parseString(xml, function (err, result) {
    // console.log(JSON.stringify(result))
    parsedxml = JSON.stringify(result)
  });
  
  app.set('parsedxml', parsedxml);

});




// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server started on port ${PORT}`);


})
