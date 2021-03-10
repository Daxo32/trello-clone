const mongoose = require("mongoose")


mongoose.connect('mongodb://localhost:27017/trelloCloneDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true
},
    err => {
        if (err) {
            console.log("Error in Connection: ", err)
        } else {
            console.log("MongoDB - Connection succeeded")
        }
    })

