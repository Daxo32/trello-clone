const mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    token: {
        type: String,
        required: "This field is required"
    },
    name: {
        type: String,
        require: "This field is required"
    },
    boards: {
        type: Array,
    }
})


mongoose.model("User", userSchema)
