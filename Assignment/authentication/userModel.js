let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true

    },
    password: String
})

let User = mongoose.model('User', userSchema)

module.exports = User