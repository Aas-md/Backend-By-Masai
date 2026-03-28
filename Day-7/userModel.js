let mongoose = require("mongoose");

let addressSchema = new mongoose.Schema({

    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: Number, required: true }
})

let userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    age: Number,
    status: String,
    location: String,
    gender: { type: String, enum: ["Male", "Female", "Other"], requeired: true },

    address: {
        type: [addressSchema]
    }

})

let userModel = mongoose.model("User", userSchema);

module.exports = userModel;