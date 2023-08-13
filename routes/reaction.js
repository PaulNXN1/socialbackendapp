const express = require('express');
const router = express.Router();


const {getReactions, getSingleReaction, createReaction, updateReaction, deleteReaction } = require('../controllers/reactionController')


router.route('/getReactions/:thoughtId').get(getReactions);

router.post('/postReaction/:thoughtId', createReaction)


router.route('/:thoughtId/:reactionId').get(getSingleReaction).put(updateReaction).delete(deleteReaction);



module.exports = router;