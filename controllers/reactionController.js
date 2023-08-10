// Importing models
const { Thought, User, reactionSchema } = require('../models');



module.exports = {
    // Get all reactions

    async getReactions(req, res) {


        Thought.findById(req.body)
            .then(thought => {

                res.send(thought.reactions)
            })
        // try {
        //     const reaction = await Reaction.find();
        //     res.json(reaction);
        // } catch (err) {
        //     console.log(err);
        //     res.status(500).json(err);
        // }
    },



    // CHECK THIS ROUTING 

    async getSingleReaction(req, res) {
        try {
            const reaction = await Reaction.findOne({ _id: req.params.reactionId })
                .select('-__v');

            if (!reaction) {
                return res.status(404).json({ message: 'OOPS - No reaction with that ID.' })
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create a new reaction (POST ROUTE)

    async createReaction(req, res) {

        Thought.findById("64d43fee240483aae659df53")
            .then(thought => {
                thought.reactions.push(req.body);
                res.send(thought.save())
            })
        // try {
        //     const reaction = await Reaction.create(req.body);
        //     const user = await User.findOneAndUpdate(
        //         { _id: req.body.userId },
        //         { $addToSet: { reaction: reaction._id } },
        //         { new: true }
        //     )

        //     if (!user) {
        //         return res.status(404).json({
        //             message: 'Great!  Reaction created, however no user with that ID!',
        //         })
        //     }
        //     res.json('Bien Hecho - Reaction created!');
        // } catch (err) {
        //     console.log(err);
        //     res.status(500).json(err);
        // }
    },

    // Update a reaction (PUT ROUTE)

    async updateReaction(req, res) {
        try {
            const reaction = await Reaction.findOneAndUpdate(
                { _id: req.params.reactionId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!reaction) {
                return res.status(404).json({ message: 'Darn...No reaction with that id!' });
            };

            res.json(reaction);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a reaction (DELETE ROUTE)

    async deleteReaction(req, res) {
        try {
            const reaction = await Reaction.findOneAndRemove({ _id: req.params.reactionId });

            if (!reaction) {
                return res.status(404).json({ message: 'Come on! No reaction with that Id!' });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { reaction: req.params.reactionId } },
                { new: true }
            )

            if (!user) {
                return res.status(404).json({
                    message: 'Reaction deleted.'
                });
            }
            res.json({ message: 'Thought deleted.' })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add a reaction to thought (POST)


    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that Id!' });
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
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: "YIKES! No thought with that Id!" })
            };

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};