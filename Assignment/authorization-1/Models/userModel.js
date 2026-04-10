let express = require('express')
let mongoose = require('mongoose')


let userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user'], default: 'user' }
}
)

let userModel = mongoose.model('User', userSchema)

module.exports = userModel