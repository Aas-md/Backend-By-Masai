let mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({

    item : { type: String, required: true },
    price : { type: Number, required: true },
    orderedBy : {type : mongoose.Schema.Types.ObjectId,ref:"User", required: true}
})

let orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;