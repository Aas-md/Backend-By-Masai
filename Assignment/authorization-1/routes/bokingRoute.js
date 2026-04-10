let express = require('express')
let router = express.Router()
let bookingModel = require('../Models/bookingModel')

router.post('/', async (req, res) => {
   
    try{
        res.json({ msg: "Booking created successfully", booking: req.body })
    }catch(err){
        res.status(500).json({ msg: "Something went wrong", error: err.message })   
    }

})

module.exports = router