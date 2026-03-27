let express = require("express");
let userModel = require("./userModel");

let router = express.Router();

router.post("/add-user", async (req, res) => {

    try {
        let user = await userModel.create(req.body);
        res.status(201).send(user);
    } catch (err) {
        res.status(500).send({ message: "Error creating user", error: err.message });
    }

});

router.patch('/add-address/:userId', async (req, res) => {

    try {
        let userId = req.params.userId;
        let address = req.body;
        let user = await userModel.findById(userId);
   
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            user.address.push(address);
            await user.save();
            res.status(200).json({ message: "Address added successfully", name: user.name });
        }
    } catch (err) {
        res.status(500).json({ message: "Error adding address", error: err.message });
    }
})

module.exports = router;
