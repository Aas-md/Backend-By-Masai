let express = require('express')
let router = express.Router()
let bookingModel = require('../Models/bookingModel')
let isLoggedIn = require('../Midlewares/authMidleware')

const userModel = require('../Models/userModel');
let bcrypt = require('bcrypt')


router.post('/', isLoggedIn, async (req, res) => {

    try {


        let user = await userModel.findById(req.user.userId)

        let booking = await bookingModel.create({ ...req.body, createdBy: user._id })

        res.json({ msg: "Booking created successfully", booking })
    } catch (err) {

        res.status(500).json({ msg: "Something went wrong", error: err.message })
    }

})

module.exports = router