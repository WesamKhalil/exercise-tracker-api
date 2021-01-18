const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const add = require('./src/add.js')
const register = require('./src/register.js')
const log = require('./src/log.js')

app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.post('/api/exercise/add', (req, res) => {
    add(req.body).then(data => {
        res.json(data)
    })
})

app.post('/api/exercise/new_user', (req, res) => {
    register(req.body.username).then(data => {
        res.json(data)
    })
})

app.get('/api/exercise/log', (req, res) => {
    log(req.query).then(data => {
        res.json(data)
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port ' + (process.env.PORT || 3000))
})