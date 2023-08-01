const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('USER PAGE');
});

router.post('/createUser', function (req, res) {
  //res.send('It is working for createUser');

  const user = new User({
    userName: 'Paul',
    email: 'Paul123@test.com'
  })

  user.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });

});

router.delete('/deleteUser', function (req, res) {
  User.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result)
      res.send('done')
    })

});


//put request
router.put('/updateUser', function (req, res) {

  let myQuery = { _id: req.params.id };
  let newValues = { $set: req.body };

  User.updateOne(myQuery, newValues)
    .then(result => {
      res.send(result)
    })
});

module.exports = router;
