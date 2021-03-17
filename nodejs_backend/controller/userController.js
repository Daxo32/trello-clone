
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const firebase = require("firebase-admin")
const User = mongoose.model('User')

//GET THE USERS LIST
router.get("/users", (req, res) => {
    User.find({}, (err, users) => {
        res.send(users)
    })
})

//GETs the user info if the user exists altought creates a new user
router.get("/user/:token", (req, res) => {
    firebase.auth().verifyIdToken(req.params.token)
        .then((decodedToken) => {
            User.find({ token: decodedToken.uid }, (err, doc) => {
                if (doc.length > 0) { //If the already user exists return the user datad")
                    res.send(doc[0])
                } else { //if the user does not exixst, create it and return the new user data
                    createUser(req, res, decodedToken)
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.send(500)
        })
})

//UPDATE USER INFO
router.post("/user/:token", (req, res) => {
    firebase.auth().verifyIdToken(req.params.token)
        .then((decodedToken) => {
            User.find({ token: decodedToken.uid }, (err, doc) => {
                if (doc.length > 0) {
                    const query = { token: decodedToken.uid }
                    const update = { $set: { boards: req.body.boards } }
                    const options = {}
                    User.updateOne(query, update, options, (err, doc) => {
                        if (!err) {
                            res.sendStatus(200)
                        } else {
                            console.log(err)
                            res.send(500)
                        }
                    })
                }
            })

        })
        .catch(err => {
            console.log(err)
            res.send(500)
        })
})

//Deletes the user - NOT NECESSARY FOR NOW
router.delete("/users/:token", (req, res) => {
    query = { token: req.params.token }
    User.deleteOne(query, (err, users) => {
        if (!err) {
            res.send(users)
        } else {
            res.sendStatus(400)
        }
    })
})


const createUser = (req, res, decodedToken) => {
    var user = new User()
    //check token con firebase
    user.token = decodedToken.uid
    user.name = decodedToken.name
    user.boards = []
    //
    user.save((err, doc) => {
        if (!err) {
            console.log("NEW USER CREATED", doc)
            res.send(doc)
        } else {
            res.send(err)
        }
    })
}




module.exports = router