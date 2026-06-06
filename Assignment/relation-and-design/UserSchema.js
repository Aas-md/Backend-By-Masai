let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3 },
    email: { type: String, required: true, unique: true },

})
let User = mongoose.model("User", userSchema)

module.exports = User