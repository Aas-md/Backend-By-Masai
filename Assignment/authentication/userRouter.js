let express = require('express')
let router = express.Router()
let UserModel = require('./userModel')
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 2;



router.post('/signup', async (req, res) => {

    let { name, email, password } = req.body

    try {
        let hash = await bcrypt.hash(req.body.password, saltRounds)

        let user = await UserModel.create({ ...req.body, password: hash })
        res.status(201).json({ msg: "User Signup successfully ", user })

    } catch (err) {
        res.status(400).json({ msg: "Some thing went wrong : ", error: err.message })
    }
})

router.post('/login', async (req, res) => {
    let { email, password } = req.body

    try {
        let currUser = await UserModel.findOne({ email })
        console.log(password, currUser.password)
        const isMatch = await bcrypt.compare(password, currUser.password)

        if (isMatch) {
            return res.status(200).json({ msg: "Login Successful!", currUser })
        } else {
            return res.status(200).json({ msg: "email or passowrd invalid" })
        }

    } catch (err) {

        res.status(400).json({ msg: "Some thing went wrong : ", error: err.message })
    }

})

module.exports = router