require('./models/db')
require('./models/user.model')
//
const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")
const firebase = require("firebase-admin");
const userController = require('./controller/userController')
//
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: true }));
//

app.get("/", (req, res) => {
    res.send("Trello NodeJs API")
})

app.use('/trello-api', userController)

const firebaseConfig = require('./trello-clone-firebase-adminsdk-mmqwk-c7fb57d5bc.json')

firebase.initializeApp({
    credential: firebase.credential.cert(firebaseConfig)
});

var server = app.listen(8000, () => {
    console.log("Server listening: " + server.address().address + ":" + server.address().port)

})