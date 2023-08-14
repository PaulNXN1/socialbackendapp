const express = require('express');
const router = express.Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction} = require('../controllers/thoughtController');
const { createReaction } = require('../controllers/reactionController');


router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;