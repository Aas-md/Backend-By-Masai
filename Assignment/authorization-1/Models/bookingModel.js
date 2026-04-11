let mongoose = require('mongoose')

let bookingSchema = new mongoose.Schema({
    service: { type: String, required: true },
    data: { type: String, default: Date.now() },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'cancelled'], default: 'pending' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

let bookingModel = mongoose.model('Booking', bookingSchema)
module.exports = bookingModel