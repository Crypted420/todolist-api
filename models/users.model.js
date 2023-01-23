const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: { type: String },
    password: { type: String }
})

module.exports = mongoose.model('users', UserSchema);