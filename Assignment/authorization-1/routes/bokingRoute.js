let express = require('express')
let router = express.Router()
let bookingModel = require('../Models/bookingModel')
let isLoggedIn = require('../Midlewares/authMidleware')

const userModel = require('../Models/userModel');
let bcrypt = require('bcrypt')


router.post('/', isLoggedIn, async (req, res) => {

    try {


        let user = await userModel.findById(req.user.userId)

        if(user.role === 'admin'){
            res.status(403).json({ msg: "Admins cannot create bookings" })
        }

        let booking = await bookingModel.create({ ...req.body, createdBy: user._id })

        res.json({ msg: "Booking created successfully", booking })
    } catch (err) {

        res.status(500).json({ msg: "Something went wrong", error: err.message })
    }

})

router.get('/', isLoggedIn, async (req, res) => {
    try {
        let user = req.user
        let currentUser = await userModel.findById(user.userId)
        if(currentUser.role === 'admin') {
           let allBookings = await bookingModel.find().populate('createdBy', 'name email')
           return res.json({ msg: "All bookings fetched successfully", bookings: allBookings })
        }
        let bookings = await bookingModel.find({ createdBy: user.userId }).populate('createdBy', 'name email')
        res.json({ msg: "Bookings fetched successfully", bookings })
    } catch (err) {
        res.status(500).json({ msg: "Something went wrong", error: err.message })
    }
})

module.exports = router