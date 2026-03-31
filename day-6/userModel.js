let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({

    name : String,
    age : Number,
    location : String,
    status : String

})

let userModel = new mongoose.model("User",userSchema)

module.exports = userModel