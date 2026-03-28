let express = require("express");
let orderModel = require("./orderModel");
let userModel = require('./userModel')

let router = express.Router();

router.post("/add-order", async (req, res) => {

    try {
        let order = await orderModel.create(req.body);
        res.status(201).json({ message: "Order created successfully", order });
    } catch (err) {
        res.status(500).json({ message: "Error creating order", error: err.message });
    }

})

router.get("/get-orders/:userId", async (req, res) => {

    let { userId } = req.params
    try {
        let orders = await orderModel.find({ orderedBy: userId }).populate("orderedBy", "name")
        res.status(200).json({ message: "Order list : ", orders: orders })
    } catch (err) {
        res.status(500).json({ message: "Error fetching orders", error: err.message });
    }
})

router.patch("/update-order/:orderId", async (req, res) => {

    let { orderId } = req.params

    try {
        let order = await orderModel.findByIdAndUpdate(orderId, req.body, { new: true })
        res.status(200).json({ message: "Order updated successfully", order })
    } catch (err) {
        res.status(500).json({ message: "Error updating order", error: err.message });
    }

})

router.delete("/delete-order/:orderId", async (req, res) => {

    let { orderId } = req.params

    try {
        let order = await orderModel.findByIdAndDelete(orderId)
        res.status(200).json({ message: "Order deleted successfully", order })
    } catch (err) {
        res.status(500).json({ message: "Error deleting order", error: err.message });
    }

})

    

module.exports = router;