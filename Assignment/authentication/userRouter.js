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
        if (!currUser)
            return res.status(404).json({ msg: "User with this email not found!" })
        const isMatch = await bcrypt.compare(password, currUser.password)

        if (isMatch) {
            let token = jwt.sign({ userId: currUser._id }, 'shhhhh', { expiresIn: '1h' });
            return res.status(200).json({ msg: "Login Successful!", currUser, token })
        } else {
            return res.status(200).json({ msg: "email or passowrd invalid" })
        }

    } catch (err) {

        return res.status(400).json({ msg: "Some thing went wrong : ", error: err.message })
    }

})

router.get('/profile', async (req, res) => {

    try {

        let token = req.headers.authorization?.split(" ")[1]

        if (!token)
            return res.status(403).json({ msg: "Please login to your account" })

        let decoded = jwt.verify(token, 'shhhhh')
        let userId = decoded?.userId
        req.user = decoded
        if (!userId)
            return res.status(403).json({ msg: "Please login to your account" })
        let user = await UserModel.findById(userId)

        return res.status(200).json({ msg: "Account details fetched successfully!", user })

    } catch (err) {

        return res.status(400).json({ msg: "Some thing went wrong : ", error: err.message })
    }
})

module.exports = router