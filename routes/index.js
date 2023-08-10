const express = require('express');
const router = express.Router();
const thoughtRoute = require('./thought')
const userRoute = require('./users')
const reactionRoute = require('./reaction')

/* GET home page. */
router.use('/thought', thoughtRoute);
router.use('/users', userRoute);
router.use('/reactions', reactionRoute);
module.exports = router;
