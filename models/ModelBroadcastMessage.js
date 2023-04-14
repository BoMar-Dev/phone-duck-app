const mongoose = require('mongoose');

const  BroadcastSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
    },
    message : {
        type: String,
        required : [true, "Please enter a message"]
    }
}, {timestamps: true});

const BroadcastMessage = mongoose.model('Broadcast Messages', BroadcastSchema); //Creates model from schema

module.exports = BroadcastMessage; //Exports the model