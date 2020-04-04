const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  topic: {
    type: String,
  },
  price: {
    type: Number
  },
  website: {
    type: String
  },
  id: {
    type: Number,
    unique: true,
    require: true
  }

});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
