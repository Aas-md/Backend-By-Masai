let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role : {type : String, enum : ["admin","user"],default : "user"}
})

let UserModel = mongoose.model("User", userSchema)

module.exports = UserModel