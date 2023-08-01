const mongoose = require('mongoose');
const reactionSchema = require('./Reaction')


const thoughtSchema = new mongoose.Schema({
thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
},

createdAt: {
    type: Date,
    timestamps: true,
    default: Date.now

},

username: {
    type: String,
    required: true
},

reactions: [reactionSchema]

});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;