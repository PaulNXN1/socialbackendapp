// Importing models
const { Thought, User } = require('../models');



// export all thought controllers to be routed/pathed

module.exports = {
    // Get all thoughts (GET)
    // api/thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Get 1 thought by Id (GET ROUTE)

    // CHECK THIS ROUTING 

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})
                .select('-__v');

            if(!thought) {
                return res.status(404).json({message: 'OOPS - No thought with that ID.'})
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create a new user (POST ROUTE)
 
    async createThought(req,res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$addToSet: {thoughts: thought._id}},
                {new: true}
            )

            if (!user) {
                return res.status(404).json({
                    message: 'Great!  Thought created, however no user with that ID!',
                })
            }
            res.json('Bien Hecho - Thought created!');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update a user (PUT ROUTE)

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
            );

            if(!thought) {
                return res.status(404).json({message: 'Darn...No thought with that id!'});
            };

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a user (DELETE ROUTE)

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});

            if(!thought) {
                return res.status(404).json({message: 'Come on! No thought with that Id!'});
            }

            const user = await User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            )

            if(!user) {
                return res.status(404).json({
                    message: 'Thought deleted.'
                });
            }
            res.json({message: 'Thought deleted.'})
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add a reaction to thought (POST)


    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            );

            if(!thought) {
                return res.status(404).json({message: 'No thought with that Id!'});
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Remove a reaction from a thought (POST)

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {_id: req.params.reactionId}}},
                {runValidators: true, new: true}
            );

            if(!thought) {
                return res.status(404).json({message: "YIKES! No thought with that Id!"})
            };

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};