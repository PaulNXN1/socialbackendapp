const mongoose = require('mongoose');
const Thought = require('./Thought');

// Email validation 
let validateEmail = function (email) {
  var emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailTest.test(email)
};

// Schema creation for USER Model
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

  },

  thoughts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thoughts'
  }],

  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]},

{
    //  virtuals to be included
    toJSON: {
      virtuals: true,
    },
    id: false,
  }

);

// connecting model with database
const User = mongoose.model('User', userSchema);

// exporting 

module.exports = User;