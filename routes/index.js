const express = require('express');
const router = express.Router();
const thoughtRoute = require('./thought')
const userRoute = require('./users')

/* GET home page. */
router.use('/thought', thoughtRoute);
router.use('/users', userRoute);
module.exports = router;
