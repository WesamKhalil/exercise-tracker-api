const mongoose = require('mongoose')
const User = require('../models/user.js')

const mongoUrl = 'mongodb+srv://FCC:' + process.env.PW + '@cluster0.1mvbk.mongodb.net/exercises?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})

const register = username => {
    //Check if user exists
    return User.findOne({user_name: username})
        .then(res => {
            if(res === null) {
                //Create new user
                return User.create({
                    user_name: username
                }).then(res => {
                    return {
                        user_name: res.user_name,
                        _id: res._id
                    }
                })
            } else {
                return {error: "Username already taken"}
            }
        })
}

module.exports = register