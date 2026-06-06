let mongoose = require('mongoose')
const User = require('./UserSchema')


let profileSchema = new mongoose.Schema({
    bio: { type: String },
    socialMediaLinks: { type: Array },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User",required:true }
})

let Profile = mongoose.model("Profile", profileSchema)

module.exports = Profile