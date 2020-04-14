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
wishlist.push(["learn%20oil%20painting", "ui/ux%20complete%20guide"])
wishlist.push(["illustrator%20and%20photoshop", "ui/ux%20complete%20guide"])
wishlist.push(["game%20design", "2d%20game%20dev%20for%20android", "state%20space%20search"])
wishlist.push(["2d%20game%20dev%20for%20android", "Intro%20to%20ML", "learn%20oil%20painting"])
wishlist.push(["networking%20and%20systems%20intermediate", "Neural%20Nets%20Basics"])



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
  var tasksToGo = wishlist[0].length

  var onComplete = function() {
    res.send({"courses": wishlistcourses})
    console.log("response sent")
    console.log("DONE")
  };

  if (tasksToGo === 0) {
    onComplete();
  } 
  else {
    for (var i = 0; i < wishlist[0].length; i++) {
      // console.log(wishlist[0][1])
      Course.find({"name": decodeURIComponent(wishlist[0][i])}, function(err, result) {
        wishlistcourses.push(result[0])
        // console.log(result)
        console.log("course found", result[0])
        if (--tasksToGo === 0) {
          // No tasks left, good to go
          onComplete();
        }
      });

      
    }

  }

  

})


router.get('/home/getrecs', jsonParser, (req, res) => {
  //implement recomendation system

  var recs = []

  coursenmae = req.query.data
  console.log("recommend courses base on ", coursename)


  for(var i = 1; i<wishlist.length; ++i){
    // console.log(wishlist[i])
    if(wishlist[i].includes(coursename)){
      // console.log(wishlist[i])
      for(var j = 0; j<wishlist[i].length; ++j){
        if(recs.includes(wishlist[i][j]) || wishlist[i][j]==coursename){
          //do nothing
        }
        else{
          recs.push(wishlist[i][j])
          console.log('wishlist item:', wishlist[i][j])
        }
      }
    }
  }

  console.log("recs:", recs)

  // get course details and send that 
  console.log("info of wishlist courses")

  recdetails = []
  var tasksToGo = recs.length

  var onComplete = function() {
    res.send({"recs": recdetails})
    console.log("response sent")
    console.log("DONE")
  };

  if (tasksToGo === 0) {
    onComplete();
  } 
  else {
    for (var i = 0; i < recs.length; i++) {

      Course.find({"name": decodeURIComponent(recs[i])}, function(err, result) {
        recdetails.push(result[0])
        // console.log(result)
        console.log("course found", result[0])
        if (--tasksToGo === 0) {
          // No tasks left, good to go
          onComplete();
        }
      });

      
    }

  }



})



router.get('/home/analytics', (req, res) => {
  
  var newarr = [];
  var courselist = []
  var finalarr = [];

  for(var i = 0; i < wishlist.length; i++){
    newarr = newarr.concat(wishlist[i]);
  }

  for(var i = 0; i < newarr.length; i++){
    if(courselist.includes(newarr[i])){
      //do nothing
    }
    else{
      courselist.push(newarr[i])
    }
  }

  // for (var i = 0; i < courselist.length; i++) {

  //   // add element to finalarr with count = 1
  //   finalarr.push({'y': '1', 'label': courselist[i]})

  // }


  var counts = {};

  for (var i = 0; i < newarr.length; i++) {
    var num = newarr[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }


  for (var i = 0; i < courselist.length; i++) {

    // add element to finalarr with count = 1
    finalarr.push({'y': counts[courselist[i]], 'label': decodeURIComponent(courselist[i])})

  }

  console.log(finalarr)

  res.send({"analdata": finalarr})



})

module.exports = router;
