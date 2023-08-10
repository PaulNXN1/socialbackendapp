const express = require('express');
const router = express.Router();


const {getReactions, getSingleReaction, createReaction, updateReaction, deleteReaction } = require('../controllers/reactionController')


router.route('/').get(getReactions).post(createReaction);


router.route('/:reactionId').get(getSingleReaction).put(updateReaction).delete(deleteReaction);

module.exports = router;