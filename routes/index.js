const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const User = require('../models/User');
const Course = require('../models/Course');

var ObjectId = require('mongodb').ObjectID;

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

var wishlist = []
wishlist.push(["Intro%20to%20ML", "Tensor%20flow", "Open%20CV"])
wishlist.push(["learn%20excel%20expert", "Intro%20to%20ML", "data%20structures%20and%20algo"])
wishlist.push(["learn%20oil%20painting"])



// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Home
router.get('/home', ensureAuthenticated, (req, res) => {

  res.render('home', {  
    user: req.user
  })

});

router.get('/rss', ensureAuthenticated, (req, res) => {

  res.render('rss', {
    user: req.user,
    xmldata: req.app.get('parsedxml')
  })

});


router.get('/home/getcourses', (req, res) => {
  
  //db operation to get all courses
  Course.find((err, courses) => {
    res.send({"courses": courses})
  });

})


//try below two methods with name email field for user and name field for course

router.post('/home/addtowishlist', jsonParser, (req, res) => {
  
  email = req.user.email
  coursename = req.body.coursename

  
  console.log('coursename:', coursename)
  console.log('email:', email)

  //wishlist is a varibale. we arent accesing database
  wishlist[0].push(coursename)
  console.log(wishlist)


  //lets try to store in database
  // User.update(
  //   { "email": email },
  //   { $push: { "wishlist" : courseid}}
  // )


})


router.get('/home/getwishlist', jsonParser, (req, res) => {

  console.log("info of wishlist courses")

  wishlistcourses = []
  for (var i = 0; i < wishlist[0].length; i++) {
    // console.log(wishlist[0][1])
    Course.find({"name": decodeURIComponent(wishlist[0][i])}, function(err, result) {
      wishlistcourses.push(result)
      // console.log(result)
      console.log("course found")
    });

    console.log("iteration no", i)
    
  }

  console.log("DONE")

  //fix this. thisshodl go only after everything is done
  res.send({"courses": wishlistcourses})
  console.log("response sent")
  

})

module.exports = router;
