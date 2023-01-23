const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    todo: { type: String },
    done: { type: Boolean, default: false },
    user_id: { type: ObjectId }
})

module.exports = mongoose.model('todos', TodoSchema);