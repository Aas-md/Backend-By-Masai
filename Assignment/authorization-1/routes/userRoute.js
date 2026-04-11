let express = require('express')
const bcrypt = require('bcrypt');
const saltRounds = 2;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
var jwt = require('jsonwebtoken');

let router = express.Router()
let userModel = require('../Models/userModel')

router.post('/signup', async (req, res) => {

    try {
        let hash = await bcrypt.hash(req.body.password, saltRounds)

        let user = await userModel.create({ ...req.body, password: hash })
        res.status(201).json({ msg: "User created successfully", user })
    } catch (err) {
        res.status(500).json({ msg: "Something went wrong", error: err.message })
    }
})

router.post('/login', async (req, res) => {

    try {
        let { email, password } = req.body
        let user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }
        let result = await bcrypt.compare(password, user.password)


        if (!result) {
            return res.status(401).json({ msg: "Invalid credentials" })
        } else {
            var token = jwt.sign({ userId: user._id }, 'shhhhh');
            res.status(200).json({ msg: "Login successful", user, token })
        }

    } catch (err) {
        res.status(500).json({ msg: "Something went wrong", error: err.message })
    }
})

router.get('/test-token', (req, res) => {
    let token = req.headers['authorization']
    token = token && token.split(' ')[1] // Bearer <token>
    console.log(token)

    try {
        var decoded = jwt.verify(token, 'shhhhh');

        res.status(200).json({ msg: "Token is valid", decoded })
    } catch (err) {
        res.status(401).json({ msg: "Invalid token", error: err.message })
    }

})

// router.post('/reset-token', async (req, res) => {

//     try {

//     } catch (err) {
//         res.status(401).json({ msg: "Something went wrong", error: err.message })
//     }
// })



module.exports = router