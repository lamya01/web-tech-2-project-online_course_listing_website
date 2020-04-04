const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const User = require('../models/User');
const Course = require('../models/Course');


// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Home
router.get('/home', ensureAuthenticated, (req, res) => {

  res.render('home', {
    user: req.user
  })

});

router.get('/home/getcourses', (req, res) => {
  
  //db operation to get all courses
  Course.find((err, courses) => {
    res.send({"courses": courses})
  });

})

module.exports = router;
