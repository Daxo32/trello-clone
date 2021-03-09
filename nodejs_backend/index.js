require('./models/db')
require('./models/user.model')
//
const express = require("express")
const bodyParser = require('body-parser')
const userController = require('./controller/userController')
//
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//

app.get("/", (req, res) => {
    res.send("Trello NodeJs API")
})

app.use('/trello-api', userController)

var server = app.listen(8000, () => {
    console.log("Server listening: " + server.address().address + ":" + server.address().port)

})