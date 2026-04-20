let express = require('express')
let router = express.Router()
let bookingModel = require('../Models/bookingModel')
let isLoggedIn = require('../Midlewares/authMidleware')

const userModel = require('../Models/userModel');
let bcrypt = require('bcrypt')


router.post('/', isLoggedIn, async (req, res) => {

    try {


        let user = await userModel.findById(req.user.userId)

        if (user.role === 'admin') {
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
        if (currentUser.role === 'admin') {
            let allBookings = await bookingModel.find().populate('createdBy', 'name email')
            return res.json({ msg: "All bookings fetched successfully", bookings: allBookings })
        }
        let bookings = await bookingModel.find({ createdBy: user.userId }).populate('createdBy', 'name email')
        res.json({ msg: "Bookings fetched successfully", bookings })
    } catch (err) {
        res.status(500).json({ msg: "Something went wrong", error: err.message })
    }
})

router.put('/:id', isLoggedIn, async (req, res) => {

    try {

        let booking = await bookingModel.findById(req.params.id)
        let user = req.user

        if (!booking) {
            return res.status(404).json({ msg: "Booking not found" })
        }
        if (booking.createdBy.toString() !== user.userId || booking.status !== 'pending') {
            return res.status(403).json({ msg: "You are not authorized or the booking is not pending" })
        }
        let updatedBooking = await bookingModel.findByIdAndUpdate(req.params.id, {  ...req.body }, { new: true })
        res.json({ msg: "Booking updated successfully", booking: updatedBooking })

    } catch (err) {
        res.status(500).json({ msg: "Something went wrong", error: err.message })
    }
})

module.exports = router