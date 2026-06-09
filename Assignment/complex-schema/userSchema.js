let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    addresses: [{ street: String, city: String, country: { type: String, default: "India" }, pincode: Number }]

})