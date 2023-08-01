const mongoose = require('mongoose');


let validateEmail = function(email) {
    var emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailTest.test(email)};


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

    }
  });
  
  // connecting model with database
  const User = mongoose.model('User', userSchema);

  // exporting 

  module.exports = User;