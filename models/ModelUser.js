const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
}, {timestamps: true});

mongoose.model('User', UserSchema);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;