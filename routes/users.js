const express = require('express');
const router = express.Router();
const User = require('../models/User');



// add friend & remove friend routing 

// /api/users/:userId/friends/:friendId

router.post('/:userId/friends/:friendId', function (req, res) {
  User.findByIdAndUpdate(req.params.userId,
    
    {
      $push: {friends: req.params.friendId}
    }, {new:true})
//friends updated 

    .then(friends => {
      res.json(friends)
    })

    .catch(err => {
      res.json(err)
    })

})


router.delete('/:userId/friends/:friendId' , function (req, res) {

  User.findByIdAndUpdate(req.params.userId, 
    
    {
      $pull: {friends: req.params.friendId}

    }, {new:true})

    .then(deleteFriends => {
      res.json(deleteFriends)
    })

    .catch(err => {
      res.json(err)
    })


}) 




  // GET SINGLE USER


  router.get('/:userId', function (req, res) {
    User.findById(req.params.userId)
      
    .then(singleUser => {
      res.json(singleUser)
    })

    .catch(err => {
      res.json(err)
    });
  });



/* GET users listing. */
router.get('/', function (req, res) {
  User.find()
  .then(users => {
    res.json(users)
  })
  .catch(err => {
    res.json(err)
  })





  // res.send('USER PAGE');
});

router.post('/createUser', function (req, res) {
  //res.send('It is working for createUser');

  // const user = new User({
  //   userName: 'Paul',
  //   email: 'Paul123@test.com'
  // })

  User.create(req.body)

  // user.save()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });

});

router.delete('/:id', function (req, res) {
  User.findOneAndDelete({ _id: req.params.id })
    .then(result => {
      console.log(result)
      res.json('Deleted - POOF')
    })

});


//PUT request to update account / username

router.put('/:id', function (req, res) {

  let myQuery = { _id: req.params.id };
  let newValues = { $set: req.body };

  User.findOneAndUpdate(myQuery, newValues, {new:true})
    .then(result => {
      res.json(result)
    })
});

module.exports = router;
