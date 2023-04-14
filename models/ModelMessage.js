const mongoose = require('mongoose');


const MessagesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    
    message : {
        type: String,
        required : [true, 'Please enter message']
    }
}, {timestamps: true});

const MessageModel = mongoose.model('Messages', MessagesSchema);

module.exports = MessageModel;