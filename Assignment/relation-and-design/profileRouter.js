let express = require('express')
let router = express.Router()
let Profile = require('./profileSchema')
let User = require('./UserSchema')

router.post("/user", async (req, res) => {
    try {
        let user = await User.create(req.body)
        return res.status(201).json({ message: "User created successfully", user })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

})

router.post("/profile", async (req, res) => {

    try {
        let profile = await Profile.create(req.body)
        return res.status(201).json({ message: "Profile created successfully", profile })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.get('/profile', async (req, res) => {

    try {
        let profiles = await Profile.find().populate("user")
        return res.status(200).json({ message: "Profiles retrieved successfully", profiles })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

module.exports = router