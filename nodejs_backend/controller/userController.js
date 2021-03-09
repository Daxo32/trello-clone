
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const User = mongoose.model('User')



router.get("/users/:token", (req, res) => {
    console.log(req.params.token)
    User.find({ token: req.params.token }, (err, doc) => {
        res.send(doc)
    })
})

router.get("/users", (req, res) => {
    User.find({}, (err, users) => {
        res.send(users)
    })
})


router.post("/users", (req, res) => {
    User.find({ token: req.body.token }, (err, doc) => {
        if (doc.length > 0) {
            updateUser(req, res)
        } else {
            createUser(req, res)
        }
    })
})


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


const updateUser = (req, res) => {
    const query = { token: req.body.token }
    const update = { $set: { token: req.body.token, name: req.body.name, boards: req.body.boards } }
    const options = {}

    User.updateOne(query, update, options, (err, doc) => {
        if (!err) {
            res.send("ok")
        } else {
            res.send(err)
        }
    })
}

const createUser = (req, res) => {
    var user = new User()
    //check token con firebase
    user.token = req.body.token
    user.name = req.body.name
    user.boards = req.body.boards
    //
    user.save((err, doc) => {
        if (!err) {
            res.send("si")
        } else {
            res.send(err)
        }
    })
}


module.exports = router