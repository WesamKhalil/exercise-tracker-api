const mongoose = require('mongoose')
const User = require('../models/user.js')

const mongoUrl = 'mongodb+srv://FCC:' + process.env.PW + '@cluster0.1mvbk.mongodb.net/exercises?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})

const log = ({userId, from, to, limit}) => {
    //Check if user exists
    return User.findOne({_id: userId})
        .then(res => {
            if(res != null) {
                //If any other query is passed then apply it by adding new values to the object and changing  the log
                if(from != undefined && /^\d{4}-\d{2}-\d{2}$/.test(from)) {
                    res.from = new Date(from).toDateString()
                    res.log = res.log.filter(val => new Date(val.date) >= new Date(from))
                }
                if(to != undefined && /^\d{4}-\d{2}-\d{2}$/.test(to)) {
                    res.to = new Date(to).toDateString()
                    res.log = res.log.filter(val => new Date(val.date) <= new Date(to))
                }
                if(limit != undefined && Number.isInteger(parseInt(limit))) {
                    res.log = res.log.slice(0, limit)
                }
                //Remove _id from log's returned objects and only show, description, duration and date
                const newLog = res.log.map(val => {
                    return {
                        description: val.description,
                        duration: val.duration,
                        date: val.date
                    }
                })
                return {
                    _id: userId,
                    username: res.user_name,
                    from: res.from,
                    to: res.to,
                    count: res.log.length,
                    log: newLog
                }
            } else {
                return {error: "User ID doesn't exist"}
            }
        })
}

module.exports = log