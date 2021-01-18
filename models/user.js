const mongoose = require('mongoose')

//Objects in the log array in userSchema
const exerciseSchema = new mongoose.Schema({
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: String
})

const userSchema = new mongoose.Schema({
    user_name: {type: String, required: true},
    log: [exerciseSchema]
})

const User = mongoose.model('users', userSchema)

module.exports = User