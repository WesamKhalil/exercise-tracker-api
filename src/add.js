const mongoose = require('mongoose')
const User = require('../models/user.js')

const mongoUrl = 'mongodb+srv://FCC:' + process.env.PW + '@cluster0.1mvbk.mongodb.net/exercises?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})

const add = ({userId, description, minutes, date}) => {
    //Give date a value of the current date if no value is given
    if(date === undefined) {
        const currDate = new Date()
        date = currDate.getFullYear() + '-' + (currDate.getMonth() + 1) + '-' + currDate.getDate()
    }

    //Try and find user to check if they exist
    return User.findOne({_id: userId})
        .then(res => {
            if(res != null) {
                //Update log with new exercise
                const dateStr = new Date(date).toDateString()
                res.log.push({description: description, duration: minutes, date: dateStr})
                //Update with new log
                return User.findOneAndUpdate({_id: userId}, {log: res.log.sort((a, b) => new Date(b.date) - new Date(a.date))})
                    .then(res => {
                        return {
                            _id: userId,
                            username: res.user_name,
                            date: dateStr,
                            duration: minutes,
                            description: description
                        }
                    })
            } else {
                return {error: "User ID is not registered"}
            }
        })
}

module.exports = add