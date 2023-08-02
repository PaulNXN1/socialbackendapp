const mongoose = require('mongoose');

// Creating reaction schema 
const reactionSchema = new mongoose.Schema({
    reactionId: {

        _id: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),

    }, 

    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280


    },

    username: {
        type: String,
        required: true

    },


    createAt: {
        type: Date,
        timestamps: true,
        default: Date.now

    }

});




const Reaction = mongoose.model('Reaction', reactionSchema);



module.exports = Reaction;