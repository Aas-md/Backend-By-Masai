let express = require('express')

let router = express.Router()
let userModel = require('../Models/userModel')

router.post('/signup', async (req, res) => {

    try {
        userModel.create(req.body)
        res.status(201).json({ msg: "User created successfully" })
    } catch (err) {
        res.status(500).json({ msg: "Something went wrong", error: err.message })
    }
})

module.exports = router